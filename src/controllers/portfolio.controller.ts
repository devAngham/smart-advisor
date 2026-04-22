import { Request, Response } from "express"
import { ApiResponse, CreatePortfolioBody } from "../types"
import prisma from "../config/prisma"

export const createPortfolio = async (req: Request<{}, {}, CreatePortfolioBody>, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const {
      monthlyIncome,
      monthlySavings,
      riskLevel,
      goal,
      targetAmount,
      targetDate
    } = req.body

    if(!monthlyIncome || !monthlySavings || !riskLevel || !goal || !targetAmount || !targetDate){
      res.status(400).json({
        success: false,
        message: 'All fields are required',
        data: null
      } as ApiResponse<null>)
      return
    }

    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { userId }
    })

    if (existingPortfolio) {
      res.status(409).json({
        success: false,
        message: 'Portfolio already exists',
        data: null
      } as ApiResponse<null>)
      return
    }

    const portfolio = await prisma.portfolio.create({data: { 
      monthlyIncome,
      monthlySavings,
      riskLevel,
      goal,
      targetAmount,
      targetDate: new Date(targetDate),
      userId
    }})

    res.status(200).json({
      success: true,
      message: 'Portfolio created successfully',
      data: portfolio
    } as ApiResponse<typeof portfolio>)
  } catch (err) {
    console.error('[Portfolio] Create error:', err)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null
    } as ApiResponse<null>)
  }
}

export const getPortfolio = async (req: Request, res: Response) => {
  try {
    const userId = ((req as any).user).userId
    const portfolio = await prisma.portfolio.findUnique({ where: { userId }})

    if (!portfolio) {
      res.status(404).json({
      success: true,
      message: 'Portfolio not found',
      data: null
    } as ApiResponse<null>)
    return
    }
    res.status(200).json({
      success: true,
      message: 'Portfolio retrieved successfully',
      data: portfolio
    } as ApiResponse<typeof portfolio>)
    return
  } catch(err) {
    console.error('[Portfolio] Get error:', err)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null
    } as ApiResponse<null>)
  }
}

