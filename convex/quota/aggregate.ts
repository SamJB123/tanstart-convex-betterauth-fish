import { TableAggregate } from '@convex-dev/aggregate'
import { components } from '../_generated/api'
import type { DataModel, Id } from '../_generated/dataModel'
import type { MutationCtx, QueryCtx } from '../_generated/server'

// Net signed sum of ledger quantities, namespaced per entitlement. Ledger
// entries are signed: consumption is negative, transfer/lease in is positive,
// out is negative, adjustments signed. So:
//   remaining = baseAllowance(entitlement) + ledgerSum(entitlement)
// The aggregate keeps this O(log n) per entitlement and stays reactive.
export const quotaLedger = new TableAggregate<{
  Namespace: Id<'entitlements'>
  Key: number
  DataModel: DataModel
  TableName: 'ledgerEntries'
}>(components.quotaLedger, {
  namespace: (doc) => doc.entitlementId,
  sortKey: (doc) => doc.occurredAt,
  sumValue: (doc) => doc.quantity,
})

// Append a ledger entry AND keep the aggregate in sync (append-only ledger, so
// we only ever insert). Returns the new entry id.
export async function appendLedgerEntry(
  ctx: MutationCtx,
  fields: {
    entitlementId: Id<'entitlements'>
    type:
      | 'allocation'
      | 'consumption'
      | 'lease_in'
      | 'lease_out'
      | 'transfer_in'
      | 'transfer_out'
      | 'adjustment'
    quantity: number
    occurredAt: number
    speciesId?: Id<'species'>
    source: {
      kind: 'CDR' | 'VMS_day' | 'logbook' | 'transfer_form' | 'manual'
      ref?: string
      verifiedByPartyId?: Id<'parties'>
    }
    rawWeight?: number
    processingState?: string
    conversionFactor?: number
    catchEventId?: Id<'catchEvents'>
    reversedByEntryId?: Id<'ledgerEntries'>
  },
): Promise<Id<'ledgerEntries'>> {
  const id = await ctx.db.insert('ledgerEntries', fields)
  const doc = (await ctx.db.get(id))!
  await quotaLedger.insert(ctx, doc)
  return id
}

// Net signed sum of all ledger entries for an entitlement.
export async function ledgerSum(
  ctx: QueryCtx,
  entitlementId: Id<'entitlements'>,
): Promise<number> {
  return await quotaLedger.sum(ctx, { namespace: entitlementId })
}
