export interface RegisterBody {
  email: string
  name: string
  password: string
}

export interface LoginBody {
  email: string
  password: string
}

export interface CreatePortfolioBody {
  monthlyIncome: number
  monthlySavings: number
  riskLevel: 'low' | 'high' | 'medium'
  goal: 'retirement' | 'house' | 'education' | 'wealth' | 'other'
  customGoal?: string
  targetAmount: number
  targetDate: string
}

export interface AddAssetBody {
  name: string
  type: 'stocks' | 'gold' | 'ETF' | 'crypto' | 'cash' | 'other'
  customType? : string
  amount: number
}

export interface ChatBody {
  message: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T | null
}

