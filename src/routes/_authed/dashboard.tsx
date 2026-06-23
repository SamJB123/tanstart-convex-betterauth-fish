import { createFileRoute, useNavigate, useRouteContext } from '@tanstack/solid-router'
import { For, Show } from 'solid-js'
import { useQuery } from '~/library/convex-solid'
import { api } from 'convex/_generated/api'
import { authClient } from '~/library/auth-client'
import { useSession } from '~/library/use-session'
import { useDrafts } from '~/collections/drafts'
import { LICENCE_TYPES } from '~/features/crossing/copy'
import {
  AppBar,
  AppShell,
  Button,
  Card,
  Chip,
  Divider,
  EmptyState,
  Eyebrow,
  Icon,
  ListRow,
  type Tone,
} from '~/ui'

// The signed-in home. A hub, not a demo: pick up an in-progress application,
// answer anything waiting on you, and see where your lodged applications stand —
// all live (Convex) and offline-aware (the on-device drafts collection).
export const Route = createFileRoute('/_authed/dashboard')({ component: DashboardRoute })

const STATUS: Record<string, { label: string; tone: Tone }> = {
  draft: { label: 'Draft', tone: 'neutral' },
  submitted: { label: 'Lodged', tone: 'sea' },
  under_review: { label: 'Under review', tone: 'sun' },
  info_requested: { label: 'Info needed', tone: 'coral' },
  granted: { label: 'Granted', tone: 'reef' },
  refused: { label: 'Refused', tone: 'ember' },
}

const licenceName = (code?: string) =>
  LICENCE_TYPES.find((l) => l.code === code)?.name ?? 'Licence application'

function DashboardRoute() {
  const navigate = useNavigate()
  const context = useRouteContext({ from: '/_authed' })
  const session = useSession()
  const user = () => session().data?.user ?? context().user
  const firstName = () => (user()?.name ?? '').trim().split(/\s+/)[0] || 'there'

  const drafts = useDrafts()
  const inProgress = () => (drafts() ?? []).filter((d) => d.status !== 'lodged')
  const apps = useQuery(api.licensing.applications.listMine, {})
  const pending = useQuery(api.governance.consent.myPendingConsents, {})

  const greeting = () => {
    const h = new Date().getHours()
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  }

  const handleSignOut = async () => {
    await authClient.signOut()
    navigate({ to: '/' })
  }

  return (
    <AppShell>
      <AppBar
        title={<span class="font-display">Home</span>}
        subtitle="AFMA Torres Strait"
        trailing={
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        }
      />

      <main class="flex flex-1 flex-col gap-7 px-4 pb-24 pt-4">
        {/* Greeting + primary action — the ocean hero. */}
        <section
          class="tide-rise relative overflow-clip rounded-[var(--r-xl)] px-5 py-6 text-[var(--c-on-sea)]"
          style={{
            background:
              'radial-gradient(120% 90% at 90% -20%, color-mix(in oklab, var(--c-reef) 55%, transparent), transparent 60%), linear-gradient(150deg, var(--c-sea) 0%, var(--c-sea-deep) 100%)',
            'box-shadow': '0 16px 36px -18px color-mix(in oklab, var(--c-sea) 80%, transparent)',
          }}
        >
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -right-6 -top-6 opacity-20"
          >
            <Icon name="waves" size={120} />
          </div>
          <p class="font-data text-[0.6875rem] font-semibold uppercase tracking-[0.16em] opacity-80">
            {greeting()}
          </p>
          <h1 class="mt-1 font-display text-[1.625rem] font-medium leading-tight">{firstName()}</h1>
          <p class="mt-2 max-w-[20rem] text-[0.9375rem] leading-relaxed opacity-90">
            <Show
              when={inProgress().length > 0}
              fallback="Ready to apply for a fishing licence? It only takes a few minutes."
            >
              You have an application on the way. Pick up where you left off.
            </Show>
          </p>
          <Button
            class="mt-4 w-full sm:w-auto"
            variant="secondary"
            size="lg"
            iconRight="arrow-right"
            onClick={() => navigate({ to: '/apply' })}
          >
            <Show when={inProgress().length > 0} fallback="Start an application">
              Continue your application
            </Show>
          </Button>
        </section>

        {/* Anything waiting on this person to confirm (the consent handoff). */}
        <Show when={(pending.data() ?? []).length > 0}>
          <Card
            class="tide-rise"
            accent="var(--c-sun)"
            title="Someone needs you to say yes"
            action={
              <Button variant="secondary" size="sm" iconRight="arrow-right" onClick={() => navigate({ to: '/confirm' })}>
                Review
              </Button>
            }
          >
            <p class="text-[0.9375rem] text-[var(--c-muted)]">
              {(pending.data() ?? []).length === 1
                ? 'One consent request is waiting for you. Only you can say yes.'
                : `${(pending.data() ?? []).length} consent requests are waiting for you. Only you can say yes.`}
            </p>
          </Card>
        </Show>

        {/* In-progress drafts (on-device). */}
        <Show when={inProgress().length > 0}>
          <section>
            <Eyebrow>On the way</Eyebrow>
            <Card flush class="mt-2">
              <For each={inProgress()}>
                {(d, i) => (
                  <>
                    <Show when={i() > 0}>
                      <Divider />
                    </Show>
                    <ListRow
                      leadingIcon="document"
                      label={d.fisher.name ? `${d.fisher.name} · ${licenceName(d.licenceTypeCode)}` : licenceName(d.licenceTypeCode)}
                      sublabel={d.mode === 'delegate' ? 'You are helping with this one' : 'Your application'}
                      value={<Chip tone="sea">Draft</Chip>}
                      onClick={() => navigate({ to: '/apply' })}
                    />
                  </>
                )}
              </For>
            </Card>
          </section>
        </Show>

        {/* Lodged applications and their live status. */}
        <section>
          <Eyebrow>Your applications</Eyebrow>
          <Show
            when={(apps.data() ?? []).length > 0}
            fallback={
              <Card class="mt-2">
                <EmptyState
                  icon="fish"
                  title="No applications yet"
                  description="When you lodge a licence application, it'll appear here so you can track it."
                />
              </Card>
            }
          >
            <Card flush class="mt-2">
              <For each={apps.data()}>
                {(app, i) => {
                  const s = () => STATUS[app.status] ?? { label: app.status, tone: 'neutral' as Tone }
                  return (
                    <>
                      <Show when={i() > 0}>
                        <Divider />
                      </Show>
                      <ListRow
                        leadingIcon="shield"
                        label={licenceName(app.licenceTypeCode)}
                        sublabel={`Lodged ${new Date(app._creationTime).toLocaleDateString()}`}
                        value={<Chip tone={s().tone} solid>{s().label}</Chip>}
                      />
                    </>
                  )
                }}
              </For>
            </Card>
          </Show>
        </section>

        {/* Transparency — quiet but always reachable. */}
        <ListRow
          class="rounded-[var(--r-lg)] bg-[var(--c-surface)] px-4 shadow-[inset_0_0_0_1px_var(--c-line)]"
          leadingIcon="search"
          label="What's held about you"
          sublabel="Your information & who has looked at it"
          onClick={() => navigate({ to: '/my-data' })}
        />
      </main>
    </AppShell>
  )
}
