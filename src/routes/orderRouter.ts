import { validationBody } from "../schema/validate-middleware/validation_body";
import { authMiddleware } from "../middleware/auth-middleware";
import { placeOrder } from "../controllers/orderController";
import order_schema from "../schema/schemas/order_schemas/order_schema";

import { Router } from "express";

const router = Router();

router.post("/postOrder", authMiddleware, validationBody(order_schema), placeOrder);

export default router;
