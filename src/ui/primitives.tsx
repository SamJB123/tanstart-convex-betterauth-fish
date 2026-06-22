import { createEffect, createSignal, For, Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'

// Small display atoms: Eyebrow, Chip, StatusDot, Avatar, Divider, ProgressBar,
// Meter, Counter, Stat, VisuallyHidden. All token-driven and SSR-safe.

// ── Eyebrow — a small uppercase kicker above a heading ──────────────────────
export function Eyebrow(props: { children: JSX.Element; class?: string }): JSX.Element {
	return (
		<span
			class={cn(
				'font-data text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--c-faint)]',
				props.class,
			)}
		>
			{props.children}
		</span>
	)
}

// ── Chip — a status/label pill. `tone` sets the colour; `solid` fills it and
//    uses contrast-color() for guaranteed-readable text. ─────────────────────
export type Tone = 'neutral' | 'sea' | 'coral' | 'reef' | 'sun' | 'ember'

const TONE_VAR: Record<Tone, string> = {
	neutral: 'var(--c-bg-2)',
	sea: 'var(--c-sea)',
	coral: 'var(--c-coral)',
	reef: 'var(--c-reef)',
	sun: 'var(--c-sun)',
	ember: 'var(--c-ember)',
}

export function Chip(props: {
	children: JSX.Element
	tone?: Tone
	solid?: boolean
	class?: string
}): JSX.Element {
	const tone = () => props.tone ?? 'neutral'
	// Soft (default): a tinted background with the tone as text colour.
	// Solid: the full tone as background; text resolves via contrast-color().
	const style = (): JSX.CSSProperties =>
		props.solid
			? { '--chip-bg': TONE_VAR[tone()] }
			: {
					'--chip-bg':
						tone() === 'neutral'
							? 'var(--c-bg-2)'
							: `color-mix(in oklab, ${TONE_VAR[tone()]} 15%, transparent)`,
					color: tone() === 'neutral' ? 'var(--c-muted)' : TONE_VAR[tone()],
				}
	return (
		<span class={cn('tide-chip', props.solid && 'tide-chip-solid', props.class)} style={style()}>
			{props.children}
		</span>
	)
}

// ── StatusDot — a small coloured dot, optionally pulsing to read as "live" ──
export function StatusDot(props: {
	color?: string
	live?: boolean
	size?: number
	class?: string
}): JSX.Element {
	const s = props.size ?? 8
	return (
		<span
			class={cn('inline-block flex-none rounded-full', props.live && 'animate-pulse', props.class)}
			style={{
				width: `${s}px`,
				height: `${s}px`,
				background: props.color ?? 'var(--c-faint)',
				'box-shadow': props.live ? `0 0 0 3px color-mix(in oklab, ${props.color ?? 'var(--c-live)'} 22%, transparent)` : undefined,
			}}
			aria-hidden="true"
		/>
	)
}

// ── Avatar — initials on a tinted disc derived from a per-person colour ─────
export function Avatar(props: {
	name: string
	color?: string
	size?: number
	ring?: string
	class?: string
}): JSX.Element {
	const s = () => props.size ?? 40
	const initials = () =>
		props.name
			.trim()
			.split(/\s+/)
			.map((w) => w[0])
			.slice(0, 2)
			.join('')
			.toUpperCase()
	const color = () => props.color ?? 'var(--c-sea)'
	return (
		<span
			class={cn('grid flex-none place-items-center rounded-full font-data font-semibold uppercase', props.class)}
			style={{
				width: `${s()}px`,
				height: `${s()}px`,
				'font-size': `${Math.round(s() * 0.34)}px`,
				color: color(),
				background: `color-mix(in oklab, ${color()} 18%, var(--c-surface))`,
				'box-shadow': `inset 0 0 0 1.5px color-mix(in oklab, ${color()} 42%, transparent)${props.ring ? `, 0 0 0 2px ${props.ring}` : ''}`,
			}}
			aria-hidden="true"
		>
			{initials()}
		</span>
	)
}

// ── AvatarStack — overlapping avatars (community members, reviewing officers) ─
export function AvatarStack(props: {
	people: { name: string; color?: string }[]
	max?: number
	size?: number
	ring?: string
	class?: string
}): JSX.Element {
	const max = () => props.max ?? 5
	const shown = () => props.people.slice(0, max())
	const overflow = () => Math.max(0, props.people.length - max())
	const s = () => props.size ?? 34
	return (
		<div class={cn('flex items-center', props.class)} style={{ 'padding-left': `${s() * 0.28}px` }}>
			<For each={shown()}>
				{(p) => (
					<span style={{ 'margin-left': `${-s() * 0.28}px` }}>
						<Avatar name={p.name} color={p.color} size={s()} ring={props.ring ?? 'var(--c-surface)'} />
					</span>
				)}
			</For>
			<Show when={overflow() > 0}>
				<span
					class="grid place-items-center rounded-full font-data font-semibold text-[var(--c-muted)]"
					style={{
						'margin-left': `${-s() * 0.28}px`,
						width: `${s()}px`,
						height: `${s()}px`,
						'font-size': `${Math.round(s() * 0.3)}px`,
						background: 'var(--c-bg-2)',
						'box-shadow': `0 0 0 2px ${props.ring ?? 'var(--c-surface)'}`,
					}}
				>
					+{overflow()}
				</span>
			</Show>
		</div>
	)
}

// ── Divider ─────────────────────────────────────────────────────────────────
export function Divider(props: { class?: string }): JSX.Element {
	return <hr class={cn('border-0 border-t border-[var(--c-line)]', props.class)} />
}

// ── VisuallyHidden — present to assistive tech, invisible on screen ─────────
export function VisuallyHidden(props: { children: JSX.Element }): JSX.Element {
	return (
		<span
			style={{
				position: 'absolute',
				width: '1px',
				height: '1px',
				padding: '0',
				margin: '-1px',
				overflow: 'hidden',
				clip: 'rect(0 0 0 0)',
				'white-space': 'nowrap',
				border: '0',
			}}
		>
			{props.children}
		</span>
	)
}

// ── ProgressBar — linear determinate progress (stepper, quota, sync) ────────
export function ProgressBar(props: {
	value: number
	max?: number
	tone?: string
	label?: string
	class?: string
}): JSX.Element {
	const pct = () => {
		const max = props.max ?? 100
		if (max <= 0) return 0
		return Math.max(0, Math.min(100, (props.value / max) * 100))
	}
	return (
		<div
			class={cn('tide-progress', props.class)}
			role="progressbar"
			aria-valuenow={Math.round(props.value)}
			aria-valuemin={0}
			aria-valuemax={props.max ?? 100}
			aria-label={props.label}
		>
			<div
				class="tide-progress-fill"
				style={{ '--tide-w': `${pct()}%`, background: props.tone }}
			/>
		</div>
	)
}

// ── Meter — a thin inline bar (capacity, load). Width driven by typed attr()
//    where supported, with a custom-property fallback. ──────────────────────
export function Meter(props: { value: number; max?: number; color?: string; class?: string }): JSX.Element {
	const pct = () => {
		const max = props.max ?? 100
		if (max <= 0) return 0
		return Math.max(0, Math.min(100, (props.value / max) * 100))
	}
	return (
		<div class={cn('h-1.5 w-full overflow-hidden rounded-full bg-[var(--c-bg-2)]', props.class)}>
			<span
				class="block h-full rounded-full transition-[width] duration-500"
				style={{ width: `${pct()}%`, background: props.color ?? 'var(--c-sea)' }}
			/>
		</div>
	)
}

// ── Counter — a number that tweens when its value changes (e.g. a live quota
//    balance ticking down). SSR-safe: renders the real value first, animation
//    only kicks in on later client-side changes. ────────────────────────────
export function Counter(props: { value: number; class?: string }): JSX.Element {
	const [shown, setShown] = createSignal(props.value)
	createEffect(
		() => props.value,
		(target, prev) => {
			if (prev === undefined || prev === target) {
				setShown(target)
				return
			}
			const from = prev
			const delta = target - from
			const start = performance.now()
			const dur = 550
			let raf = 0
			const tick = (now: number) => {
				const t = Math.min(1, (now - start) / dur)
				const eased = 1 - (1 - t) ** 3 // easeOutCubic
				setShown(Math.round(from + delta * eased))
				if (t < 1) raf = requestAnimationFrame(tick)
			}
			raf = requestAnimationFrame(tick)
			return () => cancelAnimationFrame(raf)
		},
	)
	return <span class={cn('font-data tabular-nums', props.class)}>{shown().toLocaleString()}</span>
}

// ── Stat — a labelled figure (dashboard tiles, summary numbers) ─────────────
export function Stat(props: {
	value: number
	label: string
	unit?: string
	animate?: boolean
	class?: string
}): JSX.Element {
	return (
		<div class={cn('flex flex-col gap-1', props.class)}>
			<div class="font-data text-3xl font-semibold leading-none tabular-nums text-[var(--c-ink)]">
				{props.animate ? <Counter value={props.value} /> : props.value.toLocaleString()}
				{props.unit ? <span class="ml-1 text-base font-medium text-[var(--c-faint)]">{props.unit}</span> : null}
			</div>
			<Eyebrow>{props.label}</Eyebrow>
		</div>
	)
}
