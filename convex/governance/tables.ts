import { defineTable } from 'convex/server'
import { v } from 'convex/values'

// GOVERNANCE (cross-cutting) — Indigenous data sovereignty (CARE / NIAA).
// Supports transparency ("what AFMA holds about me", and who accessed it) and a
// general audit trail. These back the access/correction path the NIAA framework
// requires for Aboriginal & Torres Strait Islander data.
export const governanceTables = {
  auditLog: defineTable({
    actorUserId: v.optional(v.id('users')),
    action: v.string(),
    entityTable: v.string(),
    entityId: v.optional(v.string()),
    at: v.number(),
    purpose: v.optional(v.string()),
  })
    .index('by_entity', ['entityTable', 'entityId'])
    .index('by_actor', ['actorUserId']),

  // Who accessed a person's data, when, and why (CARE "Authority to Control").
  dataAccessLog: defineTable({
    subjectPartyId: v.id('parties'),
    accessedByUserId: v.optional(v.id('users')),
    entityTable: v.string(),
    at: v.number(),
    reason: v.optional(v.string()),
  }).index('by_subject', ['subjectPartyId']),
}
