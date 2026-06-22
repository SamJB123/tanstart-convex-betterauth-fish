import { Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'
import { Icon, type IconName } from './icon'

// Accordion — a native <details> that animates open to its intrinsic height
// (interpolate-size + ::details-content; see app.css). JS-free, keyboard-native,
// degrades to an instant toggle. This is where inline "what does this mean?"
// help lives in the application flow — plain-language, on demand, no page churn.
export function Accordion(props: {
	summary: JSX.Element
	children: JSX.Element
	icon?: IconName
	defaultOpen?: boolean
	class?: string
}): JSX.Element {
	return (
		<details class={cn('tide-accordion', props.class)} open={props.defaultOpen}>
			<summary>
				<span class="flex min-w-0 items-center gap-2.5">
					<Show when={props.icon}>
						<span class="flex-none text-[var(--c-sea)]">
							<Icon name={props.icon as IconName} size={20} />
						</span>
					</Show>
					<span class="min-w-0 text-[0.9375rem] text-[var(--c-ink)]">{props.summary}</span>
				</span>
				<span class="tide-accordion-chev">
					<Icon name="chevron-down" size={20} />
				</span>
			</summary>
			<div class="tide-accordion-body text-[0.9375rem]">{props.children}</div>
		</details>
	)
}
