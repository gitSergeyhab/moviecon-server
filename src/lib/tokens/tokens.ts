import jwt from "jsonwebtoken";
import { UserRole } from "../../../types/user";
import { ENV } from "../../constants";

const accessTime = "10h";
const refreshTime = "30days";

export type Token = "ACCESS" | "REFRESH";
export const getToken = (id: string, role: UserRole, tokenType: Token) =>
  jwt.sign({ id, role }, ENV.SECRET_KEY, {
    expiresIn: tokenType === "ACCESS" ? accessTime : refreshTime,
  });
