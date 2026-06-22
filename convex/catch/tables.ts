import { defineTable } from 'convex/server'
import { v } from 'convex/values'
import {
  geoPoint,
  governanceFields,
  syncFields,
} from '../shared/validators'

// CATCH & EFFORT REPORTING (mobile-first logbook).
// Field set validated against the actual AFMA TSF01 (finfish) + TRL04 (lobster)
// logbooks and the Act/Regs reporting provisions (docs/validation-findings.md):
//  - effort is recorded in HOURS (+ lines / divers), not days
//  - catch/effort is attributed per tender/dinghy and per diver (sub-platform)
//  - weights come in multiple kinds (whole / tails / live / gilled-&-gutted)
//  - every licence-day must be accounted for (non-fishing / nil returns)
//  - logbooks use plain common-name groups (no CAAB/AFMA codes) -> alias layer
//  - reporting is mandatory only where a s.17(1) declaration is in force
export const catchTables = {
  catchEvents: defineTable({
    reporterPartyId: v.id('parties'),
    vesselId: v.optional(v.id('vessels')),
    licenceId: v.optional(v.id('licences')),
    entitlementId: v.optional(v.id('entitlements')), // what this debits (if any)
    fisheryId: v.id('fisheries'),
    occurredAt: v.number(),
    region: v.optional(v.union(v.literal('TS'), v.literal('QLD_EC'))),
    zoneId: v.optional(v.id('zones')),
    location: v.optional(geoPoint), // primary-vessel position; SENSITIVE
    gearTypeId: v.optional(v.id('gearTypes')),
    // weight = debits a weight entitlement; effort = debits an effort entitlement;
    // traditional = uncapped, licence-exempt traditional/cultural take (no debit).
    measureKind: v.union(
      v.literal('weight'),
      v.literal('effort'),
      v.literal('traditional'),
    ),
    effortHours: v.optional(v.number()), // logbook effort (finfish/TRL)
    fishingDaysConsumed: v.optional(v.number()), // prawn effort-quota debit
    culturalPurpose: v.optional(
      v.union(
        v.literal('ceremonial'),
        v.literal('cultural_gathering'),
        v.literal('subsistence'),
        v.literal('barter_exchange'),
      ),
    ),
    tripCode: v.optional(
      v.union(
        v.literal('start'),
        v.literal('continuing'),
        v.literal('end'),
        v.literal('day'),
      ),
    ),
    portOfDeparture: v.optional(v.string()),
    portOfLanding: v.optional(v.string()),
    departureDate: v.optional(v.number()),
    landingDate: v.optional(v.number()),
    // Nil / non-fishing return — every licence-day must be accounted for.
    nonFishingCode: v.optional(
      v.union(
        v.literal('bad_weather'),
        v.literal('in_port'),
        v.literal('broken_down'),
        v.literal('steaming'),
        v.literal('other_fishery'),
      ),
    ),
    nonFishingFrom: v.optional(v.number()),
    nonFishingTo: v.optional(v.number()),
    observerOnBoard: v.optional(v.boolean()),
    status: v.union(
      v.literal('draft'),
      v.literal('submitted'),
      v.literal('verified'),
      v.literal('disputed'),
      v.literal('reconciled'),
    ),
    mediaStorageIds: v.optional(v.array(v.id('_storage'))), // catch photos
    audioStorageId: v.optional(v.id('_storage')), // voice log (Yumplatok)
    // AI outputs are DRAFTS requiring human confirmation, never auto-submitted.
    aiAssist: v.optional(
      v.object({
        speciesSuggestionCaab: v.optional(v.string()),
        transcriptionRef: v.optional(v.string()),
        confidence: v.optional(v.number()),
      }),
    ),
    submittedAt: v.optional(v.number()),
    ...syncFields,
    ...governanceFields,
  })
    .index('by_reporter', ['reporterPartyId'])
    .index('by_fishery_and_occurredAt', ['fisheryId', 'occurredAt'])
    .index('by_zone', ['zoneId'])
    .index('by_clientId', ['clientId'])
    .index('by_syncStatus', ['syncStatus']),

  // Per-species, per-platform detail. Catch and effort are attributed per
  // tender/dinghy and (for TRL) per diver — the sub-platform grain.
  catchLines: defineTable({
    catchEventId: v.id('catchEvents'),
    speciesId: v.id('species'),
    platform: v.optional(
      v.union(
        v.literal('primary'),
        v.literal('tender'),
        v.literal('dinghy'),
      ),
    ),
    platformNumber: v.optional(v.number()), // tender/dinghy 1..6
    diverNumber: v.optional(v.number()),
    method: v.optional(
      v.union(
        v.literal('handline'),
        v.literal('troll'),
        v.literal('dropline'),
        v.literal('hookah'),
        v.literal('free_dive'),
        v.literal('net'),
        v.literal('other'),
      ),
    ),
    hoursFishing: v.optional(v.number()),
    quantity: v.optional(v.number()),
    unit: v.optional(
      v.union(
        v.literal('kg'),
        v.literal('count'),
        v.literal('tails'),
        v.literal('kg_dry'),
        v.literal('cartons'),
      ),
    ),
    // Multiple coexisting weight kinds (not interchangeable).
    wholeWeightKg: v.optional(v.number()),
    tailWeightKg: v.optional(v.number()),
    liveWeightKg: v.optional(v.number()),
    gilledGuttedKg: v.optional(v.number()),
    // Carton/tray aggregation (mackerel, coral trout).
    cartons: v.optional(v.number()),
    avgKgPerCarton: v.optional(v.number()),
    fishPerCarton: v.optional(v.number()),
    // Coral-trout grade + sub-species split.
    sizeGrade: v.optional(
      v.union(v.literal('plate'), v.literal('medium'), v.literal('large')),
    ),
    speciesSplit: v.optional(v.record(v.string(), v.number())),
    formCode: v.optional(v.string()), // F / W / HG / GG processing state
    retainedCount: v.optional(v.number()),
    discardedCount: v.optional(v.number()),
    sizeValue: v.optional(v.number()),
    isTraditionalTake: v.optional(v.boolean()),
  })
    .index('by_catchEvent', ['catchEventId'])
    .index('by_species', ['speciesId']),

  // TEP interactions — one row per individual animal (per the logbook form).
  protectedSpeciesInteractions: defineTable({
    catchEventId: v.id('catchEvents'),
    speciesId: v.id('species'),
    interactionType: v.union(
      v.literal('sighted'),
      v.literal('caught'),
      v.literal('released'),
      v.literal('taken_traditional'),
    ),
    interactionTime: v.optional(v.number()),
    location: v.optional(geoPoint),
    caughtPhase: v.optional(
      v.union(v.literal('haul'), v.literal('set'), v.literal('other')),
    ),
    hookedOrEntangled: v.optional(
      v.union(v.literal('hooked'), v.literal('entangled')),
    ),
    lifeStatus: v.optional(
      v.union(v.literal('alive'), v.literal('dead'), v.literal('injured')),
    ),
    bandTagNumber: v.optional(v.string()),
    observerOnBoard: v.optional(v.boolean()),
    count: v.optional(v.number()), // denormalised convenience
    notes: v.optional(v.string()),
  }).index('by_catchEvent', ['catchEventId']),

  // CDR Part C equivalent — OPTIONAL in TS (no standalone Catch Disposal Record;
  // disposal is captured in the logbook). Receiver-licence-linked verification.
  catchVerifications: defineTable({
    catchLineId: v.id('catchLines'),
    receiverPartyId: v.id('parties'),
    receiverLicenceId: v.optional(v.id('licences')),
    verifiedKg: v.number(),
    unloadPort: v.optional(v.string()),
    verifiedAt: v.number(),
  }).index('by_catchLine', ['catchLineId']),
}
