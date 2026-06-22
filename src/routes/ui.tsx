import { createFileRoute } from '@tanstack/solid-router'
import { createSignal, For, Show } from 'solid-js'
import {
	Accordion,
	AppBar,
	AppShell,
	Avatar,
	AvatarStack,
	BottomBar,
	Button,
	Callout,
	Card,
	Carousel,
	CarouselSlide,
	Chip,
	ChoiceCard,
	ChoiceGroup,
	Counter,
	DateField,
	Divider,
	EqualizerBars,
	Eyebrow,
	IconButton,
	ListRow,
	Masonry,
	PinNote,
	ProgressBar,
	ProgressRing,
	QuotaMatrix,
	SeasonStrip,
	SegmentedControl,
	Select,
	Sheet,
	Sparkline,
	StatusDot,
	StatusTimeline,
	Stat,
	TextArea,
	TextField,
	Toggle,
	VoiceButton,
	Waveform,
	type SeasonDay,
	type YMD,
} from '~/ui'

// A public gallery of the Tide design system — every primitive and the
// signature molecules adapted tab-by-tab from the Solid playground dashboard,
// shown in the mobile frame they're built for. Visit /ui.
export const Route = createFileRoute('/ui')({ component: UiShowcase })

// ── A small section heading ─────────────────────────────────────────────────
function Section(props: { eyebrow?: string; title: string; children: any }) {
	return (
		<section class="tide-reveal flex flex-col gap-3.5 px-4 py-5">
			<div class="flex flex-col gap-1">
				<Show when={props.eyebrow}>
					<Eyebrow>{props.eyebrow}</Eyebrow>
				</Show>
				<h2 class="font-display text-xl font-medium text-[var(--c-ink)]">{props.title}</h2>
			</div>
			{props.children}
		</section>
	)
}

const TODAY: YMD = { y: 2026, m: 5, d: 22 }

const SEASON_DAYS: SeasonDay[] = [
	{ label: 'Sat 20', status: 'open' },
	{ label: 'Sun 21', status: 'open' },
	{ label: 'Mon 22', status: 'restricted', today: true },
	{ label: 'Tue 23', status: 'restricted' },
	{ label: 'Wed 24', status: 'closed' },
	{ label: 'Thu 25', status: 'closed' },
	{ label: 'Fri 26', status: 'open' },
	{ label: 'Sat 27', status: 'open' },
]

const MATRIX_ROWS = [
	{ key: 'trl', label: 'Tropical Rock Lobster', sublabel: 'CAAB 28 · TIB pool', color: 'var(--c-coral)' },
	{ key: 'mackerel', label: 'Spanish Mackerel', sublabel: 'CAAB 37445', color: 'var(--c-sea)' },
	{ key: 'prawn', label: 'Torres Strait Prawn', sublabel: 'days of effort', color: 'var(--c-reef)' },
	{ key: 'beche', label: 'Bêche-de-mer', sublabel: 'sea cucumber', color: 'var(--c-sun)' },
]
const MATRIX_COLS = [
	{ key: 'q1', label: 'Q1' },
	{ key: 'q2', label: 'Q2', highlight: true },
	{ key: 'q3', label: 'Q3' },
	{ key: 'q4', label: 'Q4' },
]
// Deterministic pseudo-values (no Math.random in render → SSR-stable).
function hash(s: string): number {
	let h = 2166136261
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i)
		h = Math.imul(h, 16777619)
	}
	return (h >>> 0) % 100
}

const PULSE = [
	{ who: 'Elder Gabai', verb: 'attested', what: 'Saibai community', color: 'var(--c-coral)' },
	{ who: 'AFMA · Officer Roy', verb: 'reviewing', what: 'TIB application #2231', color: 'var(--c-sea)' },
	{ who: 'Mooki', verb: 'logged catch', what: '14kg TRL · Warul Kawa', color: 'var(--c-reef)' },
	{ who: 'PZJA', verb: 'opened', what: 'Prawn season — Zone 3', color: 'var(--c-sun)' },
]

const TIMELINE = [
	{ key: 'draft', label: 'Started on your phone', description: 'Saved here, works offline.', meta: 'Mon 22 Jun · 9:14am' },
	{ key: 'submitted', label: 'Sent to AFMA', description: 'Lodged when you got signal.', meta: 'Mon 22 Jun · 2:01pm' },
	{ key: 'review', label: 'AFMA is checking it', description: 'An officer is reviewing your details.', meta: 'In progress' },
	{ key: 'decision', label: 'Decision', description: 'You’ll be told here and by SMS.' },
]

type Seg = 'guide' | 'apply'

function UiShowcase() {
	const [seg, setSeg] = createSignal<Seg>('guide')
	const [licence, setLicence] = createSignal('s19_2')
	const [fisheries, setFisheries] = createSignal<string[]>(['trl'])
	const [remember, setRemember] = createSignal(true)
	const [date, setDate] = createSignal<YMD | undefined>()
	const [listening, setListening] = createSignal(false)
	const [sheetOpen, setSheetOpen] = createSignal(false)
	const [confirmOpen, setConfirmOpen] = createSignal(false)
	const [rowSheet, setRowSheet] = createSignal<string | null>(null)
	const [step, setStep] = createSignal(2)

	const advance = () => setStep((s) => (s + 1) % (TIMELINE.length + 1))

	return (
		<AppShell>
			<AppBar
				title="Tide"
				subtitle="AFMA Torres Strait design system"
				trailing={<IconButton icon="search" label="Search components" variant="ghost" />}
			/>

			<main class="flex flex-1 flex-col divide-y divide-[var(--c-line)] pb-28">
				<div class="px-4 pb-2 pt-5">
					<Eyebrow>Built for the boat, not the desk</Eyebrow>
					<h1 class="mt-2 font-display text-3xl font-medium leading-tight text-[var(--c-ink)]">
						A warm, sunlight-readable kit for{' '}
						<span class="text-[var(--c-sea)]">saltwater country</span>.
					</h1>
					<p class="mt-3 text-[0.9375rem] leading-relaxed text-[var(--c-muted)]">
						Light, high-contrast, touch-first — every control is thumb-sized, and the flashier
						pieces lean on the 2026 platform while degrading cleanly on older phones.
					</p>
				</div>

				{/* ── FOUNDATIONS ───────────────────────────────────────────── */}
				<Section eyebrow="Foundations" title="Buttons & actions">
					<div class="flex flex-wrap gap-2">
						<Button>Lodge</Button>
						<Button variant="secondary">Save draft</Button>
						<Button variant="ghost" iconLeft="help">Help</Button>
						<Button variant="subtle">Later</Button>
						<Button variant="danger" iconLeft="x">Withdraw</Button>
					</div>
					<div class="flex flex-wrap items-center gap-2">
						<Button size="sm">Small</Button>
						<Button size="lg" iconRight="arrow-right">Large continue</Button>
						<Button loading>Sending</Button>
						<IconButton icon="mic" label="Voice" variant="secondary" />
					</div>
				</Section>

				<Section eyebrow="Foundations" title="Status & identity">
					<div class="flex flex-wrap items-center gap-2">
						<Chip tone="reef" solid>Granted</Chip>
						<Chip tone="sun" solid>Under review</Chip>
						<Chip tone="ember" solid>Refused</Chip>
						<Chip tone="sea">TIB sector</Chip>
						<Chip tone="coral">Native title</Chip>
						<Chip>Draft</Chip>
					</div>
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-2 text-[0.875rem] text-[var(--c-muted)]">
							<StatusDot color="var(--c-reef)" live /> Synced
						</span>
						<AvatarStack
							people={[
								{ name: 'Mooki Stephen', color: 'var(--c-coral)' },
								{ name: 'Roy Mosby', color: 'var(--c-sea)' },
								{ name: 'Aka Lui', color: 'var(--c-reef)' },
								{ name: 'Gabai Tom', color: 'var(--c-sun)' },
								{ name: 'Ena Nai', color: 'var(--c-coral)' },
							]}
							max={4}
						/>
					</div>
					<Card flush>
						<ListRow leadingIcon="user" label="Mooki Stephen" sublabel="Saibai Island · Traditional Inhabitant" value={<Chip tone="reef">Eligible</Chip>} />
						<Divider />
						<ListRow leadingIcon="document" label="TIB application" sublabel="s.19(2) boat commercial" onClick={() => setSheetOpen(true)} />
					</Card>
				</Section>

				{/* ── FORMS ─────────────────────────────────────────────────── */}
				<Section eyebrow="Forms · the heart of the application flow" title="Inputs people can actually use">
					<TextField label="Full name" placeholder="Your name" leadingIcon="user" value="" onInput={() => {}} />
					<DateField label="When did you start fishing this season?" value={date()} onChange={setDate} today={TODAY} hint="Tap to pick a date — opens a thumb-friendly sheet." />
					<Select label="Island community" value="saibai" onChange={() => {}} hint="Your home community (PBC / native-title group).">
						<option value="saibai">Saibai</option>
						<option value="boigu">Boigu</option>
						<option value="badu">Badu (Mulgrave)</option>
						<option value="mer">Mer (Murray)</option>
					</Select>
					<TextArea label="Anything else AFMA should know?" optional placeholder="You can also use the voice button below" value="" onInput={() => {}} />
					<div class="flex items-center justify-between gap-3">
						<VoiceButton listening={listening()} onPress={() => setListening((v) => !v)} />
						<Toggle checked={remember()} onChange={setRemember} label="Remember me on this phone" />
					</div>
				</Section>

				<Section eyebrow="Forms · big-tap-target choices" title="Pick a licence">
					<ChoiceGroup label="Licence type" value={licence()} onChange={setLicence} hint="The statutory s.19 family — plain-language names, with detail a tap away.">
						<ChoiceCard value="s19_1" icon="anchor" label="Master fisherman" description="s.19(1) — you run the fishing." />
						<ChoiceCard value="s19_2" icon="fish" label="Boat (commercial)" description="s.19(2) — a boat used for commercial fishing." />
						<ChoiceCard value="s19_4a" icon="document" label="Non-boat commercial" description="s.19(4a) — commercial take without a boat." />
					</ChoiceGroup>
					<ChoiceGroup multiple label="Which fisheries?" values={fisheries()} onValuesChange={setFisheries} hint="Choose all that apply.">
						<ChoiceCard value="trl" label="Tropical Rock Lobster" description="TIB competitive pool" />
						<ChoiceCard value="mackerel" label="Spanish Mackerel" />
						<ChoiceCard value="prawn" label="Torres Strait Prawn" description="days of effort" />
					</ChoiceGroup>
				</Section>

				<Section eyebrow="Forms · guidance" title="Help that meets you where you are">
					<Callout tone="info" title="Who can hold a TIB licence?">
						Community fishing (TIB) is commercial fishing by Traditional Inhabitants. Eligibility is
						attested by your councillor and mayor — we’ll guide you through it.
					</Callout>
					<Callout tone="warning" title="Dugong & turtle">
						Traditional take is permitted under native title — it isn’t a quota and doesn’t need this
						licence. You can still record it for your community.
					</Callout>
					<Accordion summary="What does ‘held in trust’ mean?" icon="help">
						Some licences are held in trust by the TSRA / Gur A Baradharaw Kod on behalf of a group.
						The right to fish is communal (per <em>Akiba v Commonwealth</em>); the commercial licence
						is exercised by a person.
					</Accordion>
				</Section>

				<Section eyebrow="Forms · switch view" title="Segmented control & sheets">
					<SegmentedControl
						options={[{ id: 'guide', label: 'Guide me' }, { id: 'apply', label: 'I know what I need' }]}
						value={seg()}
						onChange={(v) => setSeg(v as Seg)}
						ariaLabel="Application mode"
					/>
					<div class="flex flex-wrap gap-2">
						<Button variant="secondary" iconLeft="info" onClick={() => setSheetOpen(true)}>Open bottom sheet</Button>
						<Button variant="secondary" onClick={() => setConfirmOpen(true)}>Confirm dialog</Button>
					</div>
				</Section>

				{/* ── PLAYGROUND ADAPTATIONS ────────────────────────────────── */}
				<div class="bg-[var(--c-bg-2)] px-4 py-4">
					<Eyebrow>Adapted from the playground dashboard</Eyebrow>
					<p class="mt-1 text-[0.875rem] text-[var(--c-muted)]">
						Each tab’s signature technique, reimagined for the Torres Strait.
					</p>
				</div>

				{/* Overview → live panel */}
				<Section eyebrow="Overview → On the water" title="Live presence & figures">
					<div class="flex items-center gap-4">
						<ProgressRing value={62} size={92} tone="var(--c-sea)" label="Application 62% complete">
							<span class="font-data text-xl font-semibold tabular-nums text-[var(--c-ink)]">62%</span>
							<span class="font-data text-[0.625rem] uppercase tracking-wide text-[var(--c-faint)]">ready</span>
						</ProgressRing>
						<div class="flex flex-1 flex-col gap-3">
							<div class="flex items-end justify-between gap-2">
								<Stat value={4280} label="TRL quota kg left" animate />
								<Sparkline data={[180, 220, 200, 260, 240, 320, 300, 360, 410, 428]} color="var(--c-coral)" fill />
							</div>
							<ProgressBar value={62} label="Season used" />
						</div>
					</div>
					<Card flush>
						<For each={PULSE}>
							{(p, i) => (
								<>
									<Show when={i() > 0}><Divider /></Show>
									<div class="tide-in flex items-center gap-3 px-4 py-3">
										<StatusDot color={p.color} live={i() < 2} />
										<p class="flex-1 text-[0.875rem] text-[var(--c-muted)]">
											<span class="font-medium text-[var(--c-ink)]">{p.who}</span> {p.verb}{' '}
											<span class="text-[var(--c-ink)]">{p.what}</span>
										</p>
									</div>
								</>
							)}
						</For>
					</Card>
				</Section>

				{/* Lab → carousel + voice */}
				<Section eyebrow="Lab → toolkit" title="Swipe to learn, speak to log">
					<Carousel>
						<CarouselSlide from="#0a6c74" to="#074f56" liveBadge={<>● Step 1</>}>
							<div class="flex h-full flex-col justify-end p-5 text-[var(--c-on-sea)]">
								<span class="font-data text-[0.6875rem] uppercase tracking-[0.18em] opacity-80">What you’ll need</span>
								<span class="mt-1 font-display text-xl">Your name & community</span>
							</div>
						</CarouselSlide>
						<CarouselSlide from="#d6573a" to="#a93c25">
							<div class="flex h-full flex-col justify-end p-5 text-[var(--c-on-coral)]">
								<span class="font-data text-[0.6875rem] uppercase tracking-[0.18em] opacity-80">Eligibility</span>
								<span class="mt-1 font-display text-xl">Councillor & mayor sign-off</span>
							</div>
						</CarouselSlide>
						<CarouselSlide from="#2f8f5b" to="#1d6e42">
							<div class="flex h-full flex-col justify-end p-5 text-white">
								<span class="font-data text-[0.6875rem] uppercase tracking-[0.18em] opacity-80">That’s it</span>
								<span class="mt-1 font-display text-xl">Lodge — even offline</span>
							</div>
						</CarouselSlide>
					</Carousel>
					<Card>
						<div class="flex items-center gap-4">
							<EqualizerBars active={listening()} count={24} height={44} class="flex-1" color="var(--c-coral)" />
							<VoiceButton listening={listening()} onPress={() => setListening((v) => !v)} />
						</div>
						<p class="mt-3 text-[0.8125rem] text-[var(--c-muted)]">
							The bars stagger themselves with <code class="font-data text-[var(--c-ink)]">sibling-index()</code> — the
							listening state for Yumplatok voice capture.
						</p>
					</Card>
				</Section>

				{/* Schedule → seasons */}
				<Section eyebrow="Schedule → seasons" title="Can I fish here, now?">
					<SeasonStrip days={SEASON_DAYS} />
					<p class="text-[0.8125rem] text-[var(--c-muted)]">Zone status by day — swipe through the week.</p>
				</Section>

				{/* Board → application progress */}
				<Section eyebrow="Board → track it" title="Your application">
					<Card>
						<StatusTimeline steps={TIMELINE} current={Math.min(step(), TIMELINE.length - 1)} />
						<Button block variant="secondary" iconRight="arrow-right" onClick={advance} class="mt-2">
							Advance status (demo)
						</Button>
					</Card>
				</Section>

				{/* Roster → entitlement matrix */}
				<Section eyebrow="Roster → entitlements" title="Quota at a glance">
					<QuotaMatrix
						rows={MATRIX_ROWS}
						columns={MATRIX_COLS}
						cornerLabel="Species"
						onRowSelect={(k) => setRowSheet(k)}
						cell={(r, c) => {
							const v = hash(`${r}-${c}`)
							const row = MATRIX_ROWS.find((x) => x.key === r)
							return { value: String(v), color: row?.color, intensity: 0.15 + (v / 100) * 0.6, title: `${r} ${c}: ${v}` }
						}}
					/>
					<p class="text-[0.8125rem] text-[var(--c-muted)]">
						The species column stays pinned while the quarters scroll — tap a species for detail.
					</p>
				</Section>

				{/* Wall → guidance pinboard */}
				<Section eyebrow="Wall → guidance" title="Saved drafts & notices">
					<Masonry min={150}>
						<PinNote pinned priority="high" kind={{ label: 'Decision', color: 'var(--c-coral)' }} title="Your TIB draft" tags={['draft', 'offline']}>
							Saved on this phone. It’ll send itself when you get signal.
						</PinNote>
						<PinNote kind={{ label: 'Notice', color: 'var(--c-sea)' }} title="Prawn season opens Fri" tags={['zone 3']}>
							Days-of-effort fishery. Log each night at sea.
						</PinNote>
						<PinNote kind={{ label: 'Help', color: 'var(--c-reef)' }} title="What is a CDR?">
							A Catch Disposal Record — the verified landed weight your quota is counted from.
						</PinNote>
						<PinNote priority="low" kind={{ label: 'Idea', color: 'var(--c-sun)' }} title="Add your boat later">
							You can nominate a vessel after the licence is granted.
						</PinNote>
					</Masonry>
				</Section>
			</main>

			<BottomBar>
				<Button block size="lg" iconRight="arrow-right">Start an application</Button>
			</BottomBar>

			{/* Sheets */}
			<Sheet
				open={sheetOpen()}
				onClose={() => setSheetOpen(false)}
				title="Lodge this application?"
				footer={
					<>
						<Button block size="lg" iconRight="send" onClick={() => setSheetOpen(false)}>Lodge now</Button>
						<Button block variant="ghost" onClick={() => setSheetOpen(false)}>Keep editing</Button>
					</>
				}
			>
				<div class="flex flex-col gap-3 py-2">
					<Callout tone="info">Once lodged, AFMA will review your application. You can still track it here.</Callout>
					<ListRow leadingIcon="user" label="Applicant" value="Mooki Stephen" />
					<ListRow leadingIcon="document" label="Licence" value="TIB · s.19(2)" />
					<ListRow leadingIcon="location" label="Community" value="Saibai" />
				</div>
			</Sheet>

			<Sheet
				open={confirmOpen()}
				onClose={() => setConfirmOpen(false)}
				variant="center"
				title="Withdraw application?"
				footer={
					<>
						<Button block variant="danger" onClick={() => setConfirmOpen(false)}>Withdraw</Button>
						<Button block variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
					</>
				}
			>
				<p class="py-2 text-[0.9375rem] text-[var(--c-muted)]">
					This can’t be undone. Your draft will be removed from this phone and from AFMA.
				</p>
			</Sheet>

			<Sheet open={rowSheet() !== null} onClose={() => setRowSheet(null)} title="Entitlement">
				<Show when={MATRIX_ROWS.find((r) => r.key === rowSheet())}>
					{(row) => (
						<div class="flex flex-col gap-3 py-2">
							<div class="flex items-center gap-3">
								<Avatar name={row().label as string} color={row().color} />
								<div>
									<p class="font-display text-lg font-medium text-[var(--c-ink)]">{row().label}</p>
									<p class="font-data text-[0.75rem] text-[var(--c-faint)]">{row().sublabel}</p>
								</div>
							</div>
							<Callout tone="neutral">On a phone there’s no hover, so the Roster’s hover-card becomes a tap-through sheet.</Callout>
						</div>
					)}
				</Show>
			</Sheet>
		</AppShell>
	)
}
