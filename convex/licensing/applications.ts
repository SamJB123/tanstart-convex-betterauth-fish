import { v } from 'convex/values'
import { mutation, query } from '../_generated/server'
import { channel } from '../shared/validators'
import { getOrCreateViewer, getViewer } from '../identity/model'

// First vertical slice: the licence-application flow (replaces the Torres Strait
// paper process). Offline-aware: the client supplies a device-generated
// `clientId`; submitting again with the same id UPDATES the existing record
// rather than creating a duplicate, so a lost ack on a flaky link is safe.

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

export const submit = mutation({
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
    const { party } = await getOrCreateViewer(ctx)

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
    const status = (args.submit ? 'submitted' : 'draft') as
      | 'submitted'
      | 'draft'

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

    // Idempotent upsert keyed on the device clientId.
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
