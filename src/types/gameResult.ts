import { GameDuration, GameStatus, GameType } from "./game";
import { Category } from "./test";

export type GameResultStatus = Extract<GameStatus, "ENDED" | "LOST" | "WON">;

export interface GameResult {
  category: Category;
  score: number;
  type: GameType;
  duration: GameDuration;
  userId: string;
  userName: string;
  status: GameResultStatus;
}

export interface GameResultType extends GameResult, Document {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export interface GameResultDTO extends GameResult {
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
