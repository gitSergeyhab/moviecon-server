import Joi from "joi";
import { UserRegisterData } from "../../types/user";
import { authConstants } from "./authConstants";

export const registerSchema = Joi.object<UserRegisterData>({
  email: Joi.string().email().required().messages({
    "any.required": "email обязателен",
    "string.email": "некорректный email",
  }),
  name: Joi.string()
    .min(authConstants.name.min)
    .max(authConstants.name.max)
    .required()
    .messages({
      "any.required": "имя обязательно",
      "string.min": `минимум ${authConstants.name.min} символа`,
      "string.max": `минимум ${authConstants.name.max} символов`,
    }),
  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      "any.required": "имя обязательно",
      "string.min": `минимум ${authConstants.password.min} символов`,
      "string.max": `минимум ${authConstants.password.max} символов`,
    }),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "пароли должны совпадать",
  }),
});
