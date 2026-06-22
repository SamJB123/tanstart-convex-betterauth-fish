import { defineTable } from 'convex/server'
import { v } from 'convex/values'

// REFERENCE DATA (shared, mirrors the legacy system where rules stay the same).
// Species are keyed off CAAB (Codes for Australian Aquatic Biota), the canonical
// Australian fisheries taxon code system. Dugong/turtle live in the SAME species
// table, distinguished by flags — they play a dual role: traditional catch type
// AND protected-species interaction that must be recorded in commercial logbooks.
export const referenceTables = {
  species: defineTable({
    caabCode: v.string(),
    scientificName: v.string(),
    authority: v.optional(v.string()),
    commonName: v.string(),
    marketingName: v.optional(v.string()),
    family: v.optional(v.string()),
    taxonGroup: v.union(
      v.literal('fish'),
      v.literal('crustacean'),
      v.literal('gastropod'),
      v.literal('bivalve'),
      v.literal('sea_cucumber'),
      v.literal('reptile'),
      v.literal('mammal'),
      v.literal('other'),
    ),
    islanderNames: v.optional(
      v.array(v.object({ language: v.string(), name: v.string() })),
    ),
    isGroupCode: v.optional(v.boolean()), // CAAB codes can represent genus/market groups
    supersededByCaab: v.optional(v.string()),
    takeCategory: v.union(
      v.literal('commercial'),
      v.literal('commercial_quota'),
      v.literal('traditional_only'),
      v.literal('prohibited'),
      v.literal('protected_no_take'),
    ),
    traditionalTakeOnly: v.optional(v.boolean()), // dugong, turtle
    protectedSpecies: v.optional(v.boolean()),
    // de-normalised search field (common + scientific + aliases) for the single
    // full-text searchField; maintain a synonym list (no fuzzy matching).
    searchText: v.optional(v.string()),
    active: v.boolean(),
  })
    .index('by_caabCode', ['caabCode'])
    .index('by_taxonGroup', ['taxonGroup'])
    .searchIndex('search_text', {
      searchField: 'searchText',
      filterFields: ['taxonGroup', 'takeCategory'],
    }),

  // Several species are recorded in more than one unit (count and kg, etc.).
  speciesUnits: defineTable({
    speciesId: v.id('species'),
    unit: v.union(
      v.literal('kg'),
      v.literal('count'),
      v.literal('tails'),
      v.literal('kg_dry'),
      v.literal('quota_units'),
      v.literal('not_quantified'),
    ),
    isPrimary: v.boolean(),
  }).index('by_species', ['speciesId']),

  // One species -> many size rules. Handles the lobster's tail-OR-carapace rule
  // (two alternative measures) and per-species mm limits without overloading.
  sizeLimits: defineTable({
    speciesId: v.id('species'),
    measureType: v.union(
      v.literal('total_length_mm'),
      v.literal('carapace_length_mm'),
      v.literal('tail_length_mm'),
      v.literal('length_cm'),
      v.literal('shell_width_mm'), // trochus: base-of-shell width
      v.literal('shell_length_mm'), // pearl shell: hinge-to-lip
    ),
    minValue: v.optional(v.number()),
    maxValue: v.optional(v.number()),
    sexRestriction: v.optional(v.string()), // e.g. female crab prohibited
    jurisdiction: v.optional(v.string()),
    instrument: v.optional(v.string()),
    effectiveFrom: v.optional(v.number()),
  }).index('by_species', ['speciesId']),

  fisheries: defineTable({
    code: v.string(),
    name: v.string(),
    sector: v.optional(v.string()),
    issuingAuthority: v.union(v.literal('PZJA'), v.literal('AFMA')),
    legislativeBasis: v.optional(v.string()),
    controlMechanism: v.union(
      v.literal('TAC_quota_weight'),
      v.literal('TAE_days_of_effort'),
      v.literal('size_gear_only'),
      v.literal('community_plan'),
    ),
    active: v.boolean(),
  }).index('by_code', ['code']),

  // Spatial management areas. Polygon stored as serialized GeoJSON + a bbox for
  // cheap pre-filtering; live point-in-region lookups use @convex-dev/geospatial.
  zones: defineTable({
    name: v.string(),
    kind: v.union(
      v.literal('tspz'),
      v.literal('management_area'),
      v.literal('closure_area'),
      v.literal('sea_country'),
      v.literal('jurisdiction_line'),
    ),
    fisheryId: v.optional(v.id('fisheries')),
    parentZoneId: v.optional(v.id('zones')),
    // sedentary vs swimming determines which Treaty line governs; for a
    // jurisdiction_line zone, governingLine names which line this is.
    speciesClass: v.optional(
      v.union(v.literal('sedentary'), v.literal('swimming')),
    ),
    governingLine: v.optional(
      v.union(v.literal('seabed'), v.literal('fisheries')), // Annex 5 / Annex 8
    ),
    bbox: v.optional(
      v.object({
        west: v.number(),
        south: v.number(),
        east: v.number(),
        north: v.number(),
      }),
    ),
    geojson: v.optional(v.string()),
    datum: v.optional(v.union(v.literal('AGD84'), v.literal('WGS84'))),
    legalBasis: v.optional(v.string()), // e.g. "Treaty Annex 9"
    sourceRef: v.optional(v.string()),
  })
    .index('by_kind', ['kind'])
    .index('by_fishery', ['fisheryId']),

  // High-churn open/close state, separated from the stable zone profile
  // (Convex guideline). Latest effective row per zone wins.
  zoneStatus: defineTable({
    zoneId: v.id('zones'),
    status: v.union(v.literal('open'), v.literal('closed')),
    reason: v.optional(v.string()),
    gearScope: v.optional(v.string()), // e.g. hookah / moontide sub-closure
    effectiveFrom: v.number(),
    effectiveTo: v.optional(v.number()),
    setByUserId: v.optional(v.id('users')),
  }).index('by_zone_and_effectiveFrom', ['zoneId', 'effectiveFrom']),

  gearTypes: defineTable({
    code: v.string(),
    name: v.string(),
    fisheryId: v.optional(v.id('fisheries')),
  }).index('by_code', ['code']),

  // Season / period: PZJA-determined open/close DATES + AU/PNG split. A recurring
  // daily time-of-day window (e.g. prawn 6pm-6am, set in the Regs/determinations)
  // is a separate constraint from the season dates.
  periods: defineTable({
    fisheryId: v.id('fisheries'),
    label: v.string(), // "2025-26"
    startsAt: v.number(),
    endsAt: v.number(),
    jurisdiction: v.optional(
      v.union(v.literal('AU'), v.literal('PNG'), v.literal('both')),
    ),
    dailyWindowFrom: v.optional(v.string()), // "18:00" (local)
    dailyWindowTo: v.optional(v.string()), // "06:00"
    timezone: v.optional(v.string()), // e.g. "Australia/Brisbane"
    legalBasis: v.optional(v.string()),
  }).index('by_fishery', ['fisheryId']),

  // AU/PNG catch-sharing (Treaty Art 23(4)): shares depend on the jurisdiction
  // context, not a single per-fishery scalar.
  catchShares: defineTable({
    fisheryId: v.id('fisheries'),
    jurisdictionContext: v.union(
      v.literal('au_jurisdiction'), // 75/25
      v.literal('png_jurisdiction'), // 25/75
      v.literal('named_cays'), // 50/50
      v.literal('png_sole'), // e.g. barramundi
    ),
    auPct: v.optional(v.number()),
    pngPct: v.optional(v.number()),
    note: v.optional(v.string()),
    legalBasis: v.optional(v.string()),
  }).index('by_fishery', ['fisheryId']),

  // Logbooks use coarse common-name groups (no CAAB / no AFMA codes). This maps
  // a logbook group label to a CAAB species (or marks it as a multi-taxon group).
  logbookSpeciesAliases: defineTable({
    logbookGroupName: v.string(),
    fisheryId: v.optional(v.id('fisheries')),
    speciesId: v.optional(v.id('species')), // null when the group is multi-taxon
    isGroup: v.boolean(),
    note: v.optional(v.string()),
  })
    .index('by_fishery', ['fisheryId'])
    .index('by_group', ['logbookGroupName']),
}
