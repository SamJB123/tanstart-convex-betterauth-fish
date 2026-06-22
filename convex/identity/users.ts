import type { MutationCtx } from '../_generated/server'
import type { Doc } from '../_generated/dataModel'

// Create (or fetch) the app-side `parties` + `users` rows that mirror a Better
// Auth identity. Idempotent. Shared by the Better Auth `onCreate` trigger and by
// the lazy mutation-side viewer resolver. Intentionally has NO dependency on
// auth.ts, so auth.ts can import it without an import cycle.
export async function ensureAppUser(
  ctx: MutationCtx,
  info: { authUserId: string; name?: string; email?: string },
): Promise<{ user: Doc<'users'>; party: Doc<'parties'> }> {
  let user = await ctx.db
    .query('users')
    .withIndex('by_authUserId', (q) => q.eq('authUserId', info.authUserId))
    .unique()
  if (user?.partyId) {
    const party = await ctx.db.get(user.partyId)
    if (party) return { user, party }
  }

  const displayName = info.name ?? info.email ?? 'Unknown'
  const partyId = await ctx.db.insert('parties', {
    kind: 'person',
    displayName,
    contactEmail: info.email ?? undefined,
  })

  if (user) {
    await ctx.db.patch(user._id, { partyId })
    user = (await ctx.db.get(user._id))!
  } else {
    const userId = await ctx.db.insert('users', {
      authUserId: info.authUserId,
      partyId,
      actorType: 'fisher',
      displayName,
      active: true,
    })
    user = (await ctx.db.get(userId))!
  }

  const party = (await ctx.db.get(partyId))!
  return { user, party }
}
