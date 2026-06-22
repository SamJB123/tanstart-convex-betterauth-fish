import { internalMutation } from '../_generated/server'
import type { Id } from '../_generated/dataModel'
import { rolesFor } from '../rbac'
import { submitTiVerificationImpl, upsertTiVerificationImpl } from './attestation'

// Self-cleaning smoke for the TI Identification rules:
//   same-Council rule · attested status · conditional evidence (criterion c) ·
//   declaration required. Run: npx convex run licensing/attestationSmoke:run
export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    const checks: { name: string; pass: boolean }[] = []
    const ok = (name: string, pass: boolean) => checks.push({ name, pass })
    const verIds: Id<'traditionalInhabitantVerifications'>[] = []

    // Applicant acting for themselves (canActForApplicant via ownership).
    const partyId = await ctx.db.insert('parties', { kind: 'person', displayName: 'Tagai Nona' })
    const userId = await ctx.db.insert('users', {
      authUserId: `smoke-att-${Math.random().toString(36).slice(2)}`,
      partyId,
      actorType: 'fisher',
      displayName: 'Tagai Nona',
      active: true,
    })
    const user = await ctx.db.get(userId)
    const party = await ctx.db.get(partyId)
    if (!user || !party) throw new Error('smoke setup failed')
    const viewer = await rolesFor(ctx, user, party)

    const councillor = { name: 'Cr. Gabai', council: 'Torres Strait Island Regional Council' }
    const mayorSame = {
      name: 'Mayor Mosby',
      council: 'Torres Strait Island Regional Council',
      basis: 'known_n_years' as const,
    }
    const mayorOther = { name: 'Mayor X', council: 'Torres Shire Council', basis: 'known_n_years' as const }

    // 1. Same-Council pair → attested.
    const id1 = await upsertTiVerificationImpl(ctx, viewer, {
      applicantPartyId: partyId,
      criterion: 'tsi_resident_citizen',
      clientId: `att-${Math.random().toString(36).slice(2)}`,
      councillor,
      mayor: mayorSame,
      applicantDeclarationAccepted: true,
    })
    verIds.push(id1)
    const v1 = await ctx.db.get(id1)
    ok('same-Council pair → attested', v1?.status === 'attested')

    // 2. Different-Council Mayor → rejected (the form's hard rule).
    let sameCouncilEnforced = false
    try {
      await upsertTiVerificationImpl(ctx, viewer, {
        applicantPartyId: partyId,
        criterion: 'tsi_resident_citizen',
        councillor,
        mayor: mayorOther,
      })
    } catch {
      sameCouncilEnforced = true
    }
    ok('Councillor & Mayor must be the SAME Council', sameCouncilEnforced)

    // 3. Criterion (a) with declaration → lodges to PZJA.
    await submitTiVerificationImpl(ctx, viewer, id1)
    const v1b = await ctx.db.get(id1)
    ok('criterion (a) lodges → pending_pzja', v1b?.status === 'pending_pzja')

    // 4. Criterion (c) WITHOUT a Home Affairs letter → blocked at lodge.
    const id2 = await upsertTiVerificationImpl(ctx, viewer, {
      applicantPartyId: partyId,
      criterion: 'png_amnesty_or_descendant',
      clientId: `att2-${Math.random().toString(36).slice(2)}`,
      councillor,
      mayor: mayorSame,
      applicantDeclarationAccepted: true,
    })
    verIds.push(id2)
    let conditionalEvidenceEnforced = false
    try {
      await submitTiVerificationImpl(ctx, viewer, id2)
    } catch {
      conditionalEvidenceEnforced = true
    }
    ok('criterion (c) requires a Home Affairs letter to lodge', conditionalEvidenceEnforced)

    // Cleanup.
    for (const id of verIds) await ctx.db.delete(id)
    await ctx.db.delete(userId)
    await ctx.db.delete(partyId)

    const allPassed = checks.every((c) => c.pass)
    return { allPassed, checks }
  },
})
