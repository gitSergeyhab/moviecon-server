import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../../constants";
import { AppRequest } from "../../../types/api";
import { UserRole } from "../../../types/user";

export const authenticate = (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, ENV.SECRET_KEY, (err, user) => {
      console.log({ user });
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user as { id: string; role: UserRole };
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
