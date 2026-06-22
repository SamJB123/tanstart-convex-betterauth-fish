import { v } from 'convex/values'
import {
  internalMutation,
  internalQuery,
} from '../_generated/server'
import type { Doc, Id } from '../_generated/dataModel'
import type { MutationCtx, QueryCtx } from '../_generated/server'
import { regulatorMutation, authedQuery } from '../rbac'
import { appendLedgerEntry, ledgerSum } from './aggregate'
import { indexCatchPoint } from '../geospatial'

// QUOTA ENGINE.
// Decisions encoded (regulatory basis in docs/validation-findings.md):
//  - Over-quota is ADVISORY: consume always records, then flags a breach / a
//    closure recommendation if it pushes a competitive pool past its cap.
//  - Quota debits PROVISIONALLY on the logged catch, then TRUE UP to the
//    verified CDR (TDB02) whole-weight via an adjustment entry.
//  - balance = baseAllowance(entitlement) + signed ledger sum (aggregate).
// Operational primitives are INTERNAL (system / CDR / catch-logging triggers);
// client-facing entry points are RBAC-wrapped (regulator manage, authed view).

// =========================================================================
// Impl (shared by internal + RBAC-wrapped entry points)
// =========================================================================
function baseAllowance(ent: Doc<'entitlements'>, scheme: Doc<'quotaSchemes'>): number {
  const m = scheme.measure
  if (m.kind === 'effort') {
    if (ent.unitsHeld != null) {
      return Math.floor((ent.unitsHeld / m.totalUnitsInForce) * m.totalAllowableEffort)
    }
    return m.totalAllowableEffort
  }
  if (ent.allowance != null) return ent.allowance // direct kg cap (Finfish/BDM)
  if (ent.sectorSharePct != null && scheme.totalUnits != null) {
    return ent.sectorSharePct * m.perUnitKgValue * scheme.totalUnits // TRL TIB pool
  }
  if (ent.unitsHeld != null) return ent.unitsHeld * m.perUnitKgValue // TVH units
  return 0
}

const FORM_TO_KEY: Record<string, string> = {
  F: 'filleted',
  GG: 'gilled_gutted',
  HG: 'gilled_gutted',
  G: 'gilled_gutted',
  W: 'whole',
}
function lineToWholeWeightKg(
  line: Doc<'catchLines'>,
  conversionFactors: Record<string, number> | undefined,
): number {
  const cf = conversionFactors ?? {}
  if (line.wholeWeightKg != null) return line.wholeWeightKg
  if (line.tailWeightKg != null) return line.tailWeightKg * (cf.tails ?? 1)
  if (line.gilledGuttedKg != null) return line.gilledGuttedKg * (cf.gilled_gutted ?? 1)
  if (line.liveWeightKg != null) return line.liveWeightKg
  const key = line.formCode ? FORM_TO_KEY[line.formCode] : undefined
  const factor = key && cf[key] ? cf[key] : 1
  const kg =
    line.unit === 'kg' || line.unit === 'kg_dry' || line.unit === 'tails'
      ? (line.quantity ?? 0)
      : 0
  return kg * factor
}

async function balanceFor(ctx: QueryCtx, ent: Doc<'entitlements'>) {
  const scheme = await ctx.db.get(ent.schemeId)
  if (!scheme) return null
  const allowance = baseAllowance(ent, scheme)
  const net = await ledgerSum(ctx, ent._id)
  const remaining = allowance + net
  return {
    entitlementId: ent._id,
    unit: ent.unit,
    allocationModel: ent.allocationModel,
    sector: ent.sector ?? null,
    allowance,
    usedNet: -net,
    remaining,
    overQuota: Math.max(0, -remaining),
    atOrOverCap: remaining <= 0,
  }
}

async function allocateImpl(
  ctx: MutationCtx,
  args: {
    schemeId: Id<'quotaSchemes'>
    holderPartyId?: Id<'parties'>
    communityId?: Id<'communities'>
    vesselId?: Id<'vessels'>
    sector?: 'traditional_inhabitant' | 'tvh' | 'sunset' | 'png' | 'other'
    allocationModel: 'individual' | 'pooled_competitive'
    unitsHeld?: number
    allowance?: number
    sectorSharePct?: number
    legislativeBasis?: string
  },
) {
  const scheme = await ctx.db.get(args.schemeId)
  if (!scheme) throw new Error('Unknown quota scheme')
  return await ctx.db.insert('entitlements', {
    schemeId: args.schemeId,
    fisheryId: scheme.fisheryId,
    periodId: scheme.periodId,
    holderPartyId: args.holderPartyId,
    communityId: args.communityId,
    vesselId: args.vesselId,
    sector: args.sector,
    allocationModel: args.allocationModel,
    measureType: scheme.measure.kind,
    unit: scheme.measure.kind === 'effort' ? scheme.measure.unit : 'kg_wwe',
    unitsHeld: args.unitsHeld,
    allowance: args.allowance ?? null,
    sectorSharePct: args.sectorSharePct,
    status: 'active',
    unitStatus: 'active',
    transferable: true,
    legislativeBasis: args.legislativeBasis,
  })
}

async function consumeImpl(ctx: MutationCtx, catchEventId: Id<'catchEvents'>) {
  const catchEvent = await ctx.db.get(catchEventId)
  if (!catchEvent) throw new Error('Unknown catch event')
  if (!catchEvent.entitlementId) {
    return { debited: false, reason: 'no entitlement (traditional take)' }
  }
  const already = await ctx.db
    .query('ledgerEntries')
    .withIndex('by_catchEvent', (q) => q.eq('catchEventId', catchEventId))
    .first()
  if (already) return { debited: false, reason: 'already debited' }

  const ent = await ctx.db.get(catchEvent.entitlementId)
  if (!ent) throw new Error('Entitlement not found')
  const scheme = await ctx.db.get(ent.schemeId)
  if (!scheme) throw new Error('Scheme not found')

  let amount: number
  if (scheme.measure.kind === 'effort') {
    amount = catchEvent.fishingDaysConsumed ?? 1
  } else {
    const lines = await ctx.db
      .query('catchLines')
      .withIndex('by_catchEvent', (q) => q.eq('catchEventId', catchEventId))
      .take(200)
    const cf = scheme.measure.conversionFactors
    amount = lines.reduce((s, l) => s + lineToWholeWeightKg(l, cf), 0)
  }

  const occurredAt = catchEvent.occurredAt
  await appendLedgerEntry(ctx, {
    entitlementId: ent._id,
    type: 'consumption',
    quantity: -amount,
    occurredAt,
    source: { kind: 'logbook', ref: catchEventId },
    catchEventId,
  })

  if (catchEvent.location) {
    await indexCatchPoint(
      ctx,
      catchEventId,
      catchEvent.location,
      { fisheryId: catchEvent.fisheryId, region: catchEvent.region },
      occurredAt,
    )
  }

  const bal = (await balanceFor(ctx, ent))!
  let closureRecommended = false
  if (ent.allocationModel === 'pooled_competitive' && bal.atOrOverCap) {
    const latest = await ctx.db
      .query('quotaClosures')
      .withIndex('by_scheme_and_effectiveFrom', (q) => q.eq('schemeId', scheme._id))
      .order('desc')
      .first()
    if (!latest || latest.status === 'open') {
      await ctx.db.insert('quotaClosures', {
        schemeId: scheme._id,
        sector: ent.sector,
        status: 'closed',
        reason: 'Sector cap reached — closure recommended (advisory)',
        effectiveFrom: occurredAt,
      })
      closureRecommended = true
    }
  }

  return {
    debited: true,
    amount,
    unit: ent.unit,
    remaining: bal.remaining,
    overQuota: bal.overQuota,
    breach: bal.remaining < 0,
    closureRecommended,
  }
}

async function trueUpImpl(
  ctx: MutationCtx,
  args: {
    catchEventId: Id<'catchEvents'>
    verifiedWholeWeightKg: number
    cdrRef?: string
    verifiedByPartyId?: Id<'parties'>
  },
) {
  const provisional = await ctx.db
    .query('ledgerEntries')
    .withIndex('by_catchEvent', (q) => q.eq('catchEventId', args.catchEventId))
    .filter((q) => q.eq(q.field('type'), 'consumption'))
    .first()
  if (!provisional) throw new Error('No provisional consumption to true up')
  const provisionalMagnitude = -provisional.quantity
  const adjustment = provisionalMagnitude - args.verifiedWholeWeightKg
  if (adjustment !== 0) {
    await appendLedgerEntry(ctx, {
      entitlementId: provisional.entitlementId,
      type: 'adjustment',
      quantity: adjustment,
      occurredAt: provisional.occurredAt,
      source: { kind: 'CDR', ref: args.cdrRef, verifiedByPartyId: args.verifiedByPartyId },
      catchEventId: args.catchEventId,
      reversedByEntryId: provisional._id,
    })
  }
  if (await ctx.db.get(args.catchEventId)) {
    await ctx.db.patch(args.catchEventId, { status: 'verified' })
  }
  const ent = await ctx.db.get(provisional.entitlementId)
  return ent ? await balanceFor(ctx, ent) : null
}

function refusalReason(
  from: Doc<'entitlements'>,
): 'units_suspended' | 'ineligible_transferee' | null {
  if (from.unitStatus === 'suspended' || from.unitStatus === 'cancelled') {
    return 'units_suspended'
  }
  if (!from.transferable) return 'ineligible_transferee'
  return null
}

async function moveQuotaImpl(
  ctx: MutationCtx,
  fromId: Id<'entitlements'>,
  toId: Id<'entitlements'>,
  amount: number,
  temporary: boolean,
) {
  const from = await ctx.db.get(fromId)
  const to = await ctx.db.get(toId)
  if (!from || !to) throw new Error('Entitlement not found')
  const refusal = refusalReason(from)
  if (refusal) return { ok: false, refusal }
  const occurredAt = from.validFrom ?? to.validFrom ?? 1
  await appendLedgerEntry(ctx, {
    entitlementId: fromId,
    type: temporary ? 'lease_out' : 'transfer_out',
    quantity: -amount,
    occurredAt,
    source: { kind: 'transfer_form' },
  })
  await appendLedgerEntry(ctx, {
    entitlementId: toId,
    type: temporary ? 'lease_in' : 'transfer_in',
    quantity: amount,
    occurredAt,
    source: { kind: 'transfer_form' },
  })
  return { ok: true }
}

// =========================================================================
// Client-facing (RBAC-wrapped)
// =========================================================================
const allocateArgs = {
  schemeId: v.id('quotaSchemes'),
  holderPartyId: v.optional(v.id('parties')),
  communityId: v.optional(v.id('communities')),
  vesselId: v.optional(v.id('vessels')),
  sector: v.optional(
    v.union(
      v.literal('traditional_inhabitant'),
      v.literal('tvh'),
      v.literal('sunset'),
      v.literal('png'),
      v.literal('other'),
    ),
  ),
  allocationModel: v.union(v.literal('individual'), v.literal('pooled_competitive')),
  unitsHeld: v.optional(v.number()),
  allowance: v.optional(v.number()),
  sectorSharePct: v.optional(v.number()),
  legislativeBasis: v.optional(v.string()),
}
const moveArgs = {
  fromEntitlementId: v.id('entitlements'),
  toEntitlementId: v.id('entitlements'),
  amount: v.number(),
}

// AFMA-staff-only quota management.
export const allocate = regulatorMutation({
  args: allocateArgs,
  handler: async (ctx, args) => allocateImpl(ctx, args),
})
export const transfer = regulatorMutation({
  args: moveArgs,
  handler: async (ctx, a) => moveQuotaImpl(ctx, a.fromEntitlementId, a.toEntitlementId, a.amount, false),
})
export const lease = regulatorMutation({
  args: moveArgs,
  handler: async (ctx, a) => moveQuotaImpl(ctx, a.fromEntitlementId, a.toEntitlementId, a.amount, true),
})

// Authenticated balance views (RLS scopes entitlements to own / community / all).
export const balanceOf = authedQuery({
  args: { entitlementId: v.id('entitlements') },
  handler: async (ctx, { entitlementId }) => {
    const ent = await ctx.db.get(entitlementId)
    return ent ? await balanceFor(ctx, ent) : null
  },
})
export const balancesForFisheryPeriod = authedQuery({
  args: { fisheryId: v.id('fisheries'), periodId: v.id('periods') },
  handler: async (ctx, { fisheryId, periodId }) => {
    const ents = await ctx.db
      .query('entitlements')
      .withIndex('by_fishery_and_period', (q) =>
        q.eq('fisheryId', fisheryId).eq('periodId', periodId),
      )
      .take(200)
    return await Promise.all(ents.map((e) => balanceFor(ctx, e)))
  },
})

// =========================================================================
// Internal (system / CDR / catch-logging / tests)
// =========================================================================
export const consume = internalMutation({
  args: { catchEventId: v.id('catchEvents') },
  handler: async (ctx, { catchEventId }) => consumeImpl(ctx, catchEventId),
})
export const trueUpFromCdr = internalMutation({
  args: {
    catchEventId: v.id('catchEvents'),
    verifiedWholeWeightKg: v.number(),
    cdrRef: v.optional(v.string()),
    verifiedByPartyId: v.optional(v.id('parties')),
  },
  handler: async (ctx, args) => trueUpImpl(ctx, args),
})
export const transferInternal = internalMutation({
  args: { ...moveArgs, temporary: v.optional(v.boolean()) },
  handler: async (ctx, a) =>
    moveQuotaImpl(ctx, a.fromEntitlementId, a.toEntitlementId, a.amount, a.temporary ?? false),
})
export const balanceOfInternal = internalQuery({
  args: { entitlementId: v.id('entitlements') },
  handler: async (ctx, { entitlementId }) => {
    const ent = await ctx.db.get(entitlementId)
    return ent ? await balanceFor(ctx, ent) : null
  },
})
