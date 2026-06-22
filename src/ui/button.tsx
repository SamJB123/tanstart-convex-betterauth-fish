import { omit } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'
import { Icon, type IconName } from './icon'

// Button — the primary action primitive. Mobile-first: every size meets or
// exceeds the 48px comfortable thumb target, taps are de-laggued
// (`touch-action: manipulation` via `.tide-press`), and the active state gives
// tactile scale feedback. Forwards all native <button> attributes.

type Variant = 'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps
	extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'class'> {
	variant?: Variant
	size?: Size
	/** Stretch to the container width — the default for bottom-bar CTAs. */
	block?: boolean
	loading?: boolean
	iconLeft?: IconName
	iconRight?: IconName
	class?: string
}

const VARIANTS: Record<Variant, string> = {
	primary: 'bg-[var(--c-sea)] text-[var(--c-on-sea)] shadow-[var(--shadow-1)] hover:bg-[var(--c-sea-deep)]',
	secondary:
		'bg-[var(--c-surface)] text-[var(--c-ink)] shadow-[inset_0_0_0_1.5px_var(--c-line-strong)] hover:bg-[var(--c-surface-2)]',
	ghost: 'bg-transparent text-[var(--c-sea)] hover:bg-[var(--c-sea-soft)]',
	subtle: 'bg-[var(--c-bg-2)] text-[var(--c-ink)] hover:bg-[var(--c-surface-2)]',
	danger: 'bg-[var(--c-ember)] text-white hover:brightness-110',
}

const SIZES: Record<Size, string> = {
	// min-h keeps even the "small" button finger-friendly.
	sm: 'min-h-[40px] px-3.5 text-[0.8125rem] gap-1.5 rounded-[var(--r-sm)]',
	md: 'min-h-[var(--tap)] px-4 text-[0.9375rem] gap-2 rounded-[var(--r-md)]',
	lg: 'min-h-[54px] px-5 text-base gap-2.5 rounded-[var(--r-md)]',
}

export function Button(props: ButtonProps): JSX.Element {
	const rest = omit(
		props,
		'variant',
		'size',
		'block',
		'loading',
		'iconLeft',
		'iconRight',
		'class',
		'children',
		'type',
		'disabled',
	)
	return (
		<button
			type={props.type ?? 'button'}
			disabled={props.disabled || props.loading}
			aria-busy={props.loading ? 'true' : undefined}
			class={cn(
				'tide-press inline-flex select-none items-center justify-center font-medium leading-none',
				'disabled:pointer-events-none disabled:opacity-55',
				VARIANTS[props.variant ?? 'primary'],
				SIZES[props.size ?? 'md'],
				props.block && 'w-full',
				props.class,
			)}
			{...rest}
		>
			{props.loading ? (
				<Spinner size={props.size === 'lg' ? 22 : 18} />
			) : props.iconLeft ? (
				<Icon name={props.iconLeft} size={props.size === 'sm' ? 17 : 19} />
			) : null}
			{props.children}
			{!props.loading && props.iconRight ? (
				<Icon name={props.iconRight} size={props.size === 'sm' ? 17 : 19} />
			) : null}
		</button>
	)
}

// IconButton — square, icon-only. A visible label is REQUIRED (it becomes the
// accessible name), since the icon carries no text.
export interface IconButtonProps
	extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'class'> {
	icon: IconName
	label: string
	variant?: Variant
	size?: Size
	class?: string
}

export function IconButton(props: IconButtonProps): JSX.Element {
	const rest = omit(props, 'icon', 'label', 'variant', 'size', 'class', 'type')
	const dim = props.size === 'sm' ? 'h-10 w-10' : props.size === 'lg' ? 'h-14 w-14' : 'h-12 w-12'
	return (
		<button
			type={props.type ?? 'button'}
			aria-label={props.label}
			title={props.label}
			class={cn(
				'tide-press inline-grid place-items-center rounded-[var(--r-md)]',
				'disabled:pointer-events-none disabled:opacity-55',
				VARIANTS[props.variant ?? 'ghost'],
				dim,
				props.class,
			)}
			{...rest}
		>
			<Icon name={props.icon} size={props.size === 'lg' ? 24 : 21} />
		</button>
	)
}

// Spinner — an accessible, reduced-motion-friendly busy indicator.
export function Spinner(props: { size?: number; class?: string; label?: string }): JSX.Element {
	const s = props.size ?? 20
	return (
		<svg
			class={cn('tide-spinner animate-spin', props.class)}
			width={s}
			height={s}
			viewBox="0 0 24 24"
			fill="none"
			role={props.label ? 'status' : undefined}
			aria-label={props.label}
			aria-hidden={props.label ? undefined : 'true'}
		>
			<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.5" opacity="0.25" />
			<path
				d="M21 12a9 9 0 0 0-9-9"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
			/>
		</svg>
	)
}
