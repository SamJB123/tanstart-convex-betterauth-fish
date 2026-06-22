import type { JSX } from '@solidjs/web'
import { cn } from './cn'

// A tiny line-icon set — inline SVG, no dependency. 24×24 grid, 2px stroke,
// round joins, drawn in `currentColor` so an icon inherits its parent's colour.
// Curated for the AFMA Torres Strait surfaces (application flow, catch, identity,
// status). Add new glyphs here rather than reaching for an icon package.

export type IconName =
	| 'arrow-left'
	| 'arrow-right'
	| 'chevron-down'
	| 'chevron-right'
	| 'check'
	| 'check-circle'
	| 'x'
	| 'info'
	| 'alert'
	| 'help'
	| 'mic'
	| 'camera'
	| 'location'
	| 'document'
	| 'fish'
	| 'user'
	| 'users'
	| 'anchor'
	| 'waves'
	| 'shield'
	| 'clock'
	| 'cloud-off'
	| 'plus'
	| 'search'
	| 'edit'
	| 'send'

// Each entry is a FUNCTION returning the inner markup of a 24×24 `<svg>`.
//
// Important Solid 2 SSR rule: JSX is not plain data — instantiating it calls
// into the renderer's hydration-key machinery, which only works inside an active
// render. So we must NOT build a record of pre-created JSX elements at module
// scope (that throws "getNextContextId cannot be used under non-hydrating
// context" during SSR). Storing thunks defers creation to render time, inside
// the <svg> below, where the render context exists.
const PATHS: Record<IconName, () => JSX.Element> = {
	'arrow-left': () => <path d="M19 12H5m7-7-7 7 7 7" />,
	'arrow-right': () => <path d="M5 12h14m-7-7 7 7-7 7" />,
	'chevron-down': () => <path d="m6 9 6 6 6-6" />,
	'chevron-right': () => <path d="m9 6 6 6-6 6" />,
	check: () => <path d="M20 6 9 17l-5-5" />,
	'check-circle': () => (
		<>
			<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
			<path d="m22 4-10 10.01-3-3" />
		</>
	),
	x: () => <path d="M18 6 6 18M6 6l12 12" />,
	info: () => (
		<>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 16v-4M12 8h.01" />
		</>
	),
	alert: () => (
		<>
			<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
			<path d="M12 9v4M12 17h.01" />
		</>
	),
	help: () => (
		<>
			<circle cx="12" cy="12" r="10" />
			<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
		</>
	),
	mic: () => (
		<>
			<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
			<path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
		</>
	),
	camera: () => (
		<>
			<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
			<circle cx="12" cy="13" r="3" />
		</>
	),
	location: () => (
		<>
			<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
			<circle cx="12" cy="10" r="3" />
		</>
	),
	document: () => (
		<>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
			<path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
		</>
	),
	fish: () => (
		<>
			<path d="M2 12c3-5 8-7 13-7 3 0 6 1.5 7 3-1 1.5-4 3-7 3-5 0-10-2-13-7" transform="translate(0 2)" />
			<path d="M16 12h.01" />
		</>
	),
	user: () => (
		<>
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</>
	),
	users: () => (
		<>
			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
		</>
	),
	anchor: () => (
		<>
			<circle cx="12" cy="5" r="3" />
			<path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3" />
		</>
	),
	waves: () => (
		<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
	),
	shield: () => (
		<>
			<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
			<path d="m9 12 2 2 4-4" />
		</>
	),
	clock: () => (
		<>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 6v6l4 2" />
		</>
	),
	'cloud-off': () => (
		<>
			<path d="M18.8 10A6 6 0 0 0 8 8M2 2l20 20" />
			<path d="M5.8 6.8A6 6 0 0 0 7 18h11a4 4 0 0 0 1.6-.3" />
		</>
	),
	plus: () => <path d="M12 5v14M5 12h14" />,
	search: () => (
		<>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</>
	),
	edit: () => (
		<>
			<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
			<path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
		</>
	),
	send: () => <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />,
}

export interface IconProps {
	name: IconName
	size?: number
	class?: string
	/** Decorative by default (aria-hidden). Pass `label` to make it announced. */
	label?: string
}

export function Icon(props: IconProps): JSX.Element {
	return (
		<svg
			class={cn('tide-icon', props.class)}
			width={props.size ?? 24}
			height={props.size ?? 24}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden={props.label ? undefined : 'true'}
			role={props.label ? 'img' : undefined}
			aria-label={props.label}
		>
			{PATHS[props.name]()}
		</svg>
	)
}
