import { Request, Response } from 'express'
import bcrypt, { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma'

import { config } from '../config/env'
import { ApiResponse, LoginBody, RegisterBody } from '../types'
import logger from '../config/logger'


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
        config.jwtSecret as string,
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
    catch(err) {
      logger.error('[Auth] Login error:', err)
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        data: null
        } as ApiResponse<null>)
    }
}

export const register = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  try {

    const { email, name, password } = req.body;
    // Validate required fields
    if (!email || !name || !password) {
      res.status(400).json({
        success: false,
        message: 'All fields are required',
        data: null
      } as ApiResponse<null>)
      return
    }

    // check if user already exist
    const isUser = await prisma.user.findUnique({ where: { email } })

    if (isUser) {
      res.status(409).json({
        success: false,
        message: 'Email is already exist',
        data: null
      } as ApiResponse<null>)
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, name, password: hashedPassword }});
    // Generate token
    const token = jwt.sign(
      {userId: user.id, },
      config.jwtSecret as string,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      success: true,
      message: `Welcome ${name}`,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
      // token: string, {user: { id: number, email: string, userId: string, }}}
    } as ApiResponse<{ token: string; user: { id: number, email: string, name: string }}>)

  } catch(err) {
    logger.error('[Auth] Register error:', err)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null
    } as ApiResponse<null>)
  }
}

