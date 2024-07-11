import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { ErrorField, HttpError } from "../utils/error";

export const validate = (schema: Schema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!schema) {
        throw new HttpError(500, "Нет такой схемы", [
          { message: "Произошел сбой. Попробуйте позже", name: "server" },
        ]);
      }
      const { error } = schema.validate(req.body);
      if (error) {
        const errors: ErrorField[] = error.details.map(({ message, path }) => ({
          message,
          name: path[0].toString(),
        }));
        throw new HttpError(400, "Ошибка запроса", errors);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
