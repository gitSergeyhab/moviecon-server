import { Router } from "express";
import { validate } from "../lib/middlewares/validate";
import { registerSchema } from "../lib/validation/register";
import { authController } from "../controllers/auth-controller";
import { loginSchema } from "../lib/validation/login";
import { authenticate } from "../lib/middlewares/authenticate";

const authRouter = Router();

authRouter.get("/", authenticate, authController.getUser);

authRouter.post(
  "/register/",
  validate(registerSchema),
  authController.registration
);

authRouter.post("/login/", validate(loginSchema), authController.login);

export { authRouter };
