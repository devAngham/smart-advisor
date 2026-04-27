import Groq from "groq-sdk"
import logger from "../config/logger"
import { config } from "../config/env"

import { tools } from "../config/tools.json"
import { riskCalculator } from "../utils/riskCalculator"

const groq = new Groq({
  apiKey: config.groqApiKey
})

export const getAIResponse = async (
  portfolio: any,
  messages: any[],
  userMessage: string
) => {
  try {
    const riskScore = await riskCalculator(portfolio.assets)
    // build the system prompt based on portfolio & assets
    const systemPrompt = `
    You are a professional financial advisor.

    User's financial profile:
    - Monthly income: $${portfolio.monthlyIncome}
    - Monthly savings: $${portfolio.monthlySavings}
    - Risk level: $${portfolio.riskLevel}
    - Goal: $${portfolio.goal}
    - Target amount: $${portfolio.targetAmount}
    - Target date: $${portfolio.targetDate}

    Current assets:
    ${portfolio.assets.map((a: any) => `- ${a.name} (${a.type}): $${a.amount}`).join('\n')}

    Portfolio Risk Score: ${riskScore.score} / 100 - ${riskScore.level}
    Give personalized advice based on this profile.
    Be concise and practical.

    IMPORTANT: 
    - Only use tools when the user explicitly asks to ADD, DELETE, or VIEW their portfolio assets.
    - For general financial questions and advice, ALWAYS respond with text only — do NOT use any tools.
    - Examples of general questions (respond with text): "what is the best time to invest?", "should I buy gold?", "what is an ETF?"
    - Examples of tool use: "add gold to my portfolio", "show my assets", "delete asset 3"

    Important: Always detect the language of the user's message and always send the respond in the same language
    If the user writes in Arabic, respond in Arabic
    If the user writes in French, respond in French. Never switch language

    `

    // build all chats
    const allMessages = [
      ...messages,
      { role: 'user', content: userMessage }
    ]

    // send prompt & messages to Groq
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...allMessages
      ],
      tools,
      // 'auto' lets Groq decide: use a tool if the message requires an action,
      // or respond with plain text if it's a general question
      tool_choice: 'auto',
      max_tokens: 1000
    })
    const message = response.choices[0].message

    if (message.tool_calls) {
      const toolCall = message.tool_calls[0]
      const { name: toolName, arguments: args } = toolCall.function
      const parsedArgs = JSON.parse(args)
      return {
        type: 'tool' as const, // === const typeOfTool = 'tool'; type = typeOfTool
        content: { toolName, parsedArgs}
      }
    }

    if (message.content) {
      return {
        type: 'text' as const,
        content: message.content
      }
    }

  } catch(err) {
      logger.error('[AI] Service error:', err)
      throw new Error('AI service failed')
  }
}
