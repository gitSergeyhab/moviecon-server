export type UserRole = "USER" | "ADMIN";

export interface UserTokens {
  access: string;
  refresh: string;
}
export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  name: string;
  repeatPassword: string;
}

export interface UserInfo {
  email: string;
  name: string;
  avatar?: string;
  points: number;
  role: UserRole;
}

export type UserWithTokens = UserInfo & { tokens: UserTokens };

export interface FullUserInfo extends UserWithTokens {
  password: string;
}

export interface UserDTO {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}
