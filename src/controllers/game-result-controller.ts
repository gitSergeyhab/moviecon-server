import { NextFunction, Response } from "express";
import { AppRequest, Sort } from "../types/api";
import { Category } from "../types/test";
import { GameDuration, GameType } from "../types/game";
import { GameResultService } from "../services/externalDbServices/gameResultService";
import { toGameResultDTO } from "../lib/utils/gameResult";

class GameResultController {
  async getUserRecords(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const result = await GameResultService.finsBestResultsByUserId(userId);
      res.status(200).json(
        result.map(({ _id, bestResult }) => ({
          params: _id,
          bestResult: toGameResultDTO(bestResult),
        }))
      );
    } catch (err) {
      next(err);
    }
  }

  async getRecords(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await GameResultService.findRecords(limit);
      res.status(200).json(
        result.map(({ _id, bestResult }) => ({
          params: _id,
          bestResult: bestResult.map(toGameResultDTO),
        }))
      );
    } catch (err) {
      next(err);
    }
  }

  async getUserResults(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const sort = (parseInt(req.query.sort as string) as Sort) || -1;
      const category = req.query.category as Category;
      const type = req.query.type as GameType;
      const duration = req.query.duration as GameDuration;
      const result = await GameResultService.findUserResults({
        category,
        duration,
        type,
        userId,
        limit,
        offset,
        sort,
      });
      console.log(result);
      res
        .status(200)
        .json({ ...result, results: result.results.map(toGameResultDTO) });
    } catch (err) {
      next(err);
    }
  }

  async getScoreLists(req: AppRequest, res: Response, next: NextFunction) {
    try {
      const result = await GameResultService.getScoreList();
      console.log(result);
      res
        .status(200)
        .json(result.map(({ _id, scores }) => ({ params: _id, scores })));
    } catch (err) {
      next(err);
    }
  }
}

export const gameResultController = new GameResultController();
