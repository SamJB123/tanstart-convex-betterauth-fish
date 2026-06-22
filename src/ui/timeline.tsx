import { For, Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'
import { Icon } from './icon'

// StatusTimeline — the Board's "things move through states" idea, reimagined for
// a phone as a vertical progress tracker (a kanban needs a wide screen and
// drag; a fisher tracking their application needs a glanceable column).
//
// The current node carries a unique `view-transition-name`, so advancing the
// status morphs the active marker down the line under a View Transition. Each
// row reveals on scroll (tide-reveal). The connector fills up to the current
// step. Plain-language status names, not bureaucratic codes.

export type TimelineStep = {
	key: string
	label: JSX.Element
	description?: JSX.Element
	meta?: JSX.Element // e.g. a date/time, or who acted
}

export function StatusTimeline(props: {
	steps: TimelineStep[]
	/** 0-based index of the step currently reached. */
	current: number
	/** Mark the flow as terminally rejected at the current step. */
	rejected?: boolean
	class?: string
}): JSX.Element {
	const state = (i: number): 'done' | 'current' | 'upcoming' =>
		i < props.current ? 'done' : i === props.current ? 'current' : 'upcoming'
	return (
		<ol class={cn('flex flex-col', props.class)}>
			<For each={props.steps}>
				{(step, i) => {
					const s = () => state(i())
					const last = () => i() === props.steps.length - 1
					const reached = () => i() <= props.current
					const tone = () =>
						props.rejected && s() === 'current'
							? 'var(--c-ember)'
							: reached()
								? 'var(--c-sea)'
								: 'var(--c-line-strong)'
					return (
						<li class="tide-reveal relative flex gap-3.5 pb-1">
							{/* Marker + connector rail */}
							<div class="flex flex-none flex-col items-center">
								<span
									class={cn(
										'grid h-8 w-8 place-items-center rounded-full text-[var(--c-on-sea)] transition-colors',
										s() === 'current' && !props.rejected && 'animate-pulse',
									)}
									style={{
										background: s() === 'upcoming' ? 'var(--c-bg-2)' : tone(),
										color: s() === 'upcoming' ? 'var(--c-faint)' : 'var(--c-on-sea)',
										'box-shadow': s() === 'current' ? `0 0 0 4px color-mix(in oklab, ${tone()} 20%, transparent)` : undefined,
										...(s() === 'current' ? { 'view-transition-name': 'timeline-active' } : {}),
									}}
								>
									<Show
										when={s() === 'done'}
										fallback={
											<Show
												when={props.rejected && s() === 'current'}
												fallback={<span class="h-2 w-2 rounded-full bg-current" />}
											>
												<Icon name="x" size={16} />
											</Show>
										}
									>
										<Icon name="check" size={16} />
									</Show>
								</span>
								<Show when={!last()}>
									<span
										class="w-0.5 flex-1 rounded-full"
										style={{ background: i() < props.current ? 'var(--c-sea)' : 'var(--c-line)' }}
									/>
								</Show>
							</div>
							{/* Body */}
							<div class={cn('flex min-w-0 flex-1 flex-col gap-0.5 pb-5', s() === 'upcoming' && 'opacity-55')}>
								<span class="font-display text-[0.9375rem] font-medium leading-tight text-[var(--c-ink)]">
									{step.label}
								</span>
								<Show when={step.description}>
									<span class="text-[0.8125rem] leading-snug text-[var(--c-muted)]">{step.description}</span>
								</Show>
								<Show when={step.meta}>
									<span class="font-data text-[0.6875rem] uppercase tracking-wide text-[var(--c-faint)]">{step.meta}</span>
								</Show>
							</div>
						</li>
					)
				}}
			</For>
		</ol>
	)
}
