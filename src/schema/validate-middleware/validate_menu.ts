// import { Request, Response, NextFunction } from "express";
// import Ajv from "ajv";

// const ajv = new Ajv();

// export const validateGetMenuDto = (req: Request, res: Response, next: NextFunction) => {
//   // Convert params.restaurantId to a number for validation
//   const restaurantId = Number(req.params.restaurantId);

//   const validate = ajv.compile(getMenuSchema);

//   const valid = validate({
//     params: { restaurantId }, // Pass converted params
//     query: req.query, // Query params come as is
//   });

//   if (!valid) {
//     return res.status(400).json({ errors: validate.errors });
//   }

//   next();
// };
