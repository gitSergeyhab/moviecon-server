import { NextFunction, Request, Response } from "express";
import { TestService } from "../services/externalDbServices/testService";
import { RegionCategory } from "../types/test";

interface TestData {
  id: string;
}

class TestController {
  async getTest(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const test = await TestService.getById(id as string);
      res.status(200).json(test);
    } catch (err) {
      next(err);
    }
  }

  async getRandomTestList(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, count } = req.query as {
        category: RegionCategory;
        count: string;
      };
      const test = await TestService.readRandomTests(
        category,
        parseInt(count) || 10
      );
      res.status(200).json(test);
    } catch (err) {
      next(err);
    }
  }
}

export const testController = new TestController();