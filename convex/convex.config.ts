import { defineApp } from 'convex/server'
// Local install of the Better Auth component (convex/betterAuth/) — unlocks the
// organization plugin. Replaces the package's `@convex-dev/better-auth/convex.config`.
import betterAuth from './betterAuth/convex.config'
import geospatial from '@convex-dev/geospatial/convex.config'
import aggregate from '@convex-dev/aggregate/convex.config'
import resend from '@convex-dev/resend/convex.config'

const app = defineApp()
app.use(betterAuth)
app.use(geospatial)
// Net signed sum of quota ledger quantities, namespaced per entitlement.
app.use(aggregate, { name: 'quotaLedger' })
// Native transactional email (Resend) — powers the fisher invitation + consent
// emails. Reads RESEND_API_KEY from the Convex env (set 2026-06-22).
app.use(resend)
export default app
