# Quota-engine grounding — validation findings

> Date: 2026-06-22 · Method: six research agents reading the primary PDFs in
> `docs/sources/` (Torres Strait Fisheries Act 1984; Regulations 1985; TRL Quota
> Management Plan 2018; Finfish Management Plan 2013; Prawn Management Plan 2009;
> *Akiba v Commonwealth* [2013] HCA 33; Native Title Act 1993 s211; Torres Strait
> Treaty). Verdicts: **Confirmed** / **Corrected** / **needs-AFMA/PZJA**.

## Headline

The **architecture holds** — polymorphic measure + append-only ledger + derived
balance, and the **Hybrid** native-title/commercial split. But several rules I
had generalised from the Commonwealth regime are **wrong for the Torres Strait**,
and the **event/cultural-significance quota measure has no statutory basis**.

---

## 1. Quota & effort mechanics

| Item | Verdict | Finding (citation) |
|---|---|---|
| Per-unit kg = TAC ÷ total units, recomputed/season | **Confirmed** | TRL Plan s.12; total units fixed at **1,000,000** (s.15(1)); processed-tail conversion factor **2.677** (s.10) |
| TIB = sector kg allocation; TVH = individual units | **Corrected** | Both denominated in **units**. Traditional-Inhabitant sector = **562,000 units (56.2%) held by TSRA as a pool** → **competitive/"Olympic" catch** ended by a **closure notice** when the pool is reached (s.8(2), s.11, s.15(1)(a)). TVH = **438,000 units (43.8%)**, individual ITQ (s.15(1)(b)) |
| Over-quota → land negative, reconcile in ~28 days | **Corrected** | **No reconciliation window exists in TS law.** Over-quota is a **strict-liability offence** (Act s.44(2), s.45(1)(d)/(4)) + court-ordered **forfeiture** (s.52) + **unit suspension/cancellation** (TRL s.28) |
| Undercatch/overcatch carryover (10/20/0%) | **Corrected** | **Zero carryover**, both fisheries. "Unused quota units… can only be used in that fishing season" (TRL s.5) |
| Permanent transfer + seasonal lease | **Confirmed (+restrictions)** | TRL s.24–26; Prawn 4.6–4.7. Add: TSRA non-transferable; no-trust transferees; whole-units-only (prawn); leased units non-re-transferable; registration-gated with mandatory-refusal grounds (suspended / under investigation / fees owing) |
| Effort (Prawn) = fishing-days; entitlement = TAE-share; leases revert; no carryover | **Confirmed (+nuance)** | Prawn 4.1–4.7. **Floor to whole days** (4.3(3)); units capped **≤9,200 (6,867 AU / 2,333 PNG)** (4.2); **≤61 boat licences** (3.2(3)); **TAE reviewed ≥ every 3 years**, not per season (2.5(1)) |

**Missed mechanics to add:** sector pooling + closure trigger (TI sector);
mid-season TAC/TAE change (recompute); processed-product conversion factor;
PNG/Treaty unit trust bucket; quota-unit lifecycle states (suspended/cancelled);
prawn by-product weight TAC layered on effort; PPSA security interests over units.

---

## 2. Licensing & eligibility

| Item | Verdict | Finding (citation) |
|---|---|---|
| "community fishing" = commercial fishing by Traditional Inhabitants (≠ native-title right) | **Confirmed** | Act s.3(1) definitions; "commercial fishing… does not include traditional fishing" |
| TI + Australian citizen → community-fishing eligibility | **Confirmed** | s.3(1); citizenship is **subsumed** within "traditional inhabitant" (Treaty Art 1(m)). Also allow **group** holders (Finfish Plan s.4.2(4)) |
| TIB / TVH are licence types | **Corrected** | **Not in law** (0 occurrences). They are **sector/holder attributes**. Underlying licence is the s.19(2) boat licence |
| Carrier Boat | **Confirmed (rename)** | = **s.19(3)** carrier/processing licence ("TPC" in Finfish Plan) |
| Master Fisherman; Fish Receiver | **Confirmed** | s.19(1); s.19(4B) |
| Sunset | **Corrected** | Finfish-Plan construct only (group-held, temporary-transfer-once). needs-AFMA for other fisheries |
| Issuer = AFMA | **Corrected** | Issuer = **PZJA** (s.30, s.36(2); reg "licensing authority"); AFMA acts under **delegation** (s.38). *(Our schema already has issuingAuthority=PZJA, administeringAgent=AFMA — keep.)* |
| Licences "held in trust by TSRA" | **Corrected** | **Not in Act/Regs.** Use a **group-holder** concept. (TSRA holding TRL *quota units* for the TI sector is real and lives in the quota layer, per §1.) |
| Per-fishery entries; transfer/lease; traditional fishing licence-exempt | **Confirmed** | Entries s.21 (+conditions s.22); transfer s.25, temporary transfer s.25(1A); traditional fishing needs **no licence** (s.3(1), s.16(1)(m)/(n)) |

**Missed:** s.19(4A) non-boat commercial licence (diving/hand-collection — key for
BDM/trochus/pearl); s.20 Treaty (PNG) endorsement; s.12 scientific/developmental
permit.

### 2.1 Eligibility attestation — the TI Identification Form (CONFIRMED, primary-source)

*Research pass 2026-06-22, verbatim from the PZJA forms (text extracted locally
from the PDFs, not search snippets).*

- **Two-form workflow.** A TIB applicant lodges (1) the **Application for Grant or
  Variation of a Traditional Inhabitant Fishing Boat Licence** (every applicant)
  and (2) the **Traditional Inhabitant Identification Form** (**first-time
  applicants only**). Both head *"Return to: PZJA c/- AFMA"* — direct textual
  confirmation of **PZJA-issues / AFMA-administers** (keep our schema).
  Statutory basis printed on the application: **TSFA 1984 s.19(2), 21(1), 24, 25A**
  — confirms TIB = s.19(2) boat licence + s.21 fishery *entries* (Schedule 2:
  TRL, Pearl Shell, Reef Line, Trochus, Spanish Mackerel, Bêche-de-mer, Crab).
- **The attestation is real, not an assumption.** The ID Form carries **two
  declarations — a Councillor and a Mayor of the *same* Council** (Torres Strait
  Island Regional / Torres Shire / Northern Peninsula Area). Each independently
  ticks one of **three criteria**: (a) TSI resident + Australian citizen with
  customary association; (b) Aboriginal traditional inhabitant of TS/NPA (Treaty);
  (c) PNG traditional inhabitant now an Australian citizen via the 1978/79 amnesty
  list (or a descendant). The form **prohibits the Mayor from relying solely on the
  Councillor** — independent knowledge or sighted evidence is required.
- **Conditional evidence.** Criteria (a)/(b): family tree / residency evidence *may*
  be requested. Criterion (c): a Home Affairs letter is **mandatory** (+ parent's
  letter & birth certificate for a descendant). PZJA retains an explicit
  **override/discretion** clause ("may also utilise other information").
- **→ Model:** a structured **`traditionalInhabitantVerification`** record (a
  first-application precondition, distinct from the licence application), mirroring
  the paper form: applicant block, single-select `criterion`, Councillor block,
  Mayor block (with **same-Council hard validation** + independent-basis enum),
  conditional evidence attachments, and the s.136.1 Criminal-Code truthfulness
  declarations. Photo-of-signed-form is an **attached artifact** on this record,
  not the primary representation. Status flows `attested → pending PZJA
  determination → approved`.
- **needs-AFMA:** (1) is the attestation *statutory* or *PZJA administrative
  policy*? (the form attributes status partly to "decisions of the PZJA"); (2) are
  **e-signatures** accepted in place of wet-ink Councillor/Mayor signatures, and via
  what channel (GoFish / ebusiness.afma.gov.au)?; (3) the **no-attestor / disputed
  status** fallback; (4) re-verification triggers on renewal/transfer.

Sources: PZJA *Traditional Inhabitant Identification Verification* and *TIB Licence*
pages; `tib-application.pdf`; `torres-strait-trad-inhabitant-id.pdf` (PZJA Licencing
Forms, 2023). Full citation list in the research record.

---

## 3. Native title (Hybrid model)

**Verdict: Hybrid stands, with one refinement.** All assumptions confirmed:
- Right is **group-held** (13 island communities), **not communal, not individual**
  (*Akiba* [13], [40]; s223(1) NTA).
- **Non-exclusive**, **"for any purpose" incl. commercial** ([1], [66]–[67], [76]).
- Licensing **regulates, does not extinguish** ([67], [75]) — the central holding.
- **Reciprocal/kin rights are NOT native title** ([44]–[46]).
- **NTA s211** = automatic statutory **exemption** for **non-commercial** personal/
  domestic/communal take by native-title holders — not an issued permit.

**Refinement:** lawful *commercial* exercise is channelled through **individual
s.19 licences** ("community fishing" is a TI-restricted flag on a commercial
licence, not a community allocation in the Act). A community-level *commercial*
allocation is **needs-AFMA** — though note the TRL Plan's TSRA-held 562k-unit TI
pool is the closest real instance.

→ Model traditional take as an **eligibility check** (community membership / TI
status + non-commercial purpose), **not** an issued entitlement.

---

## 4. Event / cultural-significance measure — **UNSUPPORTED**

**Verdict: drop or relabel; needs-AFMA.** No instrument defines a count- or
per-occasion cultural-event authorisation. The law has exactly **two** quota-type
measures: **weight (TAC/units)** and **effort (TAE)**. "Cultural events" appear
only **descriptively**, in the Treaty's definition of "traditional activities"
(Act Sch 1, Art 1) — a *permitted purpose* for uncapped traditional fishing, never
a counted entitlement. Dugong/turtle appear only in the "traditional fishing"
definition + geographic "fishery area" definitions (Regs Sch 2) — no quota/event
mechanism. Management plans **exclude** traditional fishing entirely (Finfish
s.1.10).

→ Remove `event` as a peer measure. Represent traditional/cultural take as an
**uncapped, status-and-purpose-based category** (limited only by generic s.16
conservation instruments). Ask AFMA whether any *non-statutory* community plan or
permit imposes counted cultural-take limits.

---

## 5. Catch & effort reporting

| Item | Verdict | Finding |
|---|---|---|
| `effortDays` | **Corrected** | Logbook effort is **hours** (+ line count / diver count), not days. (Days are the *prawn quota* unit, a different thing.) |
| Sub-platform grain | **Missing** | Catch/effort recorded **per tender/dinghy and per diver** — we have no sub-event grain |
| `weightKg` single field | **Corrected** | Need **multiple weight kinds**: whole/fresh, lobster **tails**, **live**, gilled-&-gutted |
| Carton/tray aggregation | **Missing** | Primary mackerel & coral-trout measure (no. cartons, avg kg/carton, fish/carton) |
| Size grade + species split | **Corrected** | Coral trout: Plate/Med/Large grade + Common/Islander/Leopard/Bluespot % — scalar `sizeValue` insufficient |
| Non-fishing / nil return | **Missing** | Every licence-day must be accounted for (non-fishing code 1–5 + date range) |
| Trip code, ports, landing date | **Corrected** | Add tripCode (S/C/E/D), portOfDeparture, portOfLanding, departure/landing dates |
| Gear enum | **Corrected** | Add **Hookah / Free-dive** (TRL) alongside line methods (LHL/LTL/LDR) |
| Region | **Missing** | TRL boats split days **TS vs QLD East Coast** |
| Protected-species interactions | **Corrected** | Per-**individual** rows: time, lat/long, caught-phase (haul/set/other), hooked-vs-entangled, life status (alive/dead/injured), band/tag, observer-on-board, notes |
| Species codes | **Corrected** | Logbooks use **plain common-name groups, no CAAB and no AFMA codes**. Build a **logbook-group → CAAB alias** layer (groups are coarser than CAAB taxa) |
| Reporting mandatory for TIB | **needs-AFMA** | Mandatory **only if** a s.17(1) declaration requires a s.19 licence (then Reg 12 applies, due by **14th of the following month**). Otherwise effectively voluntary. Don't hard-code |
| Catch Disposal Record | **Corrected** | **No standalone CDR in TS.** Disposal captured in the logbook (Reg 12) + Port of Landing; `catchVerifications` → optional, receiver-licence-linked |

---

## 6. Spatial / zones

| Item | Verdict | Finding |
|---|---|---|
| TSPZ definition | **Confirmed** | Treaty Art 1(g), Art 10; boundary = **Annex 9** |
| Two jurisdiction lines | **Confirmed** | **Seabed Line = Annex 5** (sedentary); **Fisheries Line = Annex 8** (swimming). Jurisdiction is **f(point, speciesClass)** — same point can be AU for one class, PNG for the other (Act s.3(1)) |
| AU/PNG catch-sharing | **Confirmed (numbers needs-AFMA)** | Treaty Art 23(4): **75/25** (AU jurisdiction), **50/50** (named cays), **25/75** (PNG jurisdiction); barramundi PNG-sole. TRL Plan only fixes the **AU-internal** 56.2/43.8 sector split |
| Area closures via `zoneStatus` | **Corrected** | **Permanent coordinate-defined exclusions** (e.g. "West of Warrior Reef Exclusion Zone", Prawn Plan Sch 1 Pt 2) are **profile geometry**, not status. Reserve `zoneStatus` for dynamic in-season closures. Add a **datum** field (AGD84 authoritative vs WGS84) |
| Prawn 6pm–6am daily window | **needs-AFMA** | Not in Treaty/Act/Plans — lives in the Regs/PZJA determinations. Model daily time-of-day window separately from season dates |

---

## Consolidated schema / seed change set

**A. Quota measure (`shared/validators.ts`)**
1. Weight measure: **remove** `reconciliationWindowDays`, `undercatchCarryoverPct`,
   `overcatchCarryoverPct`. Keep `perUnitKgValue`, `conversionFactors`. Add
   `totalUnits` (fixed) at scheme level.
2. `overQuotaPolicy`: drop `window`; over-quota is a **breach event** (hard stop).
3. **Remove the `event` measure** (or rename to a clearly non-statutory marker
   pending AFMA). Keep `weight` and `effort`.
4. Effort measure: note TAE reviewed ≥3-yearly; floor entitlement to whole days.

**B. Quota tables (`quota/`)**
5. Add a **pooled/competitive** scheme flag + **closure-notice** state for the TI
   sector; allow an **agency holder** (TSRA) holding the sector pool.
6. Entitlement: keep Hybrid; add `unitStatus` (active/suspended/cancelled);
   represent PNG/Treaty trust units.
7. Seed (later, quota pass): TRL total **1,000,000** units (TSRA 562,000 / TVH
   438,000); conversion factor **2.677**; Prawn ≤9,200 effort units (6,867/2,333).

**C. Licensing (`licensing/`)**
8. Refactor `licenceTypes` to **statutory subsections**: s19(1) master fisherman,
   s19(2) boat commercial, s19(3) carrier/processing, **s19(4A) non-boat**,
   s19(4B) fish receiver, **s20 Treaty endorsement**, **s12 scientific permit**.
9. Move **TIB/TVH** to a **sector/holderClass** attribute (not a licence type).
10. **Remove `heldInTrustByPartyId`**; add holder type incl. **group**. ("Sunset"
    becomes a fishery-plan licence variant.)
11. Keep issuer=PZJA / administeringAgent=AFMA (already correct). Add `entries[]`
    (s21) distinct from Treaty endorsements.

**D. Catch (`catch/`)**
12. Replace `effortDays` with structured effort (hours, lines, divers) + a derived
    prawn fishing-day for the effort ledger.
13. Add a **sub-platform grain** (tender/dinghy + diver).
14. Multi-kind weights; carton/tray fields; coral-trout grade + species split.
15. Non-fishing/nil-return; tripCode; ports; landing date; region (TS/QLD-EC);
    gear enum incl. hookah/free-dive.
16. Enrich `protectedSpeciesInteractions` (per-individual rich fields).
17. Add a **logbook-group → CAAB alias** table; `catchVerifications` → optional.
18. Per-fishery **reporting-required** flag (driven by s17 declaration).

**E. Reference / spatial (`reference/`)**
19. Two jurisdiction-line zones (Annex 5 / Annex 8) with a `governingLine` /
    `speciesClass` discriminator; jurisdiction lookup takes species class.
20. Permanent exclusions as `zones.kind: closure_area` geojson; add `datum`.
21. Catch shares as records keyed by `(fishery, jurisdictionContext)`; AU-internal
    sector axis. Add `legalBasis`/`sourceRef` to zones.
22. Separate **daily time-of-day window** from season dates.

---

## Open questions for AFMA / PZJA

1. Which current **s.17(1) declarations** require a s.19 licence (→ mandatory
   logbook reporting) for the TRL and finfish **community/TIB** fisheries?
2. Is there **any** counted, per-event/per-occasion **cultural-take** authorisation
   anywhere (instrument, community plan, or permit condition)? — confirms whether
   the event measure should exist at all.
3. For **dugong/turtle**: are there community management plans/permits with numeric
   limits, and are any **statutory**?
4. Current **TRL AU/PNG TAC split** number and the **prawn 6pm–6am** window +
   **hookah/moontide** gear closures (these live in Regs/determinations we don't
   have).
5. Does any TS instrument impose a **disposal docket/receiver return** beyond the
   logbook (esp. TRL live export)?
6. Do **other fisheries** have a **Sunset-equivalent** licence?
7. Are there **newer electronic-logbook field sets / species code lists** (our
   logbooks are the June 2003 paper editions)?
8. Does any community-level **commercial** allocation exist beyond the TSRA-held
   TI-sector pool?

---

## Round 2 extraction (2026-06-22) — from the legislative instruments

Read the current instruments in `docs/sources/` (TAC determinations, s.16
Management Instruments, Community Fishing Notice, 2024 logbook instrument, AFMA
logbooks gazette). Applied to the seed where confident.

### Resolved
- **Current TRL TAC = 268,852.5 kg** (Amendment Determination 2026, `F2026L00100`,
  up from 200,000 kg in `F2025L01406`); season 1 Dec 2025 – 30 Sep 2026. →
  `perUnitKgValue = 0.2688525` (TAC ÷ 1,000,000). **Placeholder resolved.**
- **Prawn season** = 6pm 1 Feb → 6am 1 Dec (AEST); daily night-trawl window
  **1800–0600** (`F2025L01639` s.4; `F2025L01637` s.8(3)). Seeded to `periods`.
- **TIB/community reporting is NOT mandatory** — the 2024 Furnishing of Logbooks
  Instrument (`F2024L01449`) **s.8 expressly excludes traditional inhabitants
  engaged in community fishing**; the duty (s.9) attaches only to s.19-licensed/
  s.20-endorsed boats in *commercial* fishing. Community Fishing Notice No. 1
  (`F2008B00622`) requires a s.19 licence for community fishing, but the logbook
  duty is independently carved out. **Open question #1 resolved.**
- **Sandfish is a TAKE species** (BDM Instrument 2022 `F2022L00176` s.7, 18 cm
  min) — seed corrected `prohibited → commercial_quota`.
- **Sunset licence**: confirmed in **Mackerel** (`F2025L01636` s.4/s.11); the term
  is **not** in the s.16 Finfish Instrument (likely in the Finfish *Plan*); **not**
  in BDM/Crab/Trochus/Pearl. (Partly resolves #6.)
- **Size limits** seeded for 11 species (carapace/tail/length/shell measures) with
  instrument citations; schema enum extended (`shell_width_mm`, `shell_length_mm`).
- **Closures captured** (not all seeded yet): TRL hookah season 1 Feb–30 Sep +
  moontide closures by CEO notice + diving-gear night ban 1900–0600; prawn East-of-
  Warrior closed 1 Feb–31 Jul + permanent exclusion zones; prawn gear = otter trawl
  ≤88 m + mandatory BRDs (no TED in the instrument).
- **Logbook species codes are AFMA 3-letter codes** (SNM, TCG, RSE, …), NOT CAAB —
  13 aliases seeded into `logbookSpeciesAliases` (mapped to CAAB where seeded).

### New open items for AFMA / PZJA
9. **Sector split discrepancy**: TRL Management Instrument s.4A says the **TIB
   sector = 66.17% of TAC**, but the Quota Plan 2018 s.15(1) sets **TI = 562,000
   units (56.2%)**. Which governs the operative TI-sector kg cap? (Seed currently
   holds 562,000 units, `allowance: null`.)
10. **Sandfish / surf redfish**: listed as take species, but their per-species TAC
    may be **0 (effectively closed)** — confirm the current BDM per-species TAC
    determination (a separate instrument, not downloaded).
11. **BDM per-species TACs** and the **current prawn TAE** figure live in separate
    determinations we don't have.
12. **~46 finfish + extra BDM species not yet seeded** (need CAAB codes), incl. the
    s.12 **no-take** finfish (potato cod, Qld groper, chinaman fish, paddletail,
    humphead wrasse; hammerhead/grey nurse/tiger shark).
13. **Current finfish logbook is TSF02** (`C2024G00630`), not the TSF01 in the 2015
    gazette — verify its species-code table for the CAAB crosswalk.
14. ***Pinctada maxima*** is largely prohibited (live/dead) per Pearl Shell
    Instrument s.6 except exemptions — reconcile against seed `takeCategory:
    'commercial'`.

### Round 3 resolutions (2026-06-22)
- **#9 sector split — RESOLVED (no actual conflict).** The Quota Plan s.15 allocates
  **562,000 permanent quota units** to the TSRA (56.2%, a capital holding); the
  Management Instrument **s.4A sets the TIB boat-sector seasonal kg cap at 66.17%
  of TAC** (the figure the in-season closure power uses) — a deliberate competitive
  uplift above the unit share. **s.4A governs the operative kg cap.** Both now
  stored on the TI entitlement (`unitsHeld: 562000`, `sectorSharePct: 0.6617`);
  cap = `sectorSharePct × current TAC` (≈177,899.7 kg at 268,852.5 kg TAC). TVH
  per-unit value = `TAC ÷ 1,000,000`. New schema field `entitlements.sectorSharePct`.
- **#12 finfish/BDM species — RESOLVED.** 72 species added with CAAB codes verified
  against CSIRO taxon reports (incl. the s.12 no-take list → `protected_no_take`,
  3 sharks → `protected_no_take` + `protectedSpecies`). Size limits complete: 70
  rows (lobster carapace/tail, mackerel, crab + female-prohibited, 13 BDM, trochus,
  pearl, 41 finfish min-length + 5 finfish min/max — Finfish Instrument s.9/s.10).
- **#14 *Pinctada maxima* — RESOLVED.** Tag corrected `commercial → prohibited`
  (Pearl Shell Instrument s.6); black-lip *P. margaritifera* also seeded as
  `prohibited` (live take prohibited).

### Round 4 — remaining sources located & downloaded (all in `docs/sources/`)
- **#10 sandfish / surf redfish — RESOLVED (and seed corrected).** PZJA: fishing for
  **sandfish closed since 1998, surf redfish since 2003** — both `prohibited` (an
  earlier seed pass wrongly set sandfish `commercial_quota`; now fixed). Source:
  PZJA BDM fishery page + `bdm-mab-2026.pdf` + `bdm-harvest-strategy-2025.pdf`.
- **#11 prawn TAE + BDM per-species TACs — sources obtained.** Prawn TAE =
  `F2024L00106` *Torres Strait Prawn Fishery (Total Allowable Effort) Determination
  2024* (`prawn-tae-determination-2024-part{1,2}.pdf`). BDM per-species TACs are NOT
  a Federal Register instrument — they are PZJA administrative decisions, captured
  in `bdm-mab-2026.pdf` (black teatfish 2026 TAC = 20.783 t; annual TACs for other
  open species). Still to be EXTRACTED into the seed.
- **#13 current finfish logbook — RESOLVED.** `C2024G00630` *Torres Strait Finfish
  Daily Fishing Log – TSF02* (`tsf02-finfish-logbook-2024.pdf`). Plus the disposal
  record `C2017G01191` *Torres Strait Fish Receiver Logbook TDB02*
  (`tdb02-fish-receiver-logbook.pdf`) — resolves the earlier "no TS CDR" question.
- **TRL moontide/hookah closures — now have the actual dates** (previously "by CEO
  notice, no dates"): `trl-moontide-hookah-closures-2025-26.pdf`. Plus TRL & BDM
  harvest strategies, the TRL MAB, prawn MAB, and TRL TAC-increase letter.
- **Coverage note:** only TRL, Prawn and BDM publish Management Arrangements
  Booklets / TAC instruments. Mackerel, Finfish, Trochus, Pearl, Crab have **no
  separate TAC determination** — managed via their s.16 Management Instruments
  (held) + administrative settings; their TACs (where any) are PZJA-administrative.
  Still genuinely AFMA-only: confirming any current mackerel/finfish TAC figure.

### Round 5 — FULL source coverage confirmed (2026-06-22)
The mackerel/finfish "AFMA-only" caveat above is **withdrawn** — those TACs are public
in the Catchwatch reports. From `finfish-catchwatch-2024-25.pdf` (issued 17/10/2025):
- **Spanish mackerel**: TIB sector TAC 18,000 kg; Sunset sector 59,000 kg.
- **Coral trout**: TIB 108,000 kg; Sunset 15,000 kg.
- Basket species: TIB "no catch limit", Sunset 0. Conversion ratios: Spanish
  mackerel 1.608:1 (filleted)/1.048:1 (G&G); coral trout 2:1 / 1.1:1; other
  reef-line 2.5:1 / 1.1:1. Season = financial year (1 Jul–30 Jun); TDB02 CDRs.

All rule-bearing + TAC + closure + logbook sources are now held for every modelled
fishery (50 PDFs in `docs/sources/`). New this round: prawn TAE Determination 2024
(F2024L00106), TSF02 (C2024G00630), TDB02 (C2017G01191), NP16 (F2008L02423),
HC01/HC02, FMN 65 (dugong) + FMN 66 (turtle), TRL/Prawn/BDM MABs, TRL+BDM harvest
strategies, TRL moontide/hookah closures calendar, and current Catchwatch reports
(TRL, finfish, BDM).

**Seed correction:** sandfish (*Holothuria scabra*) AND surf redfish (*Actinopyga
mauritiana*) set to `prohibited` (closed 1998 / 2003 per PZJA) — earlier pass had
wrongly set sandfish `commercial_quota`.

**Quota schemes now seeded from real figures** (9 schemes / 10 entitlements):
- **TRL** units-based (TAC 268,852.5 kg); **Prawn** effort (TAE **9,200 fishing
  days**, F2024L00106); **Finfish** Spanish mackerel (TIB 18,000 / Sunset 59,000 kg)
  + Coral trout (TIB 108,000 / Sunset 15,000 kg), from the 2024-25 Catchwatch;
  **BDM** 2026 per-species (gutted wet weight): black teatfish 20,783, white
  teatfish 15,000, prickly redfish 15,000, deepwater redfish 1,000, curryfish
  basket 60,000 kg. Added `entitlements.sector = 'sunset'`.
- BDM closed species (TAC 0) corrected to `prohibited`: sandfish, surf redfish,
  AND **hairy blackfish** (*Actinopyga miliaris*) — the MAB confirmed a third.

Amberfish (*Thelenota anax*, CAAB **25417004**, 10 t) and greenfish (*Stichopus
chloronotus*, CAAB **25417001**, 40 t) are now seeded as species + BDM schemes
(both codes verified against CSIRO CAAB). The only un-modelled BDM TAC is the
"all other species" **50 t basket** — a multi-species catch-all, not a single
taxon, so deliberately not a per-species scheme.

### Quota engine — built & verified (backend)
`convex/quota/engine.ts` + `aggregate.ts` implement allocate / consume / trueUpFromCdr
/ transfer / lease + balance queries, backed by `@convex-dev/aggregate` (balances =
baseAllowance + signed ledger sum, O(log n)). All 6 rule-paths pass an end-to-end
smoke test (`quota/smoke:run`) against the real components. Encoded decisions:
over-quota is **advisory** (record + flag + recommend closure, never block);
quota debits **provisionally on the log, trued-up to the verified CDR**; balances via
the aggregate; entitlements are **vessel-aware** (single placeholder Sunset vessel).
**Discretionary / needs-AFMA (modelled as flags, not hard rules):** closure is an
advisory recommendation (real closure is a lagged CEO decision); per-vessel Sunset
allowances are a single placeholder; the processing-form → conversion-factor mapping
is simplified; engine mutations are **not yet RBAC-wrapped**.

### RBAC + row-level security — built & verified
`convex/rbac.ts`: Better Auth identity → roles mirrored in `users` /
`communityMembership` → `convex-helpers` row-level security + custom function
wrappers (`authedQuery/Mutation` with RLS, `regulatorQuery/Mutation` staff-only),
fail-closed. A **community admin sees their members' data** via a reporter→community
join (`getManyFrom`, precomputed once per request — no per-row lookups). Engine
operational mutations are now **internal** (system/CDR/tests); client-facing entry
points are RBAC-wrapped (regulator manage, authed view); `applications.submit` is
RLS-enforced, `listMine` is soft self-scoped. Proven type-safe (real rows, no casts):
`rbacSmoke:run` 11/11 (regulator-all, fisher-own, community-admin-join, deny-others),
engine `quota/smoke:run` still 6/6 after the restructure.
Viewer bootstrap is closed: a Better Auth `user.onCreate` trigger (`auth.ts`)
mirrors each new user into `parties`/`users` at sign-up via the shared idempotent
`ensureAppUser` (`identity/users.ts`), with `getOrCreateViewer` as a fallback. The
self-referential module (authComponent ↔ internal.auth.* trigger exports) is
resolved with one `ReturnType<typeof createClient<DataModel>>` annotation — the
client's type depends only on DataModel, so this breaks the inference loop cleanly
(no value casts).

### Dugong & Turtle — now fully sourced (statutory) and partly encoded
The statutory instruments are held: **FMN 65** (dugong, 23 Feb 2004) and **FMN 66**
(turtle). FMN 65 rules: dugong take prohibited except by Traditional Inhabitants in
traditional fishing; **wap (hand-thrown spear) only** (para 8); not on a commercial
s.19(2)/(3) boat unless a **TIB boat ≤6 m** (paras 7, 9(b)); and a **Dugong Sanctuary**
(Schedule) where all dugong hunting is banned — Lat 11°10′S/Long 141°01′E north to the
Annex 8 Fisheries Jurisdiction Line, east to 142°E, back. Turtle (FMN 66): TI-only,
not on a commercial boat >6 m; no sanctuary, no wap restriction. **Encoded:** the
Dugong Sanctuary is seeded as a `closure_area` zone + a permanent `zoneStatus` closure
(`dugong take`, effective 2004-02-23, FMN 65). The wap/≤6 m/TI-only rules are documented
here + in the source PDFs (no structured home in the prototype schema). The only
non-statutory layer is the voluntary community Dugong/Turtle Management Plans, which
operate *under* these FMNs.

### Consent & Indigenous data governance (CARE / NIAA) — research & design (2026-06-22)
Grounding for the assisted-application **consent flow** (a delegate may *start* an
application for a fisher; the fisher must *personally* confirm). Sources: GIDA **CARE
Principles**; NIAA **Framework for Governance of Indigenous Data (GID, May 2024)** —
APS implementation from Jan 2025; **AIATSIS Code of Ethics (2020)**; **Maiam nayri
Wingara** IDSov principles.

**Design rules adopted (non-negotiable):**
- **Two granular consents**, independently revocable: *(a) delegate authority* and
  *(b) Indigenous-data use*. Never bundled into one checkbox.
- **State machine** `pending → confirmed → revoked` (`declined`/`expired` terminal).
  A delegate-created grant is `pending` and has **zero data effect**; every data-use
  path must guard on a **`confirmed` `data_use`** grant — never a `pending` one.
- **Append-only `dataAccessLog`/audit** (insert-only mutations; no update/delete)
  powering the NIAA-G3 **"what's held about me & who accessed it"** transparency view.
- **Informed = comprehensible:** plain English **+ Yumplatok audio + "talk to
  someone"** on every consent screen; persist `consentTextVersion`, `languageShown`,
  `confirmedVia` as evidence. Confirmation is via the fisher's **own** authenticated
  account (Better Auth).
- Defaults: **data minimisation**, `allowsSecondaryUse: false` (fresh consent for any
  new purpose), revocation as easy as granting and **immediately enforcing** with
  consequences explained (AIATSIS).
- **Pitfalls to avoid:** treating the delegate's action as consent; text-only English;
  bundled consent; one-and-done (non-revisitable) consent; hidden/punitive revocation;
  silent secondary use; a mutable audit log.

**→ Model:** extend `governance` with `consentGrant` (fisherId, delegateId,
consentType, purposeId, scope, status, requested/confirmed/revoked timestamps,
confirmedVia, languageShown, consentTextVersion, expiresAt) and a `purpose` reference
table; keep `dataAccessLog` append-only. **needs-AFMA:** confirm AFMA's own GID
implementation stance + whether community-level (collective) consent is required
alongside individual consent for any data category.
