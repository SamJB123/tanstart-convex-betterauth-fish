import { For, Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'
import { IconButton } from './button'

// The mobile app frame: AppShell (the column), AppBar (sticky top), BottomBar
// (thumb-reach sticky actions), and Stepper (wizard progress).
//
// Mobile-first by construction: the shell is a `100dvh` column capped at a
// phone width and centred, so it reads as a native app on any screen; the bars
// are safe-area aware (notch / home indicator) and the body scrolls between
// them with momentum.

// ── AppShell ─────────────────────────────────────────────────────────────────
export function AppShell(props: { children: JSX.Element; class?: string; width?: 'phone' | 'wide' }): JSX.Element {
	return (
		<div class="tide-dvh flex flex-col bg-[var(--c-bg)]">
			<div
				class={cn(
					'mx-auto flex w-full flex-1 flex-col',
					props.width === 'wide' ? 'max-w-3xl' : 'max-w-[560px]',
					props.class,
				)}
			>
				{props.children}
			</div>
		</div>
	)
}

// ── AppBar ───────────────────────────────────────────────────────────────────
export function AppBar(props: {
	title?: JSX.Element
	subtitle?: JSX.Element
	/** Convenience back affordance — renders a labelled arrow button. */
	onBack?: () => void
	/** Custom leading element (overrides onBack's default if both given). */
	leading?: JSX.Element
	trailing?: JSX.Element
	/** A bottom-edge strip (e.g. a Stepper) shown under the bar. */
	below?: JSX.Element
	class?: string
}): JSX.Element {
	return (
		<header class={cn('tide-appbar tide-safe-x', props.class)}>
			<div class="flex min-h-[56px] items-center gap-2 px-2.5">
				<Show when={props.leading ?? props.onBack}>
					<div class="flex-none">
						<Show when={props.leading} fallback={<IconButton icon="arrow-left" label="Go back" variant="ghost" onClick={() => props.onBack?.()} />}>
							{props.leading}
						</Show>
					</div>
				</Show>
				<div class="flex min-w-0 flex-1 flex-col px-1">
					<Show when={props.title}>
						<span class="truncate font-display text-[1.0625rem] font-medium leading-tight text-[var(--c-ink)]">
							{props.title}
						</span>
					</Show>
					<Show when={props.subtitle}>
						<span class="truncate text-[0.75rem] text-[var(--c-muted)]">{props.subtitle}</span>
					</Show>
				</div>
				<Show when={props.trailing}>
					<div class="flex-none">{props.trailing}</div>
				</Show>
			</div>
			<Show when={props.below}>
				<div class="px-4 pb-2.5">{props.below}</div>
			</Show>
		</header>
	)
}

// ── BottomBar — sticky thumb-reach action bar ───────────────────────────────
export function BottomBar(props: { children: JSX.Element; class?: string }): JSX.Element {
	return (
		<div class={cn('tide-bottombar tide-safe-x', props.class)}>
			<div class="flex flex-col gap-2 px-4 pt-3">{props.children}</div>
		</div>
	)
}

// ── Stepper — wizard progress: a segmented bar + "Step X of N · Label" ──────
export function Stepper(props: {
	steps: string[]
	current: number // 0-based
	class?: string
}): JSX.Element {
	const total = () => props.steps.length
	const label = () => props.steps[Math.max(0, Math.min(props.current, total() - 1))]
	return (
		<div class={cn('flex flex-col gap-1.5', props.class)} role="group" aria-label={`Step ${props.current + 1} of ${total()}: ${label()}`}>
			<div class="flex items-center gap-1.5" aria-hidden="true">
				<For each={props.steps}>
					{(_step, i) => (
						<span
							class={cn(
								'h-1.5 flex-1 rounded-full transition-colors duration-300',
								i() <= props.current ? 'bg-[var(--c-sea)]' : 'bg-[var(--c-line)]',
							)}
						/>
					)}
				</For>
			</div>
			<div class="flex items-baseline justify-between gap-2">
				<span class="font-display text-[0.9375rem] font-medium text-[var(--c-ink)]">{label()}</span>
				<span class="font-data text-[0.75rem] tabular-nums text-[var(--c-faint)]">
					{props.current + 1} / {total()}
				</span>
			</div>
		</div>
	)
}
