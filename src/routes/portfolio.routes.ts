import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { createPortfolio } from "../controllers/portfolio.controller";

const app = Router()

app.post('/', verifyToken, createPortfolio)

export default app
