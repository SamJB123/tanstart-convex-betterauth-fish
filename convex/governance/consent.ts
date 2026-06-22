import { v } from 'convex/values'
import { internalMutation } from '../_generated/server'
import type { MutationCtx, QueryCtx } from '../_generated/server'
import type { Id } from '../_generated/dataModel'
import { authedMutation, authedQuery, type Viewer } from '../rbac'
import {
  confirmedVia as confirmedViaV,
  delegateRelationship,
  languageShown as languageShownV,
} from './tables'

// CARE-aligned consent for assisted (delegate-lodged) applications.
//
// Design rules (docs/validation-findings.md "Consent & Indigenous data
// governance"), all enforced here:
//  - TWO granular asks (delegate_authority + data_use), independently confirmable
//    and revocable — never bundled.
//  - A delegate-created grant is `pending` and has ZERO data effect. Only the
//    rights-holder, authenticated as THEMSELVES, can confirm it — the delegate
//    cannot (the `fisherPartyId === caller.party._id` gate below).
//  - Every consent event writes the APPEND-ONLY `dataAccessLog` (no update/delete
//    is ever exposed on it), powering the NIAA-G3 transparency view.
//  - Data-use code paths (e.g. lodging) guard on `hasConfirmedConsent(...,
//    'data_use')`; revocation flips that to false immediately.
//
// Logic lives in `*Impl` helpers that take an explicit `Viewer`, so it's
// exercised end-to-end by governance/consentSmoke.ts without an auth context
// (the same impl + thin-wrapper pattern the quota engine uses).

type Db = MutationCtx['db']
type AccessAction =
  | 'view' | 'edit' | 'export'
  | 'consent_request' | 'consent_confirm' | 'consent_decline' | 'consent_revoke'
  | 'disclose' | 'lodge'

async function logAccess(
  db: Db,
  e: {
    subjectPartyId: Id<'parties'>
    accessedByUserId?: Id<'users'>
    entityTable: string
    action: AccessAction
    purposeId?: Id<'purposes'>
    dataCategories?: string[]
    reason?: string
  },
): Promise<void> {
  await db.insert('dataAccessLog', { at: Date.now(), ...e })
}

// --- The data-use gate (server helper) --------------------------------------
// True iff a CONFIRMED, non-revoked, non-expired grant of `type` exists for the
// fisher. The lodge path (Step D) guards on this. A plain async function (not a
// registered query) so any query/mutation can call it directly.
export async function hasConfirmedConsent(
  ctx: QueryCtx,
  fisherPartyId: Id<'parties'>,
  type: 'delegate_authority' | 'data_use',
): Promise<boolean> {
  const grants = await ctx.db
    .query('consentGrants')
    .withIndex('by_fisherParty_and_type', (q) =>
      q.eq('fisherPartyId', fisherPartyId).eq('consentType', type),
    )
    .take(50)
  const now = Date.now()
  return grants.some(
    (g) => g.status === 'confirmed' && (g.expiresAt == null || g.expiresAt > now),
  )
}

// --- Impl helpers (explicit viewer; smoke-testable) -------------------------

type Relationship = 'self' | 'family' | 'community_worker' | 'agent' | 'officer' | 'other'
type ConfirmedVia = 'email' | 'in_person' | 'interpreter_assisted' | 'self_account'
type LanguageShown = 'en_plain' | 'yumplatok_audio' | 'interpreter'

export async function requestConsentImpl(
  ctx: MutationCtx,
  delegate: Viewer,
  args: {
    fisherPartyId: Id<'parties'>
    relationship: Relationship
    purposeCode: string
    scope: string[]
    communityId?: Id<'communities'>
    consentTextVersion: string
    languageShown?: LanguageShown
  },
): Promise<{ delegateAuthorityId: Id<'consentGrants'>; dataUseId: Id<'consentGrants'> }> {
  const purpose = await ctx.db
    .query('purposes')
    .withIndex('by_code', (q) => q.eq('code', args.purposeCode))
    .unique()
  if (!purpose) {
    throw new Error(`Unknown consent purpose "${args.purposeCode}". Seed purposes first.`)
  }
  const base = {
    fisherPartyId: args.fisherPartyId,
    delegateUserId: delegate.user._id,
    delegatePartyId: delegate.party._id,
    delegateName: delegate.party.displayName,
    relationship: args.relationship,
    purposeId: purpose._id,
    scope: args.scope,
    communityId: args.communityId,
    status: 'pending' as const,
    requestedAt: Date.now(),
    consentTextVersion: args.consentTextVersion,
    languageShown: args.languageShown,
  }
  const delegateAuthorityId = await ctx.db.insert('consentGrants', {
    ...base,
    consentType: 'delegate_authority' as const,
  })
  const dataUseId = await ctx.db.insert('consentGrants', {
    ...base,
    consentType: 'data_use' as const,
  })
  await logAccess(ctx.db, {
    subjectPartyId: args.fisherPartyId,
    accessedByUserId: delegate.user._id,
    entityTable: 'consentGrants',
    action: 'consent_request',
    purposeId: purpose._id,
    dataCategories: args.scope,
    reason: `Consent requested by ${delegate.party.displayName} (${args.relationship})`,
  })
  return { delegateAuthorityId, dataUseId }
}

export async function confirmConsentImpl(
  ctx: MutationCtx,
  caller: Viewer,
  grantId: Id<'consentGrants'>,
  via: ConfirmedVia,
): Promise<Id<'consentGrants'>> {
  const grant = await ctx.db.get(grantId)
  if (!grant) throw new Error('Consent request not found.')
  // THE GATE: only the rights-holder, authenticated as themselves, may confirm.
  if (grant.fisherPartyId !== caller.party._id) {
    throw new Error('Only the person themselves can confirm their consent.')
  }
  if (grant.status !== 'pending') throw new Error(`This consent is already ${grant.status}.`)
  await ctx.db.patch(grantId, {
    status: 'confirmed',
    confirmedAt: Date.now(),
    confirmedVia: via,
    fisherUserId: caller.user._id,
  })
  await logAccess(ctx.db, {
    subjectPartyId: grant.fisherPartyId,
    accessedByUserId: caller.user._id,
    entityTable: 'consentGrants',
    action: 'consent_confirm',
    purposeId: grant.purposeId,
    reason: `Consent (${grant.consentType}) personally confirmed via ${via}`,
  })
  return grantId
}

export async function declineConsentImpl(
  ctx: MutationCtx,
  caller: Viewer,
  grantId: Id<'consentGrants'>,
): Promise<Id<'consentGrants'>> {
  const grant = await ctx.db.get(grantId)
  if (!grant) throw new Error('Consent request not found.')
  if (grant.fisherPartyId !== caller.party._id) {
    throw new Error('Only the person themselves can decline their consent.')
  }
  if (grant.status !== 'pending') throw new Error(`This consent is already ${grant.status}.`)
  await ctx.db.patch(grantId, { status: 'declined' })
  await logAccess(ctx.db, {
    subjectPartyId: grant.fisherPartyId,
    accessedByUserId: caller.user._id,
    entityTable: 'consentGrants',
    action: 'consent_decline',
    purposeId: grant.purposeId,
    reason: `Consent (${grant.consentType}) declined`,
  })
  return grantId
}

export async function revokeConsentImpl(
  ctx: MutationCtx,
  caller: Viewer,
  grantId: Id<'consentGrants'>,
  reason?: string,
): Promise<Id<'consentGrants'>> {
  const grant = await ctx.db.get(grantId)
  if (!grant) throw new Error('Consent not found.')
  // Revocation must be as easy as granting, and only the rights-holder can do it.
  if (grant.fisherPartyId !== caller.party._id) {
    throw new Error('Only the person themselves can withdraw their consent.')
  }
  if (grant.status !== 'confirmed') {
    throw new Error(`Only a confirmed consent can be withdrawn (this is ${grant.status}).`)
  }
  await ctx.db.patch(grantId, {
    status: 'revoked',
    revokedAt: Date.now(),
    revocationReason: reason,
  })
  await logAccess(ctx.db, {
    subjectPartyId: grant.fisherPartyId,
    accessedByUserId: caller.user._id,
    entityTable: 'consentGrants',
    action: 'consent_revoke',
    purposeId: grant.purposeId,
    reason: reason ? `Withdrawn: ${reason}` : 'Consent withdrawn',
  })
  // Downstream data-use gates check for a CONFIRMED grant, so this immediately
  // stops further use. Flagging dependent in-flight applications happens at the
  // lodge gate (Step D).
  return grantId
}

// --- Public functions (thin auth wrappers) ----------------------------------

// A delegate requests consent from a fisher. Anyone signed in may delegate
// (relationship is recorded). Creates the two pending grants.
export const requestConsent = authedMutation({
  args: {
    fisherPartyId: v.id('parties'),
    relationship: delegateRelationship,
    purposeCode: v.string(),
    scope: v.array(v.string()),
    communityId: v.optional(v.id('communities')),
    consentTextVersion: v.string(),
    languageShown: v.optional(languageShownV),
  },
  handler: (ctx, args) => requestConsentImpl(ctx, ctx.viewer, args),
})

// The fisher personally confirms one grant (granular — one call per ask).
export const confirmConsent = authedMutation({
  args: { grantId: v.id('consentGrants'), via: confirmedViaV },
  handler: (ctx, args) => confirmConsentImpl(ctx, ctx.viewer, args.grantId, args.via),
})

export const declineConsent = authedMutation({
  args: { grantId: v.id('consentGrants') },
  handler: (ctx, args) => declineConsentImpl(ctx, ctx.viewer, args.grantId),
})

export const revokeConsent = authedMutation({
  args: { grantId: v.id('consentGrants'), reason: v.optional(v.string()) },
  handler: (ctx, args) => revokeConsentImpl(ctx, ctx.viewer, args.grantId, args.reason),
})

// The fisher's "you've been asked to confirm" inbox — pending grants for them.
export const myPendingConsents = authedQuery({
  args: {},
  handler: async (ctx) => {
    const grants = await ctx.db
      .query('consentGrants')
      .withIndex('by_fisherParty', (q) => q.eq('fisherPartyId', ctx.viewer.party._id))
      .order('desc')
      .take(50)
    const pending = grants.filter((g) => g.status === 'pending')
    return Promise.all(
      pending.map(async (g) => ({
        ...g,
        purpose: await ctx.db.get(g.purposeId),
      })),
    )
  },
})

// Consent state for a fisher — visible to the fisher, a delegate on the grants,
// or a regulator. Lets a delegate see whether they may lodge yet.
export const consentStateFor = authedQuery({
  args: { fisherPartyId: v.id('parties') },
  handler: async (ctx, args) => {
    const grants = await ctx.db
      .query('consentGrants')
      .withIndex('by_fisherParty', (q) => q.eq('fisherPartyId', args.fisherPartyId))
      .order('desc')
      .take(50)
    const isFisher = ctx.viewer.party._id === args.fisherPartyId
    const isDelegate = grants.some((g) => g.delegateUserId === ctx.viewer.user._id)
    if (!isFisher && !isDelegate && !ctx.viewer.isRegulator) {
      throw new Error('Not authorised to view this consent state.')
    }
    return grants
  },
})

// NIAA-G3 transparency: "what is held about me, and who accessed it" — the
// viewer's own access log + their consents.
export const transparencyView = authedQuery({
  args: {},
  handler: async (ctx) => {
    const accessLog = await ctx.db
      .query('dataAccessLog')
      .withIndex('by_subject', (q) => q.eq('subjectPartyId', ctx.viewer.party._id))
      .order('desc')
      .take(100)
    const consents = await ctx.db
      .query('consentGrants')
      .withIndex('by_fisherParty', (q) => q.eq('fisherPartyId', ctx.viewer.party._id))
      .order('desc')
      .take(50)
    return { accessLog, consents }
  },
})

// Seed the licensing purpose (idempotent). Run once: `npx convex run
// governance/consent:seedPurposes`.
export const seedPurposes = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query('purposes')
      .withIndex('by_code', (q) => q.eq('code', 'licence_application'))
      .unique()
    if (existing) return existing._id
    return await ctx.db.insert('purposes', {
      code: 'licence_application',
      plainEnglish: 'To look at and decide your fishing licence application.',
      dataCategories: ['name', 'contact', 'community', 'traditional_inhabitant_status'],
      retentionNote: 'Kept only as long as needed for licensing and AFMA records.',
      allowsSecondaryUse: false,
    })
  },
})
