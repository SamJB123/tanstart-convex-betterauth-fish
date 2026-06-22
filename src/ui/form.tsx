import {
	createContext,
	createEffect,
	createSignal,
	createUniqueId,
	For,
	onSettled,
	omit,
	Show,
	useContext,
} from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'
import { Icon, type IconName } from './icon'

// Form controls, all mobile-first (≥48px targets, 16px text to stop iOS
// zoom-on-focus) and fully wired for assistive tech.

// ── Field — the label / hint / error scaffold every control reuses ──────────
function FieldFrame(props: {
	id: string
	label?: JSX.Element
	hint?: JSX.Element
	error?: JSX.Element
	optional?: boolean
	children: JSX.Element
	hintId: string
	errorId: string
	class?: string
}): JSX.Element {
	return (
		<div class={cn('flex flex-col gap-1.5', props.class)}>
			<Show when={props.label}>
				<label for={props.id} class="flex items-center gap-2 text-[0.9375rem] font-medium text-[var(--c-ink)]">
					{props.label}
					<Show when={props.optional}>
						<span class="font-data text-[0.6875rem] font-normal uppercase tracking-wide text-[var(--c-faint)]">
							Optional
						</span>
					</Show>
				</label>
			</Show>
			{props.children}
			<Show when={props.error} fallback={
				<Show when={props.hint}>
					<p id={props.hintId} class="text-[0.8125rem] leading-snug text-[var(--c-muted)]">
						{props.hint}
					</p>
				</Show>
			}>
				<p id={props.errorId} role="alert" class="flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--c-ember)]">
					<Icon name="alert" size={15} />
					{props.error}
				</p>
			</Show>
		</div>
	)
}

// ── TextField ───────────────────────────────────────────────────────────────
export interface TextFieldProps
	extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'class' | 'value' | 'onInput' | 'id'> {
	label?: JSX.Element
	hint?: JSX.Element
	error?: JSX.Element
	optional?: boolean
	value?: string
	onInput?: (value: string) => void
	leadingIcon?: IconName
	class?: string
}

export function TextField(props: TextFieldProps): JSX.Element {
	const id = createUniqueId()
	const hintId = `${id}-hint`
	const errorId = `${id}-err`
	const rest = omit(
		props,
		'label', 'hint', 'error', 'optional', 'value', 'onInput', 'leadingIcon', 'class',
	)
	return (
		<FieldFrame id={id} label={props.label} hint={props.hint} error={props.error} optional={props.optional} hintId={hintId} errorId={errorId}>
			<div class="relative flex items-center">
				<Show when={props.leadingIcon}>
					<span class="pointer-events-none absolute left-3.5 text-[var(--c-faint)]">
						<Icon name={props.leadingIcon as IconName} size={20} />
					</span>
				</Show>
				<input
					id={id}
					value={props.value ?? ''}
					onInput={(e) => props.onInput?.(e.currentTarget.value)}
					aria-invalid={props.error ? 'true' : undefined}
					aria-describedby={props.error ? errorId : props.hint ? hintId : undefined}
					class={cn(
						'min-h-[var(--tap)] w-full rounded-[var(--r-md)] bg-[var(--c-surface-2)] px-4 text-base text-[var(--c-ink)]',
						'shadow-[inset_0_0_0_1.5px_var(--c-line)] outline-none transition-shadow',
						'placeholder:text-[var(--c-faint)] focus:shadow-[inset_0_0_0_2px_var(--c-sea)]',
						props.error && 'shadow-[inset_0_0_0_1.5px_var(--c-ember)]',
						props.leadingIcon && 'pl-11',
						props.class,
					)}
					{...rest}
				/>
			</div>
		</FieldFrame>
	)
}

// ── TextArea — auto-grows with content (field-sizing) where supported ───────
export interface TextAreaProps
	extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'class' | 'value' | 'onInput' | 'id'> {
	label?: JSX.Element
	hint?: JSX.Element
	error?: JSX.Element
	optional?: boolean
	value?: string
	onInput?: (value: string) => void
	class?: string
}

export function TextArea(props: TextAreaProps): JSX.Element {
	const id = createUniqueId()
	const hintId = `${id}-hint`
	const errorId = `${id}-err`
	const rest = omit(props, 'label', 'hint', 'error', 'optional', 'value', 'onInput', 'class')
	return (
		<FieldFrame id={id} label={props.label} hint={props.hint} error={props.error} optional={props.optional} hintId={hintId} errorId={errorId}>
			<textarea
				id={id}
				value={props.value ?? ''}
				onInput={(e) => props.onInput?.(e.currentTarget.value)}
				rows={props.rows ?? 3}
				aria-invalid={props.error ? 'true' : undefined}
				aria-describedby={props.error ? errorId : props.hint ? hintId : undefined}
				class={cn(
					'tide-input min-h-[88px] w-full resize-y rounded-[var(--r-md)] bg-[var(--c-surface-2)] px-4 py-3 text-base leading-relaxed text-[var(--c-ink)]',
					'shadow-[inset_0_0_0_1.5px_var(--c-line)] outline-none transition-shadow',
					'placeholder:text-[var(--c-faint)] focus:shadow-[inset_0_0_0_2px_var(--c-sea)]',
					props.error && 'shadow-[inset_0_0_0_1.5px_var(--c-ember)]',
					props.class,
				)}
				{...rest}
			/>
		</FieldFrame>
	)
}

// ── Select — a real native <select>, upgraded to a styleable rendering where
//    the browser supports it (a11y + form semantics always intact) ───────────
export interface SelectProps
	extends Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, 'class' | 'value' | 'onChange' | 'id'> {
	label?: JSX.Element
	hint?: JSX.Element
	error?: JSX.Element
	optional?: boolean
	value?: string
	onChange?: (value: string) => void
	children: JSX.Element
	class?: string
}

export function Select(props: SelectProps): JSX.Element {
	const id = createUniqueId()
	const hintId = `${id}-hint`
	const errorId = `${id}-err`
	const rest = omit(props, 'label', 'hint', 'error', 'optional', 'value', 'onChange', 'children', 'class')
	return (
		<FieldFrame id={id} label={props.label} hint={props.hint} error={props.error} optional={props.optional} hintId={hintId} errorId={errorId}>
			<select
				id={id}
				value={props.value}
				onChange={(e) => props.onChange?.(e.currentTarget.value)}
				aria-invalid={props.error ? 'true' : undefined}
				aria-describedby={props.error ? errorId : props.hint ? hintId : undefined}
				class={cn('tide-select w-full text-base', props.class)}
				{...rest}
			>
				{props.children}
			</select>
		</FieldFrame>
	)
}

// ── Choice cards — big-tap-target radios/checkboxes ─────────────────────────
// ChoiceGroup owns the selection; ChoiceCard is an option. Rendered as a
// <fieldset>/<legend> so the group is announced correctly. Radios are
// arrow-key navigable for free.
type ChoiceCtx = {
	name: string
	multiple: boolean
	selected: () => string[]
	toggle: (value: string) => void
}
const ChoiceContext = createContext<ChoiceCtx>()

export function ChoiceGroup(props: {
	label?: JSX.Element
	hint?: JSX.Element
	error?: JSX.Element
	/** Single-select (radio). */
	value?: string
	onChange?: (value: string) => void
	/** Multi-select (checkbox). */
	multiple?: boolean
	values?: string[]
	onValuesChange?: (values: string[]) => void
	children: JSX.Element
	class?: string
}): JSX.Element {
	const name = createUniqueId()
	const errorId = `${name}-err`
	const ctx: ChoiceCtx = {
		name,
		multiple: !!props.multiple,
		selected: () => (props.multiple ? props.values ?? [] : props.value ? [props.value] : []),
		toggle: (value) => {
			if (props.multiple) {
				const cur = props.values ?? []
				props.onValuesChange?.(cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value])
			} else {
				props.onChange?.(value)
			}
		},
	}
	return (
		<ChoiceContext value={ctx}>
			<fieldset class={cn('flex flex-col gap-2.5 border-0 p-0', props.class)} aria-describedby={props.error ? errorId : undefined}>
				<Show when={props.label}>
					<legend class="mb-1 p-0 text-[0.9375rem] font-medium text-[var(--c-ink)]">{props.label}</legend>
				</Show>
				<Show when={props.hint}>
					<p class="-mt-1 mb-0.5 text-[0.8125rem] text-[var(--c-muted)]">{props.hint}</p>
				</Show>
				{props.children}
				<Show when={props.error}>
					<p id={errorId} role="alert" class="flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--c-ember)]">
						<Icon name="alert" size={15} />
						{props.error}
					</p>
				</Show>
			</fieldset>
		</ChoiceContext>
	)
}

export function ChoiceCard(props: {
	value: string
	label: JSX.Element
	description?: JSX.Element
	icon?: IconName
	class?: string
}): JSX.Element {
	const ctx = useContext(ChoiceContext)
	if (!ctx) throw new Error('ChoiceCard must be used inside a ChoiceGroup')
	const checked = () => ctx.selected().includes(props.value)
	return (
		<label class={cn('tide-choice', props.class)}>
			<input
				type={ctx.multiple ? 'checkbox' : 'radio'}
				name={ctx.name}
				value={props.value}
				checked={checked()}
				onChange={() => ctx.toggle(props.value)}
			/>
			<span class={cn('tide-choice-mark', ctx.multiple && 'is-checkbox')}>
				<Icon name="check" size={15} />
			</span>
			<Show when={props.icon}>
				<span class="flex-none text-[var(--c-sea)]">
					<Icon name={props.icon as IconName} size={22} />
				</span>
			</Show>
			<span class="flex min-w-0 flex-1 flex-col gap-0.5">
				<span class="text-[0.9375rem] font-medium text-[var(--c-ink)]">{props.label}</span>
				<Show when={props.description}>
					<span class="text-[0.8125rem] leading-snug text-[var(--c-muted)]">{props.description}</span>
				</Show>
			</span>
		</label>
	)
}

// ── Toggle (switch) ─────────────────────────────────────────────────────────
export function Toggle(props: {
	checked: boolean
	onChange: (checked: boolean) => void
	label?: JSX.Element
	description?: JSX.Element
	class?: string
}): JSX.Element {
	return (
		<label class={cn('flex cursor-pointer items-center gap-3', props.class)}>
			<span class="relative inline-flex flex-none">
				<input
					type="checkbox"
					checked={props.checked}
					onChange={(e) => props.onChange(e.currentTarget.checked)}
					class="peer absolute h-px w-px opacity-0"
				/>
				<span
					class={cn(
						'h-7 w-12 rounded-full bg-[var(--c-line-strong)] transition-colors',
						'peer-checked:bg-[var(--c-sea)] peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--c-focus)]',
						props.checked && 'bg-[var(--c-sea)]',
					)}
				/>
				<span
					class="pointer-events-none absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform"
					style={{ transform: props.checked ? 'translateX(20px)' : 'none' }}
				/>
			</span>
			<Show when={props.label || props.description}>
				<span class="flex flex-col gap-0.5">
					<Show when={props.label}>
						<span class="text-[0.9375rem] font-medium text-[var(--c-ink)]">{props.label}</span>
					</Show>
					<Show when={props.description}>
						<span class="text-[0.8125rem] text-[var(--c-muted)]">{props.description}</span>
					</Show>
				</span>
			</Show>
		</label>
	)
}

// ── SegmentedControl — small tab switcher with a sliding indicator ──────────
export function SegmentedControl<T extends string>(props: {
	options: { id: T; label: string }[]
	value: T
	onChange: (id: T) => void
	ariaLabel?: string
	class?: string
}): JSX.Element {
	let container: HTMLDivElement | undefined
	const btns = new Map<T, HTMLButtonElement>()
	const [ind, setInd] = createSignal({ x: 0, w: 0, ready: false })

	const measure = () => {
		const b = btns.get(props.value)
		if (b) setInd({ x: b.offsetLeft, w: b.offsetWidth, ready: true })
	}
	// Re-measure on selection change (client). The compute returns the value so
	// the apply phase runs after the DOM reflects aria-selected.
	createEffect(
		() => props.value,
		() => measure(),
	)
	onSettled(() => {
		measure()
		const ro = new ResizeObserver(() => measure())
		if (container) ro.observe(container)
		return () => ro.disconnect()
	})

	return (
		<div ref={container} class={cn('tide-segmented', props.class)} role="tablist" aria-label={props.ariaLabel}>
			<span
				class="tide-seg-indicator"
				style={{ transform: `translateX(${ind().x}px)`, width: `${ind().w}px`, opacity: ind().ready ? '1' : '0' }}
				aria-hidden="true"
			/>
			<For each={props.options}>
				{(opt) => (
					<button
						type="button"
						ref={(el) => btns.set(opt.id, el)}
						role="tab"
						aria-selected={props.value === opt.id ? 'true' : 'false'}
						class="tide-seg-btn"
						onClick={() => props.onChange(opt.id)}
					>
						{opt.label}
					</button>
				)}
			</For>
		</div>
	)
}

// ── VoiceButton — the Yumplatok voice-assist affordance ─────────────────────
// A large, obvious "speak instead of type" control. Wires to real speech
// capture later; here it carries the listening state and accessible labelling.
// Voice + plain language are higher-value than written translation for a
// primarily-oral language (see DESIGN.md §2).
export function VoiceButton(props: {
	listening?: boolean
	onPress?: () => void
	label?: string
	class?: string
}): JSX.Element {
	return (
		<button
			type="button"
			onClick={() => props.onPress?.()}
			aria-pressed={props.listening ? 'true' : 'false'}
			class={cn(
				'tide-press inline-flex items-center gap-2.5 rounded-[var(--r-pill)] px-5 py-3 font-medium',
				props.listening
					? 'bg-[var(--c-coral)] text-[var(--c-on-coral)]'
					: 'bg-[var(--c-sea-soft)] text-[var(--c-sea)]',
				props.class,
			)}
		>
			<span class={cn('relative inline-grid place-items-center', props.listening && 'animate-pulse')}>
				<Icon name="mic" size={20} />
			</span>
			{props.label ?? (props.listening ? 'Listening…' : 'Speak')}
		</button>
	)
}
