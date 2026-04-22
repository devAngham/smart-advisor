import { NextFunction, Request, Response } from "express"
import { ApiResponse, ChatBody } from "../types"
import prisma from "../config/prisma"
import { getAIResponse } from "../services/ai.service"
import logger from "../config/logger"

const chatCache = new Map<number, any[]>()

export const aiAdvisor = async (req: Request<{}, {}, ChatBody>, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId
    const { message } = req.body

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId },
      include: { assets: true }
    })

    if(!portfolio) {
      res.status(400).json({
        success: false,
        message: 'Portfolio not found',
        data: null
      } as ApiResponse<null>)
      return
    }

    // const lastChat = await prisma.chat.findFirst({
    //   where: { userId },
    //   orderBy: { createdAt: 'desc' }
    // })

    // const messages = lastChat ? lastChat.messages as any[] : []
    const messages = chatCache.get(userId) || []

    const aiResponse = await getAIResponse(portfolio, messages, message)
    const updatedMessages = [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse }
    ]
    chatCache.set(userId, updatedMessages)
    await prisma.chat.create({
      data: {
        userId,
        messages: updatedMessages
      }
    })
    res.status(200).json({
      success: true,
      message: 'AI response retrived',
      data: aiResponse
    } as ApiResponse<string>)
  } catch(err) {
      logger.error('[AI Advisor] error:', err)
      next(err)
  }
}

export const getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId

    if(chatCache.has(userId)) {
      res.status(200).json({
      success: true,
      message: 'Chat history retrieved successfully',
      data: [{ messages: chatCache.get(userId) }]
    } as ApiResponse<any>)
    return
    }

    const chatHistory = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    res.status(200).json({
      success: true,
      message: 'Chat history retrieved successfully',
      data: chatHistory
    } as ApiResponse<typeof chatHistory>)
  } catch(err) {
    logger.error('[Chat History] error:', err)
    next(err)
  }
}
