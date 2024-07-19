import { NextFunction, Response } from "express";
import { AppRequest } from "../types/api";
import { GameService } from "../services/localDbServices/gameService";
import { TestService } from "../services/externalDbServices/testService";
import { RegionCategory } from "../types/test";
import { gameLevels } from "../lib/gameCore/settings";
import { GameDuration, GameStatus } from "../types/game";
import { ErrorService } from "../services/errorService";

class GameController {
  async startGame(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const duration = req.body.duration as GameDuration;
      const category = req.body.category as RegionCategory;

      const levels = gameLevels[duration];
      const tests = await TestService.getTestByLevels(levels, category);
      const gameId = GameService.startSinglePlayerGames(userId, levels, tests);

      res.status(201).json({ gameId });
    } catch (err) {
      next(err);
    }
  }

  infoLevel(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const gameId = req.params.gameId;

      const gameData = GameService.getSinglePlayerGameById(gameId);

      if (!gameData) {
        ErrorService.throwNoSuchGame(gameId);
      }
      const { game, tests } = gameData;

      if (game.getUserId() !== userId) {
        ErrorService.throwAuthUserGame();
      }

      const levelIndex = game.getCurrentLevelIndex();
      const testsDict = tests[levelIndex];
      const totalScore = game.getScore();
      const levelsCount = game.getLevelsCount();
      const prevLvlResult = game.getLastLevelResult();
      const gameStatus = game.getStatus();
      const currentLevel = game.getCurrentLevel();
      const isGameOver = (["ENDED", "LOST", "WON"] as GameStatus[]).includes(
        gameStatus
      );
      const level = isGameOver ? null : currentLevel;
      res.status(200).json({
        level,
        prevLvlResult,
        testsDict: testsDict ? TestService.getTestDictDTO(testsDict) : null,
        totalScore,
        levelsCount,
      });
    } catch (err) {
      next(err);
    }
  }

  startLevel(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const gameId = req.params.gameId;

      const gameData = GameService.getSinglePlayerGameById(gameId);

      if (!gameData) {
        ErrorService.throwNoSuchGame(gameId);
      }

      const { game } = gameData;

      if (game.getUserId() !== userId) {
        ErrorService.throwAuthUserGame();
      }

      game.startLevel();

      res.status(200).json({ gameStatus: game.getStatus() });
    } catch (err) {
      next(err);
    }
  }

  skipQuestion(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const gameId = req.params.gameId;

      const gameData = GameService.getSinglePlayerGameById(gameId);

      if (!gameData) {
        ErrorService.throwNoSuchGame(gameId);
      }
      const { game } = gameData;

      if (game.getUserId() !== userId) {
        ErrorService.throwAuthUserGame();
      }

      game.skipQuestion();

      res
        .status(200)
        .json({ gameStatus: game.getStatus(), answerStatus: "skipped" });
    } catch (err) {
      next(err);
    }
  }

  answerQuestion(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const questionId = req.body.questionId;
      const variantId = req.body.variantId;
      const gameId = req.params.gameId;

      const gameData = GameService.getSinglePlayerGameById(gameId);

      if (!gameData) {
        ErrorService.throwNoSuchGame(gameId);
      }
      const { game, tests } = gameData;

      if (game.getUserId() !== userId) {
        ErrorService.throwAuthUserGame();
      }
      const levelIndex = game.getCurrentLevelIndex();
      if (levelIndex > game.getLevelsCount()) {
        ErrorService.throwWrongLevel();
      }

      const testsDict = tests[levelIndex];

      if (!testsDict) {
        ErrorService.throwNoTestsForLevel(levelIndex);
      }

      const test = testsDict[questionId];

      if (!test) {
        ErrorService.throwNoSuchTest(questionId);
      }

      const answerId = test.answer;
      const isAnswerCorrect = answerId === variantId;
      game.answerQuestion(isAnswerCorrect);

      res.status(200).json({
        gameStatus: game.getStatus(),
        answerStatus: isAnswerCorrect ? "correct" : "wrong",
        correctId: answerId,
      });
    } catch (err) {
      next(err);
    }
  }

  endGame(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const gameId = req.params.gameId;

      const gameData = GameService.getSinglePlayerGameById(gameId);
      if (!gameData) {
        ErrorService.throwNoSuchGame(gameId);
      }
      const { game } = gameData;

      if (game.getUserId() !== userId) {
        ErrorService.throwAuthUserGame();
      }

      game.endGame();

      res.status(200).json({ gameStatus: game.getStatus() });
    } catch (err) {
      next(err);
    }
  }
}

export const gameController = new GameController();
