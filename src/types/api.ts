import { Request } from "express";
import { UserRole } from "./user";

export interface AppRequest extends Request {
  user: {
    id: string;
    role: UserRole;
  };
}

export type Sort = 1 | -1;
