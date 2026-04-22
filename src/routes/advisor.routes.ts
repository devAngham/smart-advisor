import { Router } from "express"
import { aiAdvisor, getChatHistory } from "../controllers/advisor.controller"
import { verifyToken } from "../middleware/auth.middleware"

const router = Router()

router.post('/chat', verifyToken, aiAdvisor)
router.get('/chat/history', verifyToken, getChatHistory)

export default router
