import { NextFunction, Request, Response } from "express";
import { UserLoginData, UserRegisterData } from "../types/user";
import { HttpError } from "../lib/utils/error";
import { UserService } from "../services/externalDbServices/userService";
import { getUserWithTokens } from "../lib/utils/user";
import { Crypt } from "../lib/utils/crypt";
import { AppRequest } from "../types/api";
import { getNewTokens, getRefreshUserData } from "../lib/tokens/tokens";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body as UserRegisterData;
      const emailUser = await UserService.findByEmail(email);

      if (emailUser) {
        throw new HttpError(400, "пользователь с таким email уже существует", [
          {
            name: "email",
            message: "пользователь с таким email уже существует",
          },
        ]);
      }
      const nameUser = await UserService.findByName(name);

      if (nameUser) {
        throw new HttpError(400, "пользователь с таким именем уже существует", [
          {
            name: "name",
            message: "пользователь с таким именем уже существует",
          },
        ]);
      }

      const hashedPassword = Crypt.hash(password);
      const newUser = await UserService.create({
        email,
        name,
        password: hashedPassword,
      });

      const response = getUserWithTokens(newUser);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as UserLoginData;
      const user = await UserService.findByEmail(email);

      if (!user) {
        throw new HttpError(400, "пользователь с таким email не существует", [
          {
            name: "email",
            message: "пользователь с таким email не существует",
          },
        ]);
      }

      const isPasswordValid = Crypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpError(400, "неверный пароль", [
          {
            name: "password",
            message: "неверный пароль",
          },
        ]);
      }

      const response = getUserWithTokens(user);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      if (!userId) {
        throw new HttpError(401, `Ошибка авторизации: userId=${userId}`);
      }
      const user = await UserService.findById(userId);
      const response = getUserWithTokens(user);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getRefreshTokens(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const { refresh } = req.body;
      const decoded = getRefreshUserData(refresh);

      if (!decoded) {
        throw new HttpError(401, `Ошибка авторизации: refreshToken=${refresh}`);
      }
      const newTokens = getNewTokens(decoded.id, decoded.role);
      res.status(200).json(newTokens);
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
