"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetMenuDto = void 0;
const ajv_1 = __importDefault(require("ajv"));
const getMenu_1 = __importDefault(require("../schemas/menu_schemas/getMenu"));
const ajv = new ajv_1.default();
const validateGetMenuDto = (req, res, next) => {
    // Convert params.restaurantId to a number for validation
    const restaurantId = Number(req.params.restaurantId);
    const validate = ajv.compile(getMenu_1.default);
    const valid = validate({
        params: { restaurantId }, // Pass converted params
        query: req.query, // Query params come as is
    });
    if (!valid) {
        return res.status(400).json({ errors: validate.errors });
    }
    next();
};
exports.validateGetMenuDto = validateGetMenuDto;
