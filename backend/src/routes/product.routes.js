import { Router } from "express";
import * as controller from "../controllers/product.controller.js";

const router = Router();

router.get("/", controller.getAll);
router.post("/", controller.create);
router.patch("/", controller.update);
router.delete("/:id", controller.deleteProduct);

export default router;
