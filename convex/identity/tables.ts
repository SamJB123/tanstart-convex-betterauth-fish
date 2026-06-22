import { defineTable } from 'convex/server'
import { v } from 'convex/values'
import { governanceFields } from '../shared/validators'

// IDENTITY & ACCESS (cross-cutting).
// Better Auth (organization + admin plugins) owns the identity lifecycle; these
// tables MIRROR auth state into indexed Convex rows so queries can do row-level
// security at read time. Native-title rights are communal/group-held (Akiba),
// so a person's right to fish is derived from community membership + Traditional
// Inhabitant status, while commercial exercise is an individual licence layer.
export const identityTables = {
  // App-side mirror of the Better Auth user (auth users live in the component's
  // own tables). Kept in sync via better-auth user triggers.
  users: defineTable({
    authUserId: v.string(), // better-auth subject / user id
    partyId: v.optional(v.id('parties')),
    actorType: v.union(
      v.literal('regulator'),
      v.literal('fisher'),
      v.literal('communityAdmin'),
      v.literal('agent'),
    ),
    // AFMA staff role (admin plugin global role mirrored here).
    staffRole: v.optional(
      v.union(
        v.literal('officer'),
        v.literal('compliance'),
        v.literal('fisheriesManager'),
        v.literal('admin'),
      ),
    ),
    displayName: v.optional(v.string()),
    active: v.boolean(),
  })
    .index('by_authUserId', ['authUserId'])
    .index('by_party', ['partyId']),

  // Natural / legal persons & orgs known to the regime (fishers, companies,
  // fish receivers). Not all have logins.
  parties: defineTable({
    kind: v.union(
      v.literal('person'),
      v.literal('company'),
      v.literal('group'), // a group representing traditional inhabitants
      v.literal('agency'), // e.g. TSRA (holds TI-sector quota units)
      v.literal('fishReceiver'),
    ),
    displayName: v.string(),
    givenName: v.optional(v.string()),
    familyName: v.optional(v.string()),
    abnAcn: v.optional(v.string()),
    // TI + citizen together drive "community fishing" (TIB) eligibility.
    isTraditionalInhabitant: v.optional(v.boolean()),
    isAustralianCitizen: v.optional(v.boolean()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    ...governanceFields,
  })
    .index('by_kind', ['kind'])
    // Lets a claiming fisher's new account link to the party a delegate
    // pre-staged for them (matched by email) — see ensureAppUser.
    .index('by_contactEmail', ['contactEmail']),

  // Torres Strait island communities / native-title groups (PBC/RNTBC).
  // Mirrors Better Auth organization-plugin organizations via `orgId`.
  communities: defineTable({
    name: v.string(),
    kind: v.union(
      v.literal('island_community'),
      v.literal('pbc'),
      v.literal('rntbc'),
    ),
    orgId: v.optional(v.string()), // better-auth organization id
    nativeTitleDeterminationRef: v.optional(v.string()),
    nationCluster: v.optional(
      v.union(
        v.literal('top_western'),
        v.literal('western'),
        v.literal('central'),
        v.literal('eastern'),
        v.literal('inner'),
      ),
    ),
    representativeBody: v.optional(v.string()), // GBK (post-2022); historically TSRA
    seaCountryZoneId: v.optional(v.id('zones')),
    ...governanceFields,
  }).index('by_orgId', ['orgId']),

  // Mirror of organization-plugin members; scopes row-level security.
  communityMembership: defineTable({
    communityId: v.id('communities'),
    partyId: v.id('parties'),
    role: v.union(
      v.literal('member'),
      v.literal('admin'),
      v.literal('elder'),
    ),
    status: v.union(v.literal('active'), v.literal('inactive')),
  })
    .index('by_community', ['communityId'])
    .index('by_party', ['partyId']),
}
