import { GameDuration, GameType } from "../types/game";
import { GameResultStatus } from "../types/gameResult";

export const GAME_TYPES: GameType[] = ["MULTI", "SINGLE"] as const;
export const GAME_RESULT_STATUSES: GameResultStatus[] = [
  "WON",
  "LOST",
  "ENDED",
] as const;

export const GAME_DURATIONS: GameDuration[] = [
  "QUICK",
  "COMMON",
  "LONG",
] as const;
