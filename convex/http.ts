import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { authComponent, createAuth } from './auth'

const http = httpRouter()
authComponent.registerRoutes(http, createAuth)

// ── File upload via a custom HTTP action ────────────────────────────────────
// The whole upload happens in one authenticated request (the Convex "custom
// HTTP action" path), storing the body in native Convex `_storage` and returning
// the storage id. The client (the attestation step) then calls
// licensing/attestation:attachEvidence to bind the id to the verification.
//
// Auth: the request must carry the Convex JWT (Authorization: Bearer <token>);
// anonymous uploads are rejected. HTTP-action bodies are capped at 20MB by
// Convex — fine for a phone photo of a signed form.

// Bearer-token requests aren't CORS-"credentialed", so `*` is safe here and
// avoids origin drift between localhost / workers.dev. Tighten to a fixed origin
// if uploads ever move to cookie auth.
const corsHeaders = (extra: Record<string, string> = {}) => ({
  'Access-Control-Allow-Origin': '*',
  Vary: 'origin',
  ...extra,
})

http.route({
  path: '/uploadFile',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return new Response('Sign in to upload.', { status: 401, headers: corsHeaders() })
    }
    const blob = await request.blob()
    if (blob.size === 0) {
      return new Response('Empty upload.', { status: 400, headers: corsHeaders() })
    }
    const storageId = await ctx.storage.store(blob)
    return new Response(JSON.stringify({ storageId }), {
      status: 200,
      headers: corsHeaders({ 'Content-Type': 'application/json' }),
    })
  }),
})

// CORS pre-flight for the upload.
http.route({
  path: '/uploadFile',
  method: 'OPTIONS',
  handler: httpAction(async (_ctx, request) => {
    const h = request.headers
    if (
      h.get('Origin') !== null &&
      h.get('Access-Control-Request-Method') !== null &&
      h.get('Access-Control-Request-Headers') !== null
    ) {
      return new Response(null, {
        headers: corsHeaders({
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, Digest',
          'Access-Control-Max-Age': '86400',
        }),
      })
    }
    return new Response()
  }),
})

export default http
