import { v } from 'convex/values'
import { query } from '../_generated/server'
import { channel } from '../shared/validators'
import { authedMutation } from '../rbac'
import { getViewer } from '../identity/model'

// First vertical slice: the licence-application flow (replaces the Torres Strait
// paper process). Offline-aware: the client supplies a device-generated
// `clientId`; submitting again with the same id UPDATES the existing record.
// RBAC: a fisher lodges/sees only their own applications (enforced by the
// authed wrappers' row-level security); regulators and community admins see more.

// Statutory licence types (Act s.19 family). "TIB"/"TVH" are sectors, passed
// separately — not licence types.
const licenceTypeCode = v.union(
  v.literal('s19_1_master_fisherman'),
  v.literal('s19_2_boat_commercial'),
  v.literal('s19_3_carrier_processing'),
  v.literal('s19_4a_non_boat_commercial'),
  v.literal('s19_4b_fish_receiver'),
  v.literal('s20_treaty_endorsement'),
  v.literal('s12_scientific_permit'),
)

const sector = v.union(
  v.literal('traditional_inhabitant'),
  v.literal('tvh'),
  v.literal('png'),
  v.literal('none'),
)

export const submit = authedMutation({
  args: {
    clientId: v.string(), // device-generated UUID — idempotency key
    clientCreatedAt: v.optional(v.number()),
    licenceTypeCode,
    sector: v.optional(sector),
    communityId: v.optional(v.id('communities')),
    requestedFisheryIds: v.optional(v.array(v.id('fisheries'))),
    channel,
    submit: v.boolean(), // false = save draft, true = lodge
    eligibilityEvidence: v.optional(
      v.object({
        councillorName: v.optional(v.string()),
        mayorName: v.optional(v.string()),
        councilName: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const party = ctx.viewer.party

    const licenceType = await ctx.db
      .query('licenceTypes')
      .withIndex('by_code', (q) => q.eq('code', args.licenceTypeCode))
      .unique()
    if (!licenceType) {
      throw new Error(
        `Unknown licence type "${args.licenceTypeCode}" — run the seed first.`,
      )
    }

    const now = Date.now()
    const status = (args.submit ? 'submitted' : 'draft') as 'submitted' | 'draft'

    const fields = {
      applicantPartyId: party._id,
      licenceTypeId: licenceType._id,
      sector: args.sector,
      communityId: args.communityId,
      status,
      channel: args.channel,
      requestedFisheryIds: args.requestedFisheryIds,
      eligibilityEvidence: args.eligibilityEvidence,
      clientId: args.clientId,
      clientCreatedAt: args.clientCreatedAt,
      syncStatus: 'synced' as const,
      receivedAt: now,
      submittedAt: args.submit ? now : undefined,
    }

    // Idempotent upsert keyed on the device clientId. RLS already scopes this
    // read to the viewer's own applications, so a clientId can't collide across
    // applicants; the explicit ownership check is a belt-and-braces backstop.
    const existing = await ctx.db
      .query('applications')
      .withIndex('by_clientId', (q) => q.eq('clientId', args.clientId))
      .unique()

    if (existing) {
      if (existing.applicantPartyId !== party._id) {
        throw new Error('This application belongs to another applicant.')
      }
      await ctx.db.patch(existing._id, fields)
      return existing._id
    }

    return await ctx.db.insert('applications', fields)
  },
})

// A fisher's own list — explicitly self-scoped, and soft (returns [] for an
// authenticated-but-not-yet-bootstrapped user, e.g. before their first submit)
// so it never throws when loaded eagerly on the dashboard. Cross-party reads
// (officer/community-admin views) go through the RLS-wrapped authed wrappers.
export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const viewer = await getViewer(ctx)
    if (!viewer) return []
    return await ctx.db
      .query('applications')
      .withIndex('by_applicant', (q) =>
        q.eq('applicantPartyId', viewer.party._id),
      )
      .order('desc')
      .take(50)
  },
})
