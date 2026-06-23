import { query } from '../_generated/server'

// Public reference list — the PZJA-managed Torres Strait fisheries a licence can
// request entries in (Schedule 2 of the TIB application). Stable reference data.
export const list = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query('fisheries').withIndex('by_code').take(50)
    return all
      .filter((f) => f.active)
      .map((f) => ({ _id: f._id, code: f.code, name: f.name }))
  },
})
