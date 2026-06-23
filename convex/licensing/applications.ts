import { v } from 'convex/values'
import { query } from '../_generated/server'
import type { MutationCtx } from '../_generated/server'
import type { Id } from '../_generated/dataModel'
import { channel } from '../shared/validators'
import { authedMutation, authedQuery, type Viewer } from '../rbac'
import { getViewer } from '../identity/model'
import { hasConfirmedConsent } from '../governance/consent'
import { delegateRelationship } from '../governance/tables'
import { resend, EMAIL_FROM } from '../email'

// The licence-application slice (replaces the Torres Strait paper process).
//
// Lodging is the CARE gate point (consent decision): a delegate works the draft
// ON-DEVICE; a SERVER application row is created/lodged here only behind the
// fisher's confirmed consent. Self-applicants confirm data-use consent before
// lodging. On lodge we link the TI verification, write the transparency/audit
// trail, and notify the applicant's community (the "community hook").

// Statutory licence types (Act s.19 family). "TIB"/"TVH" are sectors.
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

type SubmitArgs = {
  clientId: string
  clientCreatedAt?: number
  // Absent → self-application (the caller's own party). Present → on-behalf-of.
  applicantPartyId?: Id<'parties'>
  licenceTypeCode:
    | 's19_1_master_fisherman'
    | 's19_2_boat_commercial'
    | 's19_3_carrier_processing'
    | 's19_4a_non_boat_commercial'
    | 's19_4b_fish_receiver'
    | 's20_treaty_endorsement'
    | 's12_scientific_permit'
  sector?: 'traditional_inhabitant' | 'tvh' | 'png' | 'none'
  communityId?: Id<'communities'>
  requestedFisheryIds?: Id<'fisheries'>[]
  tiVerificationId?: Id<'traditionalInhabitantVerifications'>
  lodgedByRelationship?: 'self' | 'family' | 'community_worker' | 'agent' | 'officer' | 'other'
  channel: 'mobile' | 'web' | 'paper' | 'assisted'
  submit: boolean
}

// Is the caller a delegate for this applicant (they hold a consent grant for
// them)? Used for authorization; the GATE below checks the grant is confirmed.
async function isDelegateOf(
  ctx: MutationCtx,
  viewer: Viewer,
  applicantPartyId: Id<'parties'>,
): Promise<boolean> {
  const grants = await ctx.db
    .query('consentGrants')
    .withIndex('by_fisherParty', (q) => q.eq('fisherPartyId', applicantPartyId))
    .take(50)
  return grants.some((g) => g.delegateUserId === viewer.user._id)
}

// Best-effort: record + email the applicant's community admins on lodge.
async function notifyCommunityOfLodge(
  ctx: MutationCtx,
  info: {
    communityId?: Id<'communities'>
    applicationId: Id<'applications'>
    lodgedByName?: string
  },
): Promise<void> {
  if (!info.communityId) return
  try {
    const community = await ctx.db.get(info.communityId)
    if (!community) return
    // Record the notification (transparency / audit).
    await ctx.db.insert('auditLog', {
      action: 'application_lodged',
      entityTable: 'applications',
      entityId: info.applicationId,
      at: Date.now(),
      purpose: `Community ${community.name} notified of a lodged application`,
    })
    const members = await ctx.db
      .query('communityMembership')
      .withIndex('by_community', (q) => q.eq('communityId', info.communityId as Id<'communities'>))
      .take(200)
    const admins = members.filter((m) => m.status === 'active' && (m.role === 'admin' || m.role === 'elder'))
    for (const admin of admins.slice(0, 10)) {
      const party = await ctx.db.get(admin.partyId)
      if (party?.contactEmail) {
        await resend.sendEmail(ctx, {
          from: EMAIL_FROM,
          to: party.contactEmail,
          subject: `A fishing licence application was lodged in ${community.name}`,
          html: `<p>A fishing licence application was lodged for a member of <strong>${community.name}</strong>${
            info.lodgedByName ? ` (assisted by ${info.lodgedByName})` : ''
          }.</p>`,
        })
      }
    }
  } catch {
    // Notification must never block a lodge.
  }
}

export async function submitImpl(
  ctx: MutationCtx,
  viewer: Viewer,
  args: SubmitArgs,
): Promise<Id<'applications'>> {
  const applicantPartyId = args.applicantPartyId ?? viewer.party._id
  const isDelegate = applicantPartyId !== viewer.party._id

  // ── Authorization ──
  if (isDelegate && !viewer.isRegulator) {
    if (!(await isDelegateOf(ctx, viewer, applicantPartyId))) {
      throw new Error('Not authorised to apply on behalf of this person.')
    }
  }

  // ── CARE consent gate ──
  // A delegate may not put the fisher's data on AFMA's server (draft OR lodge)
  // without the fisher's confirmed consent — both to act on their behalf and to
  // use their information. A self-applicant confirms data-use consent at lodge.
  if (isDelegate) {
    const [dataUse, delegateAuth] = await Promise.all([
      hasConfirmedConsent(ctx, applicantPartyId, 'data_use'),
      hasConfirmedConsent(ctx, applicantPartyId, 'delegate_authority'),
    ])
    if (!dataUse || !delegateAuth) {
      throw new Error(
        'This person must confirm consent — to let you act for them and to use their information — before you can save or lodge their application.',
      )
    }
  } else if (args.submit) {
    if (!(await hasConfirmedConsent(ctx, applicantPartyId, 'data_use'))) {
      throw new Error('Please confirm consent to use your information before lodging.')
    }
  }

  const licenceType = await ctx.db
    .query('licenceTypes')
    .withIndex('by_code', (q) => q.eq('code', args.licenceTypeCode))
    .unique()
  if (!licenceType) {
    throw new Error(`Unknown licence type "${args.licenceTypeCode}" — run the seed first.`)
  }

  const now = Date.now()
  const fields = {
    applicantPartyId,
    licenceTypeId: licenceType._id,
    sector: args.sector,
    communityId: args.communityId,
    status: (args.submit ? 'submitted' : 'draft') as 'submitted' | 'draft',
    channel: args.channel,
    requestedFisheryIds: args.requestedFisheryIds,
    tiVerificationId: args.tiVerificationId,
    lodgedByUserId: isDelegate ? viewer.user._id : undefined,
    lodgedByPartyId: isDelegate ? viewer.party._id : undefined,
    lodgedByRelationship: isDelegate ? args.lodgedByRelationship : undefined,
    clientId: args.clientId,
    clientCreatedAt: args.clientCreatedAt,
    syncStatus: 'synced' as const,
    receivedAt: now,
    submittedAt: args.submit ? now : undefined,
  }

  // Idempotent upsert on the device clientId.
  const existing = await ctx.db
    .query('applications')
    .withIndex('by_clientId', (q) => q.eq('clientId', args.clientId))
    .unique()

  let applicationId: Id<'applications'>
  if (existing) {
    if (existing.applicantPartyId !== applicantPartyId) {
      throw new Error('This application belongs to another applicant.')
    }
    await ctx.db.patch(existing._id, fields)
    applicationId = existing._id
  } else {
    applicationId = await ctx.db.insert('applications', fields)
  }

  if (args.submit) {
    // Back-link the TI verification to the lodged application.
    if (args.tiVerificationId) {
      const ver = await ctx.db.get(args.tiVerificationId)
      if (ver && ver.applicationId !== applicationId) {
        await ctx.db.patch(args.tiVerificationId, { applicationId })
      }
    }
    // Transparency: record the lodge against the applicant.
    await ctx.db.insert('dataAccessLog', {
      subjectPartyId: applicantPartyId,
      accessedByUserId: viewer.user._id,
      entityTable: 'applications',
      at: now,
      action: 'lodge',
      reason: isDelegate
        ? `Application lodged by ${viewer.party.displayName} on behalf of the applicant`
        : 'Application lodged by the applicant',
    })
    await notifyCommunityOfLodge(ctx, {
      communityId: args.communityId,
      applicationId,
      lodgedByName: isDelegate ? viewer.party.displayName : undefined,
    })
  }

  return applicationId
}

// Offline-aware submit. `submit:false` saves; `submit:true` lodges (gated).
export const submit = authedMutation({
  args: {
    clientId: v.string(),
    clientCreatedAt: v.optional(v.number()),
    applicantPartyId: v.optional(v.id('parties')),
    licenceTypeCode,
    sector: v.optional(sector),
    communityId: v.optional(v.id('communities')),
    requestedFisheryIds: v.optional(v.array(v.id('fisheries'))),
    tiVerificationId: v.optional(v.id('traditionalInhabitantVerifications')),
    lodgedByRelationship: v.optional(delegateRelationship),
    channel,
    submit: v.boolean(),
  },
  handler: (ctx, args) => submitImpl(ctx, ctx.viewer, args),
})

// A fisher's own applications (soft: returns [] before bootstrap so it never
// throws on eager dashboard load).
export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const viewer = await getViewer(ctx)
    if (!viewer) return []
    const apps = await ctx.db
      .query('applications')
      .withIndex('by_applicant', (q) => q.eq('applicantPartyId', viewer.party._id))
      .order('desc')
      .take(50)
    // Resolve each licence type's code so the UI can show a friendly name.
    return Promise.all(
      apps.map(async (app) => ({
        ...app,
        licenceTypeCode: (await ctx.db.get(app.licenceTypeId))?.code,
      })),
    )
  },
})

// Applications a delegate has lodged on others' behalf (the "people I'm helping"
// view). RLS-wrapped read is fine — by_lodgedBy is scoped to the caller.
export const listLodgedByMe = authedQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('applications')
      .withIndex('by_lodgedBy', (q) => q.eq('lodgedByUserId', ctx.viewer.user._id))
      .order('desc')
      .take(50)
  },
})
