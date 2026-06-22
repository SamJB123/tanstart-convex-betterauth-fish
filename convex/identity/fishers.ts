import { v } from 'convex/values'
import { mutation, query } from '../_generated/server'
import { getOrCreateViewer, getViewer } from './model'

// Delegate-facing: find or pre-stage a fisher's profile (a `parties` row) before
// inviting them. These intentionally use the RAW db (plain query/mutation +
// explicit auth) rather than the RLS-wrapped authed wrappers: finding/creating
// someone you're helping is a legitimate cross-party operation that deny-by-
// default RLS would otherwise block. The fisher's own account, when they claim
// the invitation, links to this party via ensureAppUser (email match).

// Look up an existing person by exact email — the "is this fisher already in the
// system?" step of the find-or-create UX. Signed-in callers only.
export const findFisherByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const viewer = await getViewer(ctx)
    if (!viewer) return null
    const matches = await ctx.db
      .query('parties')
      .withIndex('by_contactEmail', (q) => q.eq('contactEmail', args.email))
      .take(10)
    const person = matches.find((p) => p.kind === 'person')
    if (!person) return null
    const linked = await ctx.db
      .query('users')
      .withIndex('by_party', (q) => q.eq('partyId', person._id))
      .take(1)
    return {
      partyId: person._id,
      displayName: person.displayName,
      isTraditionalInhabitant: person.isTraditionalInhabitant ?? null,
      hasAccount: linked.length > 0,
    }
  },
})

// Pre-stage (or reuse) a fisher's profile. Returns the party id the delegate
// then uses to request consent + build the draft. Reuses an existing unclaimed
// person with the same email so we don't create duplicates.
export const createFisherProfile = mutation({
  args: {
    name: v.string(),
    email: v.optional(v.string()),
    givenName: v.optional(v.string()),
    familyName: v.optional(v.string()),
    isTraditionalInhabitant: v.optional(v.boolean()),
    isAustralianCitizen: v.optional(v.boolean()),
    contactPhone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const delegate = await getOrCreateViewer(ctx) // throws if not signed in

    if (args.email) {
      const existing = await ctx.db
        .query('parties')
        .withIndex('by_contactEmail', (q) => q.eq('contactEmail', args.email))
        .take(10)
      const match = existing.find((p) => p.kind === 'person')
      if (match) return match._id
    }

    const partyId = await ctx.db.insert('parties', {
      kind: 'person',
      displayName: args.name,
      givenName: args.givenName,
      familyName: args.familyName,
      isTraditionalInhabitant: args.isTraditionalInhabitant,
      isAustralianCitizen: args.isAustralianCitizen,
      contactEmail: args.email,
      contactPhone: args.contactPhone,
      // Identifying data captured to send the invitation — flagged sensitive.
      sensitivity: 'sensitive',
    })

    // Transparency: record that a delegate pre-staged this person's profile.
    await ctx.db.insert('dataAccessLog', {
      subjectPartyId: partyId,
      accessedByUserId: delegate.user._id,
      entityTable: 'parties',
      at: Date.now(),
      action: 'edit',
      reason: `Profile pre-staged by ${delegate.party.displayName} to start an assisted application`,
    })
    return partyId
  },
})
