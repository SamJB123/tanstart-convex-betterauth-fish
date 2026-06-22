import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

// AFMA Torres Strait fisheries platform — modular schema over one database.
// Each use case is a module folder exporting its own tables; this file composes
// them into a single schema. Modularity is the core bet: the cross-cutting core
// (identity, reference, quota engine) is shared, so commercial fisheries can be
// added later by reusing it. See module files for the design rationale (grounded
// in PZJA/AFMA, the Akiba native-title ruling, and Convex component guidance).
import { identityTables } from './identity/tables'
import { referenceTables } from './reference/tables'
import { licensingTables } from './licensing/tables'
import { quotaTables } from './quota/tables'
import { catchTables } from './catch/tables'
import { reportingTables } from './reporting/tables'
import { governanceTables } from './governance/tables'

export default defineSchema({
  ...identityTables, // parties, users, communities (PBC/RNTBC), membership
  ...referenceTables, // species (CAAB), fisheries, zones, periods, gear
  ...licensingTables, // applications, licences, vessels, endorsements
  ...quotaTables, // schemes (polymorphic measure), entitlements, ledger, balances
  ...catchTables, // catch/effort events, lines, TEP interactions, verifications
  ...reportingTables, // Catchwatch / over-quota / ad-hoc report runs
  ...governanceTables, // audit + data-access logs (CARE / NIAA)

  // --- legacy demo: from the starter template. Remove once the example
  // dashboard route is replaced with real UI. ---
  numbers: defineTable({
    value: v.number(),
    userId: v.string(),
  }).index('userId', ['userId']),
})
