import { createEffect, createUniqueId, Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'
import { IconButton } from './button'

// Sheet — the mobile-native modal, built on a real <dialog> (showModal()).
//
// Why <dialog>: it gives us a focus trap, an inert background, top-layer
// stacking (never clipped by an ancestor), and Esc-to-dismiss for FREE — the
// accessible foundation a hand-built modal usually gets wrong. We add a
// bottom-anchored slide-up (the touch-first gesture language), animated purely
// in CSS via @starting-style + `transition-behavior: allow-discrete` (see the
// `.tide-sheet` rules in app.css), so there are no JS animation timers.
//
// This is our deliberate replacement for the playground's hover-popovers: on a
// phone there is no hover, so contextual help, pickers, and confirmations all
// surface as sheets you can reach and dismiss with a thumb.

export function Sheet(props: {
	open: boolean
	onClose: () => void
	title?: JSX.Element
	children: JSX.Element
	footer?: JSX.Element
	/** 'bottom' (default) slides up; 'center' is a centred confirmation dialog. */
	variant?: 'bottom' | 'center'
	/** Allow backdrop-click / Esc to dismiss (default true). */
	dismissible?: boolean
	class?: string
}): JSX.Element {
	let dialog: HTMLDialogElement | undefined
	const titleId = createUniqueId()

	// Drive the native dialog from the `open` prop. Effects run client-only in
	// Solid, so `dialog` is defined here; we guard against double open/close.
	createEffect(
		() => props.open,
		(open) => {
			const d = dialog
			if (!d) return
			if (open && !d.open) d.showModal()
			else if (!open && d.open) d.close()
		},
	)

	const dismissible = () => props.dismissible !== false

	return (
		<dialog
			ref={dialog}
			class={cn('tide-sheet', props.variant === 'center' && 'tide-sheet-center', props.class)}
			aria-labelledby={props.title ? titleId : undefined}
			// Native close (Esc, .close()) → tell the parent so `open` stays in sync.
			onClose={() => props.onClose()}
			// Block Esc when non-dismissible.
			onCancel={(e) => {
				if (!dismissible()) e.preventDefault()
			}}
			// A click whose target IS the dialog is a backdrop click (per spec).
			onClick={(e) => {
				if (dismissible() && e.target === dialog) props.onClose()
			}}
		>
			<div class="flex max-h-[92dvh] flex-col">
				<Show when={props.variant !== 'center'}>
					<div class="tide-grabber" aria-hidden="true" />
				</Show>

				<Show when={props.title}>
					<header class="flex items-center justify-between gap-3 px-5 pb-2 pt-3">
						<h2 id={titleId} class="font-display text-lg font-medium text-[var(--c-ink)]">
							{props.title}
						</h2>
						<Show when={dismissible()}>
							<IconButton icon="x" label="Close" size="sm" variant="subtle" onClick={() => props.onClose()} />
						</Show>
					</header>
				</Show>

				<div class="tide-scroll flex-1 px-5 pb-2 pt-1">{props.children}</div>

				<Show when={props.footer}>
					<div class="tide-safe-bottom flex flex-col gap-2 border-t border-[var(--c-line)] px-5 pb-4 pt-3">
						{props.footer}
					</div>
				</Show>
			</div>
		</dialog>
	)
}
