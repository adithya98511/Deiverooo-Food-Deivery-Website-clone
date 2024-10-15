// orderValidationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import order_schema from "../schemas/order_schemas/order_schema"; // Adjust the path accordingly

const ajv = new Ajv();
const validate = ajv.compile(order_schema);

export const orderValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isValid = validate(req.body);

  if (!isValid) {
    return res.status(400).json({
      errors: validate.errors,
    });
  }

  next();
};
