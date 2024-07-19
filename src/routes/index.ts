import { Router } from "express";
import { authRouter } from "./auth";
import { testRouter } from "./test";
import { gameRouter } from "./game";

const router = Router();

router.use("/auth", authRouter);
router.use("/test", testRouter);
router.use("/game", gameRouter);

export { router };
