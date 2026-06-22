import { defineApp } from 'convex/server'
import betterAuth from '@convex-dev/better-auth/convex.config'
import geospatial from '@convex-dev/geospatial/convex.config'
import aggregate from '@convex-dev/aggregate/convex.config'

const app = defineApp()
app.use(betterAuth)
app.use(geospatial)
// Net signed sum of quota ledger quantities, namespaced per entitlement.
app.use(aggregate, { name: 'quotaLedger' })
export default app
