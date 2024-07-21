import { model, Schema } from "mongoose";
import { TEST_CATEGORIES_WITH_ALL } from "../const/test";
import {
  GAME_DURATIONS,
  GAME_RESULT_STATUSES,
  GAME_TYPES,
} from "../const/game";
import { GameDuration, GameType } from "../types/game";
import { Category } from "../types/test";
import { GameResultType } from "../types/gameResult";

const GameResultSchema = new Schema<GameResultType>(
  {
    category: { type: String, enum: TEST_CATEGORIES_WITH_ALL, required: true },
    score: { type: Number, required: true },
    type: { type: String, enum: GAME_TYPES, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    status: { type: String, enum: GAME_RESULT_STATUSES, required: true },
    duration: { type: String, enum: GAME_DURATIONS, required: true },
  },
  { timestamps: true }
);

export const GameResultModel = model("GameResult", GameResultSchema);

export type ResultsAggregateDict = Record<
  Category,
  Record<GameType, Record<GameDuration, GameResultType>>
>;

export type ResultsAggregateUserDict = Record<
  GameDuration,
  Record<GameType, Record<Category, GameResultType>>
>;
