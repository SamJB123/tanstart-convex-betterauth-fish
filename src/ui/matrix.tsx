import { For, Show } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { cn } from './cn'

// QuotaMatrix — the Roster's availability grid, repurposed for entitlements:
// rows (a species, a fishery) × columns (a period, a day), with a value/heat in
// each cell. It exercises the same cluster of platform features in a domain-real
// context: PER-AXIS STICKY (the row-label column stays pinned while the grid
// scrolls horizontally — essential on a narrow phone), GAP DECORATIONS (crisp
// rules drawn in the grid gaps, inset and broken at crossings), and relative
// colour for cell heat. Hover cards don't exist on touch, so a row taps through
// to a sheet (onRowSelect) instead.

export type MatrixRow = { key: string; label: JSX.Element; sublabel?: JSX.Element; color?: string }
export type MatrixCol = { key: string; label: JSX.Element; sublabel?: JSX.Element; highlight?: boolean }
export type MatrixCell = { value?: JSX.Element; color?: string; intensity?: number; title?: string }

export function QuotaMatrix(props: {
	rows: MatrixRow[]
	columns: MatrixCol[]
	cell: (rowKey: string, colKey: string) => MatrixCell
	cornerLabel?: JSX.Element
	onRowSelect?: (rowKey: string) => void
	class?: string
}): JSX.Element {
	return (
		<div class={cn('tide-matrix-frame tide-scroll', props.class)}>
			<div class="tide-matrix-grid" style={{ '--cols': String(props.columns.length) }}>
				{/* Header row */}
				<div class="tide-matrix-corner">
					<span class="font-data text-[0.6875rem] font-semibold uppercase tracking-wide text-[var(--c-faint)]">
						{props.cornerLabel}
					</span>
				</div>
				<For each={props.columns}>
					{(col) => (
						<div class={cn('tide-matrix-colhead', col.highlight && 'is-highlight')}>
							<span class="font-data text-[0.6875rem] font-semibold uppercase tracking-wide text-[var(--c-muted)]">{col.label}</span>
							<Show when={col.sublabel}>
								<span class="font-data text-[0.625rem] text-[var(--c-faint)]">{col.sublabel}</span>
							</Show>
						</div>
					)}
				</For>

				{/* Body */}
				<For each={props.rows}>
					{(row) => (
						<>
							<Show
								when={props.onRowSelect}
								fallback={
									<div class="tide-matrix-rowhead" style={{ '--rc': row.color ?? 'var(--c-sea)' }}>
										<RowHeadInner row={row} />
									</div>
								}
							>
								<button type="button" class="tide-matrix-rowhead tide-press text-left" style={{ '--rc': row.color ?? 'var(--c-sea)' }} onClick={() => props.onRowSelect?.(row.key)}>
									<RowHeadInner row={row} interactive />
								</button>
							</Show>
							<For each={props.columns}>
								{(col) => {
									const c = props.cell(row.key, col.key)
									return (
										<div
											class="tide-matrix-cell"
											title={c.title}
											style={{
												background: c.color
													? `color-mix(in oklab, ${c.color} ${Math.round((c.intensity ?? 0.5) * 100)}%, var(--c-surface))`
													: 'var(--c-surface)',
											}}
										>
											{c.value}
										</div>
									)
								}}
							</For>
						</>
					)}
				</For>
			</div>
		</div>
	)
}

function RowHeadInner(props: { row: MatrixRow; interactive?: boolean }): JSX.Element {
	return (
		<span class="flex items-center gap-2.5">
			<span class="h-7 w-1 flex-none rounded-full" style={{ background: 'var(--rc)' }} />
			<span class="flex min-w-0 flex-col">
				<span class="truncate text-[0.875rem] font-medium text-[var(--c-ink)]">{props.row.label}</span>
				<Show when={props.row.sublabel}>
					<span class="truncate font-data text-[0.6875rem] text-[var(--c-faint)]">{props.row.sublabel}</span>
				</Show>
			</span>
		</span>
	)
}
