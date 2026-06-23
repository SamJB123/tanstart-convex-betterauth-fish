import { createFileRoute } from '@tanstack/solid-router'
import { createSignal, For, Show } from 'solid-js'
import { useMutation, useQuery } from '~/library/convex-solid'
import { api } from 'convex/_generated/api'
import type { Id } from 'convex/_generated/dataModel'
import { AppBar, AppShell, Button, Callout, Card, EmptyState } from '~/ui'
import { DATA_USE_TEXT, DELEGATE_AUTHORITY_TEXT } from '~/features/crossing/consent-text'

// The fisher's side of the live consent handoff. When they confirm here, the
// delegate's Crossing screen (watching consentStateFor) updates in real time.
export const Route = createFileRoute('/_authed/confirm')({ component: ConfirmRoute })

function ConfirmRoute() {
  const pending = useQuery(api.governance.consent.myPendingConsents, {})
  const confirm = useMutation(api.governance.consent.confirmConsent)
  const decline = useMutation(api.governance.consent.declineConsent)
  const [busy, setBusy] = createSignal<string | null>(null)

  const text = (t: string) => (t === 'delegate_authority' ? DELEGATE_AUTHORITY_TEXT : DATA_USE_TEXT)
  const title = (t: string) => (t === 'delegate_authority' ? 'Letting someone help you' : 'Using your information')

  const onConfirm = async (id: Id<'consentGrants'>) => {
    setBusy(id)
    try {
      await confirm.mutate({ grantId: id, via: 'self_account' })
    } finally {
      setBusy(null)
    }
  }
  const onDecline = async (id: Id<'consentGrants'>) => {
    setBusy(id)
    try {
      await decline.mutate({ grantId: id })
    } finally {
      setBusy(null)
    }
  }

  const items = () => pending.data() ?? []

  return (
    <AppShell>
      <AppBar title={<span class="font-display">Your consent</span>} subtitle="Only you can say yes" />
      <main class="flex-1 px-4 pb-24 pt-3">
        <Show
          when={items().length > 0}
          fallback={
            <EmptyState
              icon="check-circle"
              title="Nothing to confirm"
              description="You're all up to date. When someone asks for your consent, it'll show here."
            />
          }
        >
          <Callout tone="info" class="mb-4" title="Someone started an application for you">
            Please read each one and say yes <strong>yourself</strong>. No one can agree on your behalf. You can
            change your mind any time.
          </Callout>
          <div class="flex flex-col gap-3">
            <For each={items()}>
              {(g) => (
                <Card eyebrow={g.delegateName ? `${g.delegateName} asked` : 'Asked'} title={title(g.consentType)}>
                  <p class="text-[0.9375rem] leading-relaxed text-[var(--c-muted)]">{text(g.consentType)}</p>
                  <div class="mt-4 flex items-center gap-2">
                    <Button block iconLeft="check" loading={busy() === g._id} onClick={() => onConfirm(g._id)}>
                      Yes, I agree
                    </Button>
                    <Button variant="ghost" disabled={busy() === g._id} onClick={() => onDecline(g._id)}>
                      Not now
                    </Button>
                  </div>
                  <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    <button type="button" class="font-data text-[0.75rem] text-[var(--c-sea)]">
                      🔊 Listen in language
                    </button>
                    <button type="button" class="font-data text-[0.75rem] text-[var(--c-sea)]">
                      Talk to someone
                    </button>
                  </div>
                </Card>
              )}
            </For>
          </div>
        </Show>
      </main>
    </AppShell>
  )
}
