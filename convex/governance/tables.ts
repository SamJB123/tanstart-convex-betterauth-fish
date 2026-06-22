import { defineTable } from 'convex/server'
import { v } from 'convex/values'

// GOVERNANCE (cross-cutting) — Indigenous data sovereignty (CARE / NIAA).
// Supports transparency ("what AFMA holds about me", and who accessed it), a
// general audit trail, and — the priority/scrutiny area — a CARE-aligned
// CONSENT model for assisted (delegate-lodged) applications. Grounded in the
// CARE Principles, the NIAA Framework for Governance of Indigenous Data (GID,
// May 2024), the AIATSIS Code of Ethics, and Maiam nayri Wingara IDSov
// principles (see docs/validation-findings.md "Consent & Indigenous data
// governance").

// --- Consent vocabulary (exported; reused by governance/consent.ts) ----------

// Two DISTINCT asks, never bundled, each independently revocable:
//   delegate_authority — "X may act on my behalf for this application"
//   data_use           — "AFMA may collect & use my (Indigenous) data for this"
export const consentType = v.union(
  v.literal('delegate_authority'),
  v.literal('data_use'),
)

// State machine. A delegate-created grant is `pending` and has ZERO data effect
// until the rights-holder personally confirms. `revoked`/`declined`/`expired`
// are terminal.
export const consentStatus = v.union(
  v.literal('pending'),
  v.literal('confirmed'),
  v.literal('revoked'),
  v.literal('declined'),
  v.literal('expired'),
)

// The delegate's stated relationship to the fisher (decision: anyone signed in
// may delegate, but the relationship is recorded for accountability).
export const delegateRelationship = v.union(
  v.literal('self'),
  v.literal('family'),
  v.literal('community_worker'),
  v.literal('agent'), // e.g. TSRA / Gur A Baradharaw Kod worker
  v.literal('officer'), // AFMA officer assisting
  v.literal('other'),
)

// How the rights-holder's personal confirmation was captured. `in_person` /
// `interpreter_assisted` cover the (common) case of no email — the fisher still
// authenticates as themselves on a shared device; the delegate never confirms.
export const confirmedVia = v.union(
  v.literal('email'),
  v.literal('in_person'),
  v.literal('interpreter_assisted'),
  v.literal('self_account'),
)

// Which modality the consent was shown in — evidence it was genuinely informed
// (Yumplatok is primarily oral; written English alone is insufficient).
export const languageShown = v.union(
  v.literal('en_plain'),
  v.literal('yumplatok_audio'),
  v.literal('interpreter'),
)

// Audit action vocabulary for the append-only access log.
export const accessAction = v.union(
  v.literal('view'),
  v.literal('edit'),
  v.literal('export'),
  v.literal('consent_request'),
  v.literal('consent_confirm'),
  v.literal('consent_decline'),
  v.literal('consent_revoke'),
  v.literal('disclose'),
  v.literal('lodge'),
)

export const governanceTables = {
  auditLog: defineTable({
    actorUserId: v.optional(v.id('users')),
    action: v.string(),
    entityTable: v.string(),
    entityId: v.optional(v.string()),
    at: v.number(),
    purpose: v.optional(v.string()),
  })
    .index('by_entity', ['entityTable', 'entityId'])
    .index('by_actor', ['actorUserId']),

  // Who accessed a person's data, when, why, and what. APPEND-ONLY: only insert
  // mutations are ever exposed on this table (never update/delete) so it stays
  // trustworthy as evidence. Powers the NIAA-G3 "what is held about me / who
  // accessed it" transparency view (CARE "Authority to Control").
  dataAccessLog: defineTable({
    subjectPartyId: v.id('parties'),
    accessedByUserId: v.optional(v.id('users')),
    entityTable: v.string(),
    at: v.number(),
    reason: v.optional(v.string()),
    // Added for the consent model (all optional → backward compatible):
    action: v.optional(accessAction),
    purposeId: v.optional(v.id('purposes')),
    dataCategories: v.optional(v.array(v.string())),
  }).index('by_subject', ['subjectPartyId']),

  // Purpose specification + data minimisation in one place (CARE E1/E3). Every
  // consent links to exactly one purpose. `allowsSecondaryUse` defaults false —
  // any new purpose requires fresh consent.
  purposes: defineTable({
    code: v.string(), // e.g. 'licence_application'
    plainEnglish: v.string(),
    yumplatokAudioRef: v.optional(v.string()), // storage id / url, wired later
    dataCategories: v.array(v.string()),
    retentionNote: v.optional(v.string()),
    allowsSecondaryUse: v.boolean(),
  }).index('by_code', ['code']),

  // One row per distinct consent ask. The heart of the CARE model.
  consentGrants: defineTable({
    fisherPartyId: v.id('parties'), // the rights-holder
    fisherUserId: v.optional(v.id('users')), // set when they confirm via their account
    delegateUserId: v.optional(v.id('users')), // who initiated (null if self-served)
    delegatePartyId: v.optional(v.id('parties')),
    // Denormalised so the fisher's confirmation screen can show WHO is asking
    // without a cross-party read (parties is RLS-restricted; the fisher can't
    // necessarily read the delegate's party row).
    delegateName: v.optional(v.string()),
    relationship: delegateRelationship,
    consentType,
    purposeId: v.id('purposes'),
    scope: v.array(v.string()), // data categories covered (minimised)
    communityId: v.optional(v.id('communities')), // community hook (notified on lodge)
    status: consentStatus,
    requestedAt: v.number(),
    confirmedAt: v.optional(v.number()),
    confirmedVia: v.optional(confirmedVia),
    revokedAt: v.optional(v.number()),
    revocationReason: v.optional(v.string()),
    languageShown: v.optional(languageShown),
    consentTextVersion: v.string(), // exact wording shown — reproducible evidence
    expiresAt: v.optional(v.number()),
  })
    .index('by_fisherParty', ['fisherPartyId'])
    .index('by_fisherParty_and_type', ['fisherPartyId', 'consentType'])
    .index('by_delegateUser', ['delegateUserId'])
    .index('by_status', ['status']),
}
