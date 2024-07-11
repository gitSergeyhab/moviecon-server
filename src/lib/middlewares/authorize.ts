import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../../types/user";

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore:next-line
    const user = req.user;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};
