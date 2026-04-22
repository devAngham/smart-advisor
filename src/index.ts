import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import { config } from './config/env'
import authRoutes from './routes/auth.routes'
import portfolioRoutes from './routes/portfolio.routes'
import aiAdvisorRoutes from './routes/advisor.routes'

const app = express()
const PORT = config.port || 3000

// Security middlewares
app.use(cors())
app.use(helmet())

// Parse JSON body
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/portfolio', portfolioRoutes)
app.use('/advisor', aiAdvisorRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app

