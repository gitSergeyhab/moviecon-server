import Joi from "joi";
import { UserLoginData } from "../../types/user";
import { authConstants } from "./authConstants";

export const loginSchema = Joi.object<UserLoginData>({
  email: Joi.string().email().required().messages({
    "any.required": "email обязателен",
    "string.email": "некорректный email",
  }),
  password: Joi.string()
    .min(authConstants.password.min)
    .max(authConstants.password.max)
    .required()
    .messages({
      "any.required": "имя обязательно",
      "string.min": `минимум ${authConstants.password.min} символов`,
      "string.max": `минимум ${authConstants.password.max} символов`,
    }),
});
