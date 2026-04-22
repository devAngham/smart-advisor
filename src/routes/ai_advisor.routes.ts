import { Router } from "express"
import { aiAdvisor } from "../controllers/ai_advisor.controller"
import { verifyToken } from "../middleware/auth.middleware"

const router = Router()

router.post('/', verifyToken, aiAdvisor)

export default router
