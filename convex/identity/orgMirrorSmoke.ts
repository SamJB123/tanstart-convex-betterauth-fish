import { internalMutation } from '../_generated/server'
import type { Id } from '../_generated/dataModel'
import { ensureAppUser } from './users'
import { mirrorMember, mirrorOrganization, unmirrorMember } from './orgMirror'

// Self-cleaning smoke for the organization mirroring + the invitation claim-link.
//   org   -> communities (idempotent)
//   email -> a NEW account links to the delegate's pre-staged party (not a dup)
//   member-> communityMembership (idempotent), then unmirror -> inactive
// Run: npx convex run identity/orgMirrorSmoke:run
export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    const checks: { name: string; pass: boolean }[] = []
    const ok = (name: string, pass: boolean) => checks.push({ name, pass })
    const partyIds: Id<'parties'>[] = []
    const userIds: Id<'users'>[] = []
    const communityIds: Id<'communities'>[] = []
    const membershipIds: Id<'communityMembership'>[] = []

    const orgId = `smoke-org-${Math.random().toString(36).slice(2)}`
    const authUserId = `smoke-tagai-${Math.random().toString(36).slice(2)}`
    const email = `tagai-${Math.random().toString(36).slice(2)}@example.com`

    // 1. Mirror an organization -> community (idempotent).
    const communityId = await mirrorOrganization(ctx, { _id: orgId, name: 'Saibai', slug: 'saibai' })
    communityIds.push(communityId)
    const again = await mirrorOrganization(ctx, { _id: orgId, name: 'Saibai', slug: 'saibai' })
    ok('org mirrors to a community (idempotent)', communityId === again)

    // 2. Delegate pre-stages a party (unclaimed, by email).
    const preStaged = await ctx.db.insert('parties', {
      kind: 'person',
      displayName: 'Unknown',
      contactEmail: email,
    })
    partyIds.push(preStaged)

    // The fisher claims: a NEW account with the same email must LINK to the
    // pre-staged party, not create a duplicate.
    const { user, party } = await ensureAppUser(ctx, { authUserId, name: 'Tagai Nona', email })
    userIds.push(user._id)
    ok('claim links new account to the pre-staged party', party._id === preStaged)
    ok('no duplicate party (links instead of creating)', user.partyId === preStaged)
    ok('pre-staged "Unknown" got the claimed name', party.displayName === 'Tagai Nona')

    // 3. Mirror a member -> communityMembership (idempotent).
    const memberDoc = { _id: 'smoke-mem', organizationId: orgId, userId: authUserId, role: 'member' }
    await mirrorMember(ctx, memberDoc)
    await mirrorMember(ctx, memberDoc) // idempotent
    const memberships = await ctx.db
      .query('communityMembership')
      .withIndex('by_party', (q) => q.eq('partyId', preStaged))
      .take(10)
    const m = memberships.find((x) => x.communityId === communityId)
    ok('member mirrors to one active communityMembership', !!m && m.status === 'active' && memberships.length === 1)
    if (m) membershipIds.push(m._id)

    // 4. Unmirror -> inactive.
    await unmirrorMember(ctx, memberDoc)
    const after = m ? await ctx.db.get(m._id) : null
    ok('unmirror soft-removes (inactive)', after?.status === 'inactive')

    // Cleanup.
    for (const id of membershipIds) await ctx.db.delete(id)
    for (const id of userIds) await ctx.db.delete(id)
    for (const id of partyIds) await ctx.db.delete(id)
    for (const id of communityIds) await ctx.db.delete(id)

    const allPassed = checks.every((c) => c.pass)
    return { allPassed, checks }
  },
})
