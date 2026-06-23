import { createFileRoute } from '@tanstack/solid-router'
import { For, Show } from 'solid-js'
import { useQuery } from '~/library/convex-solid'
import { api } from 'convex/_generated/api'
import { AppBar, AppShell, Card, Chip, Divider, Eyebrow, ListRow } from '~/ui'

// NIAA-G3 transparency: "what is held about me, and who has looked at it." A
// direct, plain-language read of the append-only access log + the person's
// consents (governance/consent:transparencyView).
export const Route = createFileRoute('/_authed/my-data')({ component: MyDataRoute })

const ACTION_LABEL: Record<string, string> = {
  lodge: 'Your application was lodged',
  consent_request: 'Someone asked for your consent',
  consent_confirm: 'You confirmed your consent',
  consent_revoke: 'You withdrew your consent',
  consent_decline: 'You declined consent',
  edit: 'Your details were updated',
  view: 'Your information was viewed',
  export: 'Your information was exported',
  disclose: 'Your information was shared',
}

function MyDataRoute() {
  const data = useQuery(api.governance.consent.transparencyView, {})
  const consents = () => data.data()?.consents ?? []
  const log = () => data.data()?.accessLog ?? []
  const fmt = (n: number) => new Date(n).toLocaleString()

  return (
    <AppShell>
      <AppBar
        title={<span class="font-display">What's held about you</span>}
        subtitle="Your information & who has looked at it"
      />
      <main class="flex flex-1 flex-col gap-6 px-4 pb-24 pt-4">
        <section>
          <Eyebrow>Your consents</Eyebrow>
          <Show
            when={consents().length}
            fallback={<p class="mt-2 text-[0.875rem] text-[var(--c-muted)]">No consents recorded yet.</p>}
          >
            <Card flush class="mt-2">
              <For each={consents()}>
                {(c, i) => (
                  <>
                    <Show when={i() > 0}>
                      <Divider />
                    </Show>
                    <ListRow
                      leadingIcon="shield"
                      label={c.consentType === 'data_use' ? 'Using your information' : 'Letting someone help you'}
                      sublabel={`Asked ${fmt(c.requestedAt)}`}
                      value={
                        <Chip tone={c.status === 'confirmed' ? 'reef' : c.status === 'revoked' || c.status === 'declined' ? 'ember' : 'sun'} solid>
                          {c.status}
                        </Chip>
                      }
                    />
                  </>
                )}
              </For>
            </Card>
          </Show>
        </section>

        <section>
          <Eyebrow>Who has looked at your information</Eyebrow>
          <Show
            when={log().length}
            fallback={<p class="mt-2 text-[0.875rem] text-[var(--c-muted)]">No activity recorded yet.</p>}
          >
            <Card flush class="mt-2">
              <For each={log()}>
                {(e, i) => (
                  <>
                    <Show when={i() > 0}>
                      <Divider />
                    </Show>
                    <ListRow
                      leadingIcon="clock"
                      label={(e.action && ACTION_LABEL[e.action]) || e.action || 'Activity'}
                      sublabel={e.reason}
                      value={<span class="font-data text-[0.6875rem] text-[var(--c-faint)]">{fmt(e.at)}</span>}
                    />
                  </>
                )}
              </For>
            </Card>
          </Show>
        </section>
      </main>
    </AppShell>
  )
}
