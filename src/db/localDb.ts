import { FullUserInfo, UserInfo } from "../types/user";

const users = new Map<string, FullUserInfo>();

export const addUser = (user: FullUserInfo) => {
  users.set(user.email, user);
};

export const getUser = (email: string): FullUserInfo | null =>
  users.get(email) || null;
