"use strict";
// import { Router } from 'express';
// import { postSignup,postLogin } from '../controllers/user.controller';
// import { Request, Response, NextFunction } from 'express';
// import ajvInstance from '../schema/ajv_instance/ajv_instance';
// import userSchema from '../schema/user-schema';
// const router = Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("Schema before compilation:", JSON.stringify(userSchema, null, 2)); // Log the schema
// const validate = ajvInstance.compile(userSchema);
// export const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const valid = validate(req.body);
//   if (!valid) {
//     return res.status(400).json({ message: "Validation failed", errors: validate.errors });
//   }
//   next();
// };
// router.post('/signup', validateMiddleware, postSignup);
// router.post('/login', validateMiddleware, postLogin);
// export default router;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const ajv_instance_1 = __importDefault(require("../schema/ajv_instance/ajv_instance"));
const user_schema_1 = __importDefault(require("../schema/user-schema"));
const router = (0, express_1.Router)();
// console.log("Schema before compilation:", JSON.stringify(userSchema, null, 2)); // Log the schema
const validate = ajv_instance_1.default.compile(user_schema_1.default);
const validateMiddleware = (isLogin) => {
    return (req, res, next) => {
        const { email, password, password_re } = req.body;
        if (isLogin) {
            // For login, password_re is not needed
            const result = validate({ email, password });
            if (!result) {
                return res.status(400).json({ errors: validate.errors });
            }
        }
        else {
            // For signup, all fields are required
            const result = validate({ email, password, password_re });
            if (!result) {
                return res.status(400).json({ errors: validate.errors });
            }
        }
        next();
    };
};
router.post('/signup', validateMiddleware(false), user_controller_1.postSignup);
router.post('/login', user_controller_1.postLogin);
router.get('/getForgot', user_controller_1.getForgotPassword);
router.post('/forgot', user_controller_1.forgotPassword);
router.get('/resetPage/:token', user_controller_1.resetPasswordPage);
router.post('/reset-password/:token', user_controller_1.resetPassword);
exports.default = router;
