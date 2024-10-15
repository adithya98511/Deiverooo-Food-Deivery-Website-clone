"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuQuerySchema = exports.getMenuParamsSchema = void 0;
// const getMenuSchema: JSONSchemaType<GetMenuDto> = {
//   type: "object",
//   properties: {
//     params: {
//       type: "object",
//       properties: {
//         restaurantId: {
//           type: "number",
//           minimum: 1,
//         },
//       },
//       required: ["restaurantId"], // Only restaurantId is required
//       additionalProperties: false, // Ensures no other properties are allowed
//     },
//     query: {
//       type: "object",
//       properties: {
//         page: {
//           type: "string", // Changed to string
//           nullable: true,
//           pattern: "^[1-9][0-9]*$", // Ensures it is a positive integer as a string
//         },
//         limit: {
//           type: "string", // Changed to string
//           nullable: true,
//           pattern: "^[1-9][0-9]*$", // Ensures it is a positive integer as a string
//         },
//       },
//       additionalProperties: false, // Ensures no other properties are allowed
//     },
//   },
//   required: ["params"], // 'params' is required
//   additionalProperties: false, // Ensures no other properties are allowed
// };
// export default getMenuSchema;
// Schema for validating `params`
exports.getMenuParamsSchema = {
    type: 'object',
    properties: {
        restaurantId: {
            type: 'string', // Correcting type to "number"
            pattern: '^[1-9][0-9]*$',
        },
    },
    required: ['restaurantId'], // Only restaurantId is required
    additionalProperties: false, // Ensures no other properties are allowed
};
exports.getMenuQuerySchema = {
    type: 'object',
    properties: {
        page: {
            type: 'string',
            nullable: true,
            pattern: '^[1-9][0-9]*$', // Positive integer string pattern
        },
        limit: {
            type: 'string', // Limit as a string
            nullable: true,
            pattern: '^[1-9][0-9]*$', // Positive integer string pattern
        },
    },
    additionalProperties: false, // Ensures no other properties are allowed
};
