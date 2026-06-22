import { createCollection, eq, localStorageCollectionOptions } from '@tanstack/db'
import { z } from 'zod'
import { useLiveQuery } from '~/library/solid-db'

// On-device DRAFT licence applications — the offline layer of the assisted-
// application flow. A multi-record, localStorage-persisted TanStack DB
// collection keyed by the device `clientId` (which is also the Convex
// idempotency key). Drafts live here through editing, backgrounding, and
// no-signal; nothing reaches AFMA until an explicit, consent-gated "lodge"
// (see convex/licensing/applications.ts).
//
// Patterns follow the TanStack DB reference (studied 2026-06-23):
//  - A LOCAL collection with NO sync handlers — drafts don't auto-push; the
//    wizard calls the Convex mutation on lodge, then clears/marks the draft.
//  - Zod v4 schema with NO transforms, so the input and output types match and
//    `update(key, draft => {...})` (Immer-style) stays simple.
//  - localStorageCollectionOptions is SSR-safe by construction (in-memory
//    fallback when `window` is undefined), so this singleton is created at
//    module scope. The Solid-2 binding (~/library/solid-db) starts sync on
//    first useLiveQuery; rows are empty during SSR + first client render, then
//    populate post-hydration (no mismatch).

const councillor = z.object({
  name: z.string(),
  council: z.string(),
  yearsKnown: z.number().optional(),
})
const mayor = z.object({
  name: z.string(),
  council: z.string(),
  basis: z.enum(['known_n_years', 'sighted_documentation']),
  yearsKnown: z.number().optional(),
})
const tiBlock = z.object({
  criterion: z
    .enum(['tsi_resident_citizen', 'aboriginal_ts_npa', 'png_amnesty_or_descendant'])
    .optional(),
  isDescendant: z.boolean().optional(),
  placeOfBirth: z.string().optional(),
  dateOfBirth: z.string().optional(), // ISO date string (no transform)
  postalAddress: z.string().optional(),
  residentialAddress: z.string().optional(),
  councillor: councillor.optional(),
  mayor: mayor.optional(),
  applicantDeclarationAccepted: z.boolean(),
  // storage ids returned by the /uploadFile HTTP action
  attestationStorageId: z.string().optional(),
  homeAffairsLetterStorageId: z.string().optional(),
  birthCertificateStorageId: z.string().optional(),
})
const fisher = z.object({
  partyId: z.string().optional(), // set once the party exists (pre-staged or self)
  name: z.string(),
  email: z.string().optional(),
  communityId: z.string().optional(),
  communityName: z.string().optional(),
  isTraditionalInhabitant: z.boolean().optional(),
  isAustralianCitizen: z.boolean().optional(),
})

// The full draft shape — mirrors what the lodge mutation + TI verification need.
export const draftSchema = z.object({
  clientId: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  mode: z.enum(['self', 'delegate']),
  fisher,
  delegate: z
    .object({
      relationship: z
        .enum(['family', 'community_worker', 'agent', 'officer', 'other'])
        .optional(),
      consentRequested: z.boolean().optional(),
    })
    .optional(),
  licenceTypeCode: z
    .enum([
      's19_1_master_fisherman',
      's19_2_boat_commercial',
      's19_3_carrier_processing',
      's19_4a_non_boat_commercial',
      's19_4b_fish_receiver',
      's20_treaty_endorsement',
      's12_scientific_permit',
    ])
    .optional(),
  sector: z.enum(['traditional_inhabitant', 'tvh', 'png', 'none']).optional(),
  // No schema `.default()`s: in Zod v4 they make a field optional in the inferred
  // type, which the collection's insert type (which wants the field present)
  // rejects. createDraft supplies these explicitly instead.
  requestedFisheryIds: z.array(z.string()),
  ti: tiBlock,
  step: z.number(),
  status: z.enum(['draft', 'lodging', 'lodged', 'error']),
  lodgedApplicationId: z.string().optional(),
  lastError: z.string().optional(),
})

export type Draft = z.infer<typeof draftSchema>

export const draftsCollection = createCollection(
  localStorageCollectionOptions({
    storageKey: 'tide.draft-applications.v1',
    getKey: (d) => d.clientId,
    schema: draftSchema,
  }),
)

// ── Imperative CRUD (call from event handlers, client-side) ─────────────────

export function createDraft(seed: { mode: 'self' | 'delegate' } & Partial<Draft>): string {
  const clientId = crypto.randomUUID()
  const now = Date.now()
  // Validate via parse() with explicit blanks for the required fields.
  const draft = draftSchema.parse({
    ...seed,
    clientId,
    createdAt: now,
    updatedAt: now,
    fisher: { name: '', ...seed.fisher },
    ti: { applicantDeclarationAccepted: false, ...seed.ti },
    requestedFisheryIds: seed.requestedFisheryIds ?? [],
    step: seed.step ?? 0,
    status: seed.status ?? 'draft',
  })
  draftsCollection.insert(draft)
  return clientId
}

// Mutate a draft in place (Immer-style); bumps updatedAt.
export function updateDraft(clientId: string, mutate: (draft: Draft) => void): void {
  draftsCollection.update(clientId, (draft) => {
    mutate(draft)
    draft.updatedAt = Date.now()
  })
}

export function deleteDraft(clientId: string): void {
  draftsCollection.delete(clientId)
}

export function getDraft(clientId: string): Draft | undefined {
  return draftsCollection.get(clientId)
}

// ── Live queries (reactive, for the UI) ─────────────────────────────────────

// All drafts, most-recently-edited first — the "Saved drafts" list.
export function useDrafts() {
  return useLiveQuery((q) =>
    q.from({ draft: draftsCollection }).orderBy(({ draft }) => draft.updatedAt, 'desc'),
  )
}

// A single live draft by clientId — the wizard's working record.
export function useDraft(clientId: string) {
  return useLiveQuery((q) =>
    q
      .from({ draft: draftsCollection })
      .where(({ draft }) => eq(draft.clientId, clientId))
      .findOne(),
  )
}
