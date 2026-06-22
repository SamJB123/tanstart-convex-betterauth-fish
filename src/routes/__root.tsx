/// <reference types="vite/client" />
import { HeadContent, Scripts, createRootRoute } from '@tanstack/solid-router'
import { Loading } from '@solidjs/web'
import type { JSX } from '@solidjs/web'
import appCss from '~/styles/app.css?url'
import AppConvexProvider from '~/providers/convex'
import { fetchAuth } from '~/library/server'

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { token } = await fetchAuth()
    return { token }
  },
  shellComponent: RootDocument,
})

function RootDocument(props: { children: JSX.Element }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        {/*
          Mobile-first viewport: `viewport-fit=cover` lets content extend under
          the notch/home-indicator so our `env(safe-area-inset-*)` padding can
          take over (see app.css). `maximum-scale` is intentionally NOT pinned —
          users must be able to pinch-zoom (WCAG 1.4.4).
        */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#0a6c74" />
        {/*
          Render the stylesheet as a static child of the shell `<head>` rather
          than via the route's `head()`/`<HeadContent>`. Under Solid 2,
          `<HeadContent>` re-renders empty on the client and hydration removes
          the head's stylesheet links. A static link is rendered identically on
          server and client, so hydration matches it and it survives.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        {/*
          Two variable families (display Fraunces + UI Inter), `display=swap` so
          text paints immediately in the system fallback while the webfont loads
          — important on the slow/patchy connections common in the Torres Strait.
          Data/figures use the system mono, so there's no third fetch.
        */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Inter:wght@400..700&display=swap"
        />
        <link rel="stylesheet" href={appCss} />
        <HeadContent />
      </head>
      <body>
        <Loading>
          <AppConvexProvider>{props.children}</AppConvexProvider>
        </Loading>
        <Scripts />
      </body>
    </html>
  )
}
