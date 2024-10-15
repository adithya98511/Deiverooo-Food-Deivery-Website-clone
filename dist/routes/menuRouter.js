"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../middleware/auth-middleware");
const menuController_1 = require("../controllers/menuController");
const getMenu_1 = require("../schema/schemas/menu_schemas/getMenu");
const validation_params_1 = require("../schema/validate-middleware/validation_params");
const validation_query_1 = require("../schema/validate-middleware/validation_query");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/categories", auth_middleware_1.authMiddleware, menuController_1.getCategory);
router.get("/restaurants/:restaurantId/menu", auth_middleware_1.authMiddleware, (0, validation_params_1.validationParams)(getMenu_1.getMenuParamsSchema), (0, validation_query_1.validationQuery)(getMenu_1.getMenuQuerySchema), menuController_1.getMenu);
exports.default = router;