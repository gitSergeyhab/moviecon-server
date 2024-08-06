export interface Level {
  number: number;
  time: number; // ms
  errors: number;
  skips: number;
  questions: number;
}

export type GameStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "ENDED"
  | "WON"
  | "LOST"
  | "INFO_PAUSE";

export type GameDuration = "QUICK" | "COMMON" | "LONG";
export type GameType = "SINGLE" | "MULTI";
