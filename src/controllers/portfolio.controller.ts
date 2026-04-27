import { NextFunction, Request, Response } from "express"
import { AddAssetBody, ApiResponse, CreatePortfolioBody } from "../types"
import prisma from "../config/prisma"
import logger from "../config/logger"
import { riskCalculator } from "../utils/riskCalculator"

export const createPortfolio = async (req: Request<{}, {}, CreatePortfolioBody>, res: Response, next: NextFunction) => {
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
    logger.error('[Portfolio] Create error:', err)
    next(err)
  }
}

export const getPortfolio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = ((req as any).user).userId
    const portfolio = await prisma.portfolio.findUnique({ where: { userId }})

    if (!portfolio) {
      res.status(404).json({
      success: false,
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
    logger.error('[Portfolio] Get error:', err)
    next(err)
  }
}

export const addAsset = async (req: Request<{}, {}, AddAssetBody>, res: Response, next: NextFunction) => {
  try {
    const { type, name, amount } = req.body

    if (!type || !name || !amount) {
      res.status(400).json({
      success: false,
      message: 'All fields are required',
      data: null
    } as ApiResponse<null>)
    return
    }

    const userId = (req as any).user.userId
    const portfolio = await prisma.portfolio.findUnique({ where: { userId } })

    if (!portfolio) {
      res.status(404).json({
      success: false,
      message: 'Portfolio not found',
      data: null
    } as ApiResponse<null>)
    return
    }

    const { id: portfolioId } = portfolio

    const asset = await prisma.asset.create({ data: { portfolioId, name, type, amount  } })

    res.status(200).json({
      success: true,
      message: 'Asset created successfully',
      data: asset
    } as ApiResponse<typeof asset>)

  } catch(err) {
    logger.error('[Asset] Create error:', err)
    next(err)
  }
}

export const deleteAsset = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id: assetId } = req.params

    if (!assetId) {
      res.status(400).json({
      success: false,
      message: 'Invalid Credintials',
      data: null
    } as ApiResponse<null>)
    return
    }

    const deletedAsset = await prisma.asset.findUnique({ where: { id: Number(assetId) } })

    if (!deletedAsset) {
      res.status(404).json({
      success: false,
      message: 'Asset not found',
      data: null
    } as ApiResponse<null>)
    return
    }

    await prisma.asset.delete({ where: { id: Number(assetId) } })

    res.status(200).json({
      success: true,
      message: 'Asset deleted successfully',
      data: null
    } as ApiResponse<null>)

  } catch(err) {
    logger.error('[Asset] Delete error:', err)
    next(err)
  }
}

export const getRiskScore = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const userId = (req as any).user.userId

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId },
      include: { assets: true }
    })

    if (!portfolio) {
      res.status(404).json({
        success: false,
        message: 'Portfolio not found',
        data: null
      } as ApiResponse<null>)
      return
    }

    const riskScore = riskCalculator(portfolio.assets)

    res.status(200).json({
      success: true,
      message: 'Risk score calculated successfully',
      data: riskScore
    } as ApiResponse<typeof riskScore>)
  } catch(err){
      next(err)
  }
}

