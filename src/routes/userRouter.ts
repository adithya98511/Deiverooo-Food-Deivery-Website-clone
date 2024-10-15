// import { Router } from 'express';
// import { postSignup,postLogin } from '../controllers/user.controller';
// import { Request, Response, NextFunction } from 'express';
// import ajvInstance from '../schema/ajv_instance/ajv_instance';
// import userSchema from '../schema/user-schema';
// const router = Router();

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

// import { Router } from 'express';
// import { postSignup,postLogin,forgotPassword, resetPasswordPage, resetPassword,getForgotPassword } from '../controllers/userController';
// import { Request, Response, NextFunction } from 'express';
// import ajvInstance from '../schema/ajv_instance/ajv_instance';
// import userSchema from '../schema/user-schema';
// const router = Router();

// // console.log("Schema before compilation:", JSON.stringify(userSchema, null, 2)); // Log the schema
// const validate = ajvInstance.compile(userSchema);

// const validateMiddleware = (isLogin: boolean) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const { email, password, password_re } = req.body;

//     if (isLogin) {
//       // For login, password_re is not needed
//       const result = validate({ email, password });
//       if (!result) {
//         return res.status(400).json({ errors: validate.errors });
//       }
//     } else {
//       // For signup, all fields are required
//       const result = validate({ email, password, password_re });
//       if (!result) {
//         return res.status(400).json({ errors: validate.errors });
//       }
//     }

//     next();
//   };
// };
// router.post('/signup', validateMiddleware(false), postSignup);
// router.post('/login', postLogin);
// router.get('/getForgot', getForgotPassword);
// router.post('/forgot', forgotPassword);
// router.get('/resetPage/:token', resetPasswordPage);
// router.post('/reset-password/:token', resetPassword);

// export default router;

import { Router } from "express";
import {
  postSignup,
  postLogin,
  forgotPassword,
  resetPasswordPage,
  resetPassword,
  getForgotPassword,
  logout,
} from "../controllers/userController copy";
import { Request, Response, NextFunction } from "express";
const router = Router();

import { validateUserMiddleware, validateHeaders, validateForgotPW } from "../schema/validate-middleware/validate_user";

// const validateMiddleware = (isLogin: boolean) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const { email, password, password_re } = req.body;

//     let result;
//     if (isLogin) {
//       result = validate({ email, password });
//     } else {
//       result = validate({ email, password, password_re });
//     }

//     if (!result) {
//       // Send a detailed error message
//       return res.status(400).json({
//         error: validate.errors?.map((err: any) => ({
//           instancePath: err.instancePath,
//           message: err.message,
//         })),
//         message: "Validation error",
//       });
//     }

//     next();
//   };
// };

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     tags: [Users]
 *     description: Create a new user account by providing email, password, and password confirmation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - password_re
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email address
 *               password:
 *                 type: string
 *                 description: User password
 *               password_re:
 *                 type: string
 *                 description: Password confirmation
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post("/signup", validateUserMiddleware(false), postSignup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     description: Log in to the application by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email address
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Validation error
 */
router.post("/login", validateUserMiddleware(true), postLogin);

/**
 * @swagger
 * /getForgot:
 *   get:
 *     summary: Get forgot password page
 *     tags: [Users]
 *     description: Retrieve the forgot password page.
 *     responses:
 *       200:
 *         description: Forgot password page retrieved successfully
 */
router.get("/getForgot", getForgotPassword);

/**
 * @swagger
 * /forgot:
 *   post:
 *     summary: Forgot password
 *     tags: [Users]
 *     description: Send a reset password link to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email address
 *     responses:
 *       200:
 *         description: Reset password link sent
 *       400:
 *         description: Validation error
 */
router.post("/forgot", validateForgotPW, forgotPassword);

/**
 * @swagger
 * /resetPage/{token}:
 *   get:
 *     summary: Reset password page
 *     tags: [Users]
 *     description: Display the reset password page based on the provided token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     responses:
 *       200:
 *         description: Reset password page retrieved successfully
 *       400:
 *         description: Invalid token
 */
router.get("/resetPage/:token", resetPasswordPage);

/**
 * @swagger
 * /reset-password/{token}:
 *   post:
 *     summary: Reset password
 *     tags: [Users]
 *     description: Reset the user's password using a valid token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - password_re
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *               password_re:
 *                 type: string
 *                 description: Confirm new password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Validation error
 */
router.post("/reset-password/:token", resetPassword);
router.post("/logout", validateHeaders, logout);

export default router;
