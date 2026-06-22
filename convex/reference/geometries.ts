// Detailed zone geometries (GeoJSON, [lng, lat] decimal degrees) extracted from
// primary sources: the Torres Strait Treaty Annexes (9 = Protected Zone, 5 =
// Seabed Jurisdiction Line, 8 = Fisheries Jurisdiction Line), the Torres Strait
// Prawn Fishery Management Plan / Instrument Schedules (closures + anchorages),
// FMN 65 (dugong sanctuary), and the s.3(3) adjacent-coastal-area declarations.
//
// Caveats preserved from extraction:
//  - Some Treaty segments follow coastlines / 3-nm territorial-sea arcs rather
//    than straight chords (Annex 9 points around Black Rocks/Bramble/Anchor/East
//    Cay and the PNG coast); the rings use the listed vertices as straight legs.
//  - Prawn closures are WGS84 (the legally authoritative AGD66 differs by ~30 m);
//    a few West/East-of-Warrior legs follow 3-nm arcs / coastline.
//  - The dugong sanctuary's NE vertex is the geodesic Annex-8 point at 142°E; the
//    141°01'E/north vertex is a linear interpolation on that geodesic (~-10.365).
//  - The Australia adjacent-coastal-area northern edge follows the Annex 5 line.

export type ZoneGeometry = {
  name: string
  kind?:
    | 'tspz'
    | 'management_area'
    | 'closure_area'
    | 'sea_country'
    | 'jurisdiction_line'
  geometryType: 'Polygon' | 'LineString'
  coordinates: number[][] | number[][][] // GeoJSON coords (Polygon: [ring]; LineString: points)
  bbox: { west: number; south: number; east: number; north: number }
  datum?: 'WGS84' | 'AGD84'
  legalBasis?: string
}

export const ZONE_GEOMETRIES: ZoneGeometry[] = [
  // --- Treaty boundaries ---
  {
    name: 'Torres Strait Protected Zone',
    kind: 'tspz',
    geometryType: 'Polygon',
    coordinates: [[
      [144.166667, -10.466667], [141.333333, -10.466667], [141.333333, -9.55],
      [141.95, -9.216667], [141.95, -9.133333], [142.6, -9.15], [142.6, -9.35],
      [143.788889, -9.15], [143.927778, -9.180556], [144.102778, -9.311111],
      [144.280556, -9.447222], [144.466667, -9.5875], [144.466667, -9.9],
      [144.2, -10.25], [144.166667, -10.466667],
    ]],
    bbox: { west: 141.333333, south: -10.466667, east: 144.466667, north: -9.133333 },
    legalBasis: 'Torres Strait Treaty Annex 9',
  },
  {
    name: 'Seabed Jurisdiction Line',
    kind: 'jurisdiction_line',
    geometryType: 'LineString',
    coordinates: [
      [139.2, -10.833333], [139.383333, -11.15], [140.0, -10.983333],
      [142.0, -9.766667], [142.058333, -9.756667], [142.383333, -9.7],
      [142.85, -9.675], [143.0, -9.666667], [143.083333, -9.55],
      [143.333333, -9.55], [143.5, -9.4], [143.8, -9.366667], [144.25, -9.5],
      [144.733333, -9.85], [146.5, -12.333333], [147.141667, -12.641667],
      [148.083333, -13.175], [152.116667, -14.633333], [154.25, -14.75],
      [156.616667, -14.083333], [157.0, -14.066667],
    ],
    bbox: { west: 139.2, south: -14.75, east: 157.0, north: -9.4 },
    legalBasis: 'Torres Strait Treaty Annex 5',
  },
  {
    name: 'Fisheries Jurisdiction Line',
    kind: 'jurisdiction_line',
    geometryType: 'LineString',
    coordinates: [
      [139.2, -10.833333], [139.383333, -11.15], [140.0, -10.983333],
      [142.0, -9.766667], [142.058333, -9.756667], [142.058333, -9.261944],
      [142.106944, -9.213889], [142.1425, -9.1975], [142.171667, -9.199444],
      [142.215, -9.189444], [142.235556, -9.192778], [142.273889, -9.231389],
      [142.344722, -9.267778], [142.494722, -9.367778], [142.524722, -9.363333],
      [142.557778, -9.375833], [142.591389, -9.356944], [142.695278, -9.339167],
      [142.731389, -9.337778], [142.805, -9.323889], [142.85, -9.394444],
      [142.85, -9.675], [143.0, -9.666667], [143.083333, -9.55],
      [143.333333, -9.55], [143.5, -9.4], [143.8, -9.366667], [144.25, -9.5],
      [144.733333, -9.85], [146.5, -12.333333], [147.141667, -12.641667],
      [148.083333, -13.175], [152.116667, -14.633333], [154.25, -14.75],
      [156.616667, -14.083333],
    ],
    bbox: { west: 139.2, south: -14.75, east: 156.616667, north: -9.189444 },
    legalBasis: 'Torres Strait Treaty Annex 8',
  },
  {
    name: 'Western Torres Strait Dugong Sanctuary',
    kind: 'closure_area',
    geometryType: 'Polygon',
    coordinates: [[
      [141.0167, -11.1667], [141.0167, -10.3648], [142.0, -9.7667],
      [142.0, -11.1667], [141.0167, -11.1667],
    ]],
    bbox: { west: 141.0167, south: -11.1667, east: 142.0, north: -9.7667 },
    legalBasis: 'Torres Strait Fisheries Management Notice No. 65, Schedule',
  },
  // --- Prawn fishery closures / anchorages (WGS84) ---
  {
    name: 'West of Warrior Reef Exclusion Zone',
    kind: 'closure_area',
    geometryType: 'Polygon',
    coordinates: [[
      [142.001103, -9.765189], [142.059433, -9.755186], [142.059433, -9.260469],
      [142.108042, -9.212414], [142.143597, -9.196025], [142.172764, -9.197969],
      [142.216097, -9.187969], [142.236653, -9.191303], [142.274986, -9.229911],
      [142.345819, -9.2663], [142.495817, -9.3663], [142.525817, -9.361856],
      [142.558872, -9.374356], [142.592483, -9.355467], [142.696369, -9.337689],
      [142.732481, -9.3363], [142.806092, -9.322411], [142.851092, -9.392964],
      [142.851092, -9.673519], [143.001092, -9.665186], [143.084422, -9.548519],
      [143.184422, -9.548519], [143.039981, -9.765183], [142.851094, -10.215183],
      [142.531375, -10.465181], [142.642764, -10.686569], [142.531378, -10.686569],
      [142.531378, -10.687542], [142.151103, -10.932681], [142.151103, -10.465183],
      [141.334444, -10.465186], [141.334442, -10.173167], [142.001103, -9.765189],
    ]],
    bbox: { west: 141.334442, south: -10.932681, east: 143.184422, north: -9.187969 },
    datum: 'WGS84',
    legalBasis: 'TS Prawn Fishery Management Plan 2009 Sch 1 Pt 2 (permanent closure)',
  },
  {
    name: 'East of Warrior Reef Closed Areas',
    kind: 'closure_area',
    geometryType: 'Polygon',
    coordinates: [[
      [142.942203, -9.998517], [143.074425, -9.998517], [143.159422, -9.873517],
      [143.234422, -9.765183], [143.284422, -9.60685], [143.334419, -9.548519],
      [143.330531, -9.548519], [143.295531, -9.512408], [143.296086, -9.511853],
      [143.296364, -9.509908], [143.293864, -9.510186], [143.291642, -9.510464],
      [143.289697, -9.511297], [143.286642, -9.512408], [143.285253, -9.513242],
      [143.285253, -9.514075], [143.248589, -9.548519], [143.184422, -9.548519],
      [143.039981, -9.765183], [142.942203, -9.998517],
    ]],
    bbox: { west: 142.942203, south: -9.998517, east: 143.334419, north: -9.509908 },
    datum: 'WGS84',
    legalBasis: 'TS Fisheries (Prawn) Management Instrument 2025 Sch 1 (seasonal closure 1 Feb–31 Jul)',
  },
  {
    name: 'Aureed Island Anchorage Zone',
    kind: 'management_area',
    geometryType: 'Polygon',
    coordinates: [[
      [143.315583, -9.933083], [143.322883, -9.95515], [143.300633, -9.979783],
      [143.2647, -9.975283], [143.264233, -9.957867], [143.286133, -9.933383],
      [143.315583, -9.933083],
    ]],
    bbox: { west: 143.264233, south: -9.979783, east: 143.322883, north: -9.933083 },
    datum: 'WGS84',
    legalBasis: 'TS Fisheries (Prawn) Management Instrument 2025 Sch 2 (anchorage)',
  },
  {
    name: 'Yorke Island Anchorage Zone',
    kind: 'management_area',
    geometryType: 'Polygon',
    coordinates: [[
      [143.460783, -9.71995], [143.467183, -9.729733], [143.467883, -9.7452],
      [143.459783, -9.757633], [143.44595, -9.764217], [143.4288, -9.767317],
      [143.40925, -9.772617], [143.397133, -9.7683], [143.390517, -9.756333],
      [143.393567, -9.746083], [143.44275, -9.7211], [143.460783, -9.71995],
    ]],
    bbox: { west: 143.390517, south: -9.772617, east: 143.467883, north: -9.71995 },
    datum: 'WGS84',
    legalBasis: 'TS Fisheries (Prawn) Management Instrument 2025 Sch 2 (anchorage)',
  },
  {
    name: 'Dugong Island Anchorage Zone',
    kind: 'management_area',
    geometryType: 'Polygon',
    coordinates: [[
      [143.074383, -10.50545], [143.096817, -10.5053], [143.112267, -10.51],
      [143.123033, -10.5183], [143.123767, -10.53205], [143.118017, -10.54185],
      [143.104067, -10.5438], [143.065733, -10.52415], [143.074383, -10.50545],
    ]],
    bbox: { west: 143.065733, south: -10.5438, east: 143.123767, north: -10.50545 },
    datum: 'WGS84',
    legalBasis: 'TS Fisheries (Prawn) Management Instrument 2025 Sch 2 (anchorage)',
  },
  {
    name: 'Coconut Island Anchorage Zone',
    kind: 'management_area',
    geometryType: 'Polygon',
    coordinates: [[
      [143.066867, -10.04005], [143.07485, -10.04055], [143.1003, -10.044483],
      [143.11985, -10.040867], [143.131517, -10.045417], [143.1362, -10.060683],
      [143.110133, -10.072467], [143.076033, -10.074117], [143.045283, -10.0558],
      [143.058317, -10.0422], [143.066867, -10.04005],
    ]],
    bbox: { west: 143.045283, south: -10.074117, east: 143.1362, north: -10.04005 },
    datum: 'WGS84',
    legalBasis: 'TS Fisheries (Prawn) Management Instrument 2025 Sch 2 (anchorage)',
  },
  {
    name: 'Torres Strait Prawn Fishery Area (coordinate component)',
    kind: 'management_area',
    geometryType: 'Polygon',
    coordinates: [[
      [142.151103, -10.465183], [144.001083, -10.465178], [144.001083, -10.686564],
      [142.531378, -10.686569], [142.531378, -10.687542], [142.151103, -10.932681],
      [142.151103, -10.465183],
    ]],
    bbox: { west: 142.151103, south: -10.932681, east: 144.001083, north: -10.465178 },
    datum: 'WGS84',
    legalBasis: 'TS Prawn Fishery Management Plan 2009 Sch 1 Pt 1 (component (b) only — full area also follows the Fisheries Jurisdiction Line + territorial-sea limit)',
  },
  // --- Adjacent coastal area (s.3(3) declaration); N edge follows Annex 5 ---
  {
    name: 'Australia Adjacent Coastal Area',
    kind: 'management_area',
    geometryType: 'Polygon',
    coordinates: [[
      [142.0, -11.0], [143.0, -11.0], [143.0, -9.666667], [142.85, -9.675],
      [142.383333, -9.7], [142.058333, -9.756667], [142.0, -9.766667],
      [142.0, -11.0],
    ]],
    bbox: { west: 142.0, south: -11.0, east: 143.0, north: -9.666667 },
    legalBasis: 'Declaration of adjacent coastal area of Australia (s.3(3)(a)); N edge = Treaty Annex 5 line',
  },
]
