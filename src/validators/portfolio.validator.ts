import { z } from 'zod'

export const portfolioSchema = z.object({
  monthlyIncome: z.number(),
  monthlySavings: z.number(),
  riskLevel: z.enum(['low', 'medium', 'high']),
  goal: z.enum(['retirement', 'house', 'education', 'wealth', 'other']),
  targetAmount: z.number(),
  targetDate: z.string()
})
