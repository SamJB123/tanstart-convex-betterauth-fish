import { internalMutation } from './_generated/server'
import type { MutationCtx } from './_generated/server'
import type { Id } from './_generated/dataModel'
import { ZONE_GEOMETRIES } from './reference/geometries'

// --- Quota-scheme upsert helpers (used to seed Finfish/BDM weight schemes) ---
async function getPeriod(
  ctx: MutationCtx,
  fisheryId: Id<'fisheries'>,
  label: string,
  startsAt: number,
  endsAt: number,
) {
  const existing = (
    await ctx.db.query('periods').withIndex('by_fishery', (q) => q.eq('fisheryId', fisheryId)).take(50)
  ).find((p) => p.label === label)
  if (existing) return existing
  const id = await ctx.db.insert('periods', {
    fisheryId,
    label,
    startsAt,
    endsAt,
    jurisdiction: 'AU' as const,
  })
  return (await ctx.db.get(id))!
}

async function getWeightScheme(
  ctx: MutationCtx,
  fisheryId: Id<'fisheries'>,
  periodId: Id<'periods'>,
  name: string,
  speciesId: Id<'species'>,
  conversionFactors: Record<string, number>,
) {
  // Finfish/BDM TACs are direct kg caps per sector (no quota units), so
  // perUnitKgValue is 0 and the cap lives on the entitlement's `allowance`.
  const measure = {
    kind: 'weight' as const,
    speciesId,
    unit: 'kg_wwe' as const,
    perUnitKgValue: 0,
    conversionFactors,
  }
  const existing = (
    await ctx.db.query('quotaSchemes').withIndex('by_fishery', (q) => q.eq('fisheryId', fisheryId)).take(100)
  ).find((s) => s.name === name)
  if (existing) {
    await ctx.db.patch(existing._id, { measure, periodId })
    return existing
  }
  const id = await ctx.db.insert('quotaSchemes', {
    fisheryId,
    periodId,
    name,
    measure,
    overQuotaPolicy: 'competitive_closure' as const,
  })
  return (await ctx.db.get(id))!
}

async function setSectorEntitlement(
  ctx: MutationCtx,
  schemeId: Id<'quotaSchemes'>,
  fisheryId: Id<'fisheries'>,
  periodId: Id<'periods'>,
  holderPartyId: Id<'parties'>,
  sector: 'traditional_inhabitant' | 'sunset',
  allocationModel: 'pooled_competitive' | 'individual',
  allowanceKg: number,
  legislativeBasis: string,
) {
  const existing = (
    await ctx.db.query('entitlements').withIndex('by_scheme', (q) => q.eq('schemeId', schemeId)).take(50)
  ).find((e) => e.sector === sector)
  const fields = {
    schemeId,
    fisheryId,
    periodId,
    holderPartyId,
    sector,
    allocationModel,
    measureType: 'weight' as const,
    unit: 'kg_wwe',
    allowance: allowanceKg,
    status: 'active' as const,
    unitStatus: 'active' as const,
    transferable: false,
    legislativeBasis,
  }
  if (existing) await ctx.db.patch(existing._id, fields)
  else await ctx.db.insert('entitlements', fields)
}

// Idempotent reference-data seed for the AFMA Torres Strait prototype.
// Run with:  npx convex run seed:seedReferenceData
//
// Sources: PZJA/AFMA fishery pages, Torres Strait Fisheries Act 1984, CSIRO CAAB.
// All 16 CAAB codes were verified against CSIRO CAAB taxon reports
// (cmar.csiro.au/data/caab) and corroborated via the Atlas of Living Australia;
// taxonomic authority + family are likewise from the CAAB records.
// Species are upserted by scientific name (so re-running updates rows in place
// rather than duplicating). TACs/periods/quota schemes are intentionally omitted
// here — they change yearly and belong with the quota-engine pass.

type FisherySeed = {
  code: string
  name: string
  sector?: string
  issuingAuthority: 'PZJA' | 'AFMA'
  legislativeBasis?: string
  controlMechanism:
    | 'TAC_quota_weight'
    | 'TAE_days_of_effort'
    | 'size_gear_only'
    | 'community_plan'
  active: boolean
}

type SpeciesSeed = {
  caabCode: string
  scientificName: string // also the upsert key — keep stable across runs
  commonName: string
  authority?: string
  family?: string
  taxonGroup:
    | 'fish'
    | 'crustacean'
    | 'gastropod'
    | 'bivalve'
    | 'sea_cucumber'
    | 'reptile'
    | 'mammal'
    | 'other'
  takeCategory:
    | 'commercial'
    | 'commercial_quota'
    | 'traditional_only'
    | 'prohibited'
    | 'protected_no_take'
  islanderNames?: { language: string; name: string }[]
  isGroupCode?: boolean
  traditionalTakeOnly?: boolean
  protectedSpecies?: boolean
  units: ('kg' | 'count' | 'tails' | 'kg_dry' | 'quota_units' | 'not_quantified')[]
}

type LicenceTypeSeed = {
  code:
    | 's19_1_master_fisherman'
    | 's19_2_boat_commercial'
    | 's19_3_carrier_processing'
    | 's19_4a_non_boat_commercial'
    | 's19_4b_fish_receiver'
    | 's20_treaty_endorsement'
    | 's12_scientific_permit'
  statutoryRef: string
  name: string
  description?: string
  requiresTraditionalInhabitant: boolean
  grantableToGroup: boolean
  transferRule: 'none' | 'permanent' | 'temporary_only' | 'permanent_and_temporary'
}

const FISHERIES: FisherySeed[] = [
  { code: 'TSRL', name: 'Torres Strait Tropical Rock Lobster (Kaiar)', sector: 'Torres Strait', issuingAuthority: 'PZJA', legislativeBasis: 'Torres Strait Fisheries Act 1984', controlMechanism: 'TAC_quota_weight', active: true },
  { code: 'TSFF', name: 'Torres Strait Finfish (Reef Line)', sector: 'Torres Strait', issuingAuthority: 'PZJA', legislativeBasis: 'Torres Strait Fisheries Act 1984', controlMechanism: 'TAC_quota_weight', active: true },
  { code: 'TSSM', name: 'Torres Strait Spanish Mackerel', sector: 'Torres Strait', issuingAuthority: 'PZJA', legislativeBasis: 'Torres Strait Fisheries Act 1984', controlMechanism: 'TAC_quota_weight', active: true },
  { code: 'TSP', name: 'Torres Strait Prawn', sector: 'Torres Strait', issuingAuthority: 'PZJA', legislativeBasis: 'Torres Strait Fisheries Act 1984', controlMechanism: 'TAE_days_of_effort', active: true },
  { code: 'TSBDM', name: 'Torres Strait Bêche-de-mer (Sea Cucumber)', sector: 'Torres Strait', issuingAuthority: 'PZJA', legislativeBasis: 'Torres Strait Fisheries Act 1984', controlMechanism: 'TAC_quota_weight', active: true },
  { code: 'TSTR', name: 'Torres Strait Trochus', sector: 'Torres Strait', issuingAuthority: 'PZJA', legislativeBasis: 'Torres Strait Fisheries Act 1984', controlMechanism: 'TAC_quota_weight', active: true },
  { code: 'TSPS', name: 'Torres Strait Pearl Shell', sector: 'Torres Strait', issuingAuthority: 'PZJA', legislativeBasis: 'Torres Strait Fisheries Act 1984', controlMechanism: 'size_gear_only', active: true },
  { code: 'TSCR', name: 'Torres Strait Crab (Mud Crab)', sector: 'Torres Strait', issuingAuthority: 'PZJA', legislativeBasis: 'Torres Strait Fisheries Act 1984', controlMechanism: 'size_gear_only', active: true },
  { code: 'TSDT', name: 'Torres Strait Traditional Fishery (Dugong & Turtle)', sector: 'Torres Strait', issuingAuthority: 'PZJA', legislativeBasis: 'Torres Strait Fisheries Act 1984', controlMechanism: 'community_plan', active: true },
]

const SPECIES: SpeciesSeed[] = [
  { caabCode: '28820006', scientificName: 'Panulirus ornatus', commonName: 'Tropical Rock Lobster', authority: '(Fabricius, 1798)', family: 'Palinuridae', taxonGroup: 'crustacean', takeCategory: 'commercial_quota', islanderNames: [{ language: 'Torres Strait', name: 'Kaiar' }], units: ['kg', 'tails'] },
  { caabCode: '28711044', scientificName: 'Penaeus esculentus', commonName: 'Brown Tiger Prawn', authority: 'Haswell, 1879', family: 'Penaeidae', taxonGroup: 'crustacean', takeCategory: 'commercial', units: ['kg'] },
  { caabCode: '28711026', scientificName: 'Metapenaeus endeavouri', commonName: 'Blue Endeavour Prawn', authority: '(Schmitt, 1926)', family: 'Penaeidae', taxonGroup: 'crustacean', takeCategory: 'commercial', units: ['kg'] },
  { caabCode: '28911008', scientificName: 'Scylla serrata', commonName: 'Giant Mud Crab', authority: '(Forsskål, 1775)', family: 'Portunidae', taxonGroup: 'crustacean', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37441007', scientificName: 'Scomberomorus commerson', commonName: 'Narrow-barred Spanish Mackerel', authority: '(Lacépède, 1800)', family: 'Scombridae', taxonGroup: 'fish', takeCategory: 'commercial_quota', units: ['count', 'kg'] },
  { caabCode: '37311905', scientificName: 'Plectropomus spp.', commonName: 'Coral Trouts (Plectropomus & Variola spp.)', family: 'Serranidae', taxonGroup: 'fish', takeCategory: 'commercial', isGroupCode: true, units: ['count', 'kg'] },
  { caabCode: '37311078', scientificName: 'Plectropomus leopardus', commonName: 'Common Coral Trout', authority: '(Lacépède, 1802)', family: 'Serranidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37351902', scientificName: 'Lethrinus spp.', commonName: 'Emperors (Lethrinus spp.)', family: 'Lethrinidae', taxonGroup: 'fish', takeCategory: 'commercial', isGroupCode: true, units: ['count'] },
  { caabCode: '25416004', scientificName: 'Holothuria scabra', commonName: 'Sandfish', authority: 'Jaeger, 1833', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'prohibited', units: ['kg_dry', 'count'] }, // fishing for sandfish closed since 1998 (PZJA); has a size limit in the BDM Instrument but take is prohibited
  { caabCode: '25416033', scientificName: 'Holothuria whitmaei', commonName: 'Black Teatfish', authority: 'Bell, 1887', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['count', 'kg'] },
  { caabCode: '25416006', scientificName: 'Holothuria fuscogilva', commonName: 'White Teatfish', authority: 'Cherbonnier, 1980', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['count', 'kg'] },
  { caabCode: '24046001', scientificName: 'Rochia nilotica', commonName: 'Trochus', authority: '(Linnaeus, 1758)', family: 'Tegulidae', taxonGroup: 'gastropod', takeCategory: 'commercial_quota', units: ['kg'] },
  { caabCode: '23236003', scientificName: 'Pinctada maxima', commonName: 'Gold-lip Pearl Oyster', authority: '(Jameson, 1901)', family: 'Pteriidae', taxonGroup: 'bivalve', takeCategory: 'prohibited', units: ['count'] }, // Pearl Shell Instrument 2020 (F2020L01222) s.6 prohibits taking P. maxima alive or dead, except exemptions (Treaty endorsement, Qld pearl-farming, community fishing <=6m boat)
  { caabCode: '41206001', scientificName: 'Dugong dugon', commonName: 'Dugong', authority: '(P.L.S. Müller, 1776)', family: 'Dugongidae', taxonGroup: 'mammal', takeCategory: 'traditional_only', traditionalTakeOnly: true, protectedSpecies: true, units: ['not_quantified'] },
  { caabCode: '39020002', scientificName: 'Chelonia mydas', commonName: 'Green Turtle', authority: '(Linnaeus, 1758)', family: 'Cheloniidae', taxonGroup: 'reptile', takeCategory: 'traditional_only', traditionalTakeOnly: true, protectedSpecies: true, units: ['not_quantified'] },
  { caabCode: '39020003', scientificName: 'Eretmochelys imbricata', commonName: 'Hawksbill Turtle', authority: '(Linnaeus, 1766)', family: 'Cheloniidae', taxonGroup: 'reptile', takeCategory: 'protected_no_take', protectedSpecies: true, units: ['not_quantified'] },
]

// Additional species from the current s.16 Management Instruments, all CAAB codes
// verified against CSIRO taxon reports. "protected_no_take" = the Finfish
// Instrument 2020 s.12 no-take list (+ sharks); BDM species are quota-managed.
const EXTRA_SPECIES: SpeciesSeed[] = [
  // --- Bêche-de-mer (sea cucumbers) ---
  { caabCode: '25416065', scientificName: 'Bohadschia vitiensis', commonName: 'Brown Sandfish', authority: '(Semper, 1868)', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25416064', scientificName: 'Actinopyga spinea', commonName: 'Burrowing Blackfish', authority: 'Cherbonnier, 1980', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25417006', scientificName: 'Stichopus herrmanni', commonName: 'Curryfish', authority: 'Semper, 1868', family: 'Stichopodidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25417012', scientificName: 'Stichopus vastus', commonName: 'Curryfish (vastus)', authority: 'Sluiter, 1888', family: 'Stichopodidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25416070', scientificName: 'Actinopyga palauensis', commonName: 'Deepwater Blackfish', authority: 'Panning, 1944', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25416001', scientificName: 'Actinopyga echinites', commonName: 'Deepwater Redfish', authority: '(Jaeger, 1833)', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25416032', scientificName: 'Holothuria fuscopunctata', commonName: 'Elephant Trunkfish', authority: 'Jaeger, 1833', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25416031', scientificName: 'Holothuria lessoni', commonName: 'Golden Sandfish', authority: 'Massin et al., 2009', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25416007', scientificName: 'Actinopyga miliaris', commonName: 'Hairy Blackfish', authority: '(Quoy & Gaimard, 1833)', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'prohibited', units: ['kg_dry', 'count'] }, // BDM MAB 2026: TAC 0 (closed to fishing)
  { caabCode: '25416013', scientificName: 'Bohadschia argus', commonName: 'Leopardfish', authority: 'Jaeger, 1833', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25416003', scientificName: 'Holothuria atra', commonName: 'Lollyfish', authority: 'Jaeger, 1833', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25417003', scientificName: 'Thelenota ananas', commonName: 'Prickly Redfish', authority: '(Jaeger, 1833)', family: 'Stichopodidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25416002', scientificName: 'Actinopyga mauritiana', commonName: 'Surf Redfish', authority: '(Quoy & Gaimard, 1833)', family: 'Holothuriidae', taxonGroup: 'sea_cucumber', takeCategory: 'prohibited', units: ['kg_dry', 'count'] }, // fishing for surf redfish closed since 2003 (PZJA)
  { caabCode: '25417004', scientificName: 'Thelenota anax', commonName: 'Amberfish', authority: 'H.L. Clark, 1921', family: 'Stichopodidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  { caabCode: '25417001', scientificName: 'Stichopus chloronotus', commonName: 'Greenfish', authority: 'Brandt, 1835', family: 'Stichopodidae', taxonGroup: 'sea_cucumber', takeCategory: 'commercial_quota', units: ['kg_dry', 'count'] },
  // --- Snappers, emperors, tuskfish, jobfish ---
  { caabCode: '37351006', scientificName: 'Lethrinus laticaudis', commonName: 'Grass Emperor', authority: 'Alleyne & Macleay, 1877', family: 'Lethrinidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37351009', scientificName: 'Lethrinus miniatus', commonName: 'Red Throat Emperor', authority: '(Forster, 1801)', family: 'Lethrinidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37351008', scientificName: 'Lethrinus nebulosus', commonName: 'Spangled Emperor', authority: '(Forsskål, 1775)', family: 'Lethrinidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346033', scientificName: 'Lutjanus adetii', commonName: 'Hussar', authority: 'Castelnau, 1873', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346007', scientificName: 'Lutjanus malabaricus', commonName: 'Saddletail Snapper', authority: '(Bloch & Schneider, 1801)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346030', scientificName: 'Lutjanus johnii', commonName: 'Golden Snapper', authority: '(Bloch, 1792)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346015', scientificName: 'Lutjanus argentimaculatus', commonName: 'Mangrove Jack', authority: '(Forsskål, 1775)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346065', scientificName: 'Lutjanus russellii', commonName: 'Moses Snapper', authority: '(Bleeker, 1849)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346004', scientificName: 'Lutjanus sebae', commonName: 'Red Emperor', authority: '(Cuvier, 1816)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346005', scientificName: 'Lutjanus erythropterus', commonName: 'Crimson Snapper', authority: 'Bloch, 1790', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346011', scientificName: 'Lutjanus carponotatus', commonName: 'Stripey Snapper', authority: '(Richardson, 1842)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346029', scientificName: 'Lutjanus bohar', commonName: 'Red Bass', authority: '(Forsskål, 1775)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346028', scientificName: 'Lutjanus gibbus', commonName: 'Paddletail', authority: '(Forsskål, 1775)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'protected_no_take', units: ['count'] },
  { caabCode: '37384004', scientificName: 'Choerodon cephalotes', commonName: 'Purple Tuskfish', authority: '(Castelnau, 1875)', family: 'Labridae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37384042', scientificName: 'Choerodon venustus', commonName: 'Venus Tuskfish', authority: '(De Vis, 1884)', family: 'Labridae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37346017', scientificName: 'Symphorus nematophorus', commonName: 'Chinaman Fish', authority: '(Bleeker, 1860)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'protected_no_take', units: ['count'] },
  { caabCode: '37346914', scientificName: 'Etelis spp.', commonName: 'Rosy Jobfishes (group)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', isGroupCode: true, units: ['count', 'kg'] },
  { caabCode: '37346912', scientificName: 'Pristipomoides spp.', commonName: 'Jobfishes (group)', family: 'Lutjanidae', taxonGroup: 'fish', takeCategory: 'commercial', isGroupCode: true, units: ['count', 'kg'] },
  // --- Groupers/cods, coral trout, wrasse, pelagics, sharks ---
  { caabCode: '37311044', scientificName: 'Cromileptes altivelis', commonName: 'Barramundi Cod', authority: '(Valenciennes, 1828)', family: 'Serranidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37311068', scientificName: 'Epinephelus tukula', commonName: 'Potato Cod', authority: 'Morgans, 1959', family: 'Serranidae', taxonGroup: 'fish', takeCategory: 'protected_no_take', units: ['count'] },
  { caabCode: '37311061', scientificName: 'Epinephelus lanceolatus', commonName: 'Queensland Groper', authority: '(Bloch, 1790)', family: 'Serranidae', taxonGroup: 'fish', takeCategory: 'protected_no_take', units: ['count'] },
  { caabCode: '37311007', scientificName: 'Epinephelus coioides', commonName: 'Estuary Cod', authority: '(Hamilton, 1822)', family: 'Serranidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37311079', scientificName: 'Plectropomus laevis', commonName: 'Blue-spot Coral Trout', authority: '(Lacépède, 1801)', family: 'Serranidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37311081', scientificName: 'Plectropomus areolatus', commonName: 'Squaretail Coral Trout', authority: '(Rüppell, 1830)', family: 'Serranidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37384038', scientificName: 'Cheilinus undulatus', commonName: 'Humphead Maori Wrasse', authority: 'Rüppell, 1835', family: 'Labridae', taxonGroup: 'fish', takeCategory: 'protected_no_take', units: ['count'] },
  { caabCode: '37335001', scientificName: 'Rachycentron canadum', commonName: 'Cobia', authority: '(Linnaeus, 1766)', family: 'Rachycentridae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37441024', scientificName: 'Acanthocybium solandri', commonName: 'Wahoo', authority: '(Cuvier, 1831)', family: 'Scombridae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37337006', scientificName: 'Seriola lalandi', commonName: 'Yellowtail Kingfish', authority: 'Valenciennes, 1833', family: 'Carangidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37338001', scientificName: 'Coryphaena hippurus', commonName: 'Dolphinfish', authority: 'Linnaeus, 1758', family: 'Coryphaenidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37019001', scientificName: 'Sphyrna lewini', commonName: 'Scalloped Hammerhead', authority: '(Griffith & Smith, 1834)', family: 'Sphyrnidae', taxonGroup: 'fish', takeCategory: 'protected_no_take', protectedSpecies: true, units: ['count'] },
  { caabCode: '37008001', scientificName: 'Carcharias taurus', commonName: 'Grey Nurse Shark', authority: 'Rafinesque, 1810', family: 'Carchariidae', taxonGroup: 'fish', takeCategory: 'protected_no_take', protectedSpecies: true, units: ['count'] },
  { caabCode: '37018022', scientificName: 'Galeocerdo cuvier', commonName: 'Tiger Shark', authority: '(Péron & Lesueur, 1822)', family: 'Carcharhinidae', taxonGroup: 'fish', takeCategory: 'protected_no_take', protectedSpecies: true, units: ['count'] },
  // --- Jewfish/croakers, bream/sea perch, grunters ---
  { caabCode: '37354001', scientificName: 'Argyrosomus japonicus', commonName: 'Mulloway', authority: '(Temminck & Schlegel, 1843)', family: 'Sciaenidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37354019', scientificName: 'Nibea soldado', commonName: 'Silver Jewfish', authority: '(Lacépède, 1802)', family: 'Sciaenidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37354006', scientificName: 'Otolithes ruber', commonName: 'Silver Teraglin', authority: '(Bloch & Schneider, 1801)', family: 'Sciaenidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37354003', scientificName: 'Protonibea diacanthus', commonName: 'Black Jewfish', authority: '(Lacépède, 1802)', family: 'Sciaenidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37320003', scientificName: 'Glaucosoma scapulare', commonName: 'Pearl Perch', authority: 'Ramsay, 1881', family: 'Glaucosomatidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37353001', scientificName: 'Pagrus auratus', commonName: 'Snapper', authority: '(Forster, 1801)', family: 'Sparidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37353004', scientificName: 'Acanthopagrus australis', commonName: 'Yellowfin Bream', authority: '(Günther, 1859)', family: 'Sparidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37353011', scientificName: 'Acanthopagrus pacificus', commonName: 'Pikey Bream', authority: 'Iwatsuki, Kume & Yoshino, 2010', family: 'Sparidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37353013', scientificName: 'Rhabdosargus sarba', commonName: 'Tarwhine', authority: '(Forsskål, 1775)', family: 'Sparidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37361007', scientificName: 'Girella tricuspidata', commonName: 'Luderick', authority: '(Quoy & Gaimard, 1824)', family: 'Girellidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37350009', scientificName: 'Pomadasys argenteus', commonName: 'Silver Javelin', authority: '(Forsskål, 1775)', family: 'Haemulidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37350011', scientificName: 'Pomadasys kaakan', commonName: 'Barred Javelin', authority: '(Cuvier, 1830)', family: 'Haemulidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37334002', scientificName: 'Pomatomus saltatrix', commonName: 'Tailor', authority: '(Linnaeus, 1766)', family: 'Pomatomidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  // --- Barramundi, threadfins, flathead, whiting, mullet, teraglin, mackerels, pearl ---
  { caabCode: '37310006', scientificName: 'Lates calcarifer', commonName: 'Barramundi', authority: '(Bloch, 1790)', family: 'Latidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37354020', scientificName: 'Atractoscion atelodus', commonName: 'Teraglin', authority: '(Günther, 1867)', family: 'Sciaenidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37296033', scientificName: 'Platycephalus australis', commonName: 'Bartail Flathead', authority: 'Imamura, 2015', family: 'Platycephalidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37296021', scientificName: 'Platycephalus endrachtensis', commonName: 'Northern Sand Flathead', authority: 'Quoy & Gaimard, 1825', family: 'Platycephalidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37330003', scientificName: 'Sillago analis', commonName: 'Golden-lined Whiting', authority: 'Whitley, 1943', family: 'Sillaginidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37330010', scientificName: 'Sillago ciliata', commonName: 'Sand Whiting', authority: 'Cuvier, 1829', family: 'Sillaginidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37381002', scientificName: 'Mugil cephalus', commonName: 'Sea Mullet', authority: 'Linnaeus, 1758', family: 'Mugilidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37383005', scientificName: 'Polydactylus macrochir', commonName: 'King Threadfin', authority: '(Günther, 1867)', family: 'Polynemidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37383004', scientificName: 'Eleutheronema tetradactylum', commonName: 'Blue Threadfin', authority: '(Shaw, 1804)', family: 'Polynemidae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37441014', scientificName: 'Scomberomorus queenslandicus', commonName: 'School Mackerel', authority: 'Munro, 1943', family: 'Scombridae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37441015', scientificName: 'Scomberomorus munroi', commonName: 'Spotted Mackerel', authority: 'Collette & Russo, 1980', family: 'Scombridae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37441018', scientificName: 'Scomberomorus semifasciatus', commonName: 'Grey Mackerel', authority: '(Macleay, 1884)', family: 'Scombridae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '37441025', scientificName: 'Grammatorcynus bicarinatus', commonName: 'Shark Mackerel', authority: '(Quoy & Gaimard, 1825)', family: 'Scombridae', taxonGroup: 'fish', takeCategory: 'commercial', units: ['count', 'kg'] },
  { caabCode: '23236002', scientificName: 'Pinctada margaritifera', commonName: 'Black-lip Pearl Oyster', authority: '(Linnaeus, 1758)', family: 'Pteriidae', taxonGroup: 'bivalve', takeCategory: 'prohibited', units: ['count'] }, // live take prohibited (Pearl Shell Instrument s.6), ≥90mm where exempt
]

// Statutory licence types (Act s.19 family). "TIB"/"TVH" are sectors, not
// licence types — they are recorded on the licence/application as `sector`.
const LICENCE_TYPES: LicenceTypeSeed[] = [
  { code: 's19_1_master_fisherman', statutoryRef: 's19(1)', name: "Master Fisherman's licence", description: 'Authorises a person to be in charge of a boat used for commercial fishing.', requiresTraditionalInhabitant: false, grantableToGroup: false, transferRule: 'none' },
  { code: 's19_2_boat_commercial', statutoryRef: 's19(2)', name: 'Boat commercial fishing licence', description: 'Use of a boat to take (and carry/process) fish. Both the TIB and TVH sectors are this licence, distinguished by holder/sector.', requiresTraditionalInhabitant: false, grantableToGroup: true, transferRule: 'permanent_and_temporary' },
  { code: 's19_3_carrier_processing', statutoryRef: 's19(3)', name: 'Carrier / processing licence', description: 'Use of a boat to carry/process fish taken by another boat (Finfish Plan "TPC").', requiresTraditionalInhabitant: false, grantableToGroup: true, transferRule: 'permanent_and_temporary' },
  { code: 's19_4a_non_boat_commercial', statutoryRef: 's19(4A)', name: 'Non-boat commercial fishing licence', description: 'Taking fish commercially without a boat (diving / hand collection — e.g. BDM, trochus, pearl).', requiresTraditionalInhabitant: false, grantableToGroup: true, transferRule: 'permanent_and_temporary' },
  { code: 's19_4b_fish_receiver', statutoryRef: 's19(4B)', name: 'Fish receiver licence', description: 'To receive fish whose taking required a s19 licence or a Treaty endorsement.', requiresTraditionalInhabitant: false, grantableToGroup: true, transferRule: 'permanent' },
  { code: 's20_treaty_endorsement', statutoryRef: 's20', name: 'Treaty endorsement (PNG)', description: 'Endorsement of a PNG licence to fish in the area of Australian jurisdiction.', requiresTraditionalInhabitant: false, grantableToGroup: false, transferRule: 'none' },
  { code: 's12_scientific_permit', statutoryRef: 's12', name: 'Scientific / developmental permit', description: 'Authorises taking fish for scientific or developmental purposes.', requiresTraditionalInhabitant: false, grantableToGroup: false, transferRule: 'none' },
]

// Size limits per species, from the current s.16 Management Instruments.
type SizeLimitSeed = {
  scientificName: string
  measureType:
    | 'total_length_mm'
    | 'carapace_length_mm'
    | 'tail_length_mm'
    | 'length_cm'
    | 'shell_width_mm'
    | 'shell_length_mm'
  minValue?: number
  maxValue?: number
  sexRestriction?: string
  instrument?: string
}

const SIZE_LIMITS: SizeLimitSeed[] = [
  { scientificName: 'Panulirus ornatus', measureType: 'carapace_length_mm', minValue: 90, instrument: 'TRL Management Instrument 2018 (F2018L01044) s.9' },
  { scientificName: 'Panulirus ornatus', measureType: 'tail_length_mm', minValue: 115, instrument: 'TRL Management Instrument 2018 (F2018L01044) s.9' },
  { scientificName: 'Scomberomorus commerson', measureType: 'length_cm', minValue: 75, instrument: 'Spanish Mackerel Management Instrument 2025 (F2025L01636) s.8' },
  { scientificName: 'Scylla serrata', measureType: 'carapace_length_mm', minValue: 150, sexRestriction: 'female prohibited', instrument: 'Crab Management Instrument 2025 (F2025L01635) s.8, s.6(2)' },
  { scientificName: 'Holothuria whitmaei', measureType: 'length_cm', minValue: 25, instrument: 'Bêche-de-mer Management Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Holothuria fuscogilva', measureType: 'length_cm', minValue: 32, instrument: 'Bêche-de-mer Management Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Holothuria scabra', measureType: 'length_cm', minValue: 18, instrument: 'Bêche-de-mer Management Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Rochia nilotica', measureType: 'shell_width_mm', minValue: 80, maxValue: 125, instrument: 'Trochus Management Instrument 2025 (F2025L01638) s.8' },
  { scientificName: 'Pinctada maxima', measureType: 'shell_length_mm', minValue: 130, maxValue: 230, instrument: 'Pearl Shell Instrument 2020 (F2020L01222) s.9' },
  { scientificName: 'Plectropomus spp.', measureType: 'length_cm', minValue: 38, instrument: 'Finfish Management Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Plectropomus leopardus', measureType: 'length_cm', minValue: 38, instrument: 'Finfish Management Instrument 2020 (F2022C00596) s.9' },
  // Bêche-de-mer minimum lengths (BDM Management Instrument 2022, F2022L00176 s.7)
  { scientificName: 'Bohadschia vitiensis', measureType: 'length_cm', minValue: 25, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Actinopyga spinea', measureType: 'length_cm', minValue: 22, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Stichopus herrmanni', measureType: 'length_cm', minValue: 31, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Stichopus vastus', measureType: 'length_cm', minValue: 15, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Actinopyga palauensis', measureType: 'length_cm', minValue: 22, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Actinopyga echinites', measureType: 'length_cm', minValue: 20, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Holothuria fuscopunctata', measureType: 'length_cm', minValue: 24, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Holothuria lessoni', measureType: 'length_cm', minValue: 22, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Actinopyga miliaris', measureType: 'length_cm', minValue: 22, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Bohadschia argus', measureType: 'length_cm', minValue: 30, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Holothuria atra', measureType: 'length_cm', minValue: 15, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Thelenota ananas', measureType: 'length_cm', minValue: 35, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  { scientificName: 'Actinopyga mauritiana', measureType: 'length_cm', minValue: 22, instrument: 'BDM Instrument 2022 (F2022L00176) s.7' },
  // Finfish minimum lengths (Finfish Management Instrument 2020, F2022C00596 s.9, cm)
  { scientificName: 'Cromileptes altivelis', measureType: 'length_cm', minValue: 45, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Rachycentron canadum', measureType: 'length_cm', minValue: 75, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Coryphaena hippurus', measureType: 'length_cm', minValue: 45, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lethrinus laticaudis', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lutjanus adetii', measureType: 'length_cm', minValue: 25, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Atractoscion atelodus', measureType: 'length_cm', minValue: 38, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lutjanus malabaricus', measureType: 'length_cm', minValue: 40, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lutjanus johnii', measureType: 'length_cm', minValue: 35, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lutjanus argentimaculatus', measureType: 'length_cm', minValue: 35, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lutjanus russellii', measureType: 'length_cm', minValue: 25, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Argyrosomus japonicus', measureType: 'length_cm', minValue: 45, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Glaucosoma scapulare', measureType: 'length_cm', minValue: 35, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Choerodon cephalotes', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lutjanus sebae', measureType: 'length_cm', minValue: 55, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lethrinus miniatus', measureType: 'length_cm', minValue: 38, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Etelis spp.', measureType: 'length_cm', minValue: 38, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Pristipomoides spp.', measureType: 'length_cm', minValue: 38, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Nibea soldado', measureType: 'length_cm', minValue: 45, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Otolithes ruber', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lutjanus erythropterus', measureType: 'length_cm', minValue: 40, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Pagrus auratus', measureType: 'length_cm', minValue: 35, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lethrinus nebulosus', measureType: 'length_cm', minValue: 45, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Protonibea diacanthus', measureType: 'length_cm', minValue: 45, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Lutjanus carponotatus', measureType: 'length_cm', minValue: 25, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Choerodon venustus', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Acanthocybium solandri', measureType: 'length_cm', minValue: 75, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Seriola lalandi', measureType: 'length_cm', minValue: 50, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Platycephalus australis', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Polydactylus macrochir', measureType: 'length_cm', minValue: 40, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Eleutheronema tetradactylum', measureType: 'length_cm', minValue: 40, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Sillago analis', measureType: 'length_cm', minValue: 23, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Girella tricuspidata', measureType: 'length_cm', minValue: 23, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Acanthopagrus pacificus', measureType: 'length_cm', minValue: 23, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Platycephalus endrachtensis', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Sillago ciliata', measureType: 'length_cm', minValue: 23, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Mugil cephalus', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Pomadasys argenteus', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Pomadasys kaakan', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Pomatomus saltatrix', measureType: 'length_cm', minValue: 30, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Rhabdosargus sarba', measureType: 'length_cm', minValue: 23, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  { scientificName: 'Acanthopagrus australis', measureType: 'length_cm', minValue: 23, instrument: 'Finfish Instrument 2020 (F2022C00596) s.9' },
  // Finfish min+max lengths (Finfish Management Instrument 2020, F2022C00596 s.10, cm)
  { scientificName: 'Lates calcarifer', measureType: 'length_cm', minValue: 58, maxValue: 120, instrument: 'Finfish Instrument 2020 (F2022C00596) s.10' },
  { scientificName: 'Plectropomus laevis', measureType: 'length_cm', minValue: 50, maxValue: 80, instrument: 'Finfish Instrument 2020 (F2022C00596) s.10' },
  { scientificName: 'Epinephelus coioides', measureType: 'length_cm', minValue: 35, maxValue: 120, instrument: 'Finfish Instrument 2020 (F2022C00596) s.10' },
  { scientificName: 'Plectropomus areolatus', measureType: 'length_cm', minValue: 38, maxValue: 62, instrument: 'Finfish Instrument 2020 (F2022C00596) s.10' },
  { scientificName: 'Lutjanus bohar', measureType: 'length_cm', minValue: 45, maxValue: 55, instrument: 'Finfish Instrument 2020 (F2022C00596) s.10' },
]

// AFMA logbook 3-letter species codes (TSF01, gazette C2015G00269) -> CAAB.
// Logbook groups are coarser than CAAB taxa; speciesId is null where no single
// CAAB taxon matches (and these reconcile to our seeded species where they do).
type AliasSeed = { logbookGroupName: string; caab?: string; isGroup: boolean; note?: string }

const LOGBOOK_ALIASES: AliasSeed[] = [
  { logbookGroupName: 'SNM', caab: '37441007', isGroup: false, note: 'Spanish mackerel (Scomberomorus commerson)' },
  { logbookGroupName: 'MAO', isGroup: false, note: 'School mackerel (Scomberomorus queenslandicus) — not yet seeded' },
  { logbookGroupName: 'MAL', isGroup: false, note: 'Spotted mackerel (Scomberomorus munroi) — not yet seeded' },
  { logbookGroupName: 'MAG', isGroup: false, note: 'Grey/broad-barred mackerel (Scomberomorus semifasciatus) — not yet seeded' },
  { logbookGroupName: 'MSH', isGroup: false, note: 'Salmon mackerel — not yet seeded' },
  { logbookGroupName: 'TCG', caab: '37311905', isGroup: true, note: 'Coral trout (all species)' },
  { logbookGroupName: 'COD', isGroup: true, note: 'Cod (Epinephelus spp.) — not yet seeded' },
  { logbookGroupName: 'COB', isGroup: false, note: 'Barramundi cod (Cromileptes altivelis) — not yet seeded' },
  { logbookGroupName: 'RDE', isGroup: false, note: 'Red emperor (Lutjanus sebae) — not yet seeded' },
  { logbookGroupName: 'SPE', isGroup: false, note: 'Spangled emperor (Lethrinus nebulosus) — not yet seeded' },
  { logbookGroupName: 'RSE', caab: '37351902', isGroup: true, note: 'Other emperors (Lethrinus spp.)' },
  { logbookGroupName: 'MAW', isGroup: false, note: 'Maori wrasse — not yet seeded' },
  { logbookGroupName: 'SSB', isGroup: false, note: 'Stripey bass — not yet seeded' },
]

export const seedReferenceData = internalMutation({
  args: {},
  handler: async (ctx) => {
    let fisheriesAdded = 0
    for (const f of FISHERIES) {
      const existing = await ctx.db
        .query('fisheries')
        .withIndex('by_code', (q) => q.eq('code', f.code))
        .unique()
      if (!existing) {
        await ctx.db.insert('fisheries', f)
        fisheriesAdded++
      }
    }

    // Upsert species by scientific name (stable key) so re-running reconciles
    // codes/enrichment in place instead of duplicating. Reference table is
    // small and bounded, so a single bounded read is fine.
    const existingSpecies = await ctx.db.query('species').take(1000)
    const speciesByName = new Map(
      existingSpecies.map((s) => [s.scientificName, s]),
    )
    let speciesAdded = 0
    let speciesUpdated = 0
    for (const s of [...SPECIES, ...EXTRA_SPECIES]) {
      const { units, ...rest } = s
      const searchText = [
        rest.commonName,
        rest.scientificName,
        ...(rest.islanderNames?.map((n) => n.name) ?? []),
      ].join(' ')
      const doc = { ...rest, searchText, active: true }
      const existing = speciesByName.get(s.scientificName)
      if (existing) {
        await ctx.db.patch(existing._id, doc)
        speciesUpdated++
        continue
      }
      const speciesId = await ctx.db.insert('species', doc)
      for (let i = 0; i < units.length; i++) {
        await ctx.db.insert('speciesUnits', {
          speciesId,
          unit: units[i],
          isPrimary: i === 0,
        })
      }
      speciesAdded++
    }

    // Licence types moved from sector labels to the s.19 statutory family —
    // delete any stale rows, then insert the canonical set.
    const staleLicenceTypes = await ctx.db.query('licenceTypes').take(1000)
    for (const lt of staleLicenceTypes) await ctx.db.delete(lt._id)
    let licenceTypesAdded = 0
    for (const lt of LICENCE_TYPES) {
      await ctx.db.insert('licenceTypes', lt)
      licenceTypesAdded++
    }

    // Gear types (incl. hookah / free-dive from the TRL logbook).
    const GEAR_TYPES = [
      { code: 'LHL', name: 'Handline' },
      { code: 'LTL', name: 'Trolling' },
      { code: 'LDR', name: 'Droplining' },
      { code: 'HOOKAH', name: 'Hookah dive' },
      { code: 'FREEDIVE', name: 'Free dive' },
      { code: 'HAND', name: 'Hand collection' },
    ]
    let gearTypesAdded = 0
    for (const g of GEAR_TYPES) {
      const existing = await ctx.db
        .query('gearTypes')
        .withIndex('by_code', (q) => q.eq('code', g.code))
        .unique()
      if (!existing) {
        await ctx.db.insert('gearTypes', g)
        gearTypesAdded++
      }
    }

    // TSRA — the agency that holds the TRL Traditional-Inhabitant sector pool.
    const agencies = await ctx.db
      .query('parties')
      .withIndex('by_kind', (q) => q.eq('kind', 'agency'))
      .take(50)
    let tsra = agencies.find((p) =>
      p.displayName.startsWith('Torres Strait Regional Authority'),
    )
    if (!tsra) {
      const id = await ctx.db.insert('parties', {
        kind: 'agency',
        displayName: 'Torres Strait Regional Authority (TSRA)',
      })
      tsra = (await ctx.db.get(id))!
    }

    // Treaty jurisdiction zones (Annex 9 / 5 / 8). Geometry to be added later.
    const ZONES = [
      { name: 'Torres Strait Protected Zone', kind: 'tspz' as const, legalBasis: 'Torres Strait Treaty Annex 9', sourceRef: 'Treaty Art 10' },
      { name: 'Seabed Jurisdiction Line', kind: 'jurisdiction_line' as const, governingLine: 'seabed' as const, speciesClass: 'sedentary' as const, legalBasis: 'Torres Strait Treaty Annex 5', sourceRef: 'Treaty Art 4(1)' },
      { name: 'Fisheries Jurisdiction Line', kind: 'jurisdiction_line' as const, governingLine: 'fisheries' as const, speciesClass: 'swimming' as const, legalBasis: 'Torres Strait Treaty Annex 8', sourceRef: 'Treaty Art 4(2)' },
      // Dugong Sanctuary — permanent dugong-hunting ban in western TS (FMN 65
      // Schedule). bbox: W 141°01′E, S 11°10′S, E 142°E; N follows the Fisheries
      // Jurisdiction Line (Annex 8) — north value approximate.
      { name: 'Western Torres Strait Dugong Sanctuary', kind: 'closure_area' as const, bbox: { west: 141.0167, south: -11.1667, east: 142.0, north: -9.5 }, legalBasis: 'Torres Strait Fisheries Management Notice No. 65, Schedule', sourceRef: 'FMN 65 (23 Feb 2004); N bound = Annex 8 line (approx)' },
    ]
    let zonesAdded = 0
    for (const z of ZONES) {
      const existing = (
        await ctx.db.query('zones').withIndex('by_kind', (q) => q.eq('kind', z.kind)).take(20)
      ).find((e) => e.name === z.name)
      if (!existing) {
        await ctx.db.insert('zones', z)
        zonesAdded++
      }
    }

    // The Dugong Sanctuary is permanently closed to dugong hunting (FMN 65).
    let dugongClosureAdded = 0
    const sanctuary = (
      await ctx.db.query('zones').withIndex('by_kind', (q) => q.eq('kind', 'closure_area')).take(20)
    ).find((z) => z.name.includes('Dugong Sanctuary'))
    if (sanctuary) {
      const existing = (
        await ctx.db.query('zoneStatus').withIndex('by_zone_and_effectiveFrom', (q) => q.eq('zoneId', sanctuary._id)).take(5)
      )[0]
      if (!existing) {
        await ctx.db.insert('zoneStatus', {
          zoneId: sanctuary._id,
          status: 'closed',
          reason: 'Dugong hunting prohibited (sanctuary) — FMN 65',
          gearScope: 'dugong take',
          effectiveFrom: Date.UTC(2004, 1, 23),
        })
        dugongClosureAdded = 1
      }
    }

    // Detailed zone geometries (GeoJSON) from the Treaty annexes, Prawn Plan
    // schedules and FMN 65. Upsert by name: patch geometry onto an existing zone
    // (TSPZ, jurisdiction lines, dugong sanctuary), else insert the closure /
    // anchorage / adjacent-area zone.
    const allZones = await ctx.db.query('zones').take(200)
    const zoneByName = new Map(allZones.map((z) => [z.name, z]))
    let geometriesSet = 0
    for (const g of ZONE_GEOMETRIES) {
      const geojson = JSON.stringify({
        type: g.geometryType,
        coordinates: g.coordinates,
      })
      const existing = zoneByName.get(g.name)
      if (existing) {
        await ctx.db.patch(existing._id, { geojson, bbox: g.bbox, datum: g.datum })
      } else {
        await ctx.db.insert('zones', {
          name: g.name,
          kind: g.kind ?? 'management_area',
          bbox: g.bbox,
          geojson,
          datum: g.datum,
          legalBasis: g.legalBasis,
        })
      }
      geometriesSet++
    }

    const trl = await ctx.db
      .query('fisheries')
      .withIndex('by_code', (q) => q.eq('code', 'TSRL'))
      .unique()

    // AU/PNG catch shares (Treaty Art 23(4)) for TRL.
    let sharesAdded = 0
    if (trl) {
      const shareSeed = [
        { jurisdictionContext: 'au_jurisdiction' as const, auPct: 75, pngPct: 25 },
        { jurisdictionContext: 'png_jurisdiction' as const, auPct: 25, pngPct: 75 },
        { jurisdictionContext: 'named_cays' as const, auPct: 50, pngPct: 50 },
      ]
      const existingShares = await ctx.db
        .query('catchShares')
        .withIndex('by_fishery', (q) => q.eq('fisheryId', trl._id))
        .take(10)
      for (const s of shareSeed) {
        if (!existingShares.some((e) => e.jurisdictionContext === s.jurisdictionContext)) {
          await ctx.db.insert('catchShares', {
            fisheryId: trl._id,
            jurisdictionContext: s.jurisdictionContext,
            auPct: s.auPct,
            pngPct: s.pngPct,
            legalBasis: 'Torres Strait Treaty Art 23(4)',
          })
          sharesAdded++
        }
      }
    }

    // Demonstrative TRL quota: period + scheme + the TSRA TI-sector pool.
    // perUnitKgValue is a PLACEHOLDER (needs the current PZJA-set TAC).
    let quotaSeed = 'skipped'
    const kaiar = await ctx.db
      .query('species')
      .withIndex('by_caabCode', (q) => q.eq('caabCode', '28820006'))
      .unique()
    if (trl && kaiar && tsra) {
      let period = (
        await ctx.db.query('periods').withIndex('by_fishery', (q) => q.eq('fisheryId', trl._id)).take(50)
      ).find((p) => p.label === '2025-26')
      if (!period) {
        const pid = await ctx.db.insert('periods', {
          fisheryId: trl._id,
          label: '2025-26',
          startsAt: Date.UTC(2025, 11, 1),
          endsAt: Date.UTC(2026, 8, 30),
          jurisdiction: 'AU',
        })
        period = (await ctx.db.get(pid))!
      }
      // TAC 268,852.5 kg (F2026L00100 amendment, up from 200,000) ÷ 1,000,000 units.
      const schemeMeasure = {
        kind: 'weight' as const,
        speciesId: kaiar._id,
        unit: 'kg_wwe' as const,
        perUnitKgValue: 0.2688525,
        conversionFactors: { tails: 2.677 }, // from Catchwatch; not in the determination
      }
      const schemeName = 'TRL 2025-26 quota (TAC 268,852.5 kg, F2026L00100)'
      let scheme = (
        await ctx.db.query('quotaSchemes').withIndex('by_fishery', (q) => q.eq('fisheryId', trl._id)).take(50)
      ).find((s) => s.periodId === period!._id)
      if (!scheme) {
        const sid = await ctx.db.insert('quotaSchemes', {
          fisheryId: trl._id,
          periodId: period._id,
          name: schemeName,
          measure: schemeMeasure,
          totalUnits: 1_000_000,
          overQuotaPolicy: 'competitive_closure',
        })
        scheme = (await ctx.db.get(sid))!
      } else {
        await ctx.db.patch(scheme._id, { name: schemeName, measure: schemeMeasure })
      }
      // TI sector: TSRA holds 562,000 units (Quota Plan s.15(1)(a), 56.2%), but the
      // operative seasonal KG CAP is 66.17% of TAC (Management Instrument s.4A) —
      // a deliberate competitive-catch uplift above the unit share. Store both;
      // allowance stays null (derived = sectorSharePct × current TAC).
      const tiFields = {
        schemeId: scheme._id,
        fisheryId: trl._id,
        periodId: period._id,
        holderPartyId: tsra._id,
        sector: 'traditional_inhabitant' as const,
        allocationModel: 'pooled_competitive' as const,
        measureType: 'weight' as const,
        unit: 'kg_wwe',
        unitsHeld: 562_000,
        sectorSharePct: 0.6617,
        allowance: null,
        status: 'active' as const,
        unitStatus: 'active' as const,
        transferable: false,
        legislativeBasis:
          'TRL Quota Plan 2018 s.15(1)(a) (562,000 units); kg cap = 66.17% of TAC per Management Instrument s.4A',
      }
      const tiEntitlement = (
        await ctx.db.query('entitlements').withIndex('by_scheme', (q) => q.eq('schemeId', scheme!._id)).take(50)
      ).find((e) => e.sector === 'traditional_inhabitant')
      if (tiEntitlement) {
        await ctx.db.patch(tiEntitlement._id, tiFields)
      } else {
        await ctx.db.insert('entitlements', tiFields)
      }
      quotaSeed = 'seeded'
    }

    // Prawn season: 6pm 1 Feb -> 6am 1 Dec (AEST), night-trawl window 1800-0600.
    const prawn = await ctx.db
      .query('fisheries')
      .withIndex('by_code', (q) => q.eq('code', 'TSP'))
      .unique()
    let prawnPeriodAdded = 0
    if (prawn) {
      const existing = (
        await ctx.db.query('periods').withIndex('by_fishery', (q) => q.eq('fisheryId', prawn._id)).take(50)
      ).find((p) => p.label === '2026')
      if (!existing) {
        await ctx.db.insert('periods', {
          fisheryId: prawn._id,
          label: '2026',
          startsAt: Date.UTC(2026, 1, 1, 8, 0), // 6pm AEST 1 Feb = 08:00 UTC
          endsAt: Date.UTC(2026, 10, 30, 20, 0), // 6am AEST 1 Dec = 30 Nov 20:00 UTC
          jurisdiction: 'AU',
          dailyWindowFrom: '18:00',
          dailyWindowTo: '06:00',
          timezone: 'Australia/Brisbane',
          legalBasis:
            'TSPF Fishing Season Determination 2025 (F2025L01639) s.4; Prawn Management Instrument 2025 (F2025L01637) s.8(3)',
        })
        prawnPeriodAdded = 1
      }
    }

    // Size limits + logbook->CAAB aliases (depend on species).
    const allSpecies = await ctx.db.query('species').take(1000)
    const spByName = new Map(allSpecies.map((s) => [s.scientificName, s]))
    const spByCaab = new Map(allSpecies.map((s) => [s.caabCode, s]))
    let sizeLimitsAdded = 0
    for (const sl of SIZE_LIMITS) {
      const sp = spByName.get(sl.scientificName)
      if (!sp) continue
      const existing = (
        await ctx.db.query('sizeLimits').withIndex('by_species', (q) => q.eq('speciesId', sp._id)).take(20)
      ).find((e) => e.measureType === sl.measureType)
      if (existing) continue
      await ctx.db.insert('sizeLimits', {
        speciesId: sp._id,
        measureType: sl.measureType,
        minValue: sl.minValue,
        maxValue: sl.maxValue,
        sexRestriction: sl.sexRestriction,
        instrument: sl.instrument,
      })
      sizeLimitsAdded++
    }
    let aliasesAdded = 0
    for (const a of LOGBOOK_ALIASES) {
      const existing = (
        await ctx.db.query('logbookSpeciesAliases').withIndex('by_group', (q) => q.eq('logbookGroupName', a.logbookGroupName)).take(5)
      )[0]
      if (existing) continue
      const sp = a.caab ? spByCaab.get(a.caab) : undefined
      await ctx.db.insert('logbookSpeciesAliases', {
        logbookGroupName: a.logbookGroupName,
        speciesId: sp?._id,
        isGroup: a.isGroup,
        note: a.note,
      })
      aliasesAdded++
    }

    // --- Remaining quota schemes (figures now in hand) -----------------------
    // Finfish: per-species sector TACs from the 2024-25 Catchwatch (TIB =
    // competitive pool, Sunset = non-TI temporary access). TSRA holds the
    // finfish entitlements in trust.
    let finfishSchemes = 0
    const finfish = await ctx.db
      .query('fisheries')
      .withIndex('by_code', (q) => q.eq('code', 'TSFF'))
      .unique()
    if (finfish && tsra) {
      const period = await getPeriod(ctx, finfish._id, 'FY2024-25', Date.UTC(2024, 6, 1), Date.UTC(2025, 5, 30))
      const finfishData = [
        { caab: '37441007', name: 'Spanish mackerel', cf: { filleted: 1.608, gilled_gutted: 1.048 }, tib: 18000, sunset: 59000 },
        { caab: '37311905', name: 'Coral trout', cf: { filleted: 2, gilled_gutted: 1.1 }, tib: 108000, sunset: 15000 },
      ]
      for (const d of finfishData) {
        const sp = spByCaab.get(d.caab)
        if (!sp) continue
        const scheme = await getWeightScheme(ctx, finfish._id, period._id, `Finfish ${d.name} 2024-25`, sp._id, d.cf)
        await setSectorEntitlement(ctx, scheme._id, finfish._id, period._id, tsra._id, 'traditional_inhabitant', 'pooled_competitive', d.tib, 'Finfish Catchwatch 2024-25 (TIB sector TAC, kg)')
        await setSectorEntitlement(ctx, scheme._id, finfish._id, period._id, tsra._id, 'sunset', 'individual', d.sunset, 'Finfish Catchwatch 2024-25 (Sunset sector TAC, kg)')
        finfishSchemes++
      }
    }

    // BDM: per-species annual TACs (gutted wet weight) from the 2026 MAB; all
    // TIB-sector competitive. (Sandfish/surf redfish/hairy blackfish = closed.)
    let bdmSchemes = 0
    const bdm = await ctx.db
      .query('fisheries')
      .withIndex('by_code', (q) => q.eq('code', 'TSBDM'))
      .unique()
    if (bdm && tsra) {
      const period = await getPeriod(ctx, bdm._id, '2026', Date.UTC(2026, 0, 1), Date.UTC(2026, 11, 31))
      const bdmData = [
        { caab: '25416033', name: 'Black teatfish', tac: 20783 }, // 20t + 783kg carryover
        { caab: '25416006', name: 'White teatfish', tac: 15000 },
        { caab: '25417003', name: 'Prickly redfish', tac: 15000 },
        { caab: '25416001', name: 'Deepwater redfish', tac: 1000 },
        { caab: '25417006', name: 'Curryfish basket (herrmanni + vastus)', tac: 60000 },
        { caab: '25417004', name: 'Amberfish', tac: 10000 },
        { caab: '25417001', name: 'Greenfish', tac: 40000 },
      ]
      for (const d of bdmData) {
        const sp = spByCaab.get(d.caab)
        if (!sp) continue
        const scheme = await getWeightScheme(ctx, bdm._id, period._id, `BDM ${d.name} 2026`, sp._id, {})
        await setSectorEntitlement(ctx, scheme._id, bdm._id, period._id, tsra._id, 'traditional_inhabitant', 'pooled_competitive', d.tac, 'BDM MAB 2026 (gutted wet weight)')
        bdmSchemes++
      }
    }

    // Prawn: effort scheme — TAE 9,200 fishing days (F2024L00106, 2024-26).
    let prawnScheme = 'skipped'
    if (prawn) {
      const prawnPeriod = (
        await ctx.db.query('periods').withIndex('by_fishery', (q) => q.eq('fisheryId', prawn._id)).take(50)
      ).find((p) => p.label === '2026')
      if (prawnPeriod) {
        const measure = {
          kind: 'effort' as const,
          unit: 'vessel_day' as const,
          totalAllowableEffort: 9200,
          totalUnitsInForce: 9200,
          consumptionRule: 'vms_overnight_movement' as const,
          leaseAutoRevert: true,
        }
        const existing = (
          await ctx.db.query('quotaSchemes').withIndex('by_fishery', (q) => q.eq('fisheryId', prawn._id)).take(50)
        ).find((s) => s.periodId === prawnPeriod._id)
        if (existing) {
          await ctx.db.patch(existing._id, { measure, name: 'TS Prawn TAE 2026 (9,200 fishing days)' })
        } else {
          await ctx.db.insert('quotaSchemes', {
            fisheryId: prawn._id,
            periodId: prawnPeriod._id,
            name: 'TS Prawn TAE 2026 (9,200 fishing days)',
            measure,
            overQuotaPolicy: 'hard_stop' as const,
          })
        }
        prawnScheme = 'seeded'
      }
    }

    // One sample community (PBC) to exercise the membership/native-title path.
    // Real determination: "Badu Islanders #1" — Nona on behalf of the Badulgal
    // v State of Queensland [2004] FCA 1578 (NNTT QCD2004/010, 14/12/2004),
    // held by Mura Badulgal (Torres Strait Islanders) Corporation RNTBC (ICN 3720).
    const communityDoc = {
      name: 'Badu Island — Mura Badulgal (Torres Strait Islanders) Corporation RNTBC',
      kind: 'rntbc' as const,
      orgId: 'seed-badu',
      nationCluster: 'western' as const,
      representativeBody: 'GBK',
      nativeTitleDeterminationRef:
        'QCD2004/010 — Badu Islanders #1 (Nona v Queensland [2004] FCA 1578, 14/12/2004); RNTBC ICN 3720',
    }
    let communitiesAdded = 0
    let communitiesUpdated = 0
    const sampleCommunity = await ctx.db
      .query('communities')
      .withIndex('by_orgId', (q) => q.eq('orgId', 'seed-badu'))
      .unique()
    if (sampleCommunity) {
      await ctx.db.patch(sampleCommunity._id, communityDoc)
      communitiesUpdated++
    } else {
      await ctx.db.insert('communities', communityDoc)
      communitiesAdded++
    }

    return {
      fisheriesAdded,
      speciesAdded,
      speciesUpdated,
      licenceTypesAdded,
      gearTypesAdded,
      zonesAdded,
      dugongClosureAdded,
      geometriesSet,
      sharesAdded,
      quotaSeed,
      prawnPeriodAdded,
      sizeLimitsAdded,
      aliasesAdded,
      finfishSchemes,
      bdmSchemes,
      prawnScheme,
      communitiesAdded,
      communitiesUpdated,
    }
  },
})
