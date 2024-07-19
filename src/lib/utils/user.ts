import { UserDTO, UserTokens } from "../../types/user";
import { UserType, UserTypeWithId } from "../../models/user";
import { getToken } from "../tokens/tokens";

export const toUserDTO = (user: UserType): UserDTO => ({
  id: user._id.toString(),
  name: user.name,
  role: user.role,
  email: user.email,
  points: user.points,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const getUserWithTokens = (
  user: UserTypeWithId
): UserDTO & { tokens: UserTokens } => {
  const access = getToken(user._id, user.role, "ACCESS");
  const refresh = getToken(user.email, user.role, "REFRESH");
  return { ...toUserDTO(user), tokens: { access, refresh } };
};
