import Groq from "groq-sdk"
import logger from "../config/logger"
import { config } from "../config/env"

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
      max_tokens: 1000
    })
    const aiResponse = response.choices[0].message.content || 'No Response'

    return aiResponse

  } catch(err) {
      logger.error('[AI] Service error:', err)
      throw new Error('AI service failed')
  }
}
