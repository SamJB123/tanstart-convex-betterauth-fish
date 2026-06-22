import type { MutationCtx } from '../_generated/server'
import type { Doc, Id } from '../_generated/dataModel'

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

  // CLAIM LINK: if a delegate pre-staged a party for this person (same email,
  // not yet linked to any account), link this new account to it instead of
  // creating a duplicate. This is what makes the invitation flow join up — the
  // fisher's draft/consent already reference the pre-staged party.
  let partyId: Id<'parties'> | undefined
  if (info.email) {
    const candidates = await ctx.db
      .query('parties')
      .withIndex('by_contactEmail', (q) => q.eq('contactEmail', info.email))
      .take(10)
    for (const candidate of candidates) {
      if (candidate.kind !== 'person') continue
      const alreadyLinked = await ctx.db
        .query('users')
        .withIndex('by_party', (q) => q.eq('partyId', candidate._id))
        .take(1)
      if (alreadyLinked.length === 0) {
        partyId = candidate._id
        if (candidate.displayName === 'Unknown' && info.name) {
          await ctx.db.patch(candidate._id, { displayName: info.name })
        }
        break
      }
    }
  }

  if (!partyId) {
    partyId = await ctx.db.insert('parties', {
      kind: 'person',
      displayName,
      contactEmail: info.email ?? undefined,
    })
  }

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
