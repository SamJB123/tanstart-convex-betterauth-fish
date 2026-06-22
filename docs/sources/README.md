# Source documents for quota-engine grounding

Drop downloaded PDFs into this folder using the **filename** in each row below.
Once they're here, agents will read them directly (no web 403s/timeouts) to
verify the "inferred/generalised" and "weak/speculative" areas of the quota
engine. Tick the box when a file is in place.

Save as **PDF** where possible (legislation.gov.au offers PDF/Word downloads;
for AustLII/HTML pages use the browser "Save as PDF"). The `[blocked]` tag marks
sources our automated fetch couldn't reach (403 / timeout / scanned image).

## Tier 1 — the legal core (highest value)

| ☐ | Filename | Source | Resolves |
|---|----------|--------|----------|
| ☐ | `tsfa-1984.pdf` | Torres Strait Fisheries Act 1984 (Cth), latest compilation — legislation.gov.au (start `Details/C2016C00677`, get latest) `[blocked]` | Statutory definitions (traditional fishing, traditional inhabitant, community fishing), licence categories, who issues, over-quota/offence provisions |
| ☐ | `tsfa-regulations.pdf` | Torres Strait Fisheries Regulations (current) — legislation.gov.au | Subordinate detail to the Act |
| ☐ | `tsf-trl-instrument.pdf` | Torres Strait Fisheries TRL / Tropical Rock Lobster (Kaiar) Management Plan **or** Management Instrument — legislation.gov.au / PZJA | TRL quota mechanics: TIB sector kg allocation vs TVH quota units, conversion factor, carryover (or none), season/closures |
| ☐ | `tsf-finfish-instrument-2020.pdf` | Torres Strait Fisheries (Finfish) Management Instrument 2020 — legislation.gov.au / PZJA | Finfish/reef-line + barramundi: TAC framework, size/gear, closures |
| ☐ | `tsf-prawn-plan.pdf` | Torres Strait Fisheries (Torres Strait Prawn Fishery) Management Plan — legislation.gov.au | Effort (TAE) mechanics in law: effort units, VMS day rules, leasing/auto-revert, season times |
| ☐ | `tsf-spanish-mackerel-instrument.pdf` | Torres Strait Spanish Mackerel management instrument — legislation.gov.au / PZJA | Mackerel TAC, Sunset/TSRA-trust mechanics |
| ☐ | `tsf-bdm-instrument.pdf` | Torres Strait Bêche-de-mer management instrument — legislation.gov.au / PZJA | Per-species TACs, prohibited species, size limits |
| ☐ | `tsf-trochus-pearl-crab-instruments.pdf` | Trochus / Pearl Shell / Crab instruments (combine if separate) — legislation.gov.au / PZJA | Size/gear-only management specifics |
| ☐ | `akiba-2013-hca-33.pdf` | Akiba v Commonwealth [2013] HCA 33 — full judgment, AustLII or hcourt.gov.au `[blocked]` | Whether native-title right is communal & includes commercial take; regulation-not-extinguishment |
| ☐ | `native-title-act-1993-s211.pdf` | Native Title Act 1993 (Cth) — at least s211 — legislation.gov.au | The traditional-fishing exemption/defence (vs an issued permit) |

## Tier 2 — mechanics, reporting & system detail

| ☐ | Filename | Source | Resolves |
|---|----------|--------|----------|
| ☐ | `tspf-mab-2025.pdf` | TS Prawn Fishery Management Arrangements Booklet 2025 — pzja.gov.au | Operational effort-day counting, lease auto-revert, season datetimes (we have a summary; want the full text) |
| ☐ | `tsf01-finfish-logbook.pdf` | AFMA TSF01 Torres Strait Finfish logbook `[blocked: scanned]` | Real catch fields + TS species code list + TEP-interaction list |
| ☐ | `trl04-rock-lobster-logbook.pdf` | AFMA TRL04 logbook `[blocked: scanned]` | TRL catch/effort fields |
| ☐ | `ts-prawn-logbook.pdf` | AFMA Torres Strait prawn logbook | Prawn effort/catch fields |
| ☐ | `ts-cdr-tdb02.pdf` | Torres Strait Catch Disposal Record (the "TDB02" referenced in Catchwatch footnotes), if one exists — AFMA/PZJA | The authoritative landed-weight deduction form for TS (vs Commonwealth SESS2B) |
| ☐ | `anao-45-2020-21.pdf` | ANAO Report No.45 (2020-21) Management of Commonwealth Fisheries — anao.gov.au | Definitive PISCES description + report types |
| ☐ | `anao-47-2008-09.pdf` | ANAO Report No.47 (2008-09) Domestic Fishing Compliance — anao.gov.au | PISCES origin/architecture, e-Licensing, data-model gaps |
| ☐ | `torres-strait-treaty.pdf` | Torres Strait Treaty text — dfat.gov.au `[blocked]` | Seabed vs fisheries jurisdiction lines; traditional-fishing definition; AU/PNG catch-sharing |
| ☐ | `pzja-dugong-turtle-plans.pdf` | PZJA dugong/turtle fishery page + a community-based Dugong & Turtle Management Plan (TSRA), and FMN 65 (dugong) / FMN 66 (turtle) if downloadable | The actual (non-quota) management model for traditional take |

## Tier 3 — bonus (only if easy)

| ☐ | Filename | Source | Resolves |
|---|----------|--------|----------|
| ☐ | `fma-1991.pdf` | Fisheries Management Act 1991 (Cth) `[blocked]` | Commonwealth SFR/quota register & dealings — for contrast, to confirm what does NOT apply to TS |
| ☐ | `afma-fmp-10-carryover.pdf` | AFMA FMP 10 undercatch/overcatch | Confirm carryover %s are Commonwealth-only |
| ☐ | `pisces-stored-procedures/` | Any export of PISCES SQL / stored procedures / source, if obtainable from AFMA | The TRUE ground truth for quota calculation logic (legacy-rule recovery) |

---

### Notes
- Exact legislative-instrument titles/IDs may differ — search legislation.gov.au
  for "Torres Strait Fisheries" (Acts + Legislative Instruments) and grab the
  current compilations.
- Some questions may have **no documentary answer** and need AFMA/PZJA experts —
  see the parent task notes (esp. event/cultural-significance quota).

---

## Round 2 — legislative instruments (from the Legislative Instruments CSV)

Download from `legislation.gov.au` via the Register ID, e.g.
`https://www.legislation.gov.au/F2025L01406/latest/downloads`. Save as PDF into
this folder. NB: the s.16 Management *Instruments* carry gear/size/closure rules
(distinct from the Management *Plans* we already hold).

### Tier 1 — closes the open green gaps
| ☐ | Filename | Register ID | Resolves |
|---|----------|-------------|----------|
| ☐ | `trl-tac-determination-2025.pdf` | F2025L01406 | Current TRL TAC → per-unit kg value |
| ☐ | `trl-tac-amendment-2026.pdf` | F2026L00100 | Latest TRL TAC |
| ☐ | `trl-management-instrument-2018.pdf` | F2018L01044 | TRL moontide / hookah / season closures |
| ☐ | `prawn-management-instrument-2025.pdf` | F2025L01637 | Prawn gear, night-trawl |
| ☐ | `prawn-season-determination-2025.pdf` | F2025L01639 | Prawn season dates/times (6pm–6am) |
| ☐ | `community-fishing-notice-1.pdf` | F2008B00622 | s.17 licence-required declaration (mandatory reporting) |
| ☐ | `furnishing-of-logbooks-instrument-2024.pdf` | F2024L01449 | Current logbook obligation |
| ☐ | `afma-specific-fishing-logbooks-2015.pdf` | C2015G00269 | Logbook / species fields |

### Tier 2 — current per-fishery s.16 instruments (complete the model + Sunset)
| ☐ | Filename | Register ID |
|---|----------|-------------|
| ☐ | `spanish-mackerel-management-instrument-2025.pdf` | F2025L01636 |
| ☐ | `beche-de-mer-management-instrument-2022.pdf` | F2022L00176 |
| ☐ | `crab-management-instrument-2025.pdf` | F2025L01635 |
| ☐ | `trochus-management-instrument-2025.pdf` | F2025L01638 |
| ☐ | `pearl-shell-instrument-2020.pdf` | F2020L01222 |
| ☐ | `finfish-management-instrument-2020.pdf` | F2020L01216 |
| ☐ | `management-instrument-12.pdf` | F2017L00169 |
| ☐ | `management-instrument-16.pdf` | F2017L00371 |

### Tier 3 — optional (spatial / gear)
| ☐ | Filename | Register ID |
|---|----------|-------------|
| ☐ | `adjacent-coastal-area-australia.pdf` | F2008B00752 |
| ☐ | `adjacent-coastal-area-png.pdf` | F2008B00751 |
| ☐ | `prawn-brd-instrument-2024.pdf` | F2024L00600 |
| ☐ | `coral-live-rock-management-instrument-2020.pdf` | F2020L01215 (only if adding that fishery) |
