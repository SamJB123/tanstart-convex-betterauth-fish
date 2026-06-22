import { GeospatialIndex } from '@convex-dev/geospatial'
import { v } from 'convex/values'
import { components } from './_generated/api'
import { query } from './_generated/server'
import type { MutationCtx } from './_generated/server'
import type { Id } from './_generated/dataModel'

// Geospatial index over CATCH/EFFORT EVENT locations. The component indexes
// points (lat/long) for efficient viewport ("rectangle") and nearest-neighbour
// queries, filtered by fishery. Zone POLYGONS (TSPZ, jurisdiction lines,
// closures, the dugong sanctuary) are stored separately as GeoJSON in
// `zones.geojson` for map rendering + point-in-polygon checks.
//
// filterKeys let the index pre-filter before loading docs; sortKey (occurredAt)
// orders results ascending.
export const catchGeo = new GeospatialIndex<
  Id<'catchEvents'>,
  { fisheryId: string; region: string }
>(components.geospatial)

// Call from the catch-logging mutation to index a reported point.
export async function indexCatchPoint(
  ctx: MutationCtx,
  catchEventId: Id<'catchEvents'>,
  point: { lat: number; lng: number },
  filters: { fisheryId: Id<'fisheries'>; region?: string },
  occurredAt: number,
) {
  await catchGeo.insert(
    ctx,
    catchEventId,
    { latitude: point.lat, longitude: point.lng },
    { fisheryId: filters.fisheryId, region: filters.region ?? 'TS' },
    occurredAt,
  )
}

export async function removeCatchPoint(
  ctx: MutationCtx,
  catchEventId: Id<'catchEvents'>,
) {
  await catchGeo.remove(ctx, catchEventId)
}

// Catches within a map viewport (rectangle), optionally filtered by fishery.
export const catchesInViewport = query({
  args: {
    west: v.number(),
    south: v.number(),
    east: v.number(),
    north: v.number(),
    fisheryId: v.optional(v.id('fisheries')),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await catchGeo.query(
      ctx,
      {
        shape: {
          type: 'rectangle',
          rectangle: {
            west: args.west,
            south: args.south,
            east: args.east,
            north: args.north,
          },
        },
        limit: args.limit ?? 64,
        ...(args.fisheryId
          ? { filter: (q) => q.eq('fisheryId', args.fisheryId as string) }
          : {}),
      },
      args.cursor,
    )
  },
})

// Catches nearest a point (e.g. tapping the map), within an optional radius (m).
export const catchesNearest = query({
  args: {
    latitude: v.number(),
    longitude: v.number(),
    maxDistance: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await catchGeo.nearest(ctx, {
      point: { latitude: args.latitude, longitude: args.longitude },
      limit: args.limit ?? 32,
      maxDistance: args.maxDistance,
    })
  },
})
