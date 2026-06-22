// Tide — the AFMA Torres Strait design system. One import surface for every
// primitive and molecule. Mobile-first, sunlight-readable, and built to flex
// the 2025/2026 web platform while degrading cleanly on older devices.

export { cn } from './cn'
export { withViewTransition, withScopedViewTransition } from './vt'

export { Icon, type IconName } from './icon'
export { Button, IconButton, Spinner, type ButtonProps, type IconButtonProps } from './button'

export {
	Eyebrow,
	Chip,
	type Tone,
	StatusDot,
	Avatar,
	AvatarStack,
	Divider,
	VisuallyHidden,
	ProgressBar,
	Meter,
	Counter,
	Stat,
} from './primitives'

export { Card, Callout, ListRow, EmptyState } from './surface'

export {
	TextField,
	TextArea,
	Select,
	ChoiceGroup,
	ChoiceCard,
	Toggle,
	SegmentedControl,
	VoiceButton,
	type TextFieldProps,
	type TextAreaProps,
	type SelectProps,
} from './form'

export { Sheet } from './sheet'
export { AppShell, AppBar, BottomBar, Stepper } from './shell'
export { Accordion } from './disclosure'

export { Sparkline, ProgressRing, EqualizerBars, Waveform } from './chart'
export { Carousel, CarouselSlide, CarouselCards } from './carousel'
export { StatusTimeline, type TimelineStep } from './timeline'
export { DateField, SeasonStrip, formatYMD, type YMD, type SeasonDay } from './datefield'
export { QuotaMatrix, type MatrixRow, type MatrixCol, type MatrixCell } from './matrix'
export { Masonry, PinNote } from './layout'
