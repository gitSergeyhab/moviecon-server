import { HttpError } from "../lib/utils/error";

export class ErrorService {
  static throwNoSuchGame(gameId: string) {
    throw new HttpError(404, `нет игры с  ${gameId}`, [
      { name: "level", message: `нет игры с  ${gameId}` },
    ]);
  }

  static throwAuthUserGame() {
    throw new HttpError(403, "Это чужая игра", [
      { name: "game", message: "Это чужая игра" },
    ]);
  }

  static throwWrongLevel() {
    throw new HttpError(400, "неверный номер уровня", [
      { name: "level", message: "неверный номер уровня" },
    ]);
  }

  static throwNoTestsForLevel(levelNumber: number) {
    throw new HttpError(400, `нет тестов для уровня ${levelNumber}`, [
      { name: "level", message: `нет тестов для уровня ${levelNumber}` },
    ]);
  }

  static throwNoSuchTest(testId: string) {
    throw new HttpError(400, `нет теста с id ${testId}`, [
      { name: "test", message: `нет теста с id ${testId}` },
    ]);
  }
}
