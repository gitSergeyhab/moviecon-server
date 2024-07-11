import { Router } from "express";
import { authRouter } from "./auth";
import { testRouter } from "./test";

const router = Router();

router.use("/auth", authRouter);
router.use("/test", testRouter);

export { router };
