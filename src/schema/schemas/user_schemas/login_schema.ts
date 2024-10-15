import { JSONSchemaType } from "ajv";
import { LoginRequestBody } from "../../../types/dto/user.dto";

const loginSchema: JSONSchemaType<LoginRequestBody> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export default loginSchema;
