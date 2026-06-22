import {
  customCtx,
  customMutation,
  customQuery,
} from 'convex-helpers/server/customFunctions'
import {
  wrapDatabaseReader,
  wrapDatabaseWriter,
  type Rules,
} from 'convex-helpers/server/rowLevelSecurity'
import { query, mutation } from './_generated/server'
import type { MutationCtx, QueryCtx } from './_generated/server'
import type { DataModel, Doc, Id } from './_generated/dataModel'
import { getManyFrom } from 'convex-helpers/server/relationships'
import { authComponent } from './auth'
import { getOrCreateViewer } from './identity/model'

// Role-based access control + row-level security.
// Identity comes from Better Auth; roles are mirrored into our `users` /
// `communityMembership` tables. Two layers, fail-closed:
//   1. function wrappers gate by role (authed / regulator), injecting `viewer`.
//   2. fisher-facing functions get an RLS-wrapped `db` so a fisher can only see
//      their own rows (or their community's); regulators see all.

export type Viewer = {
  user: Doc<'users'>
  party: Doc<'parties'>
  isRegulator: boolean
  communityIds: Id<'communities'>[]
  adminCommunityIds: Id<'communities'>[]
  // Parties whose data this viewer can see by virtue of administering their
  // community (the reporter -> community join, precomputed once per request).
  visiblePartyIds: Set<Id<'parties'>>
}

// Build a Viewer (roles + the community join) from a resolved user + party.
// Exported so tests can construct a Viewer from real rows without the auth path.
export async function rolesFor(
  ctx: QueryCtx,
  user: Doc<'users'>,
  party: Doc<'parties'>,
): Promise<Viewer> {
  const memberships = await ctx.db
    .query('communityMembership')
    .withIndex('by_party', (q) => q.eq('partyId', party._id))
    .take(100)
  const active = memberships.filter((m) => m.status === 'active')
  const adminCommunityIds = active
    .filter((m) => m.role === 'admin' || m.role === 'elder')
    .map((m) => m.communityId)
  // For each administered community, fetch its members (via the join table) and
  // collect the party ids the admin may see.
  const memberLists = await Promise.all(
    adminCommunityIds.map((cid) =>
      getManyFrom(ctx.db, 'communityMembership', 'by_community', cid, 'communityId'),
    ),
  )
  const visiblePartyIds = new Set<Id<'parties'>>(
    memberLists.flat().map((m) => m.partyId),
  )
  return {
    user,
    party,
    isRegulator: user.actorType === 'regulator' || user.staffRole != null,
    communityIds: active.map((m) => m.communityId),
    adminCommunityIds,
    visiblePartyIds,
  }
}

async function viewerForQuery(ctx: QueryCtx): Promise<Viewer | null> {
  let authUser
  try {
    authUser = await authComponent.getAuthUser(ctx)
  } catch {
    return null
  }
  if (!authUser?._id) return null
  const user = await ctx.db
    .query('users')
    .withIndex('by_authUserId', (q) => q.eq('authUserId', authUser._id))
    .unique()
  if (!user?.partyId) return null
  const party = await ctx.db.get(user.partyId)
  if (!party) return null
  return await rolesFor(ctx, user, party)
}

async function viewerForMutation(ctx: MutationCtx): Promise<Viewer> {
  const { user, party } = await getOrCreateViewer(ctx)
  return await rolesFor(ctx, user, party)
}

// --- Row-level security rules ---------------------------------------------
// Predicate helpers (also exported for unit testing the logic without auth/db).
const owns = (v: Viewer, partyId?: Id<'parties'>) => partyId === v.party._id
const inCommunity = (v: Viewer, communityId?: Id<'communities'>) =>
  communityId != null && v.communityIds.includes(communityId)
// Reporter/holder/applicant party is in a community this viewer administers.
const visible = (v: Viewer, partyId?: Id<'parties'>) =>
  partyId != null && v.visiblePartyIds.has(partyId)

export function rlsRules(viewer: Viewer): Rules<Viewer, DataModel> {
  return {
    applications: {
      read: async (v, d) =>
        v.isRegulator ||
        owns(v, d.applicantPartyId) ||
        inCommunity(v, d.communityId) ||
        visible(v, d.applicantPartyId),
      insert: async (v, d) => v.isRegulator || owns(v, d.applicantPartyId),
      modify: async (v, d) => v.isRegulator || owns(v, d.applicantPartyId),
    },
    catchEvents: {
      read: async (v, d) =>
        v.isRegulator || owns(v, d.reporterPartyId) || visible(v, d.reporterPartyId),
      insert: async (v, d) => v.isRegulator || owns(v, d.reporterPartyId),
      modify: async (v, d) => v.isRegulator || owns(v, d.reporterPartyId),
    },
    licences: {
      read: async (v, d) =>
        v.isRegulator ||
        owns(v, d.holderPartyId) ||
        inCommunity(v, d.communityId) ||
        visible(v, d.holderPartyId),
    },
    entitlements: {
      read: async (v, d) =>
        v.isRegulator ||
        owns(v, d.holderPartyId) ||
        inCommunity(v, d.communityId) ||
        visible(v, d.holderPartyId),
    },
    parties: {
      read: async (v, d) =>
        v.isRegulator || d._id === v.party._id || visible(v, d._id),
    },
  }
}

// --- Function wrappers -----------------------------------------------------
// Any authenticated user; db is RLS-wrapped (fishers see only their own rows).
export const authedQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const viewer = await viewerForQuery(ctx)
    if (!viewer) throw new Error('Not authenticated')
    return { viewer, db: wrapDatabaseReader(viewer, ctx.db, rlsRules(viewer)) }
  }),
)

export const authedMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const viewer = await viewerForMutation(ctx)
    return { viewer, db: wrapDatabaseWriter(viewer, ctx.db, rlsRules(viewer)) }
  }),
)

// AFMA staff only; full (unwrapped) db access for operational/management work.
export const regulatorQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const viewer = await viewerForQuery(ctx)
    if (!viewer?.isRegulator) throw new Error('Regulator access required')
    return { viewer }
  }),
)

export const regulatorMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const viewer = await viewerForMutation(ctx)
    if (!viewer.isRegulator) throw new Error('Regulator access required')
    return { viewer }
  }),
)
