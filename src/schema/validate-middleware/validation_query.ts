import ajvInstance from '../ajv_instance/ajv_instance';
import { Request, Response, NextFunction } from 'express';
import { JSONSchemaType } from 'ajv';

export const validationQuery = (schema: object) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = ajvInstance.compile(schema);
    const isValid = validate(req.query);

    if (!isValid) {
      return res.status(400).json({
        error: 'Invalid or missing query parameters',
        details: validate.errors, // Include validation errors for more details
      });
    }

    next();
  };
};
