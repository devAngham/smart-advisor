import { Request, Response } from "express"
import { ApiResponse, ChatBody } from "../types"
import prisma from "../config/prisma"
import { getAIResponse } from "../services/ai.service"

export const aiAdvisor = async (req: Request<{}, {}, ChatBody>, res: Response) => {
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

    const lastChat = await prisma.chat.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    const messages = lastChat ? lastChat.messages as any[] : []

    const aiResponse = await getAIResponse(portfolio, messages, message)
    const updatedMessages = [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse }
    ]
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
      console.log('[AI Advisor] error:', err)
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        data: null
      } as ApiResponse<null>)
  }
}