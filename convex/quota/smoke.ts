import { action, internalMutation } from '../_generated/server'
import { v } from 'convex/values'
import { internal } from '../_generated/api'
import type { Id } from '../_generated/dataModel'
import { quotaLedger } from './aggregate'
import { removeCatchPoint } from '../geospatial'

// End-to-end proof of the quota engine against the real aggregate + geospatial
// components. Creates isolated test rows, exercises every rule, then cleans up.
// Run with:  npx convex run quota/smoke:run

export const setupScenario = internalMutation({
  args: {},
  handler: async (ctx) => {
    const fishery = await ctx.db
      .query('fisheries')
      .withIndex('by_code', (q) => q.eq('code', 'TSFF'))
      .unique()
    const species = await ctx.db
      .query('species')
      .withIndex('by_caabCode', (q) => q.eq('caabCode', '37311905'))
      .unique()
    const party = (await ctx.db.query('parties').withIndex('by_kind', (q) => q.eq('kind', 'agency')).take(1))[0]
    if (!fishery || !species || !party) throw new Error('seed first')

    const periodId = await ctx.db.insert('periods', {
      fisheryId: fishery._id,
      label: 'SMOKE-TEST',
      startsAt: 0,
      endsAt: 1,
    })
    // Weight scheme + pooled-competitive entitlement, cap 100 kg.
    const wScheme = await ctx.db.insert('quotaSchemes', {
      fisheryId: fishery._id,
      periodId,
      name: 'SMOKE weight',
      measure: { kind: 'weight', speciesId: species._id, unit: 'kg_wwe', perUnitKgValue: 0, conversionFactors: {} },
      overQuotaPolicy: 'competitive_closure',
    })
    const eWeight = await ctx.db.insert('entitlements', {
      schemeId: wScheme, fisheryId: fishery._id, periodId, holderPartyId: party._id,
      sector: 'traditional_inhabitant', allocationModel: 'pooled_competitive',
      measureType: 'weight', unit: 'kg_wwe', allowance: 100, status: 'active', transferable: true,
    })
    // Effort scheme + entitlement, whole TAE 10 days.
    const efScheme = await ctx.db.insert('quotaSchemes', {
      fisheryId: fishery._id, periodId, name: 'SMOKE effort',
      measure: { kind: 'effort', unit: 'vessel_day', totalAllowableEffort: 10, totalUnitsInForce: 10, consumptionRule: 'logbook_day', leaseAutoRevert: true },
      overQuotaPolicy: 'hard_stop',
    })
    const eEffort = await ctx.db.insert('entitlements', {
      schemeId: efScheme, fisheryId: fishery._id, periodId, holderPartyId: party._id,
      allocationModel: 'individual', measureType: 'effort', unit: 'vessel_day', allowance: null, status: 'active', transferable: true,
    })
    // Transfer pair + a suspended entitlement (for refusal).
    const eFrom = await ctx.db.insert('entitlements', {
      schemeId: wScheme, fisheryId: fishery._id, periodId, holderPartyId: party._id,
      allocationModel: 'individual', measureType: 'weight', unit: 'kg_wwe', allowance: 50, status: 'active', transferable: true,
    })
    const eTo = await ctx.db.insert('entitlements', {
      schemeId: wScheme, fisheryId: fishery._id, periodId, holderPartyId: party._id,
      allocationModel: 'individual', measureType: 'weight', unit: 'kg_wwe', allowance: 0, status: 'active', transferable: true,
    })
    const eSuspended = await ctx.db.insert('entitlements', {
      schemeId: wScheme, fisheryId: fishery._id, periodId, holderPartyId: party._id,
      allocationModel: 'individual', measureType: 'weight', unit: 'kg_wwe', allowance: 50, status: 'suspended', unitStatus: 'suspended', transferable: true,
    })

    async function mkCatch(entId: Id<'entitlements'>, wholeKg: number | null, days: number | null) {
      const c = await ctx.db.insert('catchEvents', {
        reporterPartyId: party!._id, entitlementId: entId, fisheryId: fishery!._id,
        occurredAt: Date.UTC(2025, 0, 1), location: { lat: -10.0, lng: 142.5 },
        measureKind: days != null ? 'effort' : 'weight',
        fishingDaysConsumed: days ?? undefined, status: 'submitted',
      })
      if (wholeKg != null) {
        await ctx.db.insert('catchLines', { catchEventId: c, speciesId: species!._id, wholeWeightKg: wholeKg })
      }
      return c
    }
    const c1 = await mkCatch(eWeight, 30, null)
    const c2 = await mkCatch(eWeight, 80, null)
    const c3 = await mkCatch(eEffort, null, 1)

    return { periodId, wScheme, efScheme, eWeight, eEffort, eFrom, eTo, eSuspended, c1, c2, c3 }
  },
})

export const cleanupScenario = internalMutation({
  args: {
    entitlements: v.array(v.id('entitlements')),
    catches: v.array(v.id('catchEvents')),
    schemes: v.array(v.id('quotaSchemes')),
    periodId: v.id('periods'),
  },
  handler: async (ctx, args) => {
    for (const entId of args.entitlements) {
      const entries = await ctx.db
        .query('ledgerEntries')
        .withIndex('by_entitlement_and_occurredAt', (q) => q.eq('entitlementId', entId))
        .take(500)
      for (const e of entries) {
        await quotaLedger.delete(ctx, e)
        await ctx.db.delete(e._id)
      }
      await ctx.db.delete(entId)
    }
    for (const c of args.catches) {
      await removeCatchPoint(ctx, c).catch(() => {})
      const lines = await ctx.db.query('catchLines').withIndex('by_catchEvent', (q) => q.eq('catchEventId', c)).take(50)
      for (const l of lines) await ctx.db.delete(l._id)
      await ctx.db.delete(c)
    }
    for (const s of args.schemes) {
      const closures = await ctx.db.query('quotaClosures').withIndex('by_scheme_and_effectiveFrom', (q) => q.eq('schemeId', s)).take(50)
      for (const cl of closures) await ctx.db.delete(cl._id)
      await ctx.db.delete(s)
    }
    await ctx.db.delete(args.periodId)
    return { cleaned: true }
  },
})

export const run = action({
  args: {},
  handler: async (ctx) => {
    const ids = await ctx.runMutation(internal.quota.smoke.setupScenario, {})
    const report: { step: string; expected: string; got: unknown; pass: boolean }[] = []
    const check = (step: string, expected: string, got: unknown, pass: boolean) =>
      report.push({ step, expected, got, pass })

    // 1. Weight consume (provisional): 30 of 100 -> remaining 70.
    const r1 = await ctx.runMutation(internal.quota.engine.consume, { catchEventId: ids.c1 })
    check('weight consume 30/100', 'remaining 70, no breach', r1, r1.remaining === 70 && r1.breach === false)

    // 2. Over-cap: +80 -> remaining -10, advisory breach + closure recommended (not blocked).
    const r2 = await ctx.runMutation(internal.quota.engine.consume, { catchEventId: ids.c2 })
    check('weight over-cap +80', 'recorded; remaining -10; breach; closureRecommended', r2, r2.remaining === -10 && r2.breach === true && r2.closureRecommended === true)

    // 3. True-up c1 to verified 25 -> adjustment +5 -> remaining -5.
    const r3 = await ctx.runMutation(internal.quota.engine.trueUpFromCdr, { catchEventId: ids.c1, verifiedWholeWeightKg: 25 })
    check('CDR true-up 30->25', 'remaining -5', r3, !!r3 && r3.remaining === -5)

    // 4. Effort consume: 1 of 10 days -> remaining 9.
    const r4 = await ctx.runMutation(internal.quota.engine.consume, { catchEventId: ids.c3 })
    check('effort consume 1/10 days', 'remaining 9 (vessel_day)', r4, r4.remaining === 9 && r4.unit === 'vessel_day')

    // 5. Transfer 10 from eFrom(50) to eTo(0).
    const r5 = await ctx.runMutation(internal.quota.engine.transferInternal, { fromEntitlementId: ids.eFrom, toEntitlementId: ids.eTo, amount: 10 })
    const bFrom = await ctx.runQuery(internal.quota.engine.balanceOfInternal, { entitlementId: ids.eFrom })
    const bTo = await ctx.runQuery(internal.quota.engine.balanceOfInternal, { entitlementId: ids.eTo })
    check('transfer 10 from(50)->to(0)', 'ok; from 40, to 10', { r5, from: bFrom?.remaining, to: bTo?.remaining }, (r5 as any).ok === true && bFrom?.remaining === 40 && bTo?.remaining === 10)

    // 6. Transfer from a suspended entitlement -> refused.
    const r6 = await ctx.runMutation(internal.quota.engine.transferInternal, { fromEntitlementId: ids.eSuspended, toEntitlementId: ids.eTo, amount: 5 })
    check('transfer from suspended', 'refused: units_suspended', r6, (r6 as any).ok === false && (r6 as any).refusal === 'units_suspended')

    await ctx.runMutation(internal.quota.smoke.cleanupScenario, {
      entitlements: [ids.eWeight, ids.eEffort, ids.eFrom, ids.eTo, ids.eSuspended],
      catches: [ids.c1, ids.c2, ids.c3],
      schemes: [ids.wScheme, ids.efScheme],
      periodId: ids.periodId,
    })

    const passed = report.filter((r) => r.pass).length
    return { passed, total: report.length, allPassed: passed === report.length, report }
  },
})
