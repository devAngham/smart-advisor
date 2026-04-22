import { Request, Response } from "express"
import { AddAssetBody, ApiResponse, CreatePortfolioBody } from "../types"
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
    console.error('[Portfolio] Get error:', err)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null
    } as ApiResponse<null>)
  }
}

export const addAsset = async (req: Request<{}, {}, AddAssetBody>, res: Response) => {
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
    console.error('[Asset] Create error:', err)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null
    } as ApiResponse<null>)
  }
}

export const deleteAsset = async (req: Request<{ id: string }>, res: Response) => {
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
    console.error('[Asset] Delete error:', err)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null
    } as ApiResponse<null>)
  }
}

