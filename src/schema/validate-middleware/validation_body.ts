import ajvInstance from '../ajv_instance/ajv_instance';
import { Request, Response, NextFunction } from 'express';
import Ajv, { JSONSchemaType } from 'ajv';

export const validationBody = (schema: object) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = ajvInstance.compile(schema);
    const isValid = validate(req.body);

    if (!isValid) {
      return res
        .status(400)
        .json({ error: 'Invalid or missing authorization header' });
    }

    next();
  };
};
