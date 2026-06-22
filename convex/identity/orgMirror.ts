import type { MutationCtx } from '../_generated/server'
import type { Id } from '../_generated/dataModel'

// Mirror Better Auth organization-plugin data into our app tables, so the
// existing RLS / community-admin logic (rbac.ts) sees community membership.
//   organization -> communities      (by orgId)
//   member       -> communityMembership
// Plain functions (like ensureAppUser) so auth.ts's triggers can call them with
// no import cycle. Idempotent.

type OrgDoc = { _id: string; name: string; slug?: string; metadata?: string | null }
type MemberDoc = { _id: string; organizationId: string; userId: string; role: string }

export async function mirrorOrganization(ctx: MutationCtx, org: OrgDoc): Promise<Id<'communities'>> {
  const existing = await ctx.db
    .query('communities')
    .withIndex('by_orgId', (q) => q.eq('orgId', org._id))
    .unique()
  if (existing) {
    if (existing.name !== org.name) await ctx.db.patch(existing._id, { name: org.name })
    return existing._id
  }
  // The community kind can be carried in the org's metadata JSON; default to a
  // plain island community otherwise.
  let kind: 'island_community' | 'pbc' | 'rntbc' = 'island_community'
  if (org.metadata) {
    try {
      const m = JSON.parse(org.metadata) as { kind?: string }
      if (m.kind === 'pbc' || m.kind === 'rntbc' || m.kind === 'island_community') kind = m.kind
    } catch {
      /* non-JSON metadata — ignore */
    }
  }
  return await ctx.db.insert('communities', { name: org.name, kind, orgId: org._id })
}

export async function mirrorMember(ctx: MutationCtx, member: MemberDoc): Promise<void> {
  const community = await ctx.db
    .query('communities')
    .withIndex('by_orgId', (q) => q.eq('orgId', member.organizationId))
    .unique()
  if (!community) return // org not mirrored yet
  const user = await ctx.db
    .query('users')
    .withIndex('by_authUserId', (q) => q.eq('authUserId', member.userId))
    .unique()
  if (!user || !user.partyId) return // app user not mirrored yet
  const partyId = user.partyId
  // Idempotency: does this party already belong to this community?
  const memberships = await ctx.db
    .query('communityMembership')
    .withIndex('by_party', (q) => q.eq('partyId', partyId))
    .take(50)
  if (memberships.some((m) => m.communityId === community._id)) return
  const role: 'member' | 'admin' = member.role === 'owner' || member.role === 'admin' ? 'admin' : 'member'
  await ctx.db.insert('communityMembership', {
    communityId: community._id,
    partyId,
    role,
    status: 'active',
  })
}

export async function unmirrorMember(ctx: MutationCtx, member: MemberDoc): Promise<void> {
  const community = await ctx.db
    .query('communities')
    .withIndex('by_orgId', (q) => q.eq('orgId', member.organizationId))
    .unique()
  if (!community) return
  const user = await ctx.db
    .query('users')
    .withIndex('by_authUserId', (q) => q.eq('authUserId', member.userId))
    .unique()
  if (!user || !user.partyId) return
  const partyId = user.partyId
  const memberships = await ctx.db
    .query('communityMembership')
    .withIndex('by_party', (q) => q.eq('partyId', partyId))
    .take(50)
  const m = memberships.find((x) => x.communityId === community._id)
  // Soft-remove (keep the row for audit; flip to inactive).
  if (m && m.status === 'active') await ctx.db.patch(m._id, { status: 'inactive' })
}
