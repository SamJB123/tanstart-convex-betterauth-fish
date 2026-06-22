import { createClient } from '@convex-dev/better-auth'
import { convex } from '@convex-dev/better-auth/plugins'
import { betterAuth } from 'better-auth/minimal'
import authConfig from './auth.config'
import { components, internal } from './_generated/api'
import { query } from './_generated/server'
import type { GenericCtx } from '@convex-dev/better-auth'
import type { DataModel } from './_generated/dataModel'
import { ensureAppUser } from './identity/users'

const siteUrl = process.env.SITE_URL!

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use. The `user.onCreate` trigger mirrors
// each new Better Auth user into our app-side `parties` + `users` rows the moment
// they sign up — so a viewer always exists and read queries never depend on a
// prior write. `authFunctions` points at the registered trigger mutations the
// component invokes (exported below via `triggersApi()`).
// Explicit return-type annotation: the client's type depends only on DataModel
// (not on the `authFunctions`/`triggers` config), so annotating it here breaks
// the otherwise-circular inference (authComponent -> internal.auth.* -> the
// trigger exports below -> authComponent).
export const authComponent: ReturnType<typeof createClient<DataModel>> = createClient<DataModel>(components.betterAuth, {
  authFunctions: {
    onCreate: internal.auth.onCreate,
    onUpdate: internal.auth.onUpdate,
    onDelete: internal.auth.onDelete,
  },
  triggers: {
    user: {
      onCreate: async (ctx, authUser) => {
        await ensureAppUser(ctx, {
          authUserId: authUser._id,
          name: authUser.name ?? undefined,
          email: authUser.email ?? undefined,
        })
      },
    },
  },
})

// Registered trigger mutations the Better Auth component calls on user changes.
export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi()

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    // Configure simple, non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      // The Convex plugin is required for Convex compatibility. It reads the
      // project's auth config to derive the JWT issuer/audience.
      convex({ authConfig }),
    ],
  })
}

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await authComponent.getAuthUser(ctx)
  },
})
