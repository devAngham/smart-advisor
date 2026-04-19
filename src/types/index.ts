export interface RegisterBody {
  email: string
  name: string
  password: string
}

export interface LoginBody {
  email: string
  password: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T | null
}

