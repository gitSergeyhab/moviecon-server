import { GameDuration, GameType } from "../../types/game";
import { Category } from "../../types/test";
import { Sort } from "../../types/api";
import { GameResult, GameResultType } from "../../types/gameResult";
import { GameResultModel } from "../../models/gameResult";

interface Params {
  duration: string;
  type: string;
  category: string;
}
interface AggregatedUserRecord {
  _id: Params;
  bestResult: GameResultType;
}

interface AggregatedRecord {
  _id: Params;
  bestResult: GameResultType[];
}
interface FindUserResults {
  userId: string;
  limit: number;
  sort: Sort;
  offset: number;
  category: Category;
  type: GameType;
  duration: GameDuration;
}

interface GetStoreList {
  _id: Params;
  scores: number[];
}

export class GameResultService {
  static async create(result: GameResult): Promise<GameResultType> {
    const cratedResult = await GameResultModel.create(result);
    return cratedResult.toObject();
  }

  static async findById(id: string): Promise<GameResultType> {
    return await GameResultModel.findById(id);
  }

  static async finsBestResultsByUserId(
    userId: string
  ): Promise<AggregatedUserRecord[]> {
    return await GameResultModel.aggregate([
      { $match: { userId } },
      {
        $sort: { score: -1 },
      },
      {
        $group: {
          _id: {
            duration: "$duration",
            type: "$type",
            category: "$category",
          },
          bestResult: { $first: "$$ROOT" },
        },
      },
    ]);
  }
  static async findUserResults(
    data: FindUserResults
  ): Promise<{ results: GameResultType[]; totalCount: number }> {
    const { category, type, duration, userId, limit, offset, sort } = data;

    const filter: Record<string, string> = { userId };

    if (category) filter.category = category;
    if (duration) filter.duration = duration;
    if (type) filter.type = type;

    const pipeline = [
      { $match: filter },
      { $sort: { createdAt: sort } },
      {
        $facet: {
          results: [{ $skip: offset }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await GameResultModel.aggregate(pipeline);

    const results = result[0].results;
    const totalCount = result[0].totalCount[0]?.count || 0;

    return { results, totalCount };
  }

  static async findRecords(limit = 10): Promise<AggregatedRecord[]> {
    return await GameResultModel.aggregate([
      {
        $sort: { score: -1 },
      },
      {
        $group: {
          _id: {
            duration: "$duration",
            type: "$type",
            category: "$category",
          },
          bestResult: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 1,
          bestResult: { $slice: ["$bestResult", limit] },
        },
      },
    ]);
  }

  static async getScoreList(): Promise<GetStoreList[]> {
    return await GameResultModel.aggregate([
      {
        $sort: { score: 1 },
      },
      {
        $group: {
          _id: {
            duration: "$duration",
            type: "$type",
            category: "$category",
          },
          scores: { $push: "$score" },
        },
      },
      {
        $project: {
          _id: 1,
          scores: 1,
        },
      },
    ]);
  }
}
