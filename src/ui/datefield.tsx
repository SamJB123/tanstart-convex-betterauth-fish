import { createSignal, For, Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'
import { Icon } from './icon'
import { Sheet } from './sheet'
import { withScopedViewTransition } from './vt'

// DateField — the Schedule view's generated date picker, rebuilt for touch.
//
// On a desktop the playground anchors a popover to the trigger; on a phone there
// is no hover and an anchored popover is fiddly, so the calendar opens as a
// bottom Sheet (top-layer, focus-trapped, thumb-dismissable). Month changes run
// through an element-scoped View Transition so only the grid morphs. Day cells
// are ≥44px — comfortable targets even with wet hands on a boat.

export type YMD = { y: number; m: number; d: number }

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate()
const firstWeekday = (y: number, m: number) => new Date(y, m, 1).getDay()
const weekdayOf = (y: number, m: number, d: number) => new Date(y, m, d).getDay()
const sameDay = (a: YMD, b: YMD) => a.y === b.y && a.m === b.m && a.d === b.d

export function formatYMD(v: YMD): string {
	return `${WD[weekdayOf(v.y, v.m, v.d)]} ${v.d} ${MONTHS[v.m].slice(0, 3)} ${v.y}`
}

export function DateField(props: {
	value?: YMD
	onChange: (v: YMD) => void
	label?: JSX.Element
	hint?: JSX.Element
	placeholder?: string
	/** A reference "today" (the app pins this; we never read the wall clock). */
	today?: YMD
	class?: string
}): JSX.Element {
	const [open, setOpen] = createSignal(false)
	const seed = () => props.value ?? props.today ?? { y: 2026, m: 5, d: 1 }
	const [view, setView] = createSignal({ y: seed().y, m: seed().m })
	let grid: HTMLDivElement | undefined

	const openSheet = () => {
		setView({ y: seed().y, m: seed().m })
		setOpen(true)
	}
	const shift = (delta: number) =>
		withScopedViewTransition(grid, () =>
			setView((v) => {
				const total = v.y * 12 + v.m + delta
				return { y: Math.floor(total / 12), m: ((total % 12) + 12) % 12 }
			}),
		)
	const cells = () => {
		const { y, m } = view()
		const blanks = firstWeekday(y, m)
		const days = daysInMonth(y, m)
		return Array.from({ length: 42 }, (_, i) => {
			const d = i - blanks + 1
			return d >= 1 && d <= days ? d : null
		})
	}
	const pick = (d: number) => {
		props.onChange({ y: view().y, m: view().m, d })
		setOpen(false)
	}

	return (
		<div class={cn('flex flex-col gap-1.5', props.class)}>
			<Show when={props.label}>
				<span class="text-[0.9375rem] font-medium text-[var(--c-ink)]">{props.label}</span>
			</Show>
			<button
				type="button"
				onClick={openSheet}
				class="tide-press flex min-h-[var(--tap)] items-center gap-2.5 rounded-[var(--r-md)] bg-[var(--c-surface-2)] px-4 text-base shadow-[inset_0_0_0_1.5px_var(--c-line)]"
			>
				<span class="text-[var(--c-faint)]">
					<Icon name="clock" size={20} />
				</span>
				<span class={props.value ? 'text-[var(--c-ink)]' : 'text-[var(--c-faint)]'}>
					{props.value ? formatYMD(props.value) : props.placeholder ?? 'Choose a date'}
				</span>
			</button>
			<Show when={props.hint}>
				<p class="text-[0.8125rem] text-[var(--c-muted)]">{props.hint}</p>
			</Show>

			<Sheet open={open()} onClose={() => setOpen(false)} title="Choose a date">
				<div class="mb-3 flex items-center justify-between">
					<button type="button" aria-label="Previous month" onClick={() => shift(-1)} class="tide-press grid h-10 w-10 place-items-center rounded-full text-[var(--c-muted)] hover:bg-[var(--c-surface-2)]">
						<Icon name="chevron-right" size={22} class="rotate-180" />
					</button>
					<span class="font-display text-lg font-medium text-[var(--c-ink)]">
						{MONTHS[view().m]} {view().y}
					</span>
					<button type="button" aria-label="Next month" onClick={() => shift(1)} class="tide-press grid h-10 w-10 place-items-center rounded-full text-[var(--c-muted)] hover:bg-[var(--c-surface-2)]">
						<Icon name="chevron-right" size={22} />
					</button>
				</div>
				<div ref={grid} class="grid grid-cols-7 gap-1 pb-2">
					<For each={WD}>
						{(w) => <span class="grid h-8 place-items-center font-data text-[0.6875rem] uppercase tracking-wide text-[var(--c-faint)]">{w[0]}</span>}
					</For>
					<For each={cells()} keyed={false}>
						{(cell) => (
							<Show when={cell()} fallback={<span />}>
								{(d) => {
									const cur = () => ({ y: view().y, m: view().m, d: d() })
									const isSel = () => !!props.value && sameDay(props.value, cur())
									const isToday = () => !!props.today && sameDay(props.today, cur())
									return (
										<button
											type="button"
											onClick={() => pick(d())}
											aria-pressed={isSel() ? 'true' : 'false'}
											class={cn(
												'tide-press grid h-11 place-items-center rounded-[var(--r-sm)] font-data text-[0.9375rem] tabular-nums',
												isSel()
													? 'bg-[var(--c-sea)] font-semibold text-[var(--c-on-sea)]'
													: 'text-[var(--c-ink)] hover:bg-[var(--c-sea-soft)]',
												isToday() && !isSel() && 'shadow-[inset_0_0_0_1.5px_var(--c-line-strong)]',
											)}
										>
											{d()}
										</button>
									)
								}}
							</Show>
						)}
					</For>
				</div>
			</Sheet>
		</div>
	)
}

// ── SeasonStrip — a horizontal run of days showing zone/fishery status. The
//    Schedule calendar distilled to the one question a fisher asks: "can I fish
//    here, now?" Swipeable, scroll-snapped, colour + glyph coded. ────────────
export type SeasonDay = {
	label: string // short day label e.g. "Mon 7"
	status: 'open' | 'closed' | 'restricted'
	today?: boolean
}

const SEASON_META: Record<SeasonDay['status'], { color: string; glyph: string; text: string }> = {
	open: { color: 'var(--c-reef)', glyph: '●', text: 'Open' },
	restricted: { color: 'var(--c-sun)', glyph: '◐', text: 'Restricted' },
	closed: { color: 'var(--c-ember)', glyph: '○', text: 'Closed' },
}

export function SeasonStrip(props: { days: SeasonDay[]; class?: string }): JSX.Element {
	return (
		<div class={cn('tide-scroll flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1', props.class)} role="list">
			<For each={props.days}>
				{(day) => {
					const meta = () => SEASON_META[day.status]
					return (
						<div
							role="listitem"
							class={cn('flex flex-none snap-center flex-col items-center gap-1 rounded-[var(--r-md)] px-3 py-2.5', day.today && 'shadow-[inset_0_0_0_2px_var(--c-sea)]')}
							style={{ background: `color-mix(in oklab, ${meta().color} 12%, var(--c-surface))`, 'min-width': '64px' }}
							title={`${day.label} · ${meta().text}`}
						>
							<span class="font-data text-[0.6875rem] uppercase tracking-wide text-[var(--c-muted)]">{day.label}</span>
							<span style={{ color: meta().color }} class="text-lg leading-none">{meta().glyph}</span>
							<span class="font-data text-[0.625rem] uppercase tracking-wide" style={{ color: meta().color }}>{meta().text}</span>
						</div>
					)
				}}
			</For>
		</div>
	)
}
