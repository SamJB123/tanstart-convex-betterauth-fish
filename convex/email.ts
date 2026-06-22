import { components } from './_generated/api'
import { Resend } from '@convex-dev/resend'

// Native transactional email via the Resend component (registered in
// convex.config.ts). RESEND_API_KEY is a Convex env var (set 2026-06-22).
//
// `testMode: true` until a sending domain is verified in Resend: in test mode
// delivery is restricted to the account owner + Resend test addresses (e.g.
// delivered@resend.dev) — perfect for building and testing the invitation +
// consent flow. Flip to `testMode: false` once a domain is verified to reach
// real fisher addresses.
//
// The explicit `: Resend` annotation mirrors the auth client pattern — it keeps
// the type stable and import-cycle-free.
export const resend: Resend = new Resend(components.resend, { testMode: true })

// The from-address for AFMA emails. `onboarding@resend.dev` works in test mode;
// replace with a verified AFMA/PZJA domain address for production sends.
export const EMAIL_FROM = 'AFMA Torres Strait <onboarding@resend.dev>'
