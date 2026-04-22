import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import authRoutes from './routes/auth.routes'
import portfolio from './routes/portfolio.routes'
import aiAdvisor from './routes/ai_advisor.routes'

const app = express()
const PORT = process.env.PORT || 3000

// Security middlewares
app.use(cors())
app.use(helmet())

// Parse JSON body
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/portfolio', portfolio)
app.use('/ai-advisor', aiAdvisor)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app

