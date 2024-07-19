import { GameDuration, Level } from "../../types/game";

export const quickGameLevels: Level[] = [
  { errors: 3, skips: 5, number: 1, questions: 15, time: 100_000 },
] as const;

export const commonGameLevels: Level[] = [
  { errors: 1, skips: 1, number: 1, questions: 2, time: 20_000 },
  { errors: 1, skips: 1, number: 2, questions: 3, time: 20_000 },
  // { errors: 1, skips: 1, number: 3, questions: 4, time: 20_000 },

  // { errors: 2, skips: 2, number: 3, questions: 6, time: 20_000 },

  // { errors: 4, skips: 4, number: 1, questions: 13, time: 100_000 },
  // { errors: 2, skips: 2, number: 2, questions: 17, time: 100_000 },
  // { errors: 1, skips: 1, number: 3, questions: 21, time: 100_000 },
] as const;

export const longGameLevels: Level[] = [
  { errors: 4, skips: 4, number: 1, questions: 13, time: 100_000 },
  { errors: 3, skips: 3, number: 2, questions: 15, time: 100_000 },
  { errors: 2, skips: 3, number: 3, questions: 17, time: 100_000 },
  { errors: 2, skips: 2, number: 4, questions: 21, time: 100_000 },
  { errors: 2, skips: 1, number: 5, questions: 17, time: 100_000 },
  { errors: 1, skips: 2, number: 6, questions: 15, time: 100_000 },
  { errors: 1, skips: 1, number: 7, questions: 13, time: 100_000 },
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
