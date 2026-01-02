import { Router } from "express";
import * as controller from "../controllers/analytics.controller.js";

const router = Router();

router.get("/", controller.getAnalytics);

export default router;
