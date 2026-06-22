# AFMA Torres Strait Fisheries Platform — Design & Scope

> **Status:** Early prototype / proof-of-concept · **Last updated:** 2026-06-22
> **Audience:** AFMA / PZJA stakeholders, the AI CoLab team, and developers.
> **One line:** A modular, mobile-first, AI-assisted replacement for parts of
> AFMA's legacy *PISCES* licensing system, starting with Torres Strait fisheries.

This document explains **what we are building and why**, the **needs and
challenges** it is rooted in, the **design direction and data structures**, and
the **scope** of the proof-of-concept. Where claims rest on research that still
needs verification against primary law or AFMA subject-matter experts, that is
called out explicitly (see [§10 Confidence & open questions](#10-confidence--open-questions)).

---

## 1. Purpose & context

The **Australian Fisheries Management Authority (AFMA)** is the regulator of
Commonwealth fisheries and, with the **Protected Zone Joint Authority (PZJA)**,
of Torres Strait fisheries. It issues licences, assigns quota, monitors catch,
and opens/closes areas.

AFMA's licensing and permit system, **PISCES**, is ~20 years old, undocumented,
and increasingly unviable: its business logic is locked in database stored
procedures, and the people who understood it have moved on. PISCES manages
"fisheries information relating to licences, vessels, quotas and leases" and
generates the monthly **Catchwatch** reports, daily over-quota reports, and
ad-hoc reports.

This project is a **six-month proof of concept** run by the AI CoLab in
partnership with AFMA. Crucially:

- **The product is a vehicle, not the goal.** The real question is *"how do we
  change the way we work, using AI?"* — the prototype exists to answer that.
- **AFMA is fully cost-recovered** from the industry it regulates, so it is
  highly budget-sensitive. This makes **ruthless modularity and reuse** a
  first-order design constraint, not a nice-to-have.
- The PoC is an opportunity to **re-scope** the rebuild: some PISCES features
  will be dropped, some new capabilities introduced.

We deliberately start where the **unmet need is greatest and the value of new,
AI-enabled, user-centred capability is clearest**: the **Torres Strait**.

---

## 2. The needs & challenges this is rooted in

The Torres Strait is not an arbitrary starting point — it is where today's system
most visibly fails the people it serves, while still exercising the full breadth
of machinery (identity, reference data, quota, catch) the commercial fisheries
will later reuse.

| Need / challenge | Why it matters | Implication for the build |
|---|---|---|
| **Licence applications are still on paper** | Complex native-title interactions left the Torres Strait on a legacy paper process | Digitise the application workflow first; make it the lead vertical slice |
| **Mobile-first, not desktop** | Torres Strait fishers will not use desktop computers | Mobile is the primary surface; desktop is for AFMA staff |
| **Patchy / no connectivity on outer islands** | Fishers operate where coverage is unreliable or absent | **Offline-first**: the device must be the source of truth, syncing when able |
| **Native-title catch types** (dugong, turtle) | Otherwise-prohibited take is permitted under native title for traditional purposes | Reference data and catch reporting must model traditional-only / protected species |
| **Non-standard quota** | Quota may be **days-of-effort** (Prawn) or tied to **events of cultural significance**, not just weight | A **polymorphic quota engine** that treats "how an entitlement is measured" as data |
| **Communal native-title rights** | The right to fish is group-held (per *Akiba v Commonwealth*), exercised by members | A **hybrid** model: community-held *and* individual entitlements |
| **Oral language (Yumplatok)** | Torres Strait Creole is dominant and primarily spoken; English is a 2nd/3rd language | Voice and plain-language are higher-value than written translation |
| **Undocumented legacy logic** | PISCES business rules are locked in stored procedures | Recovering those rules is itself an AI workstream and a source of ground truth |
| **Indigenous data sovereignty** | CARE principles + NIAA framework apply to Torres Strait Islander data | Governance (purpose tagging, sensitivity, transparency, residency) is modelled, not bolted on |

---

## 3. Guiding principles

1. **Modular over one database.** Each use case is its own module over a single
   shared Convex schema. The cross-cutting core (identity, reference data, the
   quota engine) is shared so new fisheries are added by reuse, not rebuild.
2. **Rule-agnostic quota engine.** Quota rules differ by fishery and change
   yearly. The engine encodes *structure*, not specific rules, so it absorbs
   change without reshaping.
3. **Offline-first.** Treat the device as the source of truth; sync
   opportunistically; never lose a fisher's data to a bad connection.
4. **Mobile-first for fishers, desktop for staff.** Two front doors over one
   backend.
5. **AI assists, humans decide.** AI output (species ID, transcription,
   translation, drafting) is always a **draft requiring confirmation**, never an
   authoritative record.
6. **Led by real Torres Strait needs.** User-centred design and co-design over
   feature completeness.
7. **Govern Indigenous data by design.** Minimise collection, tag purpose and
   sensitivity, keep data in Australian jurisdiction, and make "what is held
   about me" transparent.
8. **Fail closed.** Authorisation is layered (explicit checks + row-level
   security with a deny-by-default policy).

---

## 4. Scope

### In scope (proof of concept)
- **Modular schema skeleton** across all core domains (identity, reference,
  licensing, quota, catch, reporting, governance).
- A **fleshed-out Torres Strait vertical slice**: a fisher (or assisted
  delegate) lodges a licence application digitally → AFMA reviews → catch/effort
  can be logged → consumption tracked against an entitlement.
- **Production-grade reference data** for Torres Strait fisheries, species
  (CAAB-keyed), and licence types.
- The **polymorphic quota engine** (data structures + first functions).
- **Offline contract baked into the schema** (client IDs, sync status,
  idempotent upserts) — the device sync loop is designed but built later.
- **Governance scaffolding** (audit + data-access logs, purpose/sensitivity
  tags).
- **AI touchpoints designed** and a subset prototyped.

### Out of scope (for the PoC)
- Full commercial-fisheries rollout beyond Torres Strait (the architecture
  anticipates it; the PoC does not deliver it).
- Cost-recovery **billing/payments**.
- Full **compliance enforcement** workflows.
- Production hardening (full security review, load, DR), and a complete native
  mobile app (the PoC validates flows; the offline sync loop and app shell come
  after).
- **PISCES parity** — we are deliberately re-scoping, not cloning.

### Phasing (indicative)
1. **Foundations** *(done / in progress)* — schema, auth, reference seed, first
   application slice.
2. **Quota engine** — periods, schemes, allocate + consume, balances.
3. **Catch/effort logging** — mobile-shaped capture, photo/voice, TEP
   interactions.
4. **Reporting** — Catchwatch / over-quota generation.
5. **AI & offline** — voice/translation/photo-ID; the device sync engine.

---

## 5. Architecture overview

- **Frontend:** TanStack Start (SolidJS v2), Tailwind. File-based routing; a
  shared authenticated layout; mobile-first views for fishers and (later)
  desktop views for AFMA staff. *(Note: the stack runs on pre-release Solid 2 /
  TanStack 2 betas, with vendored shims — see `SOLID_V2_MIGRATION.md`.)*
- **Backend:** [Convex](https://convex.dev) — reactive database + functions.
  One schema, composed from per-module table files.
- **Auth:** Better Auth via the Convex component, with the **organization
  plugin** for community/PBC membership, **mirrored** into indexed Convex tables
  for read-time row-level security.
- **AI:** Convex's Agent / RAG / Action-Cache components for assistance,
  retrieval over regulations, and cost control.

### Module map (`convex/`)

```
convex/
  shared/validators.ts   # measure union, syncFields, governanceFields, geoPoint
  identity/              # parties, users, communities (PBC/RNTBC), membership
  reference/             # species (CAAB), fisheries, zones, periods, gear
  licensing/             # applications, licences, vessels, endorsements
  quota/                 # schemes (polymorphic), entitlements, ledger, balances
  catch/                 # catch/effort events, lines, TEP interactions
  reporting/             # Catchwatch / over-quota / ad-hoc report runs
  governance/            # audit + data-access logs (CARE / NIAA)
  seed.ts                # idempotent reference-data seed
  auth.ts, http.ts       # Better Auth wiring
```

Each module owns its tables; `convex/schema.ts` composes them into one database.

---

## 6. Data model

### 6.1 Identity & access (`identity/`)
- **`parties`** — people and organisations known to the regime (fishers,
  companies, fish receivers). Not all have logins. Carries eligibility flags
  (`isTraditionalInhabitant`, `isAustralianCitizen`) that together drive
  "community fishing" (TIB) eligibility.
- **`users`** — login mirror of the Better Auth user, linking an auth identity
  to a party and carrying actor type / staff role.
- **`communities`** — Torres Strait island communities / native-title groups
  (PBC/RNTBC), mirroring Better Auth organizations.
- **`communityMembership`** — scopes row-level security.

### 6.2 Reference data (`reference/`)
Shared, mostly stable, mirrors what stays the same from the legacy system.
- **`species`** — keyed on **CAAB** (CSIRO Codes for Australian Aquatic Biota),
  enriched with authority + family. Dugong/turtle live here too, flagged
  `traditionalTakeOnly` / `protectedSpecies` (dual role: traditional catch type
  *and* protected-species interaction in commercial logbooks). Has a full-text
  search index.
- **`speciesUnits`**, **`sizeLimits`** — per-species units (kg/count/tails/…)
  and size rules (handles e.g. the lobster's tail-OR-carapace rule).
- **`fisheries`** — the nine PZJA-managed Torres Strait fisheries, each with a
  `controlMechanism` (quota-weight / days-of-effort / size-gear-only /
  community-plan).
- **`zones`** + **`zoneStatus`** — spatial management areas, with high-churn
  open/close state separated from the stable zone profile.
- **`periods`**, **`gearTypes`** — seasons (datetimes, AU/PNG split) and gear.

### 6.3 Licensing (`licensing/`)
The paper → digital target.
- **`licenceTypes`** — the statutory **s.19 family** (master fisherman, boat
  commercial, carrier/processing, non-boat commercial, fish receiver) plus s.20
  Treaty endorsement and s.12 scientific permit. **TIB/TVH are *sectors*** (a
  holder attribute), not licence types.
- **`applications`** — the workflow (draft → submitted → under review →
  granted/refused), offline-capable, with eligibility attestation (councillor +
  mayor) treated as restricted data.
- **`licences`** — issued permits. Records the legal **issuer (PZJA)**,
  **administering agent (AFMA)**, and any **held-in-trust-by** party (e.g.
  TSRA/GBK).
- **`licenceFisheryEndorsements`**, **`vessels`**, **`vesselNominations`**,
  **`licenceTransactions`** — per-fishery entries, boats, nominations, and the
  grant/vary/transfer/lease lifecycle.

### 6.4 The quota engine (`quota/`) — the core bet
A single shape that serves **weight**, **effort**, and **event** entitlements:

- **`quotaSchemes`** carry a discriminated-union **`measure`** — the two
  measures with a statutory basis in Torres Strait law:
  - `weight` — kg whole-weight-equivalent (commercial TAC), with per-unit kg
    value and conversion factors. (No reconciliation window / carryover —
    over-quota is an offence and entitlements reset each season.)
  - `effort` — days/units (e.g. Torres Strait Prawn), with total allowable
    effort and a consumption rule (e.g. VMS overnight movement).
  - *(There is no `event`/cultural measure — traditional/cultural take is an
    uncapped, status-based, licence-exempt category, not a quota.)*
- **`entitlements`** — **hybrid**: held by an individual, a **group**, or an
  **agency** (the TRL Traditional-Inhabitant sector is a TSRA-held competitive
  pool), or a community. All entitlements are commercial; traditional take is an
  eligibility check, not an entitlement.
- **`ledgerEntries`** — **append-only, signed**. Allocation, consumption,
  transfer, lease, carryover, adjustment, reconciliation. A balance is a **fold**
  over the ledger — never mutated in place; corrections are new entries.
- **`balances`** — a denormalised cache of the fold (authoritative sums via the
  Convex `aggregate` component / sharded counters; never `.collect().length`).

This is what makes "modular over one database" real: the same tables and
functions serve a commercial weight-TAC fishery and a Torres Strait
days-of-effort or cultural-event entitlement.

### 6.5 Catch & effort reporting (`catch/`)
Mobile-first logbook, field set drawn from AFMA logbooks + Catch Disposal
Records.
- **`catchEvents`** — offline-capable; references the entitlement it debits;
  captures location (sensitive), gear, measure kind, cultural purpose, **photos
  and voice audio**, and AI suggestions (as drafts).
- **`catchLines`** — per-species detail (separate table to avoid unbounded
  arrays).
- **`protectedSpeciesInteractions`** — TEP interactions (turtle/dugong/…).
- **`catchVerifications`** — fish-receiver verification of landed weight.

### 6.6 Reporting (`reporting/`)
- **`reportDefinitions`**, **`reportRuns`**, **`reportLines`** — Catchwatch /
  over-quota / ad-hoc, generated by scheduled functions; report lines mirror the
  real published Catchwatch columns.

### 6.7 Governance (`governance/`)
- **`auditLog`**, **`dataAccessLog`** — support the NIAA "what is held about me,
  and who accessed it" transparency path.

### Cross-cutting fields
- **Offline:** `clientId` (device UUID, idempotency key), `clientCreatedAt`,
  `syncStatus`, `receivedAt` on offline-capable tables.
- **Governance:** `dataPurpose`, `sensitivity` (standard/sensitive/restricted)
  on personal and location data.

---

## 7. Key design decisions

| Decision | Choice | Rationale |
|---|---|---|
| Schema scope | **Full skeleton + Torres Strait vertical slice** | Prove modularity *and* deliver a working journey |
| Right-to-fish origin | **Hybrid** (community-held + individual) | *Akiba* makes the native-title right communal; commercial exercise is individual (TIB). NB: the statutory term "community fishing" means *commercial* fishing by Traditional Inhabitants — **not** the communal native-title right |
| Quota modelling | **Polymorphic `measure` union + append-only ledger** | One engine for weight/effort/event; rule-agnostic; auditable balances |
| RBAC | **Better Auth org plugin, mirrored into Convex** | Membership lifecycle from the plugin; read-time row-level security from indexed Convex rows (deny-by-default) |
| Offline | **Baked into the schema now**, sync loop later | Connectivity reality demands it; cheap to design in early, costly to retrofit |
| Species keys | **CAAB codes** | The canonical Australian fisheries taxon standard |

---

## 8. Features

**Delivered / in progress**
- Email/password auth; authenticated dashboard.
- Reference data seeded (9 fisheries, 16 CAAB-keyed species incl. dugong/turtle,
  6 licence types, a sample PBC community).
- **Licence-application slice**: offline-aware, idempotent submit + live list.

**Planned**
- Quota: allocate entitlements; consume against them; live balances and
  over-quota detection.
- Catch/effort logging: mobile capture with photo + voice; TEP interactions;
  receiver verification.
- Reporting: scheduled Catchwatch / over-quota generation.
- Zone open/close and point-in-zone checks (geospatial).

---

## 9. AI workstreams ("change how we work")

The point of the project. Candidate, high-leverage uses — each with AI as a
*draft*, not an authority:

1. **Legacy archaeology.** Recover the undocumented PISCES business rules
   (stored procedures, decompiled C#/IL) — directly feeds the quota-rule and
   eligibility definitions.
2. **Application assistance.** Plain-language + **voice** (Yumplatok) help to
   complete applications on mobile, lowering the paper/complexity barrier.
3. **Catch-logging assistance.** Photo → species identification; voice logging;
   retain original audio/photo for human verification.
4. **Eligibility reasoning.** Help officers navigate complex native-title rules.
5. **Natural-language reporting.** Replace the "ad-hoc report on request"
   bottleneck with self-serve querying.

**Convex components anticipated:** `aggregate` + `sharded-counter` (ledger
balances), `r2` (media), `geospatial` (zones), `workflow` (reports / reconciliation),
`agent` + `rag` + `action-cache` (AI), `rate-limiter`, `migrations`.

---

## 10. Confidence & open questions

The data **architecture** is sound and deliberately rule-agnostic. A primary-law
grounding pass has now been completed against the Torres Strait Fisheries Act
1984, its Regulations, the TRL/Finfish/Prawn Management Plans, *Akiba v
Commonwealth*, NTA s211 and the Torres Strait Treaty. **Full results, with
citations and a schema change set, are in [`docs/validation-findings.md`](docs/validation-findings.md).**

Headlines:
- **Confirmed:** the Hybrid native-title model (group-held right, regulated not
  extinguished, commercial via individual licences); the two-measure-plus-ledger
  architecture; TRL units→kg; CAAB species codes; the two Treaty jurisdiction
  lines; PZJA-as-issuer / AFMA-as-administrator.
- **Corrected (Commonwealth assumptions that don't hold for TS):** there is **no
  over-quota reconciliation window** (over-quota is an offence + forfeiture);
  **zero carryover** between seasons; the **TI sector is a TSRA-held competitive
  pool** (not individual ITQs); **TIB/TVH are sectors, not licence types** (real
  licences are the s.19 family); catch effort is recorded in **hours, not days**.
- **Dropped → needs-AFMA:** the **event/cultural-significance measure has no
  statutory basis** — the law has only weight and effort measures; traditional/
  cultural take is an uncapped, status-based, licence-exempt category.

Several items have **no documentary answer** and require **AFMA/PZJA experts** —
see the open-questions list at the end of the validation findings.

---

## 11. Glossary

- **AFMA** — Australian Fisheries Management Authority (the regulator).
- **PZJA** — Protected Zone Joint Authority; legal manager of Torres Strait
  fisheries (Commonwealth + Queensland + TSRA chair). AFMA administers on its
  behalf.
- **TSRA / GBK** — Torres Strait Regional Authority; Gur A Baradharaw Kod (the
  native-title service provider since 2022). May hold licences in trust.
- **PISCES** — AFMA's legacy licensing/permit information system.
- **TIB** — Traditional Inhabitant Boat licence (commercial fishing by
  Traditional Inhabitants).
- **TVH** — Transferable Vessel Holder / Torres Strait Fishing Boat licence
  (non-TI commercial).
- **TAC** — Total Allowable Catch (weight-based quota cap).
- **TAE** — Total Allowable Effort (days/units-based cap, e.g. Prawn).
- **SFR** — Statutory Fishing Right (a permanent quota/effort share; Commonwealth
  term).
- **CDR** — Catch Disposal Record (verified landed-weight record; basis for
  quota deduction).
- **CAAB** — Codes for Australian Aquatic Biota (CSIRO species code standard).
- **PBC / RNTBC** — Prescribed / Registered Native Title Body Corporate (holds
  native title for a group).
- **Native title** — communal rights recognised under the Native Title Act;
  *Akiba v Commonwealth* [2013] HCA 33 is the Torres Strait sea claim.
- **TEP species** — Threatened, Endangered & Protected species (recorded as
  interactions in logbooks).
- **Yumplatok** — Torres Strait Creole; the dominant, primarily oral language.
- **Catchwatch** — AFMA's periodic catch-vs-remaining-TAC report.

---

## 12. References

Primary research and sourcing live in the conversation record and in
`docs/sources/` (being assembled). Key authorities: PZJA and AFMA fishery pages;
the Torres Strait Fisheries Act 1984 and Torres Strait Treaty; *Akiba v
Commonwealth* [2013] HCA 33; ANAO audit reports on Commonwealth fisheries
management; CSIRO CAAB; the Australian Government Digital Service Standard,
Digital Inclusion Standard and WCAG 2.2; and the CARE Principles / NIAA Framework
for Governance of Indigenous Data.
