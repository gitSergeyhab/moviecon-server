import jwt from "jsonwebtoken";
import { UserRole } from "../../types/user";
import { ENV } from "../../constants";
import { logger } from "../utils/logger";

const accessTime = "1h";
const refreshTime = "10days";

export type Token = "ACCESS" | "REFRESH";
export const getToken = (id: string, role: UserRole, tokenType: Token) =>
  jwt.sign({ id, role }, ENV.SECRET_KEY, {
    expiresIn: tokenType === "ACCESS" ? accessTime : refreshTime,
  });

export const getRefreshUserData = (refresh: string) => {
  try {
    const idRole = jwt.verify(refresh, ENV.SECRET_KEY) as {
      id: string;
      role: UserRole;
    };
    return idRole;
  } catch {
    logger.error("Invalid refresh token", { refresh });
    return null;
  }
};

export const getNewTokens = (id: string, role: UserRole) => ({
  access: getToken(id, role, "ACCESS"),
  refresh: getToken(id, role, "REFRESH"),
});
