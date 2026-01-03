import { Router } from "express";
import productRoutes from "./product.routes.js";
import authRoutes from "./auth.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.use("/products", authMiddleware, productRoutes);
router.use("/analytics", authMiddleware, analyticsRoutes);
router.use("/auth", authRoutes);

export default router;
