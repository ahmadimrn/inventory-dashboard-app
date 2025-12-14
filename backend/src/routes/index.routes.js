import { Router } from "express";
import productRoutes from "./product.routes.js";
import importRoutes from "./import.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.use("/products", authMiddleware, productRoutes);
router.use("/import", authMiddleware, importRoutes);
router.use("/user", authMiddleware, userRoutes);
router.use("/auth", authRoutes);

export default router;
