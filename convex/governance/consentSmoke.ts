import { internalMutation } from '../_generated/server'
import type { MutationCtx } from '../_generated/server'
import type { Id } from '../_generated/dataModel'
import { rolesFor } from '../rbac'
import {
  confirmConsentImpl,
  hasConfirmedConsent,
  requestConsentImpl,
  revokeConsentImpl,
} from './consent'

// Self-cleaning smoke test for the CARE consent flow. Creates REAL rows (no
// casts — genuine Ids), builds Viewers via the real `rolesFor`, and exercises:
//   request → (delegate CANNOT confirm) → fisher confirms → gate opens →
//   fisher revokes → gate closes again.
// Run: `npx convex run governance/consentSmoke:run`

async function makeParty(ctx: MutationCtx, displayName: string): Promise<Id<'parties'>> {
  return ctx.db.insert('parties', { kind: 'person', displayName })
}
async function makeUser(
  ctx: MutationCtx,
  partyId: Id<'parties'>,
  displayName: string,
): Promise<Id<'users'>> {
  return ctx.db.insert('users', {
    authUserId: `smoke-${displayName}-${Math.random().toString(36).slice(2)}`,
    partyId,
    actorType: 'fisher',
    displayName,
    active: true,
  })
}

export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    const checks: { name: string; pass: boolean }[] = []
    const ok = (name: string, pass: boolean) => checks.push({ name, pass })
    // Typed id buckets so cleanup deletes with the correct table type — no casts.
    const partyIds: Id<'parties'>[] = []
    const userIds: Id<'users'>[] = []
    const grantIds: Id<'consentGrants'>[] = []
    const purposeIds: Id<'purposes'>[] = []

    // A UNIQUE throwaway code so the smoke never collides with the seeded
    // 'licence_application' purpose (which would make requestConsent's .unique() throw).
    const smokeCode = `smoke_${Math.random().toString(36).slice(2)}`
    const purposeId = await ctx.db.insert('purposes', {
      code: smokeCode,
      plainEnglish: 'To look at and decide your fishing licence application.',
      dataCategories: ['name', 'contact'],
      allowsSecondaryUse: false,
    })
    purposeIds.push(purposeId)

    const fisherPartyId = await makeParty(ctx, 'Mooki Stephen')
    const fisherUserId = await makeUser(ctx, fisherPartyId, 'Mooki Stephen')
    const delegatePartyId = await makeParty(ctx, 'Aka Lui')
    const delegateUserId = await makeUser(ctx, delegatePartyId, 'Aka Lui')
    partyIds.push(fisherPartyId, delegatePartyId)
    userIds.push(fisherUserId, delegateUserId)

    const fisherUser = await ctx.db.get(fisherUserId)
    const fisherParty = await ctx.db.get(fisherPartyId)
    const delegateUser = await ctx.db.get(delegateUserId)
    const delegateParty = await ctx.db.get(delegatePartyId)
    if (!fisherUser || !fisherParty || !delegateUser || !delegateParty) {
      throw new Error('smoke setup failed to read back created rows')
    }
    const fisher = await rolesFor(ctx, fisherUser, fisherParty)
    const delegate = await rolesFor(ctx, delegateUser, delegateParty)

    // 1. Delegate requests consent → two pending grants.
    const { delegateAuthorityId, dataUseId } = await requestConsentImpl(ctx, delegate, {
      fisherPartyId,
      relationship: 'family',
      purposeCode: smokeCode,
      scope: ['name', 'contact'],
      consentTextVersion: 'v1',
      languageShown: 'en_plain',
    })
    grantIds.push(delegateAuthorityId, dataUseId)
    ok('request creates two pending grants', !!delegateAuthorityId && !!dataUseId)

    // 2. Gate CLOSED while pending.
    ok('gate closed while pending', (await hasConfirmedConsent(ctx, fisherPartyId, 'data_use')) === false)

    // 3. THE CRITICAL CHECK: the delegate cannot confirm the fisher's consent.
    let delegateBlocked = false
    try {
      await confirmConsentImpl(ctx, delegate, dataUseId, 'self_account')
    } catch {
      delegateBlocked = true
    }
    ok('delegate CANNOT confirm (only the fisher can)', delegateBlocked)

    // 4. The fisher personally confirms (in person — no email needed).
    await confirmConsentImpl(ctx, fisher, dataUseId, 'in_person')
    await confirmConsentImpl(ctx, fisher, delegateAuthorityId, 'in_person')
    ok('gate OPEN after fisher confirms data_use', (await hasConfirmedConsent(ctx, fisherPartyId, 'data_use')) === true)
    ok('delegate_authority confirmed', (await hasConfirmedConsent(ctx, fisherPartyId, 'delegate_authority')) === true)

    // 5. Revocation immediately closes the gate again.
    await revokeConsentImpl(ctx, fisher, dataUseId, 'Changed my mind')
    ok('gate CLOSED after revocation', (await hasConfirmedConsent(ctx, fisherPartyId, 'data_use')) === false)

    // 6. The transparency log captured the events (append-only).
    const log = await ctx.db
      .query('dataAccessLog')
      .withIndex('by_subject', (q) => q.eq('subjectPartyId', fisherPartyId))
      .take(50)
    ok('access log recorded request+confirm+revoke', log.length >= 4)

    // Cleanup — leave the deployment as we found it (typed deletes, no casts).
    for (const row of log) await ctx.db.delete(row._id)
    for (const id of grantIds) await ctx.db.delete(id)
    for (const id of userIds) await ctx.db.delete(id)
    for (const id of partyIds) await ctx.db.delete(id)
    for (const id of purposeIds) await ctx.db.delete(id)

    const allPassed = checks.every((c) => c.pass)
    return { allPassed, checks }
  },
})
