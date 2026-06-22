import { createClient } from '@convex-dev/better-auth'
import { convex } from '@convex-dev/better-auth/plugins'
import { betterAuth } from 'better-auth/minimal'
import { organization } from 'better-auth/plugins'
import authConfig from './auth.config'
import { components, internal } from './_generated/api'
import { query } from './_generated/server'
import type { GenericCtx } from '@convex-dev/better-auth'
import type { BetterAuthOptions } from 'better-auth'
import type { DataModel } from './_generated/dataModel'
import { ensureAppUser } from './identity/users'
import { mirrorMember, mirrorOrganization, unmirrorMember } from './identity/orgMirror'
import authSchema from './betterAuth/schema'
import { resend, EMAIL_FROM } from './email'

const siteUrl = process.env.SITE_URL!

// LOCAL INSTALL of the Better Auth component (convex/betterAuth/*). The local
// install is what unlocks plugins beyond the default set — here, the
// organization plugin (community/PBC membership + native invitations). The
// component's schema is generated from the plugin set below; see
// convex/betterAuth/schema.ts. https://labs.convex.dev/better-auth/features/local-install
//
// The explicit return-type annotation breaks the otherwise-circular inference
// (authComponent -> internal.auth.* -> the trigger exports below -> authComponent).
export const authComponent: ReturnType<typeof createClient<DataModel, typeof authSchema>> =
  createClient<DataModel, typeof authSchema>(components.betterAuth, {
    local: { schema: authSchema },
    authFunctions: {
      onCreate: internal.auth.onCreate,
      onUpdate: internal.auth.onUpdate,
      onDelete: internal.auth.onDelete,
    },
    triggers: {
      // Mirror each new Better Auth user into our app-side parties + users rows
      // at sign-up, so a viewer always exists and reads never depend on a prior write.
      user: {
        onCreate: async (ctx, authUser) => {
          await ensureAppUser(ctx, {
            authUserId: authUser._id,
            name: authUser.name ?? undefined,
            email: authUser.email ?? undefined,
          })
        },
      },
      // Mirror the organization plugin's data into our app tables so RLS /
      // community-admin logic sees membership (see identity/orgMirror.ts).
      organization: {
        onCreate: async (ctx, org) => {
          await mirrorOrganization(ctx, org)
        },
      },
      member: {
        onCreate: async (ctx, member) => {
          await mirrorMember(ctx, member)
        },
        onDelete: async (ctx, member) => {
          await unmirrorMember(ctx, member)
        },
      },
    },
  })

// Registered trigger mutations the Better Auth component calls on user changes.
export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi()

// The Better Auth options, split out so the local component's adapter
// (convex/betterAuth/adapter.ts -> createApi) can derive the component CRUD from
// the same config the app's auth uses.
export const createAuthOptions = (ctx: GenericCtx<DataModel>) =>
  ({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    // Simple, non-verified email/password to get started.
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      // Required for Convex compatibility (derives JWT issuer/audience).
      convex({ authConfig }),
      // Community/PBC membership + NATIVE INVITATIONS. A delegate invites a
      // fisher to their community org; accepting creates the fisher's own
      // account (their own password) and joins them — the CARE-aligned way to
      // bring someone in without an admin creating a dormant credential.
      organization({
        // Communities are created by AFMA/seed + the mirroring layer, not by
        // end users self-registering organizations.
        allowUserToCreateOrganization: false,
        sendInvitationEmail: async (data) => {
          // The org plugin only calls this during a write, so the ctx is a
          // mutation/action ctx — narrow to it (resend.sendEmail needs one).
          if (!('runMutation' in ctx)) return
          // Plain, warm, short — and it makes clear the fisher (not the
          // delegate) must say yes themselves (CARE consent research).
          const inviteUrl = `${siteUrl}/invite/${data.id}`
          const inviter = data.inviter.user.name || 'Someone'
          await resend.sendEmail(ctx, {
            from: EMAIL_FROM,
            to: data.email,
            subject: `${inviter} started a fishing licence application for you`,
            html: [
              `<p>${inviter} has started a fishing licence application for you with AFMA, and added you to <strong>${data.organization.name}</strong>.</p>`,
              `<p>Before anything happens, <strong>you</strong> need to set up your own account and say yes yourself. ${inviter} can’t do that part for you.</p>`,
              `<p><a href="${inviteUrl}">Open your invitation</a></p>`,
              `<p>You can read it, or ask someone to help you — but only you can agree.</p>`,
            ].join('\n'),
          })
        },
      }),
    ],
  }) satisfies BetterAuthOptions

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth(createAuthOptions(ctx))
}

// Example function for getting the current user. Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await authComponent.getAuthUser(ctx)
  },
})
