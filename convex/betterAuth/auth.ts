import { createAuth } from '../auth'

// Schema-generation entry for the Better Auth CLI (`npx auth generate`, run in
// this directory). The CLI imports this built `auth` instance to read which
// tables the configured plugins need, and emits ./generatedSchema.ts in Convex
// format (it's the Convex adapter inside `createAuth` that makes the output
// Convex-shaped). Generation never runs a DB op, so the ctx `createAuth`
// requires is dead weight here — hence the `{} as any` placeholder, exactly as
// the official local-install docs prescribe:
// https://labs.convex.dev/better-auth/features/local-install
//
// Keep this file minimal — only the `auth` export — and permanent (re-run the
// CLI whenever auth plugins change). Not imported by application code.
// biome-ignore lint/suspicious/noExplicitAny: documented gen-only placeholder ctx
export const auth = createAuth({} as any)
