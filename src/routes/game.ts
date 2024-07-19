import { Router } from "express";
import { gameController } from "../controllers/game-controller";
import { authenticate } from "../lib/middlewares/authenticate";

const gameRouter = Router();

gameRouter.post("/start-game/", authenticate, gameController.startGame);
gameRouter.get("/info-level/:gameId", authenticate, gameController.infoLevel);
gameRouter.put("/start-level/:gameId", authenticate, gameController.startLevel);

gameRouter.put(
  "/answer-question/:gameId",
  authenticate,
  gameController.answerQuestion
);

gameRouter.put(
  "/skip-question/:gameId",
  authenticate,
  gameController.skipQuestion
);
gameRouter.put("/end-game/:gameId", authenticate, gameController.endGame);

export { gameRouter };
