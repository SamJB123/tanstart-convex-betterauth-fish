import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import viteSolid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

// The config is a function of `command` so the Cloudflare plugin is applied for
// `vite build` (and thus `pnpm run deploy`) ONLY — never for `vite dev`. This
// keeps the local dev server on the plain Node runtime it already works on
// (process.env from .env.local, Solid Start's getRequest, etc.); switching dev
// to workerd would need .dev.vars plumbing and change behaviour. At build time
// the plugin wraps src/worker.ts (see wrangler.jsonc) as the deployed Worker
// and emits the client bundle as its static assets.
export default defineConfig(({ command }) => ({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      // Solid 2 dropped the `solid-js/web` subpath in favor of the standalone
      // `@solidjs/web` package; map the old path forward in case any dep still
      // imports it.
      'solid-js/web': '@solidjs/web',
    },
  },
  plugins: [
    // Build-only: the SSR/server-function code becomes the Worker (viteEnvironment
    // 'ssr', matching where TanStack Start does its request handling).
    ...(command === 'build' ? [cloudflare({ viteEnvironment: { name: 'ssr' } })] : []),
    tailwindcss(),
    tanstackStart(),
    // Must come AFTER tanstackStart() so the route files it generates compile.
    viteSolid({ ssr: true }),
  ],
}))
