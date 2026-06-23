// Reference data + plain-language copy for The Crossing. Grounded in the
// validated domain (docs/validation-findings.md): the s.19 licence family, the
// three Traditional-Inhabitant criteria from the real ID Form, the three
// Councils. Written for a 2nd/3rd-language English reader.

export type LicenceCode =
  | 's19_1_master_fisherman'
  | 's19_2_boat_commercial'
  | 's19_3_carrier_processing'
  | 's19_4a_non_boat_commercial'
  | 's19_4b_fish_receiver'
  | 's20_treaty_endorsement'
  | 's12_scientific_permit'

export const LICENCE_TYPES: { code: LicenceCode; name: string; plain: string }[] = [
  { code: 's19_2_boat_commercial', name: 'Boat (commercial)', plain: 'A boat you use for commercial fishing. The most common TIB licence.' },
  { code: 's19_1_master_fisherman', name: 'Master fisherman', plain: 'You run the fishing on the boat.' },
  { code: 's19_4a_non_boat_commercial', name: 'Without a boat', plain: 'Commercial diving or hand-collection — no boat (e.g. bêche-de-mer, trochus).' },
  { code: 's19_3_carrier_processing', name: 'Carrier / processing', plain: 'A boat that carries or processes catch.' },
  { code: 's19_4b_fish_receiver', name: 'Fish receiver', plain: 'You buy and receive fish from fishers.' },
]

export type Criterion = 'tsi_resident_citizen' | 'aboriginal_ts_npa' | 'png_amnesty_or_descendant'

export const CRITERIA: { code: Criterion; name: string; plain: string }[] = [
  {
    code: 'tsi_resident_citizen',
    name: 'Torres Strait Islander',
    plain: 'A Torres Strait Islander who lives in the area and is an Australian citizen, who keeps up traditional customs.',
  },
  {
    code: 'aboriginal_ts_npa',
    name: 'Aboriginal of the Torres Strait / NPA',
    plain: 'An Aboriginal traditional inhabitant of the Torres Strait or Northern Peninsula Area.',
  },
  {
    code: 'png_amnesty_or_descendant',
    name: 'PNG traditional inhabitant',
    plain: 'A PNG traditional inhabitant, now an Australian citizen (1978/79 amnesty list), or their descendant. Needs a Home Affairs letter.',
  },
]

export const COUNCILS = [
  'Torres Strait Island Regional Council',
  'Torres Shire Council',
  'Northern Peninsula Area Regional Council',
]

// The legs of the voyage (scene order). The tide rail fills across these.
export const LEGS = [
  'Cast off',
  'Who',
  'Saltwater country',
  'The licence',
  'Saying yes',
  'Check the boat',
  'The crossing',
] as const
export type Leg = number // index into LEGS
