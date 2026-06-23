import { createMemo, createSignal, For, Match, Show, Switch } from 'solid-js'
import { useQuery, useMutation } from '~/library/convex-solid'
import { api } from 'convex/_generated/api'
// The draft stores ids as plain strings (Zod can't express Convex's branded
// Id<>), so we re-brand them at the Convex call boundary. These are REAL ids
// (e.g. from createFisherProfile), not fabricated.
import type { Id } from 'convex/_generated/dataModel'
import { useSession } from '~/library/use-session'
import { type Draft, updateDraft, useDraft } from '~/collections/drafts'
import {
  AppBar,
  BottomBar,
  Button,
  Callout,
  Card,
  ChoiceCard,
  ChoiceGroup,
  Chip,
  Divider,
  Eyebrow,
  Icon,
  IconButton,
  ListRow,
  Sheet,
  Spinner,
  StatusDot,
  TextField,
  Toggle,
  VoiceButton,
  withViewTransition,
} from '~/ui'
import { uploadFile } from '~/library/upload'
import { CONSENT_TEXT_VERSION } from './consent-text'
import { COUNCILS, CRITERIA, LEGS, LICENCE_TYPES } from './copy'

// THE CROSSING — the assisted licence-application voyage. One scene at a time;
// advancing runs a View Transition so the next leg rises from below. The draft
// (TanStack DB, on-device) is the live source of truth and autosaves on every
// edit; nothing reaches AFMA until the consent-gated lodge at the end.

type SceneProps = {
  draft: Draft
  update: (mutate: (d: Draft) => void) => void
}

export function Crossing(props: { clientId: string }) {
  const draftQuery = useDraft(props.clientId)
  const draft = () => draftQuery() as Draft | undefined
  const [scene, setScene] = createSignal(0)
  const update = (mutate: (d: Draft) => void) => updateDraft(props.clientId, mutate)

  const progress = () => `${Math.round((scene() / (LEGS.length - 1)) * 100)}%`

  const canContinue = createMemo(() => {
    const d = draft()
    if (!d) return false
    switch (scene()) {
      case 0:
        return !!d.mode
      case 1:
        return !!d.fisher.name && (d.mode === 'self' || !!d.fisher.partyId)
      case 2: {
        const cc = d.ti.councillor?.council
        const mc = d.ti.mayor?.council
        return (
          !!d.ti.criterion &&
          !!d.ti.councillor?.name &&
          !!d.ti.mayor?.name &&
          (!cc || !mc || cc === mc)
        )
      }
      case 3:
        return !!d.licenceTypeCode
      case 4:
        return true // consent is its own gate at lodge
      case 5:
        return true
      default:
        return false
    }
  })

  const go = (delta: number) => {
    const next = Math.max(0, Math.min(LEGS.length - 1, scene() + delta))
    if (next !== scene()) withViewTransition(() => setScene(next), [delta > 0 ? 'forward' : 'back'])
  }

  // "Fast current" — jump straight to any leg (express navigation).
  const [jumpOpen, setJumpOpen] = createSignal(false)
  const jumpTo = (n: number) => {
    if (n !== scene()) withViewTransition(() => setScene(n), [n > scene() ? 'forward' : 'back'])
    setJumpOpen(false)
  }

  const isLast = () => scene() === LEGS.length - 1

  return (
    <div class="crossing tide-safe-bottom" style={{ '--crossing-progress': progress() }}>
      <div class="crossing-rail" aria-hidden="true">
        <div class="crossing-rail-fill" />
        <div class="crossing-rail-marker" />
      </div>

      <AppBar
        title={<span class="font-display">The Crossing</span>}
        subtitle={`${LEGS[scene()]} · leg ${scene() + 1} of ${LEGS.length}`}
        onBack={scene() > 0 ? () => go(-1) : undefined}
        trailing={
          <span class="flex items-center gap-1">
            <span class="hidden items-center gap-1.5 font-data text-[0.6875rem] uppercase tracking-wide text-[var(--c-faint)] xs:flex sm:flex">
              <StatusDot color="var(--c-reef)" size={7} /> saved
            </span>
            <IconButton icon="waves" label="Fast current — jump to a leg" variant="ghost" size="sm" onClick={() => setJumpOpen(true)} />
          </span>
        }
      />

      <main class="crossing-scene tide-scroll min-h-0 flex-1 px-5 pb-8 pt-3">
        <Show when={draft()} fallback={<div class="grid place-items-center py-24"><Spinner size={28} label="Loading" /></div>}>
          {(d) => (
            <Switch>
              <Match when={scene() === 0}>
                <CastOff draft={d()} update={update} />
              </Match>
              <Match when={scene() === 1}>
                <Who draft={d()} update={update} />
              </Match>
              <Match when={scene() === 2}>
                <Saltwater draft={d()} update={update} />
              </Match>
              <Match when={scene() === 3}>
                <Licence draft={d()} update={update} />
              </Match>
              <Match when={scene() === 4}>
                <SayingYes draft={d()} update={update} clientId={props.clientId} />
              </Match>
              <Match when={scene() === 5}>
                <CheckTheBoat draft={d()} update={update} />
              </Match>
              <Match when={scene() === 6}>
                <TheCrossing draft={d()} update={update} clientId={props.clientId} />
              </Match>
            </Switch>
          )}
        </Show>
      </main>

      <Show when={!isLast()}>
        <BottomBar>
          <Button block size="lg" iconRight="arrow-right" disabled={!canContinue()} onClick={() => go(1)}>
            Continue
          </Button>
        </BottomBar>
      </Show>

      <Sheet open={jumpOpen()} onClose={() => setJumpOpen(false)} title="Fast current">
        <p class="mb-2 text-[0.875rem] text-[var(--c-muted)]">Jump straight to any part of the voyage.</p>
        <div class="flex flex-col">
          <For each={LEGS}>
            {(leg, i) => (
              <ListRow
                label={leg}
                leadingIcon={i() < scene() ? 'check' : i() === scene() ? 'location' : 'chevron-right'}
                value={i() === scene() ? <Chip tone="sea">here</Chip> : undefined}
                onClick={() => jumpTo(i())}
              />
            )}
          </For>
        </div>
      </Sheet>
    </div>
  )
}

// Small shared scene header.
function Leg(props: { eyebrow: string; title: string; children?: any }) {
  return (
    <header class="tide-rise mb-5 max-w-md">
      <span class="crossing-leg">{props.eyebrow}</span>
      <h1 class="mt-2 font-display text-2xl font-medium leading-tight text-[var(--c-ink)]">{props.title}</h1>
      <Show when={props.children}>
        <p class="mt-2 text-[0.9375rem] leading-relaxed text-[var(--c-muted)]">{props.children}</p>
      </Show>
    </header>
  )
}

// ── 1. Cast off — self or helping ───────────────────────────────────────────
function CastOff(props: SceneProps) {
  return (
    <div>
      <Leg eyebrow="Cast off" title="Are you applying for yourself, or helping someone?">
        A fishing licence application. You can do your own, or help a family or community member with theirs.
      </Leg>
      <ChoiceGroup value={props.draft.mode} onChange={(v) => props.update((d) => { d.mode = v as 'self' | 'delegate' })}>
        <ChoiceCard value="self" icon="user" label="Just me" description="I'm applying for my own licence." />
        <ChoiceCard value="delegate" icon="users" label="I'm helping someone" description="A family or community member, with their permission." />
      </ChoiceGroup>
    </div>
  )
}

// ── 2. Who — the fisher ─────────────────────────────────────────────────────
function Who(props: SceneProps) {
  const session = useSession()
  const lookup = useMutation(api.identity.fishers.createFisherProfile)
  const [busy, setBusy] = createSignal(false)
  const [listening, setListening] = createSignal(false)

  // Self mode: prefill from the signed-in account.
  const selfName = () => session().data?.user?.name ?? ''

  const ensureSelf = () => {
    if (props.draft.mode === 'self' && !props.draft.fisher.name && selfName()) {
      props.update((d) => { d.fisher.name = selfName() })
    }
  }
  ensureSelf()

  const findOrCreate = async () => {
    setBusy(true)
    try {
      const partyId = await lookup.mutate({
        name: props.draft.fisher.name,
        email: props.draft.fisher.email,
      })
      props.update((d) => { d.fisher.partyId = partyId })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <Show
        when={props.draft.mode === 'delegate'}
        fallback={
          <>
            <Leg eyebrow="Who" title="Your details">Check your name is right. This is who the licence is for.</Leg>
            <TextField label="Your full name" value={props.draft.fisher.name} onInput={(v) => props.update((d) => { d.fisher.name = v })} leadingIcon="user" />
          </>
        }
      >
        <Leg eyebrow="Who" title="Who are you helping?">
          Enter their name and email. We'll find them, or set up a profile they can confirm themselves.
        </Leg>
        <div class="flex flex-col gap-3">
          <TextField label="Their full name" value={props.draft.fisher.name} onInput={(v) => props.update((d) => { d.fisher.name = v })} leadingIcon="user" />
          <TextField label="Their email" hint="So they can confirm their consent themselves." value={props.draft.fisher.email ?? ''} onInput={(v) => props.update((d) => { d.fisher.email = v })} type="email" inputmode="email" />
          <VoiceButton listening={listening()} onPress={() => setListening((v) => !v)} label="Speak their details" />
          <Show
            when={props.draft.fisher.partyId}
            fallback={
              <Button variant="secondary" iconLeft="check" loading={busy()} disabled={!props.draft.fisher.name} onClick={findOrCreate}>
                Set up {props.draft.fisher.name || 'their'} profile
              </Button>
            }
          >
            <Callout tone="success" title="Profile ready">
              {props.draft.fisher.name}'s profile is set up. They'll confirm their own consent later in the voyage.
            </Callout>
          </Show>
        </div>
      </Show>
    </div>
  )
}

// A photo capture field. Uploads straight to Convex storage (the /uploadFile
// HTTP action) and hands the storageId back; on mobile the file picker offers
// the camera. The id is held in the draft until lodge attaches it as evidence.
function PhotoField(props: { label: string; storageId?: string; onUploaded: (id: string) => void }) {
  const [busy, setBusy] = createSignal(false)
  const [err, setErr] = createSignal('')
  let input: HTMLInputElement | undefined
  const onChange = async (e: Event & { currentTarget: HTMLInputElement }) => {
    const file = e.currentTarget.files?.[0]
    if (!file) return
    setBusy(true)
    setErr('')
    try {
      props.onUploaded(await uploadFile(file))
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }
  return (
    <div class="flex flex-col gap-1.5">
      <input ref={input} type="file" accept="image/*" class="sr-only" onChange={onChange} />
      <Show
        when={props.storageId}
        fallback={
          <Button variant="secondary" iconLeft="camera" loading={busy()} onClick={() => input?.click()}>
            {props.label}
          </Button>
        }
      >
        <div class="flex items-center gap-2.5 rounded-[var(--r-md)] bg-[var(--c-surface)] px-3.5 py-2.5 shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--c-reef)_45%,var(--c-line))]">
          <span class="grid h-7 w-7 flex-none place-items-center rounded-full bg-[var(--c-reef)] text-white">
            <Icon name="check" size={16} />
          </span>
          <span class="flex-1 text-[0.875rem] text-[var(--c-ink)]">Photo added</span>
          <button type="button" class="font-data text-[0.75rem] text-[var(--c-sea)]" onClick={() => input?.click()}>
            Replace
          </button>
        </div>
      </Show>
      <Show when={err()}>
        <p role="alert" class="text-[0.8125rem] font-medium text-[var(--c-ember)]">{err()}</p>
      </Show>
    </div>
  )
}

// ── 3. Saltwater country — Traditional-Inhabitant eligibility ───────────────
function Saltwater(props: SceneProps) {
  const setCouncillor = (patch: Partial<NonNullable<Draft['ti']['councillor']>>) =>
    props.update((d) => { d.ti.councillor = { name: '', council: '', ...d.ti.councillor, ...patch } })
  const setMayor = (patch: Partial<NonNullable<Draft['ti']['mayor']>>) =>
    props.update((d) => { d.ti.mayor = { name: '', council: '', basis: 'known_n_years', ...d.ti.mayor, ...patch } })

  const sameCouncil = () => {
    const c = props.draft.ti.councillor?.council
    const m = props.draft.ti.mayor?.council
    return !c || !m || c === m
  }

  return (
    <div>
      <Leg eyebrow="Saltwater country" title="Showing you're a Traditional Inhabitant">
        For a first application, a Councillor and a Mayor from the same Council confirm who you are.
      </Leg>

      <ChoiceGroup label="Which describes you?" value={props.draft.ti.criterion} onChange={(v) => props.update((d) => { d.ti.criterion = v as Draft['ti']['criterion'] })}>
        <For each={CRITERIA}>{(c) => <ChoiceCard value={c.code} label={c.name} description={c.plain} />}</For>
      </ChoiceGroup>

      <div class="mt-5 flex flex-col gap-3">
        <Eyebrow>The two people who confirm</Eyebrow>
        <Card>
          <p class="mb-2 text-[0.8125rem] font-semibold text-[var(--c-ink)]">Councillor</p>
          <div class="flex flex-col gap-2.5">
            <TextField label="Councillor's name" value={props.draft.ti.councillor?.name ?? ''} onInput={(v) => setCouncillor({ name: v })} />
            <CouncilSelect value={props.draft.ti.councillor?.council ?? ''} onChange={(v) => setCouncillor({ council: v })} />
          </div>
        </Card>
        <Card>
          <p class="mb-2 text-[0.8125rem] font-semibold text-[var(--c-ink)]">Mayor (same Council)</p>
          <div class="flex flex-col gap-2.5">
            <TextField label="Mayor's name" value={props.draft.ti.mayor?.name ?? ''} onInput={(v) => setMayor({ name: v })} />
            <CouncilSelect value={props.draft.ti.mayor?.council ?? ''} onChange={(v) => setMayor({ council: v })} error={sameCouncil() ? undefined : 'Must be the same Council as the Councillor.'} />
          </div>
        </Card>
        <div class="flex flex-col gap-2.5">
          <Eyebrow>Photo of the signed form</Eyebrow>
          <PhotoField
            label="Add a photo of the signed form"
            storageId={props.draft.ti.attestationStorageId}
            onUploaded={(id) => props.update((d) => { d.ti.attestationStorageId = id })}
          />
          <Show when={props.draft.ti.criterion === 'png_amnesty_or_descendant'}>
            <p class="mt-1 text-[0.8125rem] text-[var(--c-muted)]">
              For this criterion, a Home Affairs confirmation letter is also needed.
            </p>
            <PhotoField
              label="Add the Home Affairs letter"
              storageId={props.draft.ti.homeAffairsLetterStorageId}
              onUploaded={(id) => props.update((d) => { d.ti.homeAffairsLetterStorageId = id })}
            />
          </Show>
        </div>
      </div>
    </div>
  )
}

function CouncilSelect(props: { value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div class="flex flex-col gap-1.5">
      <span class="text-[0.9375rem] font-medium text-[var(--c-ink)]">Council</span>
      <select class="tide-select w-full text-base" value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)}>
        <option value="">Choose a Council…</option>
        <For each={COUNCILS}>{(c) => <option value={c}>{c}</option>}</For>
      </select>
      <Show when={props.error}>
        <p role="alert" class="flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--c-ember)]">
          <Icon name="alert" size={15} />
          {props.error}
        </p>
      </Show>
    </div>
  )
}

// ── 4. The licence ──────────────────────────────────────────────────────────
function Licence(props: SceneProps) {
  const fisheries = useQuery(api.reference.fisheries.list, {})
  const selected = () => props.draft.requestedFisheryIds
  const toggleFishery = (id: string) =>
    props.update((d) => {
      d.requestedFisheryIds = d.requestedFisheryIds.includes(id)
        ? d.requestedFisheryIds.filter((x) => x !== id)
        : [...d.requestedFisheryIds, id]
    })

  return (
    <div>
      <Leg eyebrow="The licence" title="What kind of licence?">Pick the licence, then the fisheries you want on it.</Leg>
      <ChoiceGroup value={props.draft.licenceTypeCode} onChange={(v) => props.update((d) => { d.licenceTypeCode = v as Draft['licenceTypeCode'] })}>
        <For each={LICENCE_TYPES}>{(l) => <ChoiceCard value={l.code} label={l.name} description={l.plain} />}</For>
      </ChoiceGroup>

      <div class="mt-5">
        <Eyebrow>Fisheries (you can choose more than one)</Eyebrow>
        <Show when={fisheries.data()} fallback={<div class="py-4"><Spinner label="Loading fisheries" /></div>}>
          <div class="mt-2 flex flex-wrap gap-2">
            <For each={fisheries.data()}>
              {(f) => (
                <button
                  type="button"
                  onClick={() => toggleFishery(f._id)}
                  class={[
                    'tide-press rounded-[var(--r-pill)] px-3.5 py-2 text-[0.875rem] font-medium',
                    selected().includes(f._id)
                      ? 'bg-[var(--c-sea)] text-[var(--c-on-sea)]'
                      : 'bg-[var(--c-surface)] text-[var(--c-ink)] shadow-[inset_0_0_0_1.5px_var(--c-line)]',
                  ]}
                >
                  {f.name}
                </button>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  )
}

// ── 5. Saying yes — consent + the live handoff ──────────────────────────────
function SayingYes(props: SceneProps & { clientId: string }) {
  const requestConsent = useMutation(api.governance.consent.requestConsent)
  const selfDataUse = useMutation(api.governance.consent.confirmSelfDataUse)

  // LIVE: consent for THIS application (one entry per (application, type)). Keyed
  // by the application's stable clientId, so it's the same source of truth for
  // the self path and the delegate's cross-device handoff — and it tells us when
  // consent already exists, so the step can't be repeated.
  const consentState = useQuery(api.governance.consent.consentForApplication, () => ({
    applicationClientId: props.clientId,
  }))
  const dataUseConfirmed = () =>
    (consentState.data() ?? []).some((g) => g.consentType === 'data_use' && g.status === 'confirmed')
  const delegateConfirmed = () =>
    (consentState.data() ?? []).some((g) => g.consentType === 'delegate_authority' && g.status === 'confirmed')
  const requested = () => (consentState.data() ?? []).length > 0 || props.draft.delegate?.consentRequested

  const [busy, setBusy] = createSignal(false)
  const send = async () => {
    if (!props.draft.fisher.partyId) return
    setBusy(true)
    try {
      await requestConsent.mutate({
        fisherPartyId: props.draft.fisher.partyId as Id<'parties'>,
        relationship: props.draft.delegate?.relationship ?? 'family',
        purposeCode: 'licence_application',
        scope: ['name', 'contact', 'community', 'traditional_inhabitant_status'],
        consentTextVersion: CONSENT_TEXT_VERSION,
        languageShown: 'en_plain',
        applicationClientId: props.clientId,
      })
      props.update((d) => { d.delegate = { ...d.delegate, consentRequested: true } })
    } finally {
      setBusy(false)
    }
  }

  // Self mode: the applicant confirms their own data-use consent (server uses
  // the viewer's own party — no client-held party id needed). Idempotent per
  // application, so a double-tap can't create a second grant.
  const selfConsent = async () => {
    if (dataUseConfirmed()) return
    setBusy(true)
    try {
      await selfDataUse.mutate({
        purposeCode: 'licence_application',
        scope: ['name', 'contact', 'community', 'traditional_inhabitant_status'],
        consentTextVersion: CONSENT_TEXT_VERSION,
        languageShown: 'en_plain',
        applicationClientId: props.clientId,
      })
      props.update((d) => { d.delegate = { ...d.delegate, consentRequested: true } })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <Show
        when={props.draft.mode === 'delegate'}
        fallback={
          <>
            <Leg eyebrow="Saying yes" title="Your consent">
              To give you a licence, AFMA needs to use some of your information — your name, contact, community, and your Traditional Inhabitant status. Only for your licence. You can see what's held and say stop, any time.
            </Leg>
            <Show
              when={dataUseConfirmed()}
              fallback={
                <Button block size="lg" iconLeft="check-circle" loading={busy()} onClick={selfConsent}>
                  Yes, I agree
                </Button>
              }
            >
              <Callout tone="success" title="You said yes">
                Thanks — your consent is recorded for this application. You can carry on to the crossing.
              </Callout>
            </Show>
          </>
        }
      >
        <Leg eyebrow="Saying yes" title={`Only ${props.draft.fisher.name || 'they'} can say yes`}>
          You've started this for {props.draft.fisher.name || 'them'} — but they need to agree themselves, on their own account. Send it to them; you'll see it here the moment they confirm.
        </Leg>

        <Show
          when={requested()}
          fallback={
            <Button block size="lg" iconLeft="send" loading={busy()} disabled={!props.draft.fisher.partyId} onClick={send}>
              Ask {props.draft.fisher.name || 'them'} to confirm
            </Button>
          }
        >
          {/* The LIVE handoff — these chips flip the instant the fisher confirms. */}
          <div class="flex flex-col gap-3">
            <ConsentRow label="Let you help with their application" done={delegateConfirmed()} />
            <ConsentRow label="Use their information for this licence" done={dataUseConfirmed()} />
            <Show
              when={dataUseConfirmed() && delegateConfirmed()}
              fallback={
                <Callout tone="info">
                  <span class="flex items-center gap-2">
                    Waiting for {props.draft.fisher.name || 'them'} to confirm on their phone
                    <span class="inline-flex gap-1">
                      <span class="crossing-waiting-dot" />
                      <span class="crossing-waiting-dot" />
                      <span class="crossing-waiting-dot" />
                    </span>
                  </span>
                </Callout>
              }
            >
              <Callout tone="success" title={`${props.draft.fisher.name || 'They'} said yes`}>
                Consent confirmed. You can make the crossing.
              </Callout>
            </Show>
          </div>
        </Show>
      </Show>
    </div>
  )
}

function ConsentRow(props: { label: string; done: boolean }) {
  return (
    <div class="flex items-center gap-3 rounded-[var(--r-md)] bg-[var(--c-surface)] p-3.5 shadow-[inset_0_0_0_1px_var(--c-line)]">
      <span
        class="grid h-7 w-7 flex-none place-items-center rounded-full transition-colors"
        style={{
          background: props.done ? 'var(--c-reef)' : 'var(--c-bg-2)',
          color: props.done ? 'white' : 'var(--c-faint)',
        }}
      >
        <Icon name={props.done ? 'check' : 'clock'} size={16} />
      </span>
      <span class="text-[0.9375rem] text-[var(--c-ink)]">{props.label}</span>
    </div>
  )
}

// ── 6. Check the boat — review ──────────────────────────────────────────────
function CheckTheBoat(props: SceneProps) {
  const d = props.draft
  const licence = () => LICENCE_TYPES.find((l) => l.code === d.licenceTypeCode)?.name ?? '—'
  const criterion = () => CRITERIA.find((c) => c.code === d.ti.criterion)?.name ?? '—'
  return (
    <div>
      <Leg eyebrow="Check the boat" title="Everything in order?">Have a look before you make the crossing.</Leg>
      <Card flush>
        <ListRow leadingIcon="user" label="Applicant" value={d.fisher.name || '—'} />
        <Divider />
        <ListRow leadingIcon="shield" label="Traditional Inhabitant" value={criterion()} />
        <Divider />
        <ListRow leadingIcon="document" label="Licence" value={licence()} />
        <Divider />
        <ListRow leadingIcon="users" label="Confirmed by" value={`${d.ti.councillor?.name ?? '—'} · ${d.ti.mayor?.name ?? '—'}`} />
      </Card>

      <div class="mt-4">
        <Toggle
          checked={d.ti.applicantDeclarationAccepted}
          onChange={(v) => props.update((dd) => { dd.ti.applicantDeclarationAccepted = v })}
          label={`I declare ${d.mode === 'delegate' ? 'this information is' : "everything here is"} true and correct`}
          description="Giving false or misleading information is an offence."
        />
      </div>
    </div>
  )
}

// ── 7. The crossing — lodge + arrival ───────────────────────────────────────
function TheCrossing(props: SceneProps & { clientId: string }) {
  const submit = useMutation(api.licensing.applications.submit)
  const upsertTi = useMutation(api.licensing.attestation.upsertTiVerification)
  const attachEvidence = useMutation(api.licensing.attestation.attachEvidence)
  const submitTi = useMutation(api.licensing.attestation.submitTiVerification)
  const [state, setState] = createSignal<'ready' | 'lodging' | 'arrived' | 'blocked'>(
    props.draft.status === 'lodged' ? 'arrived' : 'ready',
  )
  const [error, setError] = createSignal('')

  const lodge = async () => {
    if (!props.draft.licenceTypeCode) {
      setError('Choose a licence first.')
      setState('blocked')
      return
    }
    setState('lodging')
    setError('')
    try {
      // 1. Persist + finalise the Traditional-Inhabitant verification first, so a
      // failed declaration/evidence check blocks BEFORE anything is lodged. The
      // upsert is idempotent, so a retry after a consent block is safe.
      let tiVerificationId: Id<'traditionalInhabitantVerifications'> | undefined
      const ti = props.draft.ti
      if (ti.criterion) {
        const applicantPartyId =
          props.draft.mode === 'delegate' ? (props.draft.fisher.partyId as Id<'parties'>) : undefined
        tiVerificationId = await upsertTi.mutate({
          applicantPartyId,
          criterion: ti.criterion,
          clientId: props.draft.clientId,
          isDescendant: ti.isDescendant,
          councillor: ti.councillor,
          mayor: ti.mayor,
          applicantDeclarationAccepted: ti.applicantDeclarationAccepted,
        })
        if (ti.attestationStorageId)
          await attachEvidence.mutate({
            verificationId: tiVerificationId,
            field: 'attestationStorageId',
            storageId: ti.attestationStorageId as Id<'_storage'>,
          })
        if (ti.homeAffairsLetterStorageId)
          await attachEvidence.mutate({
            verificationId: tiVerificationId,
            field: 'homeAffairsLetterStorageId',
            storageId: ti.homeAffairsLetterStorageId as Id<'_storage'>,
          })
        await submitTi.mutate({ verificationId: tiVerificationId })
      }

      // 2. Lodge the application (consent-gated server-side).
      const id = await submit.mutate({
        clientId: props.draft.clientId,
        applicantPartyId:
          props.draft.mode === 'delegate' ? (props.draft.fisher.partyId as Id<'parties'>) : undefined,
        licenceTypeCode: props.draft.licenceTypeCode,
        sector: 'traditional_inhabitant',
        requestedFisheryIds: props.draft.requestedFisheryIds as Id<'fisheries'>[],
        tiVerificationId,
        lodgedByRelationship: props.draft.delegate?.relationship,
        channel: 'assisted',
        submit: true,
      })
      props.update((d) => { d.status = 'lodged'; d.lodgedApplicationId = id })
      setState('arrived')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not lodge yet.'
      setError(msg)
      setState('blocked')
    }
  }

  return (
    <div class="flex min-h-[60dvh] flex-col items-center justify-center px-2 text-center">
      <Switch>
        <Match when={state() === 'arrived'}>
          <div class="crossing-arrival-sun mb-6" aria-hidden="true" />
          <h1 class="font-display text-3xl font-medium text-[var(--c-ink)]">You've made the crossing</h1>
          <p class="mt-3 max-w-xs text-[0.9375rem] text-[var(--c-muted)]">
            {props.draft.fisher.name || 'Your'}'s application is with AFMA. You'll be told here and by email what happens next.
          </p>
          <Callout tone="success" class="mt-6 w-full max-w-sm" title="Lodged">
            AFMA is now reviewing the application.
          </Callout>
        </Match>
        <Match when={state() === 'blocked'}>
          <Callout tone="warning" class="w-full max-w-sm" title="Not yet">
            {error()}
          </Callout>
          <Button class="mt-5" variant="secondary" iconLeft="arrow-left" onClick={() => setState('ready')}>
            Go back
          </Button>
        </Match>
        <Match when={true}>
          <Leg eyebrow="The crossing" title="Ready to make the crossing?">
            This lodges the application with AFMA. You can't change it after.
          </Leg>
          <Button block size="lg" iconRight="send" loading={state() === 'lodging'} onClick={lodge} class="mt-2 w-full max-w-sm">
            Lodge the application
          </Button>
        </Match>
      </Switch>
    </div>
  )
}
