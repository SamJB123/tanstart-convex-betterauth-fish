import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes with correct override semantics.
//
// Solid's `class={[...]}` array/object form is the idiom for *conditional*
// classes (and we use it freely). This helper is for the other case: a component
// composes its own base utilities with a consumer-provided `props.class`, and we
// want a later `props.class` to *win* over an earlier base class for the same
// Tailwind property (e.g. a caller passing `p-2` should override a base `p-4`).
// clsx flattens the inputs; twMerge resolves the conflicts.
//
// Called inside JSX (`class={cn(base, props.class)}`), so the `props.class` read
// stays reactive.
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs))
}
