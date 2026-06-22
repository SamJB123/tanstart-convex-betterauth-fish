import { internalMutation } from '../_generated/server'
import type { MutationCtx } from '../_generated/server'
import type { Id } from '../_generated/dataModel'
import { rolesFor } from '../rbac'
import { confirmConsentImpl, requestConsentImpl } from '../governance/consent'
import { submitImpl } from './applications'

// Self-cleaning smoke for the lodge gate (Phase 1D):
//   self lodge needs data-use consent · delegate must be authorised · delegate
//   lodge needs BOTH consents confirmed · lodgedBy recorded · idempotent.
// Run: npx convex run licensing/applicationsSmoke:run

async function makePerson(ctx: MutationCtx, name: string) {
  const partyId = await ctx.db.insert('parties', { kind: 'person', displayName: name })
  const userId = await ctx.db.insert('users', {
    authUserId: `smoke-app-${Math.random().toString(36).slice(2)}`,
    partyId,
    actorType: 'fisher',
    displayName: name,
    active: true,
  })
  return { partyId, userId }
}

export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    const checks: { name: string; pass: boolean }[] = []
    const ok = (name: string, pass: boolean) => checks.push({ name, pass })

    const partyIds: Id<'parties'>[] = []
    const userIds: Id<'users'>[] = []
    const grantIds: Id<'consentGrants'>[] = []
    const appIds = new Set<string>()
    let createdLicenceType: Id<'licenceTypes'> | null = null
    let createdPurpose: Id<'purposes'> | null = null

    // Ensure exactly one s19_2 licence type + the consent purpose exist.
    const lt = await ctx.db
      .query('licenceTypes')
      .withIndex('by_code', (q) => q.eq('code', 's19_2_boat_commercial'))
      .unique()
    if (!lt) {
      createdLicenceType = await ctx.db.insert('licenceTypes', {
        code: 's19_2_boat_commercial',
        statutoryRef: 's19(2)',
        name: 'Boat (commercial)',
        requiresTraditionalInhabitant: true,
        grantableToGroup: false,
        transferRule: 'permanent_and_temporary',
      })
    }
    const purpose = await ctx.db
      .query('purposes')
      .withIndex('by_code', (q) => q.eq('code', 'licence_application'))
      .unique()
    if (!purpose) {
      createdPurpose = await ctx.db.insert('purposes', {
        code: 'licence_application',
        plainEnglish: 'To look at and decide your fishing licence application.',
        dataCategories: ['name', 'contact'],
        allowsSecondaryUse: false,
      })
    }

    const fisher = await makePerson(ctx, 'Mooki Stephen')
    const delegate = await makePerson(ctx, 'Aka Lui')
    partyIds.push(fisher.partyId, delegate.partyId)
    userIds.push(fisher.userId, delegate.userId)
    const fU = await ctx.db.get(fisher.userId)
    const fP = await ctx.db.get(fisher.partyId)
    const dU = await ctx.db.get(delegate.userId)
    const dP = await ctx.db.get(delegate.partyId)
    if (!fU || !fP || !dU || !dP) throw new Error('smoke setup failed')
    const fisherViewer = await rolesFor(ctx, fU, fP)
    const delegateViewer = await rolesFor(ctx, dU, dP)

    const baseApp = {
      licenceTypeCode: 's19_2_boat_commercial' as const,
      sector: 'traditional_inhabitant' as const,
      channel: 'assisted' as const,
    }

    // 1. Self lodge WITHOUT consent → blocked.
    let selfBlocked = false
    try {
      await submitImpl(ctx, fisherViewer, { ...baseApp, clientId: `s1-${Math.random()}`, submit: true })
    } catch {
      selfBlocked = true
    }
    ok('self lodge blocked without data-use consent', selfBlocked)

    // 2. Self confirms data-use consent → self lodge succeeds.
    const selfGrants = await requestConsentImpl(ctx, fisherViewer, {
      fisherPartyId: fisher.partyId,
      relationship: 'self',
      purposeCode: 'licence_application',
      scope: ['name', 'contact'],
      consentTextVersion: 'v1',
    })
    grantIds.push(selfGrants.delegateAuthorityId, selfGrants.dataUseId)
    await confirmConsentImpl(ctx, fisherViewer, selfGrants.dataUseId, 'self_account')
    const selfAppId = await submitImpl(ctx, fisherViewer, { ...baseApp, clientId: `s2-${Math.random()}`, submit: true })
    appIds.add(selfAppId)
    const selfApp = await ctx.db.get(selfAppId)
    ok('self lodge succeeds after data-use consent', selfApp?.status === 'submitted')

    // 3. A non-delegate cannot apply on the fisher's behalf.
    let unauth = false
    try {
      await submitImpl(ctx, delegateViewer, { ...baseApp, applicantPartyId: fisher.partyId, clientId: `s3-${Math.random()}`, submit: false })
    } catch {
      unauth = true
    }
    ok('non-delegate cannot lodge on behalf', unauth)

    // 4. Delegate with PENDING consent → gate still blocks.
    const delGrants = await requestConsentImpl(ctx, delegateViewer, {
      fisherPartyId: fisher.partyId,
      relationship: 'family',
      purposeCode: 'licence_application',
      scope: ['name', 'contact'],
      consentTextVersion: 'v1',
    })
    grantIds.push(delGrants.delegateAuthorityId, delGrants.dataUseId)
    let pendingBlocked = false
    try {
      await submitImpl(ctx, delegateViewer, { ...baseApp, applicantPartyId: fisher.partyId, clientId: `s4-${Math.random()}`, submit: false })
    } catch {
      pendingBlocked = true
    }
    ok('delegate blocked while consent is pending', pendingBlocked)

    // 5. Fisher confirms BOTH → delegate lodge succeeds, lodgedBy recorded.
    await confirmConsentImpl(ctx, fisherViewer, delGrants.dataUseId, 'in_person')
    await confirmConsentImpl(ctx, fisherViewer, delGrants.delegateAuthorityId, 'in_person')
    const clientId = `s5-${Math.random()}`
    const delAppId = await submitImpl(ctx, delegateViewer, {
      ...baseApp,
      applicantPartyId: fisher.partyId,
      lodgedByRelationship: 'family',
      clientId,
      submit: true,
    })
    appIds.add(delAppId)
    const delApp = await ctx.db.get(delAppId)
    ok('delegate lodge succeeds after both consents', delApp?.status === 'submitted')
    ok('applicant = fisher, lodgedBy = delegate', delApp?.applicantPartyId === fisher.partyId && delApp?.lodgedByUserId === delegate.userId)

    // 6. Idempotent on clientId.
    const delAppId2 = await submitImpl(ctx, delegateViewer, {
      ...baseApp,
      applicantPartyId: fisher.partyId,
      lodgedByRelationship: 'family',
      clientId,
      submit: true,
    })
    ok('idempotent re-lodge returns the same application', delAppId === delAppId2)

    // Cleanup.
    for (const id of appIds) await ctx.db.delete(id as Id<'applications'>)
    const logs = await ctx.db
      .query('dataAccessLog')
      .withIndex('by_subject', (q) => q.eq('subjectPartyId', fisher.partyId))
      .take(100)
    for (const l of logs) await ctx.db.delete(l._id)
    for (const id of grantIds) await ctx.db.delete(id)
    for (const id of userIds) await ctx.db.delete(id)
    for (const id of partyIds) await ctx.db.delete(id)
    if (createdLicenceType) await ctx.db.delete(createdLicenceType)
    if (createdPurpose) await ctx.db.delete(createdPurpose)

    const allPassed = checks.every((c) => c.pass)
    return { allPassed, checks }
  },
})
