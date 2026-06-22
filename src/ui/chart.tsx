import { createSignal, For, onSettled, Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'

// Expressive data + status visuals, adapted from the playground's Overview and
// Lab. All SSR-safe: any "liveness" starts in onSettled (client-only) from a
// deterministic seed, so server HTML matches the first client render.

// ── Sparkline — a tiny inline trend (quota burn-down, catch over a season) ──
export function Sparkline(props: {
	data: number[]
	w?: number
	h?: number
	color?: string
	fill?: boolean
	class?: string
}): JSX.Element {
	const w = () => props.w ?? 96
	const h = () => props.h ?? 32
	const geom = () => {
		const data = props.data
		if (data.length < 2) return { line: '', area: '' }
		const min = Math.min(...data)
		const max = Math.max(...data)
		const span = max - min || 1
		const dx = w() / (data.length - 1)
		const pts = data.map((v, i) => {
			const x = i * dx
			const y = h() - 3 - ((v - min) / span) * (h() - 6)
			return [x, y] as const
		})
		const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
		const area = `${line} L${w()} ${h()} L0 ${h()} Z`
		return { line, area }
	}
	return (
		<svg class={cn('overflow-visible', props.class)} width={w()} height={h()} viewBox={`0 0 ${w()} ${h()}`} aria-hidden="true">
			<Show when={props.fill}>
				<path d={geom().area} fill={props.color ?? 'var(--c-sea)'} opacity="0.12" />
			</Show>
			<path
				d={geom().line}
				fill="none"
				stroke={props.color ?? 'var(--c-sea)'}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	)
}

// ── ProgressRing — the Lab "aurora" reborn as a status ring. Determinate shows
//    a fraction (application complete, quota used); `spin` is an indeterminate
//    sync/offline indicator. The conic gradient + @property animate smoothly. ─
export function ProgressRing(props: {
	value?: number
	max?: number
	size?: number
	thickness?: number
	tone?: string
	spin?: boolean
	label?: string
	children?: JSX.Element
	class?: string
}): JSX.Element {
	const size = () => props.size ?? 96
	const thickness = () => props.thickness ?? 8
	const pct = () => {
		const max = props.max ?? 100
		if (max <= 0) return 0
		return Math.max(0, Math.min(100, ((props.value ?? 0) / max) * 100))
	}
	return (
		<div
			class={cn('tide-ring', props.spin && 'tide-ring-spin', props.class)}
			style={{
				width: `${size()}px`,
				height: `${size()}px`,
				'--ring-p': `${pct()}%`,
				'--ring-thickness': `${thickness()}px`,
				'--ring-color': props.tone ?? 'var(--c-sea)',
			}}
			role={props.value !== undefined ? 'progressbar' : undefined}
			aria-valuenow={props.value !== undefined ? Math.round(pct()) : undefined}
			aria-valuemin={props.value !== undefined ? 0 : undefined}
			aria-valuemax={props.value !== undefined ? 100 : undefined}
			aria-label={props.label}
		>
			<div class="tide-ring-hole">{props.children}</div>
		</div>
	)
}

// ── EqualizerBars — the Lab equaliser. Each bar's animation delay comes from
//    CSS sibling-index() (no per-bar JS); used as the "listening" indicator for
//    Yumplatok voice capture. Static, flat bars when inactive. ───────────────
export function EqualizerBars(props: { count?: number; active?: boolean; color?: string; height?: number; class?: string }): JSX.Element {
	return (
		<div
			class={cn('tide-eq', props.active && 'is-active', props.class)}
			style={{ height: `${props.height ?? 40}px`, '--eq-color': props.color ?? 'var(--c-sea)' }}
			aria-hidden="true"
		>
			<For each={Array.from({ length: props.count ?? 28 })}>{() => <span class="tide-eq-bar" />}</For>
		</div>
	)
}

// ── Waveform — a row of level bars. Controlled (pass `values` 0..1) or, with
//    `live`, self-animates client-side from a deterministic seed (SSR-stable). ─
const SEED_WAVE = Array.from({ length: 40 }, (_, i) => 0.25 + 0.4 * Math.abs(Math.sin(i * 0.5) * Math.cos(i * 0.17)))

export function Waveform(props: { values?: number[]; live?: boolean; color?: string; height?: number; class?: string }): JSX.Element {
	const [bars, setBars] = createSignal(props.values ?? SEED_WAVE)
	onSettled(() => {
		if (!props.live || props.values) return
		const id = setInterval(() => {
			setBars((prev) =>
				prev.map((v, i) => {
					const target = 0.18 + Math.random() * (0.55 + 0.35 * Math.abs(Math.sin(i * 0.4)))
					return v + (target - v) * 0.45
				}),
			)
		}, 90)
		return () => clearInterval(id)
	})
	const data = () => props.values ?? bars()
	return (
		<div class={cn('flex items-center gap-[2px]', props.class)} style={{ height: `${props.height ?? 44}px` }} aria-hidden="true">
			<For each={data()}>
				{(v) => (
					<span
						class="flex-1 rounded-full"
						style={{
							height: `${Math.max(6, Math.min(100, v * 100))}%`,
							background: props.color ?? 'var(--c-sea)',
							opacity: 0.4 + v * 0.6,
						}}
					/>
				)}
			</For>
		</div>
	)
}
