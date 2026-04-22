import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { addAsset, createPortfolio, deleteAsset, getPortfolio } from "../controllers/portfolio.controller";

const router = Router()

router.post('/', verifyToken, createPortfolio)
router.get('/', verifyToken, getPortfolio)
router.post('/assets', verifyToken, addAsset)
router.delete('/assets/:id', verifyToken, deleteAsset)

export default router
