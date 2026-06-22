import { internalMutation } from './_generated/server'
import { rlsRules, rolesFor } from './rbac'

// Proves the row-level-security rule logic (incl. the community-admin
// reporter->community join) using REAL rows — every Id is genuine, no casts.
// Creates isolated test data, evaluates the rules, then deletes it all (one
// transaction, no residue). Run with:  npx convex run rbacSmoke:run

export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    const licenceType = (await ctx.db.query('licenceTypes').take(1))[0]
    const fishery = (await ctx.db.query('fisheries').withIndex('by_code', (q) => q.eq('code', 'TSFF')).take(1))[0]
    if (!licenceType || !fishery) throw new Error('seed first')

    // --- Real parties / community / memberships / users ---
    const pA = await ctx.db.insert('parties', { kind: 'person', displayName: 'Fisher A (test)' })
    const pB = await ctx.db.insert('parties', { kind: 'person', displayName: 'Fisher B (test)' })
    const pAdmin = await ctx.db.insert('parties', { kind: 'person', displayName: 'Community admin (test)' })
    const pStaff = await ctx.db.insert('parties', { kind: 'agency', displayName: 'AFMA staff (test)' })
    const comm1 = await ctx.db.insert('communities', { name: 'Test community', kind: 'island_community' })

    const memberships = [
      await ctx.db.insert('communityMembership', { communityId: comm1, partyId: pA, role: 'member', status: 'active' }),
      await ctx.db.insert('communityMembership', { communityId: comm1, partyId: pAdmin, role: 'admin', status: 'active' }),
    ]
    const uStaff = await ctx.db.insert('users', { authUserId: 'test-staff', partyId: pStaff, actorType: 'regulator', active: true })
    const uA = await ctx.db.insert('users', { authUserId: 'test-a', partyId: pA, actorType: 'fisher', active: true })
    const uB = await ctx.db.insert('users', { authUserId: 'test-b', partyId: pB, actorType: 'fisher', active: true })
    const uAdmin = await ctx.db.insert('users', { authUserId: 'test-admin', partyId: pAdmin, actorType: 'communityAdmin', active: true })

    // --- Real docs to evaluate rules against ---
    const appAId = await ctx.db.insert('applications', { applicantPartyId: pA, licenceTypeId: licenceType._id, communityId: comm1, status: 'submitted', channel: 'web' })
    const appBId = await ctx.db.insert('applications', { applicantPartyId: pB, licenceTypeId: licenceType._id, status: 'submitted', channel: 'web' })
    const catchAId = await ctx.db.insert('catchEvents', { reporterPartyId: pA, fisheryId: fishery._id, occurredAt: 0, measureKind: 'weight', status: 'submitted' })
    const catchBId = await ctx.db.insert('catchEvents', { reporterPartyId: pB, fisheryId: fishery._id, occurredAt: 0, measureKind: 'weight', status: 'submitted' })

    // --- Build real viewers via the real roles/community join ---
    const viewer = async (uId: typeof uA) => {
      const user = (await ctx.db.get(uId))!
      const party = (await ctx.db.get(user.partyId!))!
      return await rolesFor(ctx, user, party)
    }
    const vStaff = await viewer(uStaff)
    const vA = await viewer(uA)
    const vB = await viewer(uB)
    const vAdmin = await viewer(uAdmin)

    const appA = (await ctx.db.get(appAId))!
    const appB = (await ctx.db.get(appBId))!
    const catchA = (await ctx.db.get(catchAId))!
    const catchB = (await ctx.db.get(catchBId))!

    const report: { case: string; got: boolean; pass: boolean }[] = []
    const expect = async (c: string, p: Promise<boolean>, want: boolean) =>
      report.push({ case: c, got: await p, pass: (await p) === want })

    await expect('regulator reads appB', rlsRules(vStaff).applications!.read!(vStaff, appB), true)
    await expect('fisherA reads own appA', rlsRules(vA).applications!.read!(vA, appA), true)
    await expect('fisherA reads appB (other)', rlsRules(vA).applications!.read!(vA, appB), false)
    await expect('fisherB reads appA (other)', rlsRules(vB).applications!.read!(vB, appA), false)
    await expect('fisherA inserts own app', rlsRules(vA).applications!.insert!(vA, appA), true)
    await expect('fisherA inserts app for B', rlsRules(vA).applications!.insert!(vA, appB), false)
    await expect('admin reads member appA (join)', rlsRules(vAdmin).applications!.read!(vAdmin, appA), true)
    await expect('admin reads non-member appB', rlsRules(vAdmin).applications!.read!(vAdmin, appB), false)
    await expect('admin reads member catchA (join)', rlsRules(vAdmin).catchEvents!.read!(vAdmin, catchA), true)
    await expect('admin reads non-member catchB', rlsRules(vAdmin).catchEvents!.read!(vAdmin, catchB), false)
    await expect('fisherB reads catchA (other)', rlsRules(vB).catchEvents!.read!(vB, catchA), false)

    // --- Clean up every created row ---
    for (const id of [appAId, appBId]) await ctx.db.delete(id)
    for (const id of [catchAId, catchBId]) await ctx.db.delete(id)
    for (const id of memberships) await ctx.db.delete(id)
    for (const id of [uStaff, uA, uB, uAdmin]) await ctx.db.delete(id)
    await ctx.db.delete(comm1)
    for (const id of [pA, pB, pAdmin, pStaff]) await ctx.db.delete(id)

    const passed = report.filter((r) => r.pass).length
    return { passed, total: report.length, allPassed: passed === report.length, report }
  },
})
