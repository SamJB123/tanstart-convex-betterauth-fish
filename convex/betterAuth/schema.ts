import { defineSchema } from 'convex/server'
import { tables } from './generatedSchema'

// The Better Auth component schema (local install). `tables` is AUTO-GENERATED
// by the Better Auth CLI from the plugin set in convex/auth.ts. Whenever you
// change auth plugins, regenerate (the ./auth.ts gen entry is permanent):
//   cd convex/betterAuth && npx auth generate --output generatedSchema.ts
export default defineSchema(tables)
