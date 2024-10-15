import { authMiddleware } from "../middleware/auth-middleware";
import { getCategory, getMenu } from "../controllers/menuController";
import { getMenuParamsSchema, getMenuQuerySchema } from "../schema/schemas/menu_schemas/getMenu";
import { validationParams } from "../schema/validate-middleware/validation_params";
import { validationQuery } from "../schema/validate-middleware/validation_query";

import { Router } from "express";

const router = Router();

router.get("/categories", authMiddleware, getCategory);
router.get("/restaurants/:restaurantId/menu", authMiddleware, validationParams(getMenuParamsSchema), validationQuery(getMenuQuerySchema), getMenu);

export default router;
