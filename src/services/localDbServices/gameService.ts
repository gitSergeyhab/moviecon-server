import { v4 } from "uuid";
import { ITestFromDB } from "../../types/test";
import { Game, GameInfo } from "../../lib/gameCore/game";
import { Level } from "../../types/game";

const singlePlayerGames = new Map<
  string,
  { game: Game; tests: Record<string, ITestFromDB>[] }
>();

export class GameService {
  static startSinglePlayerGames(
    userId: string,
    levels: Level[],
    tests: Record<string, ITestFromDB>[],
    gameInfo: GameInfo
  ) {
    const game = new Game(levels, userId, gameInfo);
    const gameId = v4();
    singlePlayerGames.set(gameId, { game, tests });
    return gameId;
  }

  static getSinglePlayerGameById(gameId: string) {
    return singlePlayerGames.get(gameId);
  }
}
