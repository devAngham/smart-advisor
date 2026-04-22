import { Router } from "express"
import { getChatHistory } from "../controllers/ai_advisor.controller"
import { verifyToken } from "../middleware/auth.middleware"

const router = Router()

router.get('/', verifyToken, getChatHistory)

export default router
