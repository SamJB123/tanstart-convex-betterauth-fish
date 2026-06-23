import { useNavigate } from '@tanstack/solid-router'
import { createSignal, Show } from 'solid-js'
import { authClient } from '~/library/auth-client'
import { refreshAuth } from '~/library/convex-client'
import { Button, Callout, Icon, SegmentedControl, TextField } from '~/ui'

// The front door — an unauthenticated person's first screen. Rebuilt on the Tide
// design system: ocean palette, display type, mobile-first and sunlight-readable,
// composed entirely from the kit's primitives (no bespoke markup to maintain).
type Mode = 'signin' | 'signup'

export default function LoginSignupForm() {
  const navigate = useNavigate()
  const [mode, setMode] = createSignal<Mode>('signin')
  const [name, setName] = createSignal('')
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [loading, setLoading] = createSignal(false)

  const isSignin = () => mode() === 'signin'

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const emailV = String(fd.get('email') ?? '').trim()
    const passwordV = String(fd.get('password') ?? '')
    const nameV = String(fd.get('name') ?? '').trim()
    setError('')
    setLoading(true)
    try {
      if (isSignin()) {
        await authClient.signIn.email({ email: emailV, password: passwordV })
      } else {
        await authClient.signUp.email({ name: nameV, email: emailV, password: passwordV })
      }
      refreshAuth()
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      class="tide-safe-x tide-scroll relative flex min-h-[100dvh] flex-col items-center justify-center overflow-x-clip px-5 py-12"
      style={{
        background:
          'radial-gradient(120% 62% at 50% -8%, color-mix(in oklab, var(--c-sun) 18%, transparent), transparent 55%), linear-gradient(180deg, var(--c-surface) 0%, color-mix(in oklab, var(--c-sea) 11%, var(--c-bg)) 100%)',
      }}
    >
      {/* A soft horizon band near the foot of the screen — the water. */}
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 bottom-0 h-[34dvh]"
        style={{
          background:
            'radial-gradient(140% 100% at 50% 120%, color-mix(in oklab, var(--c-sea) 20%, transparent), transparent 70%)',
          'mask-image': 'linear-gradient(180deg, transparent, #000 60%)',
          opacity: '0.55',
        }}
      />

      <div class="tide-rise relative z-10 flex w-full max-w-[400px] flex-col items-center">
        {/* Brand mark */}
        <span
          class="grid h-16 w-16 place-items-center rounded-[var(--r-xl)] text-[var(--c-on-sea)]"
          style={{
            background:
              'linear-gradient(155deg, color-mix(in oklab, var(--c-sea) 78%, var(--c-reef)), var(--c-sea))',
            'box-shadow': '0 14px 32px -12px color-mix(in oklab, var(--c-sea) 72%, transparent)',
          }}
        >
          <Icon name="waves" size={32} />
        </span>

        <p class="mt-5 font-data text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--c-sea)]">
          Australian Fisheries Management Authority
        </p>
        <h1 class="mt-1.5 text-center font-display text-[1.875rem] font-medium leading-tight text-[var(--c-ink)]">
          Torres Strait Fisheries
        </h1>
        <p class="mt-2 max-w-[18rem] text-center text-[0.9375rem] leading-relaxed text-[var(--c-muted)]">
          Apply for and look after your fishing licence — built with community.
        </p>

        {/* The auth card */}
        <div
          class="mt-7 w-full rounded-[var(--r-xl)] bg-[var(--c-surface)] p-6 sm:p-7"
          style={{ 'box-shadow': 'var(--shadow-3)' }}
        >
          <SegmentedControl
            ariaLabel="Sign in or create an account"
            options={[
              { id: 'signin', label: 'Sign in' },
              { id: 'signup', label: 'Create account' },
            ]}
            value={mode()}
            onChange={(m) => {
              setMode(m)
              setError('')
            }}
          />

          <form onSubmit={handleSubmit} class="mt-5 flex flex-col gap-4">
            <Show when={!isSignin()}>
              <TextField
                label="Full name"
                name="name"
                value={name()}
                onInput={setName}
                required={!isSignin()}
                autocomplete="name"
                placeholder="Your name"
              />
            </Show>

            <TextField
              label="Email"
              name="email"
              type="email"
              inputmode="email"
              value={email()}
              onInput={setEmail}
              required
              autocomplete="email"
              placeholder="you@example.com"
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={password()}
              onInput={setPassword}
              required
              autocomplete={isSignin() ? 'current-password' : 'new-password'}
              placeholder="••••••••"
            />

            <Show when={error()}>
              <Callout tone="warning" title="Couldn't continue">
                {error()}
              </Callout>
            </Show>

            <Button
              type="submit"
              block
              size="lg"
              loading={loading()}
              iconRight={isSignin() ? 'arrow-right' : 'check'}
              class="mt-1"
            >
              {isSignin() ? 'Sign in' : 'Create account'}
            </Button>
          </form>
        </div>

        <p class="mt-6 flex max-w-[20rem] items-start gap-2 text-[0.75rem] leading-relaxed text-[var(--c-faint)]">
          <Icon name="shield" size={14} class="mt-0.5 flex-none" />
          <span class="text-left">
            Your information is held under Indigenous data-governance principles. You choose what's shared, and you
            can see who has looked at it.
          </span>
        </p>
      </div>
    </main>
  )
}
