import { For, Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'

// Masonry + PinNote — the Wall view's pinboard. Native CSS masonry packs
// mixed-height cards tightly (display: grid-lanes / grid-template-rows: masonry,
// Safari 26 + flagged Chrome), falling back to a plain responsive grid that's
// perfectly fine everywhere else. Use for a wall of plain-language guidance, or
// a fisher's saved/offline draft applications — short and long items side by
// side without awkward gaps.

export function Masonry(props: { children: JSX.Element; min?: number; class?: string }): JSX.Element {
	return (
		<div class={cn('tide-masonry', props.class)} style={{ '--masonry-min': `${props.min ?? 232}px` }}>
			{props.children}
		</div>
	)
}

export function PinNote(props: {
	title: JSX.Element
	children?: JSX.Element
	kind?: { label: string; color: string }
	tags?: string[]
	pinned?: boolean
	priority?: 'high' | 'normal' | 'low'
	footer?: JSX.Element
	onOpen?: () => void
	class?: string
}): JSX.Element {
	const accent = () => props.kind?.color ?? 'var(--c-sea)'
	return (
		<article
			class={cn('tide-note', props.pinned && 'tide-note-pinned', props.class)}
			data-pri={props.priority ?? 'normal'}
			style={{ '--kc': accent() }}
		>
			<Show when={props.pinned}>
				<span class="tide-note-ribbon" aria-hidden="true" />
			</Show>
			<Show when={props.kind}>
				<span class="tide-note-kind" style={{ color: accent(), background: `color-mix(in oklab, ${accent()} 14%, transparent)` }}>
					{props.kind?.label}
				</span>
			</Show>
			<h3 class="tide-note-title font-display font-medium text-[var(--c-ink)]">{props.title}</h3>
			<Show when={props.children}>
				<p class="mt-2 text-[0.875rem] leading-relaxed text-[var(--c-muted)]">{props.children}</p>
			</Show>
			<Show when={props.tags && props.tags.length}>
				<div class="mt-3 flex flex-wrap gap-1.5">
					<For each={props.tags}>{(t) => <span class="font-data text-[0.6875rem] text-[var(--c-faint)]">#{t}</span>}</For>
				</div>
			</Show>
			<Show when={props.footer}>
				<div class="mt-3">{props.footer}</div>
			</Show>
			<Show when={props.onOpen}>
				<button type="button" onClick={() => props.onOpen?.()} class="tide-press mt-3 inline-flex items-center gap-1 font-data text-[0.75rem] font-semibold" style={{ color: accent() }}>
					Open →
				</button>
			</Show>
		</article>
	)
}
