// A Solid 2 binding for `@tanstack/db` — a vendored, framework-agnostic port of
// `@tanstack/solid-db`'s `useLiveQuery`.
//
// WHY VENDORED: the published `@tanstack/solid-db@0.2.x` targets **Solid 1**
// (peer `solid-js >=1.9.0`). Its `useLiveQuery` imports `createResource` and
// `batch` (both removed in Solid 2), pulls `createStore`/`reconcile` from
// `solid-js/store` (folded into `solid-js` core in Solid 2), and uses the
// single-arg `createEffect`. None of that runs on our 2.0 beta. This is the
// exact situation as `convex-solid.tsx`, handled the same way: keep the
// framework-agnostic core (`@tanstack/db`) and re-implement the thin reactive
// bridge for Solid 2.
//
// SCOPE: this module is generic infrastructure. It defines NO collections —
// those are app-domain concerns and live elsewhere (see the collections module).
//
// The core contract we bridge:
//   collection.subscribeChanges(cb, { includeInitialState: true }) -> { unsubscribe }
//   collection.status            -> 'idle' | 'loading' | 'ready' | 'error' | 'cleaned-up'
//   collection.values()          -> current values in order
//   collection.startSyncImmediate()
// We mirror it into Solid signals via the two-arg `createEffect(compute, apply)`:
// reactive reads in the compute, subscribe + return-cleanup in the apply (the
// Solid-2 replacement for `onCleanup` inside an effect — see SOLID_V2_MIGRATION).

import { createEffect, createMemo, createSignal } from 'solid-js'
import {
  BaseQueryBuilder,
  CollectionImpl,
  createLiveQueryCollection,
} from '@tanstack/db'
import type {
  ChangeMessage,
  Collection,
  CollectionStatus,
  Context,
  GetResult,
  InferResultType,
  InitialQueryBuilder,
  LiveQueryCollectionConfig,
  QueryBuilder,
} from '@tanstack/db'

// NOTE: this module deliberately does NOT re-export `@tanstack/db`. App code
// imports core utilities (`createCollection`, `localStorageCollectionOptions`,
// `eq`, ...) straight from `@tanstack/db`. Re-exporting here would also collide
// with the core's own `createEffect` (its query-effect primitive) vs Solid's.

type Status = CollectionStatus | 'disabled'

/**
 * The reactive result of `useLiveQuery`. It's an accessor — call it to read the
 * live data inside JSX — with status flags hung off it as reactive getters.
 */
export type LiveQuery<TData> = (() => TData) & {
  /** @deprecated read via the function call: `query()` not `query.data` */
  readonly data: TData
  readonly collection: Collection<any, any, any> | null
  readonly status: Status
  readonly isLoading: boolean
  readonly isReady: boolean
  readonly isIdle: boolean
  readonly isError: boolean
  readonly isCleanedUp: boolean
}

// Overload 1 — a query function (joins/filters/selects across collections).
export function useLiveQuery<TContext extends Context>(
  queryFn: (q: InitialQueryBuilder) => QueryBuilder<TContext>,
): LiveQuery<InferResultType<TContext>>

// Overload 2 — a reactive config accessor.
export function useLiveQuery<TContext extends Context>(
  config: () => LiveQueryCollectionConfig<TContext>,
): LiveQuery<InferResultType<TContext>>

// Overload 3 — a reactive accessor for a pre-created collection (the common
// case for a persisted app collection: `useLiveQuery(() => draftsCollection)`).
export function useLiveQuery<
  TResult extends object,
  TKey extends string | number,
  TUtils extends Record<string, any>,
>(
  collection: () => Collection<TResult, TKey, TUtils>,
): LiveQuery<Array<TResult>>

export function useLiveQuery(input: (q?: any) => any): LiveQuery<any> {
  // Resolve the input to a concrete collection, reactively. A query-FUNCTION
  // has arity 1 (it receives the query builder); a config/collection ACCESSOR
  // has arity 0. This mirrors the upstream binding's branching.
  const collection = createMemo<Collection<any, any, any> | null>(() => {
    if (input.length === 1) {
      const probe = input(new BaseQueryBuilder() as InitialQueryBuilder)
      if (probe == null) return null // disabled query
      return createLiveQueryCollection({ query: input, startSync: true }) as Collection
    }
    const inner = input()
    if (inner == null) return null
    if (inner instanceof CollectionImpl) {
      inner.startSyncImmediate()
      return inner as Collection
    }
    return createLiveQueryCollection({ ...inner, startSync: true }) as Collection
  })

  const [rows, setRows] = createSignal<Array<any>>([])
  const [status, setStatus] = createSignal<Status>('disabled')

  // Subscribe to the resolved collection. The compute tracks `collection()`;
  // the apply runs untracked and returns the unsubscribe as its cleanup, which
  // Solid runs before the next apply and on disposal. `includeInitialState`
  // fires the callback synchronously with the current rows, so there's no empty
  // first frame for an already-populated (e.g. localStorage-backed) collection.
  createEffect(
    () => collection(),
    (c) => {
      if (!c) {
        setStatus('disabled')
        setRows([])
        return
      }
      const sub = c.subscribeChanges(
        (_changes: Array<ChangeMessage<any>>) => {
          setRows(Array.from(c.values()))
          setStatus(c.status)
        },
        { includeInitialState: true },
      )
      // Cover collections that report status changes without a row change.
      setStatus(c.status)
      return () => sub.unsubscribe()
    },
  )

  // The accessor. For a single-result collection (e.g. a one-row live query),
  // unwrap to the first row to match the upstream ergonomics.
  const read = () => {
    const c = collection()
    if (c && (c.config as { singleResult?: boolean }).singleResult) return rows()[0]
    return rows()
  }

  const getData = read as LiveQuery<any>
  Object.defineProperties(getData, {
    data: { get: read },
    collection: { get: () => collection() },
    status: { get: () => status() },
    isLoading: { get: () => status() === 'loading' },
    // 'disabled' counts as ready: there's simply nothing to wait for.
    isReady: { get: () => status() === 'ready' || status() === 'disabled' },
    isIdle: { get: () => status() === 'idle' },
    isError: { get: () => status() === 'error' },
    isCleanedUp: { get: () => status() === 'cleaned-up' },
  })
  return getData
}
