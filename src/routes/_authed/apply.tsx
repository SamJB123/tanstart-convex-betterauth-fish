import { createFileRoute } from '@tanstack/solid-router'
import { createSignal, onSettled, Show } from 'solid-js'
import { Crossing } from '~/features/crossing/Crossing'
import { createDraft, draftsCollection } from '~/collections/drafts'

export const Route = createFileRoute('/_authed/apply')({ component: ApplyRoute })

function ApplyRoute() {
  const [clientId, setClientId] = createSignal<string | null>(null)

  // Client-only: resume the most recent un-lodged draft, or start a new voyage.
  // (crypto.randomUUID + localStorage are client-only, so this runs post-render.)
  onSettled(() => {
    const existing = draftsCollection.toArray
      .filter((d) => d.status !== 'lodged')
      .sort((a, b) => b.updatedAt - a.updatedAt)[0]
    setClientId(existing ? existing.clientId : createDraft({ mode: 'self' }))
  })

  return (
    <Show
      when={clientId()}
      fallback={
        <div class="grid min-h-[100dvh] place-items-center bg-[var(--c-bg)] font-data text-[0.75rem] uppercase tracking-wide text-[var(--c-faint)]">
          Preparing your voyage…
        </div>
      }
    >
      {(id) => <Crossing clientId={id()} />}
    </Show>
  )
}
