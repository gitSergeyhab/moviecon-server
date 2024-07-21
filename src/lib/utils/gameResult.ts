import { GameResultDTO, GameResultType } from "../../types/gameResult";

export const toGameResultDTO = (gameResult: GameResultType): GameResultDTO => ({
  id: gameResult._id.toString(),
  category: gameResult.category,
  score: gameResult.score,
  type: gameResult.type,
  duration: gameResult.duration,
  userId: gameResult.userId,
  userName: gameResult.userName,
  status: gameResult.status,
  createdAt: gameResult.createdAt,
  updatedAt: gameResult.updatedAt,
});
