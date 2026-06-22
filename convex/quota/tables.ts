import { defineTable } from 'convex/server'
import { v } from 'convex/values'
import {
  governanceFields,
  measureType,
  measureValidator,
} from '../shared/validators'

// QUOTA / ENTITLEMENT — the polymorphic core.
// Pattern: a generic Entitlement carries a discriminated-union Measure (weight |
// effort); an append-only LedgerEntry stream records allocation/consumption/
// transfer; Balance is a signed FOLD over the ledger (never mutated in place).
// Real sums are maintained with @convex-dev/aggregate. Validated against the TS
// TRL Quota Plan 2018 + Prawn Plan 2009 (see docs/validation-findings.md):
//  - NO over-quota reconciliation window (over-quota is an offence + forfeiture)
//  - ZERO carryover between seasons
//  - the Traditional-Inhabitant sector is a TSRA-held COMPETITIVE POOL closed by
//    notice when reached; TVH holders hold individual quota units.
export const quotaTables = {
  // A scheme = how an entitlement is measured & consumed for a fishery+period.
  quotaSchemes: defineTable({
    fisheryId: v.id('fisheries'),
    periodId: v.id('periods'),
    name: v.string(),
    measure: measureValidator,
    totalUnits: v.optional(v.number()), // fixed units on issue (e.g. TRL 1,000,000)
    // Over-quota in TS law is an offence, not a balance to true up.
    overQuotaPolicy: v.union(
      v.literal('hard_stop'), // individual ITQ: cannot exceed remaining units
      v.literal('competitive_closure'), // pooled sector: closure notice when reached
    ),
  })
    .index('by_fishery', ['fisheryId'])
    .index('by_period', ['periodId']),

  // Closure-notice state for a competitive/pooled sector (mirrors zoneStatus:
  // append a row; latest per (scheme, sector) wins). e.g. TRL TI-sector closure.
  quotaClosures: defineTable({
    schemeId: v.id('quotaSchemes'),
    sector: v.optional(v.string()),
    status: v.union(v.literal('open'), v.literal('closed')),
    reason: v.optional(v.string()),
    effectiveFrom: v.number(),
    effectiveTo: v.optional(v.number()),
    setByUserId: v.optional(v.id('users')),
  }).index('by_scheme_and_effectiveFrom', ['schemeId', 'effectiveFrom']),

  // HYBRID holding: exactly one of holderPartyId / communityId is set. The
  // holder may be an individual, a group, or an agency (TSRA holds the TI-sector
  // pool). Native-title (traditional) take is NOT an entitlement — it is an
  // eligibility check (see DESIGN.md) — so all entitlements here are commercial.
  entitlements: defineTable({
    schemeId: v.id('quotaSchemes'),
    fisheryId: v.id('fisheries'), // denormalised for querying
    periodId: v.id('periods'),
    holderPartyId: v.optional(v.id('parties')),
    communityId: v.optional(v.id('communities')),
    sector: v.optional(
      v.union(
        v.literal('traditional_inhabitant'),
        v.literal('tvh'),
        v.literal('sunset'), // non-TI temporary access (Finfish/Mackerel)
        v.literal('png'),
        v.literal('other'),
      ),
    ),
    allocationModel: v.union(
      v.literal('individual'), // individual transferable quota units
      v.literal('pooled_competitive'), // sector pool, closed by notice
    ),
    measureType, // mirror of measure.kind for indexing
    unit: v.string(), // mirror of measure unit for queries
    unitsHeld: v.optional(v.number()), // permanent share (quota / effort units)
    allowance: v.union(v.number(), v.null()), // derived seasonal allowance
    status: v.union(
      v.literal('applied'),
      v.literal('active'),
      v.literal('suspended'),
      v.literal('exhausted'),
      v.literal('expired'),
      v.literal('cancelled'),
    ),
    // Quota units have their own lifecycle (TRL s.28: auto-suspend with licence;
    // cancel on conviction; suspend for unpaid fees).
    unitStatus: v.optional(
      v.union(
        v.literal('active'),
        v.literal('suspended'),
        v.literal('cancelled'),
      ),
    ),
    isTreatyTrust: v.optional(v.boolean()), // PNG units held in trust under the Treaty
    // For a pooled_competitive sector: the seasonal kg cap = sectorSharePct × TAC
    // (e.g. TRL TIB sector = 0.6617, Management Instrument s.4A). This is distinct
    // from unitsHeld (the permanent quota-unit holding). Recompute against the
    // current TAC; do not persist the derived kg figure as a constant.
    sectorSharePct: v.optional(v.number()),
    validFrom: v.optional(v.number()),
    validTo: v.optional(v.number()),
    transferable: v.boolean(),
    legislativeBasis: v.optional(v.string()),
    conditions: v.optional(v.array(v.string())),
    ...governanceFields,
  })
    .index('by_holder', ['holderPartyId'])
    .index('by_community', ['communityId'])
    .index('by_scheme', ['schemeId'])
    .index('by_fishery_and_period', ['fisheryId', 'periodId']),

  // Append-only. Balance = sum of signed `quantity`. Never mutate; corrections
  // are new `adjustment` entries referencing `reversedByEntryId`. No carryover /
  // reconciliation entry types — TS entitlements reset each season.
  ledgerEntries: defineTable({
    entitlementId: v.id('entitlements'),
    type: v.union(
      v.literal('allocation'),
      v.literal('consumption'),
      v.literal('lease_in'),
      v.literal('lease_out'),
      v.literal('transfer_in'),
      v.literal('transfer_out'),
      v.literal('adjustment'),
    ),
    quantity: v.number(), // signed, in the entitlement's unit (kg | days)
    occurredAt: v.number(),
    speciesId: v.optional(v.id('species')), // weight: per-species
    source: v.object({
      kind: v.union(
        v.literal('CDR'),
        v.literal('VMS_day'),
        v.literal('logbook'),
        v.literal('transfer_form'),
        v.literal('manual'),
      ),
      ref: v.optional(v.string()),
      verifiedByPartyId: v.optional(v.id('parties')),
    }),
    // Weight audit trail: deducted WWE differs from landed (processed) weight.
    rawWeight: v.optional(v.number()),
    processingState: v.optional(v.string()),
    conversionFactor: v.optional(v.number()),
    catchEventId: v.optional(v.id('catchEvents')),
    reversedByEntryId: v.optional(v.id('ledgerEntries')),
  })
    .index('by_entitlement_and_occurredAt', ['entitlementId', 'occurredAt'])
    .index('by_catchEvent', ['catchEventId']),

  // Denormalised fold cache (authoritative sums via the aggregate component).
  balances: defineTable({
    entitlementId: v.id('entitlements'),
    speciesId: v.optional(v.id('species')),
    allocated: v.number(),
    consumed: v.number(),
    netTransfers: v.number(),
    remaining: v.number(),
    overQuota: v.number(), // max(0, -remaining) -> compliance breach indicator
  }).index('by_entitlement', ['entitlementId']),
}
