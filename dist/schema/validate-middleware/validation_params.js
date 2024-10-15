"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationParams = void 0;
const ajv_instance_1 = __importDefault(require("../ajv_instance/ajv_instance"));
const validationParams = (schema) => {
    return (req, res, next) => {
        const validate = ajv_instance_1.default.compile(schema);
        const isValid = validate(req.params);
        if (!isValid) {
            return res.status(400).json({
                error: 'Invalid or missing params parameters',
                details: validate.errors,
            });
        }
        next();
    };
};
exports.validationParams = validationParams;
