import type { MutationCtx, QueryCtx } from '../_generated/server'
import type { Doc } from '../_generated/dataModel'
import { authComponent } from '../auth'
import { ensureAppUser } from './users'

// Identity helpers (plain functions, not registered Convex functions).
// Bridges the Better Auth user to our app-side `users` + `parties` rows. Native
// persons are modelled as `parties`; `users` is the login mirror linking an
// auth identity to a party. See convex/identity/tables.ts.

export type Viewer = { user: Doc<'users'>; party: Doc<'parties'> }

async function currentAuthUser(ctx: QueryCtx | MutationCtx) {
  try {
    return await authComponent.getAuthUser(ctx)
  } catch {
    return null
  }
}

// Read-only resolution for queries — returns null if not signed in or not yet
// bootstrapped (the first mutation creates the party + user mirror).
export async function getViewer(ctx: QueryCtx): Promise<Viewer | null> {
  const authUser = await currentAuthUser(ctx)
  if (!authUser?._id) return null
  const user = await ctx.db
    .query('users')
    .withIndex('by_authUserId', (q) => q.eq('authUserId', authUser._id))
    .unique()
  if (!user?.partyId) return null
  const party = await ctx.db.get(user.partyId)
  return party ? { user, party } : null
}

// Mutation-side resolution — ensures the `parties` + `users` rows exist (the
// Better Auth onCreate trigger usually creates them at sign-up; this is a
// belt-and-braces fallback for any identity that predates the trigger).
export async function getOrCreateViewer(ctx: MutationCtx): Promise<Viewer> {
  const authUser = await currentAuthUser(ctx)
  if (!authUser?._id) throw new Error('Not authenticated')
  return await ensureAppUser(ctx, {
    authUserId: authUser._id,
    name: authUser.name ?? undefined,
    email: authUser.email ?? undefined,
  })
}
