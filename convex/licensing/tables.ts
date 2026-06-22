import { defineTable } from 'convex/server'
import { v } from 'convex/values'
import { channel, governanceFields, syncFields } from '../shared/validators'
import { delegateRelationship } from '../governance/tables'

// LICENSING & PERMITS.
// The paper -> digital target. Validated against the Torres Strait Fisheries Act
// 1984 (see docs/validation-findings.md):
//  - Licences are the s.19 family (NOT "TIB"/"TVH", which are SECTOR attributes).
//  - Issuer = PZJA; AFMA administers under delegation (s.38).
//  - "community fishing" = COMMERCIAL fishing by Traditional Inhabitants (not the
//    native-title right). Traditional fishing is licence-EXEMPT.
//  - Per-licence "entries" (s.21) extend a licence to otherwise-prohibited
//    fish/areas; distinct from the s.20 Treaty (PNG) endorsement licence.

// Sector / holder classification layered on top of a licence (not a licence type).
const sector = v.union(
  v.literal('traditional_inhabitant'), // "TIB" sector
  v.literal('tvh'), // transferable vessel holder (non-TI commercial)
  v.literal('png'), // Treaty-endorsed PNG
  v.literal('none'),
)

const holderType = v.union(
  v.literal('individual'),
  v.literal('group'), // a group representing traditional inhabitants
  v.literal('agency'),
)

// The three eligibility criteria from the real Traditional Inhabitant
// Identification Form (PZJA; see docs/validation-findings.md §2.1).
export const tiCriterion = v.union(
  v.literal('tsi_resident_citizen'), // (a) TSI resident + Australian citizen
  v.literal('aboriginal_ts_npa'), // (b) Aboriginal traditional inhabitant of TS/NPA
  v.literal('png_amnesty_or_descendant'), // (c) PNG amnesty-list citizen, or descendant
)
// The Mayor must independently know the applicant OR have sighted evidence —
// they cannot rely solely on the Councillor's declaration (form rule).
export const mayorBasis = v.union(
  v.literal('known_n_years'),
  v.literal('sighted_documentation'),
)

export const licensingTables = {
  // Statutory licence types, keyed by the Act subsection that creates them.
  licenceTypes: defineTable({
    code: v.union(
      v.literal('s19_1_master_fisherman'),
      v.literal('s19_2_boat_commercial'),
      v.literal('s19_3_carrier_processing'), // formerly "Carrier Boat" / Plan "TPC"
      v.literal('s19_4a_non_boat_commercial'), // diving / hand-collection
      v.literal('s19_4b_fish_receiver'),
      v.literal('s20_treaty_endorsement'), // endorsement of a PNG licence
      v.literal('s12_scientific_permit'),
    ),
    statutoryRef: v.string(), // e.g. "s19(2)"
    name: v.string(),
    description: v.optional(v.string()),
    requiresTraditionalInhabitant: v.boolean(),
    grantableToGroup: v.boolean(),
    transferRule: v.union(
      v.literal('none'),
      v.literal('permanent'),
      v.literal('temporary_only'), // e.g. Sunset (temp, once)
      v.literal('permanent_and_temporary'),
    ),
    // Some licences exist only as a management-plan variant (e.g. "Sunset" in the
    // Finfish Plan) rather than a base statutory type.
    planVariantName: v.optional(v.string()),
  }).index('by_code', ['code']),

  // The application workflow (replaces the Torres Strait paper process).
  applications: defineTable({
    applicantPartyId: v.id('parties'),
    licenceTypeId: v.id('licenceTypes'),
    sector: v.optional(sector),
    holderType: v.optional(holderType),
    communityId: v.optional(v.id('communities')),
    status: v.union(
      v.literal('draft'),
      v.literal('submitted'),
      v.literal('under_review'),
      v.literal('info_requested'),
      v.literal('granted'),
      v.literal('refused'),
      v.literal('withdrawn'),
    ),
    channel,
    requestedFisheryIds: v.optional(v.array(v.id('fisheries'))),
    requestedVesselId: v.optional(v.id('vessels')),
    // Eligibility attestation (Councillor + Mayor sign-off) — RESTRICTED data.
    eligibilityEvidence: v.optional(
      v.object({
        councillorName: v.optional(v.string()),
        mayorName: v.optional(v.string()),
        councilName: v.optional(v.string()),
        attestationStorageId: v.optional(v.id('_storage')),
      }),
    ),
    attachmentStorageIds: v.optional(v.array(v.id('_storage'))),
    audioStorageId: v.optional(v.id('_storage')), // voice-assisted application
    // ── On-behalf-of (assisted lodging) ──
    // The applicant is the FISHER's party (applicantPartyId above); when a
    // delegate lodges, they're recorded here. Gated on the fisher's confirmed
    // consent (see applications.ts).
    lodgedByUserId: v.optional(v.id('users')),
    lodgedByPartyId: v.optional(v.id('parties')),
    lodgedByRelationship: v.optional(delegateRelationship),
    // Link to the structured Traditional Inhabitant Identification (eligibility).
    tiVerificationId: v.optional(v.id('traditionalInhabitantVerifications')),
    submittedAt: v.optional(v.number()),
    decisionAt: v.optional(v.number()),
    decidedByUserId: v.optional(v.id('users')),
    ...syncFields,
    ...governanceFields,
  })
    .index('by_applicant', ['applicantPartyId'])
    .index('by_status', ['status'])
    .index('by_clientId', ['clientId'])
    .index('by_lodgedBy', ['lodgedByUserId']),

  // Traditional Inhabitant Identification — the structured form a FIRST-TIME TIB
  // applicant lodges to be recognised as a Traditional Inhabitant. Modelled 1:1
  // on the real PZJA ID Form (docs/validation-findings.md §2.1): two declarations
  // (Councillor + Mayor of the SAME Council), one of three criteria, conditional
  // evidence. A precondition to the licence application. RESTRICTED data.
  traditionalInhabitantVerifications: defineTable({
    applicantPartyId: v.id('parties'),
    applicationId: v.optional(v.id('applications')),
    // Applicant block (mirrors the form).
    placeOfBirth: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()), // ISO date
    postalAddress: v.optional(v.string()),
    residentialAddress: v.optional(v.string()), // must be non-PO-box (UI-validated)
    criterion: tiCriterion,
    isDescendant: v.optional(v.boolean()), // criterion (c) descendant sub-path
    // First identifying person — Councillor.
    councillor: v.optional(
      v.object({
        name: v.string(),
        council: v.string(),
        yearsKnown: v.optional(v.number()),
        signedAt: v.optional(v.number()),
      }),
    ),
    // Second identifying person — Mayor (must be the SAME Council; enforced in code).
    mayor: v.optional(
      v.object({
        name: v.string(),
        council: v.string(),
        basis: mayorBasis,
        yearsKnown: v.optional(v.number()),
        signedAt: v.optional(v.number()),
      }),
    ),
    // Evidence + the signed form, in native Convex _storage.
    attestationStorageId: v.optional(v.id('_storage')), // photo of the signed ID form
    familyTreeStorageId: v.optional(v.id('_storage')), // (a)/(b): may be requested
    residencyEvidenceStorageId: v.optional(v.id('_storage')),
    homeAffairsLetterStorageId: v.optional(v.id('_storage')), // (c): REQUIRED
    birthCertificateStorageId: v.optional(v.id('_storage')), // (c) descendant: REQUIRED
    // Declarations (s.136.1 Criminal Code truthfulness on the real form).
    applicantDeclarationAccepted: v.optional(v.boolean()),
    // attested = both signatories done; pending_pzja = lodged; PZJA decides.
    status: v.union(
      v.literal('draft'),
      v.literal('attested'),
      v.literal('pending_pzja'),
      v.literal('approved'),
      v.literal('rejected'),
    ),
    ...syncFields,
    ...governanceFields,
  })
    .index('by_applicant', ['applicantPartyId'])
    .index('by_application', ['applicationId'])
    .index('by_clientId', ['clientId']),

  // The issued licence/permit.
  licences: defineTable({
    licenceTypeId: v.id('licenceTypes'),
    holderPartyId: v.id('parties'),
    holderType: v.union(
      v.literal('individual'),
      v.literal('group'),
      v.literal('agency'),
    ),
    sector: v.optional(sector),
    communityId: v.optional(v.id('communities')),
    issuingAuthority: v.literal('PZJA'),
    administeringAgent: v.literal('AFMA'),
    status: v.union(
      v.literal('active'),
      v.literal('suspended'),
      v.literal('expired'),
      v.literal('cancelled'),
      v.literal('leased_out'),
    ),
    validFrom: v.optional(v.number()),
    validTo: v.optional(v.number()),
    applicationId: v.optional(v.id('applications')),
    conditions: v.optional(v.array(v.string())),
    ...governanceFields,
  })
    .index('by_holder', ['holderPartyId'])
    .index('by_community', ['communityId'])
    .index('by_status', ['status']),

  // Per-licence "entries" (Act s.21) — e.g. reef-line entry, mackerel entry —
  // that extend a licence to otherwise-prohibited fish/areas. Distinct from the
  // s.20 Treaty endorsement (which is its own licence type above).
  licenceEntries: defineTable({
    licenceId: v.id('licences'),
    entryType: v.union(
      v.literal('reef_line'),
      v.literal('mackerel'),
      v.literal('other'),
    ),
    fisheryId: v.optional(v.id('fisheries')),
    speciesId: v.optional(v.id('species')),
    conditions: v.optional(v.array(v.string())),
    validFrom: v.optional(v.number()),
    validTo: v.optional(v.number()),
    status: v.union(v.literal('active'), v.literal('inactive')),
  })
    .index('by_licence', ['licenceId'])
    .index('by_fishery', ['fisheryId']),

  vessels: defineTable({
    boatName: v.string(),
    distinguishingSymbol: v.optional(v.string()),
    registrationNo: v.optional(v.string()),
    lengthM: v.optional(v.number()),
    isAustralianBoat: v.optional(v.boolean()),
    ownerPartyId: v.optional(v.id('parties')),
  })
    .index('by_owner', ['ownerPartyId'])
    .index('by_distinguishingSymbol', ['distinguishingSymbol']),

  vesselNominations: defineTable({
    licenceId: v.id('licences'),
    vesselId: v.id('vessels'),
    nominatedFrom: v.number(),
    nominatedTo: v.optional(v.number()),
  })
    .index('by_licence', ['licenceId'])
    .index('by_vessel', ['vesselId']),

  // Licence lifecycle events (grant / vary / transfer / temporary-transfer / etc).
  licenceTransactions: defineTable({
    licenceId: v.id('licences'),
    txnType: v.union(
      v.literal('grant'),
      v.literal('renew'),
      v.literal('vary'), // incl. boat variation (s.25A)
      v.literal('transfer'), // permanent (s.25)
      v.literal('temporary_transfer'), // lease (s.25(1A))
      v.literal('suspend'),
      v.literal('cancel'),
    ),
    fromPartyId: v.optional(v.id('parties')),
    toPartyId: v.optional(v.id('parties')),
    lodgedAt: v.number(),
    processedAt: v.optional(v.number()),
    channel: v.optional(channel),
    status: v.union(
      v.literal('pending'),
      v.literal('processed'),
      v.literal('rejected'),
    ),
    // Registration-gated effect + mandatory-refusal grounds (TRL s.26(2)).
    refusalReason: v.optional(
      v.union(
        v.literal('units_suspended'),
        v.literal('under_investigation'),
        v.literal('fees_owing'),
        v.literal('ineligible_transferee'),
      ),
    ),
  }).index('by_licence', ['licenceId']),
}
