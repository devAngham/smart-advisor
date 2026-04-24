import Groq from "groq-sdk"
import logger from "../config/logger"
import { config } from "../config/env"

import { tools } from "../config/tools.json"

const groq = new Groq({
  apiKey: config.groqApiKey
})

export const getAIResponse = async (
  portfolio: any,
  messages: any[],
  userMessage: string
) => {
  try {
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

    Give personalized advice based on this profile.
    Be concise and practical.
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
