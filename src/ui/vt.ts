// View Transition helpers.
//
// `document.startViewTransition` animates the DOM diff between two states (a step
// change in a wizard, a re-sort, a card moving). We treat it as pure enhancement:
// where the API is missing, or the user prefers reduced motion, we just run the
// update synchronously.
//
// SSR-safe: guarded on `document` existing, so these are no-ops on the server.

type Update = () => void

function prefersReducedMotion(): boolean {
	return (
		typeof window !== 'undefined' &&
		typeof window.matchMedia === 'function' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	)
}

// Minimal structural types for the View Transitions API (not in the lib yet for
// the `types`/element-scoped forms), reached without casting app code.
type ViewTransition = { finished: Promise<void> }
type StartViewTransition = (
	cb: Update | { update: Update; types?: string[] },
) => ViewTransition

/**
 * Run `update` inside a document-level view transition. `types` are exposed to
 * CSS as `:active-view-transition-type(...)` so one transition can branch its
 * animation (e.g. a wizard sliding `forward` vs `back`).
 */
export function withViewTransition(update: Update, types?: string[]): void {
	if (
		typeof document === 'undefined' ||
		prefersReducedMotion() ||
		!('startViewTransition' in document)
	) {
		update()
		return
	}
	const start = (document as unknown as { startViewTransition: StartViewTransition })
		.startViewTransition
	// The object form (with `types`) is newer; fall back to the plain callback.
	if (types && types.length) {
		try {
			start.call(document, { update, types })
			return
		} catch {
			/* older signature — fall through */
		}
	}
	start.call(document, update)
}

/**
 * Element-scoped view transition (View Transitions L2): snapshots only `el`'s
 * subtree, so the rest of the page stays interactive and untouched. Falls back
 * to the document-level transition, then to a plain update.
 */
export function withScopedViewTransition(
	el: HTMLElement | undefined,
	update: Update,
): void {
	if (
		el &&
		typeof (el as unknown as { startViewTransition?: unknown }).startViewTransition ===
			'function' &&
		!prefersReducedMotion()
	) {
		;(el as unknown as { startViewTransition: StartViewTransition }).startViewTransition(
			update,
		)
		return
	}
	withViewTransition(update)
}
