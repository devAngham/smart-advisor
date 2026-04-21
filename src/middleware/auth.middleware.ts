import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types";
import jwt from "jsonwebtoken";

export const verifyToken =  (req: Request, res: Response, next: NextFunction) : void => {
  
  try {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')) {
      res.status(401).json({
        success: false,
        message: 'Invalid credintials',
        data: null
      } as ApiResponse<null>)
      return
    }
    const token = authHeader?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }

    // req.user = { userId: decoded.userId }
    (req as any).user = { userId: decoded.userId }
    next()

  } catch(err) {
      console.error('[Auth] auth middleware error:', err)
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        data: null
        } as ApiResponse<null>)
    }
  
}
