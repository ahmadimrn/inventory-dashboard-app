import { application, Router } from "express";
import * as controller from "../controllers/user.controller.js";

const router = Router();

router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

export default router;
