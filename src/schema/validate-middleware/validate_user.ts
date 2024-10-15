// import { Request, Response, NextFunction } from 'express';
// import ajvInstance from '../ajv_instance/ajv_instance';

// export const validateMiddleware = (schema: object) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const validate = ajvInstance.compile(schema);

//     const result = validate(req.body);

//     if (!result) {
//       const formattedErrors = validate.errors?.map(error => ({
//         field: error.instancePath || error.schemaPath,
//         message: error.message,
//       }));
//       return res.status(400).json({ error: 'Validation error', details: formattedErrors });
//     }

//     next();
//   };
// };

import { Request, Response, NextFunction } from "express";
import ajvInstance from "../ajv_instance/ajv_instance";
import signup_schema from "../schemas/user_schemas/signup_schema";
import order_schema from "../schemas/order_schemas/order_schema";
import login_schema from "../schemas/user_schemas/login_schema";
import logout_schema from "../schemas/user_schemas/logout_schema";
import forgotPWSchema from "../schemas/user_schemas/forgotPW_schema";

export const validateUserMiddleware = (isLogin: boolean) => {
  const validate = ajvInstance.compile(isLogin ? login_schema : signup_schema); // Use appropriate schema

  return (req: Request, res: Response, next: NextFunction) => {
    const { email, password, password_re } = req.body;

    // Validate based on login or signup
    const valid = isLogin ? validate({ email, password }) : validate({ email, password, password_re });

    if (!valid) {
      return res.status(400).json({
        error: validate.errors?.map((error) => ({
          field: error.instancePath,
          message: error.message,
        })),
      });
    }

    next();
  };
};

export const validateHeaders = (req: Request, res: Response, next: NextFunction) => {
  const validate = ajvInstance.compile(logout_schema);

  const isValid = validate(req.headers);

  if (!isValid) {
    return res.status(400).json({ error: "Invalid or missing authorization header" });
  }

  next();
};

export const validateForgotPW = (req: Request, res: Response, next: NextFunction) => {
  const validate = ajvInstance.compile(forgotPWSchema);

  const isValid = validate(req.body);

  if (!isValid) {
    return res.status(400).json({
      error: validate.errors?.map((error) => ({
        field: error.instancePath,
        message: error.message,
      })),
    });

    next();
  }
};
