import { Request, Response } from 'express'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma'

import { ApiResponse, LoginBody } from '../types'


export const login = async (req: Request<{}, {}, LoginBody>, res: Response) : Promise<void> => {
    try {
      const { email, password } = req.body

      // Validate required fields
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email & password are required',
          data: null
        } as ApiResponse<null>)
      }

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email }
      })
      if(!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
          data: null
        } as ApiResponse<null>)
        return
      }

    // Validate password
      const isValidPassword = await compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials',
            data: null
        } as ApiResponse<null>)
        return
      }

    // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    )

      // Return success response
      res.status(200).json({
        success: true,
        message: 'You are logged in',
        data: {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
      } as ApiResponse<{ token: string; user: {id: number, name: string, email: string }}>)
      }
    catch (err) {
      console.error('[Auth] Login error:', err)
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        data: null
        } as ApiResponse<null>)
    }
}