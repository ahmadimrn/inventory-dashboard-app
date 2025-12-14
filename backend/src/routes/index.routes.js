import { Router } from "express";
import productRoutes from "./product.routes.js";
import importRoutes from "./import.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();
router.use("/products", productRoutes);
router.use("/import", importRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;
