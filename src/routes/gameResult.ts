import { Router } from "express";

import { authenticate } from "../lib/middlewares/authenticate";
import { gameResultController } from "../controllers/game-result-controller";

const gameResultRouter = Router();

gameResultRouter.get(
  "/user-top/",
  authenticate,
  gameResultController.getUserResults
);
gameResultRouter.get(
  "/user-best/",
  authenticate,
  gameResultController.getUserRecords
);

gameResultRouter.get("/records/", gameResultController.getRecords);

export { gameResultRouter };
