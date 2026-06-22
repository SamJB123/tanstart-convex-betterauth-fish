import { createApi } from '@convex-dev/better-auth'
import schema from './schema'
import { createAuthOptions } from '../auth'

// The local Better Auth component's database API. These exported functions ARE
// the component's public CRUD surface that `authComponent.adapter(ctx)` (in
// ../auth) talks to. `createApi` derives them from the generated schema + the
// Better Auth options (plugins/table mappings). See
// https://labs.convex.dev/better-auth/features/local-install
export const {
  create,
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
} = createApi(schema, createAuthOptions)
