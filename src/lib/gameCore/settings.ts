import { GameDuration, Level } from "../../types/game";

export const quickGameLevels: Level[] = [
  { errors: 1, skips: 1, number: 1, questions: 3, time: 30_000 },
  { errors: 2, skips: 2, number: 2, questions: 8, time: 50_000 },
  { errors: 2, skips: 1, number: 3, questions: 9, time: 60_000 },
] as const;

export const commonGameLevels: Level[] = [
  { errors: 1, skips: 1, number: 1, questions: 3, time: 20_000 },
  { errors: 2, skips: 1, number: 2, questions: 6, time: 40_000 },
  { errors: 2, skips: 1, number: 3, questions: 7, time: 45_000 },
  { errors: 2, skips: 1, number: 4, questions: 8, time: 50_000 },
  { errors: 2, skips: 1, number: 5, questions: 9, time: 55_000 },
  { errors: 1, skips: 1, number: 6, questions: 10, time: 60_000 },
  { errors: 1, skips: 0, number: 7, questions: 7, time: 45_000 },
] as const;

export const longGameLevels: Level[] = [
  { errors: 1, skips: 1, number: 1, questions: 3, time: 30_000 },
  { errors: 2, skips: 2, number: 2, questions: 6, time: 40_000 },
  { errors: 4, skips: 3, number: 3, questions: 9, time: 55_000 },
  { errors: 3, skips: 3, number: 4, questions: 9, time: 65_000 },
  { errors: 3, skips: 3, number: 5, questions: 9, time: 65_000 },
  { errors: 3, skips: 2, number: 6, questions: 9, time: 65_000 },
  { errors: 3, skips: 2, number: 7, questions: 11, time: 60_000 },
  { errors: 3, skips: 2, number: 8, questions: 11, time: 60_000 },
  { errors: 2, skips: 2, number: 9, questions: 11, time: 60_000 },
  { errors: 2, skips: 1, number: 10, questions: 11, time: 60_000 },
  { errors: 1, skips: 1, number: 11, questions: 9, time: 50_000 },
  { errors: 1, skips: 0, number: 12, questions: 7, time: 45_000 },
  { errors: 0, skips: 0, number: 13, questions: 7, time: 50_000 },
] as const;

export const gameLevels: Record<GameDuration, Level[]> = {
  QUICK: quickGameLevels,
  COMMON: commonGameLevels,
  LONG: longGameLevels,
} as const;

export const scoreBonusRatio = {
  answers: 10,
  error: 6,
  skip: 4,
  time: 1 / 1000,
} as const;

export const SCORE_WON_RATIO = 1.1;
