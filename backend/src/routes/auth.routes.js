import { Router } from "express";
import * as controller from "../controllers/auth.controller.js";
import { registerValidator } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", controller.login);
router.post("/register", registerValidator, controller.register);

export default router;
