import { z } from 'zod'

export const assetSchema = z.object({
  type: z.enum(['stocks', 'gold', 'ETF', 'crypto', 'cash', 'other']), 
  name: z.string(),
  amount: z.number()
})
