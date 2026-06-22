import { Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'
import { Eyebrow } from './primitives'
import { Icon, type IconName } from './icon'

// Container surfaces: Card, Callout, ListRow, EmptyState.

// ── Card — the base surface. Optional header (eyebrow / title / trailing action)
//    and an optional accent edge for emphasis. ───────────────────────────────
export function Card(props: {
	children: JSX.Element
	title?: JSX.Element
	eyebrow?: JSX.Element
	action?: JSX.Element
	/** Coloured left edge — token var, e.g. 'var(--c-sea)'. */
	accent?: string
	/** Remove inner padding (for edge-to-edge lists/media). */
	flush?: boolean
	class?: string
}): JSX.Element {
	const hasHeader = () => props.title !== undefined || props.eyebrow !== undefined || props.action !== undefined
	return (
		<section
			class={cn(
				'rounded-[var(--r-lg)] bg-[var(--c-surface)] shadow-[var(--shadow-1)]',
				'shadow-[inset_0_0_0_1px_var(--c-line)]',
				!props.flush && 'p-4 sm:p-5',
				props.class,
			)}
			style={props.accent ? { 'border-left': `3px solid ${props.accent}` } : undefined}
		>
			<Show when={hasHeader()}>
				<header class={cn('flex items-start justify-between gap-3', !props.flush ? 'mb-4' : 'p-4 pb-3')}>
					<div class="flex flex-col gap-1">
						<Show when={props.eyebrow}>
							<Eyebrow>{props.eyebrow}</Eyebrow>
						</Show>
						<Show when={props.title}>
							<h3 class="font-display text-lg font-medium leading-tight text-[var(--c-ink)]">
								{props.title}
							</h3>
						</Show>
					</div>
					<Show when={props.action}>
						<div class="flex-none">{props.action}</div>
					</Show>
				</header>
			</Show>
			{props.children}
		</section>
	)
}

// ── Callout — a plain-language help / status block. Tone sets colour + a
//    default icon; this is where eligibility guidance and gentle warnings live,
//    written for a 2nd/3rd-language English reader. ──────────────────────────
type CalloutTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral'

const CALLOUT: Record<CalloutTone, { color: string; icon: IconName }> = {
	info: { color: 'var(--c-sea)', icon: 'info' },
	success: { color: 'var(--c-reef)', icon: 'check-circle' },
	warning: { color: 'var(--c-sun)', icon: 'alert' },
	danger: { color: 'var(--c-ember)', icon: 'alert' },
	neutral: { color: 'var(--c-muted)', icon: 'info' },
}

export function Callout(props: {
	children: JSX.Element
	tone?: CalloutTone
	title?: JSX.Element
	icon?: IconName
	class?: string
}): JSX.Element {
	const meta = () => CALLOUT[props.tone ?? 'info']
	return (
		<div
			class={cn('flex gap-3 rounded-[var(--r-md)] p-3.5', props.class)}
			style={{
				background: `color-mix(in oklab, ${meta().color} 9%, var(--c-surface))`,
				'box-shadow': `inset 0 0 0 1px color-mix(in oklab, ${meta().color} 28%, transparent)`,
			}}
			role={props.tone === 'danger' || props.tone === 'warning' ? 'alert' : undefined}
		>
			<span class="flex-none pt-0.5" style={{ color: meta().color }}>
				<Icon name={props.icon ?? meta().icon} size={20} />
			</span>
			<div class="flex flex-col gap-1 text-[0.9375rem] leading-relaxed">
				<Show when={props.title}>
					<span class="font-semibold text-[var(--c-ink)]">{props.title}</span>
				</Show>
				<div class="text-[var(--c-muted)]">{props.children}</div>
			</div>
		</div>
	)
}

// ── ListRow — a label/value or navigation row. Renders as a <button> when
//    `onClick` is given (tappable), otherwise a static row. ──────────────────
export function ListRow(props: {
	label: JSX.Element
	sublabel?: JSX.Element
	value?: JSX.Element
	leading?: JSX.Element
	leadingIcon?: IconName
	/** Show a chevron (navigation affordance). Implied when onClick is set. */
	chevron?: boolean
	onClick?: () => void
	class?: string
}): JSX.Element {
	const interactive = () => typeof props.onClick === 'function'
	const showChevron = () => props.chevron ?? interactive()
	const inner = (
		<>
			<Show when={props.leading || props.leadingIcon}>
				<span class="flex-none text-[var(--c-sea)]">
					{props.leading ?? <Icon name={props.leadingIcon as IconName} size={22} />}
				</span>
			</Show>
			<span class="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
				<span class="truncate text-[0.9375rem] font-medium text-[var(--c-ink)]">{props.label}</span>
				<Show when={props.sublabel}>
					<span class="truncate text-[0.8125rem] text-[var(--c-muted)]">{props.sublabel}</span>
				</Show>
			</span>
			<Show when={props.value}>
				<span class="flex-none text-right text-[0.875rem] text-[var(--c-muted)]">{props.value}</span>
			</Show>
			<Show when={showChevron()}>
				<span class="flex-none text-[var(--c-faint)]">
					<Icon name="chevron-right" size={20} />
				</span>
			</Show>
		</>
	)
	const klass = cn(
		'flex w-full items-center gap-3 px-4 py-3 text-left',
		interactive() && 'tide-press hover:bg-[var(--c-surface-2)]',
		props.class,
	)
	return (
		<Show when={interactive()} fallback={<div class={klass}>{inner}</div>}>
			<button type="button" class={cn(klass, 'min-h-[var(--tap)]')} onClick={() => props.onClick?.()}>
				{inner}
			</button>
		</Show>
	)
}

// ── EmptyState — a calm, encouraging empty surface ──────────────────────────
export function EmptyState(props: {
	icon?: IconName
	title: JSX.Element
	description?: JSX.Element
	action?: JSX.Element
	class?: string
}): JSX.Element {
	return (
		<div class={cn('flex flex-col items-center gap-3 px-6 py-12 text-center', props.class)}>
			<Show when={props.icon}>
				<span class="grid h-14 w-14 place-items-center rounded-full bg-[var(--c-sea-soft)] text-[var(--c-sea)]">
					<Icon name={props.icon as IconName} size={26} />
				</span>
			</Show>
			<h3 class="font-display text-lg font-medium text-[var(--c-ink)]">{props.title}</h3>
			<Show when={props.description}>
				<p class="max-w-xs text-[0.9375rem] text-[var(--c-muted)]">{props.description}</p>
			</Show>
			<Show when={props.action}>
				<div class="mt-1">{props.action}</div>
			</Show>
		</div>
	)
}
