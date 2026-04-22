import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { createPortfolio, getPortfolio } from "../controllers/portfolio.controller";

const app = Router()

app.post('/', verifyToken, createPortfolio)
app.get('/', verifyToken, getPortfolio)

export default app
