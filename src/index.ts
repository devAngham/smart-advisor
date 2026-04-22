import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import authRoutes from './routes/auth.routes'
import portfolioRoutes from './routes/portfolio.routes'
import aiAdvisorRoutes from './routes/ai_advisor.routes'
import chatRoutes from './routes/chat.routes'

const app = express()
const PORT = process.env.PORT || 3000

// Security middlewares
app.use(cors())
app.use(helmet())

// Parse JSON body
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/portfolio', portfolioRoutes)
app.use('/ai-advisor', aiAdvisorRoutes)
app.use('/chat', chatRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app

