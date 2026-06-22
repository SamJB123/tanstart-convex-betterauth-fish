import { v } from 'convex/values'
import type { MutationCtx, QueryCtx } from '../_generated/server'
import type { Id } from '../_generated/dataModel'
import { authedMutation, authedQuery, type Viewer } from '../rbac'
import { mayorBasis, tiCriterion } from './tables'

// Traditional Inhabitant Identification — the structured ID Form (see
// docs/validation-findings.md §2.1). Mirrors the real PZJA form: a Councillor
// and a Mayor of the SAME Council each attest one of three criteria, with
// conditional evidence. Impl/wrapper split so the rules are smoke-tested.

const councillorBlock = v.object({
  name: v.string(),
  council: v.string(),
  yearsKnown: v.optional(v.number()),
  signedAt: v.optional(v.number()),
})
const mayorBlock = v.object({
  name: v.string(),
  council: v.string(),
  basis: mayorBasis,
  yearsKnown: v.optional(v.number()),
  signedAt: v.optional(v.number()),
})

// A delegate (with a consent grant for the applicant), the applicant themselves,
// or a regulator may record/lodge the verification.
async function canActForApplicant(
  ctx: QueryCtx,
  viewer: Viewer,
  applicantPartyId: Id<'parties'>,
): Promise<boolean> {
  if (viewer.party._id === applicantPartyId || viewer.isRegulator) return true
  const grants = await ctx.db
    .query('consentGrants')
    .withIndex('by_fisherParty', (q) => q.eq('fisherPartyId', applicantPartyId))
    .take(50)
  return grants.some((g) => g.delegateUserId === viewer.user._id)
}

type UpsertArgs = {
  applicantPartyId: Id<'parties'>
  criterion: 'tsi_resident_citizen' | 'aboriginal_ts_npa' | 'png_amnesty_or_descendant'
  clientId?: string
  applicationId?: Id<'applications'>
  isDescendant?: boolean
  placeOfBirth?: string
  dateOfBirth?: string
  postalAddress?: string
  residentialAddress?: string
  councillor?: { name: string; council: string; yearsKnown?: number; signedAt?: number }
  mayor?: {
    name: string
    council: string
    basis: 'known_n_years' | 'sighted_documentation'
    yearsKnown?: number
    signedAt?: number
  }
  applicantDeclarationAccepted?: boolean
}

const sameCouncil = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase()

export async function upsertTiVerificationImpl(
  ctx: MutationCtx,
  viewer: Viewer,
  args: UpsertArgs,
): Promise<Id<'traditionalInhabitantVerifications'>> {
  if (!(await canActForApplicant(ctx, viewer, args.applicantPartyId))) {
    throw new Error('Not authorised to record this verification.')
  }
  // The form's hard rule: both signatories must be from the SAME Council.
  if (args.councillor && args.mayor && !sameCouncil(args.councillor.council, args.mayor.council)) {
    throw new Error('The Councillor and Mayor must be from the same Council.')
  }
  // Attested once both declarations are present.
  const status = args.councillor && args.mayor ? ('attested' as const) : ('draft' as const)
  const fields = {
    applicantPartyId: args.applicantPartyId,
    applicationId: args.applicationId,
    placeOfBirth: args.placeOfBirth,
    dateOfBirth: args.dateOfBirth,
    postalAddress: args.postalAddress,
    residentialAddress: args.residentialAddress,
    criterion: args.criterion,
    isDescendant: args.isDescendant,
    councillor: args.councillor,
    mayor: args.mayor,
    applicantDeclarationAccepted: args.applicantDeclarationAccepted,
    status,
    clientId: args.clientId,
    sensitivity: 'restricted' as const,
  }
  const existing = args.clientId
    ? await ctx.db
        .query('traditionalInhabitantVerifications')
        .withIndex('by_clientId', (q) => q.eq('clientId', args.clientId))
        .unique()
    : null
  if (existing) {
    if (existing.status === 'pending_pzja' || existing.status === 'approved') {
      throw new Error('This verification has already been lodged and can’t be edited.')
    }
    await ctx.db.patch(existing._id, fields)
    return existing._id
  }
  return await ctx.db.insert('traditionalInhabitantVerifications', fields)
}

export async function submitTiVerificationImpl(
  ctx: MutationCtx,
  viewer: Viewer,
  id: Id<'traditionalInhabitantVerifications'>,
): Promise<Id<'traditionalInhabitantVerifications'>> {
  const ver = await ctx.db.get(id)
  if (!ver) throw new Error('Verification not found.')
  if (!(await canActForApplicant(ctx, viewer, ver.applicantPartyId))) {
    throw new Error('Not authorised to lodge this verification.')
  }
  if (!ver.councillor || !ver.mayor) {
    throw new Error('Both a Councillor and a Mayor must sign before lodging.')
  }
  // Conditional evidence (form rules for criterion c).
  if (ver.criterion === 'png_amnesty_or_descendant') {
    if (!ver.homeAffairsLetterStorageId) {
      throw new Error('A Home Affairs confirmation letter is required for this criterion.')
    }
    if (ver.isDescendant && !ver.birthCertificateStorageId) {
      throw new Error('A birth certificate is required for a descendant claim.')
    }
  }
  if (!ver.applicantDeclarationAccepted) {
    throw new Error('The applicant must accept the truthfulness declaration before lodging.')
  }
  // attested → pending PZJA determination (PZJA retains override discretion).
  await ctx.db.patch(id, { status: 'pending_pzja' })
  return id
}

// ── Public functions (thin auth wrappers) ──────────────────────────────────

export const upsertTiVerification = authedMutation({
  args: {
    applicantPartyId: v.id('parties'),
    criterion: tiCriterion,
    clientId: v.optional(v.string()),
    applicationId: v.optional(v.id('applications')),
    isDescendant: v.optional(v.boolean()),
    placeOfBirth: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    postalAddress: v.optional(v.string()),
    residentialAddress: v.optional(v.string()),
    councillor: v.optional(councillorBlock),
    mayor: v.optional(mayorBlock),
    applicantDeclarationAccepted: v.optional(v.boolean()),
  },
  handler: (ctx, args) => upsertTiVerificationImpl(ctx, ctx.viewer, args),
})

export const submitTiVerification = authedMutation({
  args: { verificationId: v.id('traditionalInhabitantVerifications') },
  handler: (ctx, args) => submitTiVerificationImpl(ctx, ctx.viewer, args.verificationId),
})

const evidenceField = v.union(
  v.literal('attestationStorageId'),
  v.literal('familyTreeStorageId'),
  v.literal('residencyEvidenceStorageId'),
  v.literal('homeAffairsLetterStorageId'),
  v.literal('birthCertificateStorageId'),
)

// Attach an uploaded file (storageId from the /uploadFile HTTP action) to a field.
export const attachEvidence = authedMutation({
  args: {
    verificationId: v.id('traditionalInhabitantVerifications'),
    field: evidenceField,
    storageId: v.id('_storage'),
  },
  handler: async (ctx, args) => {
    const ver = await ctx.db.get(args.verificationId)
    if (!ver) throw new Error('Verification not found.')
    if (!(await canActForApplicant(ctx, ctx.viewer, ver.applicantPartyId))) {
      throw new Error('Not authorised to attach evidence.')
    }
    await ctx.db.patch(args.verificationId, { [args.field]: args.storageId })
    return args.verificationId
  },
})

export const getTiVerification = authedQuery({
  args: { applicantPartyId: v.id('parties') },
  handler: async (ctx, args) => {
    if (!(await canActForApplicant(ctx, ctx.viewer, args.applicantPartyId))) return null
    return await ctx.db
      .query('traditionalInhabitantVerifications')
      .withIndex('by_applicant', (q) => q.eq('applicantPartyId', args.applicantPartyId))
      .order('desc')
      .first()
  },
})

// Signed serving URL for an attachment (restricted data — signed-in only).
export const getFileUrl = authedQuery({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId)
  },
})
