import { For, Show, createSignal } from 'solid-js'
import { useMutation, useQuery } from '~/library/convex-solid'
import { api } from 'convex/_generated/api'

// Minimal vertical-slice UI: lodge a Traditional Inhabitant Boat (TIB) licence
// application and see the live list. Each lodge generates a fresh device
// `clientId` (the offline idempotency key); re-sending the same id would update
// rather than duplicate.
export default function ApplicationsCard() {
  const { data } = useQuery(api.licensing.applications.listMine, {})
  const submit = useMutation(api.licensing.applications.submit)
  const [busy, setBusy] = createSignal(false)
  const [error, setError] = createSignal('')

  const lodge = async () => {
    setBusy(true)
    setError('')
    try {
      await submit.mutate({
        clientId: crypto.randomUUID(),
        clientCreatedAt: Date.now(),
        // s.19(2) boat commercial licence, Traditional-Inhabitant (TIB) sector.
        licenceTypeCode: 's19_2_boat_commercial',
        sector: 'traditional_inhabitant',
        channel: 'web',
        submit: true,
      })
    } catch (e: any) {
      setError(e?.message ?? 'Failed to lodge application')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Licence applications</h2>
        <button
          onClick={lodge}
          disabled={busy()}
          class="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {busy() ? 'Lodging…' : 'Lodge TIB application'}
        </button>
      </div>

      <Show when={error()}>
        <p class="text-sm text-red-600 mb-4">{error()}</p>
      </Show>

      <Show
        when={data() && data()!.length > 0}
        fallback={
          <p class="text-sm text-gray-500 py-6 text-center">
            No applications yet. Lodge one to replace the paper form.
          </p>
        }
      >
        <ul class="divide-y divide-gray-100">
          <For each={data()}>
            {(app) => (
              <li class="py-3 flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    TIB application
                  </p>
                  <p class="text-xs text-gray-500">
                    {new Date(app._creationTime).toLocaleString()}
                  </p>
                </div>
                <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
                  {app.status}
                </span>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  )
}
