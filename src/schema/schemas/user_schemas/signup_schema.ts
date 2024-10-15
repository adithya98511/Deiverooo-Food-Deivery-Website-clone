import { JSONSchemaType } from "ajv";
import { SignUpRequestBody } from "../../../types/dto/user.dto";

const userSchema: JSONSchemaType<SignUpRequestBody> = {
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
    password_re: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["email", "password", "password_re"],
  additionalProperties: false,
};

export default userSchema;
