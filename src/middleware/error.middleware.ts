import { Request, Response, NextFunction  } from "express"
import { ApiResponse } from "../types"

export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number){
    super(message)
    this.statusCode = statusCode
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) : void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null
    } as ApiResponse<null>)
    return
  }
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    data: null
  } as ApiResponse<null>)
}
