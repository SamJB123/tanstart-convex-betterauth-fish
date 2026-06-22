import { v } from 'convex/values'

// Reusable validator field-groups and the polymorphic "measure" union that is
// the heart of the quota engine. Grounded in primary Torres Strait law (see
// docs/validation-findings.md): the law recognises exactly TWO quota-type
// measures — weight (TAC/quota units) and effort (TAE days). There is NO
// statutory event/cultural-significance quota; traditional/cultural take is an
// uncapped, status-based, licence-exempt category (modelled in catch/, not as a
// quota measure).

// --- Offline-first contract -------------------------------------------------
// Outer-island connectivity is patchy, so the device is treated as the source
// of truth while offline. `clientId` is a device-generated UUID used as the
// idempotent upsert dedupe key, so a lost server ack never double-creates a
// record. Spread `syncFields` into every offline-capable table.
export const syncStatus = v.union(
  v.literal('pending'),
  v.literal('syncing'),
  v.literal('synced'),
  v.literal('failed'),
)

export const syncFields = {
  clientId: v.optional(v.string()),
  clientCreatedAt: v.optional(v.number()),
  syncStatus: v.optional(syncStatus),
  receivedAt: v.optional(v.number()),
}

// --- Indigenous data governance (CARE principles / NIAA framework) ----------
export const sensitivity = v.union(
  v.literal('standard'),
  v.literal('sensitive'),
  v.literal('restricted'),
)

export const governanceFields = {
  dataPurpose: v.optional(v.string()),
  sensitivity: v.optional(sensitivity),
}

export const geoPoint = v.object({ lat: v.number(), lng: v.number() })

// --- The polymorphic measure ------------------------------------------------
// Discriminated union on `kind`. Only `weight` and `effort` have a statutory
// basis in the Torres Strait. All measure-specific behaviour lives here; the
// Entitlement, LedgerEntry and Balance shapes are identical across kinds.
export const measureValidator = v.union(
  // Weight / TAC quota (TS Rock Lobster, Finfish, Mackerel, BDM, Trochus).
  // NOTE: TS law has NO over-quota reconciliation window and NO carryover —
  // over-quota is an offence + forfeiture; entitlement fully resets each season.
  v.object({
    kind: v.literal('weight'),
    speciesId: v.id('species'),
    unit: v.literal('kg_wwe'), // whole-weight-equivalent
    perUnitKgValue: v.number(), // TAC ÷ total quota units on issue (per season)
    conversionFactors: v.optional(v.record(v.string(), v.number())), // e.g. { tails: 2.677 }
  }),
  // Days-of-effort (TS Prawn Fishery — VMS-metered fishing days).
  v.object({
    kind: v.literal('effort'),
    unit: v.union(
      v.literal('vessel_day'),
      v.literal('gear_machine'),
      v.literal('net_length_m'),
      v.literal('hook_count'),
    ),
    totalAllowableEffort: v.number(), // TAE for the period (reviewed >= 3-yearly)
    totalUnitsInForce: v.number(), // denominator for the per-holder share
    consumptionRule: v.union(
      v.literal('vms_overnight_movement'),
      v.literal('gear_in_use'),
      v.literal('logbook_day'),
    ),
    leaseAutoRevert: v.boolean(), // temp leases revert before next period
  }),
)

export const measureType = v.union(v.literal('weight'), v.literal('effort'))

export const channel = v.union(
  v.literal('mobile'),
  v.literal('web'),
  v.literal('paper'),
  v.literal('assisted'),
)
