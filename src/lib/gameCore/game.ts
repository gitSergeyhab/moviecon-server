import { GameStatus, Level } from "../../types/game";
import { GameResult, GameResultStatus } from "../../types/gameResult";
import { scoreBonusRatio as ratio, SCORE_WON_RATIO } from "./settings";

export type GameInfo = Omit<GameResult, "score" | "status">;
interface LevelResult {
  answersScore: number;
  errorBonus: number;
  skipBonus: number;
  timeBonus: number;
  levelScore: number;
}

export class Game {
  private info: GameInfo;
  private userId: string;
  private levels: Level[];
  private currentLevelIndex: number = 0;
  private status: GameStatus = "NOT_STARTED";
  private errors: number = 0;
  private skips: number = 0;
  private answers: number = 0;
  private timeSpent: number = 0;
  private totalScore: number = 0;
  private startTime: number = 0;
  private levelsStory: LevelResult[] = [];

  constructor(levels: Level[], userId: string, info: GameInfo) {
    this.info = info;
    this.levels = levels;
    this.resetLevel();
    this.userId = userId;
  }

  private resetLevel() {
    this.errors = 0;
    this.skips = 0;
    this.answers = 0;
    this.timeSpent = 0;
    this.startTime = Date.now();
  }

  startLevel() {
    this.status = "IN_PROGRESS";
    this.startTime = Date.now();
  }

  answerQuestion(correct: boolean) {
    if (this.status !== "IN_PROGRESS") {
      throw new Error(
        `Игровые действия должны совершаться в статусе IN_PROGRESS. текущий статус ${this.status}`
      );
    }

    const currentLevel = this.levels[this.currentLevelIndex];
    this.answers++;

    if (!correct) {
      this.errors++;
      if (this.errors > currentLevel.errors) {
        this.errors--;
        this.lostGame();
        return;
      }
    }

    if (this.answers + this.skips >= currentLevel.questions) {
      this.endLevel();
    }
  }

  skipQuestion() {
    if (this.status !== "IN_PROGRESS") {
      throw new Error(
        `Игровые действия должны совершаться в статусе IN_PROGRESS. текущий статус ${this.status}`
      );
    }

    const currentLevel = this.levels[this.currentLevelIndex];
    this.skips++;

    if (this.skips > currentLevel.skips) {
      this.errors++;
      if (this.errors > currentLevel.errors) {
        this.lostGame();
        return;
      }
    }

    if (this.answers + this.skips >= currentLevel.questions) {
      this.endLevel();
    }
  }

  endLevel() {
    this.setLevelResult();
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
      this.resetLevel();
      this.pauseGame();
    } else {
      this.wonGame();
    }
  }

  private setLevelResult() {
    const levelResult = this.calculateResultGameData();
    this.addResultToStory(levelResult);
    this.totalScore += levelResult.levelScore;
  }
  getGameResult(): GameResult {
    const info = this.info;
    const score = this.getScore();
    const status = this.getStatus() as GameResultStatus;
    return {
      ...info,
      score,
      status,
    };
  }

  calculateResultGameData(): LevelResult {
    const currentLevel = this.levels[this.currentLevelIndex];
    this.timeSpent = Date.now() - this.startTime;

    const answersScore = this.answers * ratio.answers;
    const errorBonus = (currentLevel.errors - this.errors) * ratio.error;
    const skipBonus = (currentLevel.skips - this.skips) * ratio.skip;
    const timeBonus = Math.floor(
      Math.max(currentLevel.time - this.timeSpent, 0) * ratio.time
    );
    const levelScore = answersScore + errorBonus + skipBonus + timeBonus;

    return {
      answersScore,
      errorBonus,
      skipBonus,
      timeBonus,
      levelScore,
    };
  }

  private addResultToStory(levelResult: LevelResult) {
    this.levelsStory.push(levelResult);
  }

  getLastLevelResult(): LevelResult | null {
    const story = this.levelsStory;
    const storyLen = story.length;
    return storyLen ? story[storyLen - 1] : null;
  }

  pauseGame() {
    this.status = "INFO_PAUSE";
  }
  endGame() {
    this.setLevelResult();
    this.status = "ENDED";
  }
  private wonGame() {
    this.totalScore = Math.round(this.totalScore * SCORE_WON_RATIO);
    this.status = "WON";
  }
  private lostGame() {
    this.setLevelResult();
    this.status = "LOST";
  }
  getStatus(): GameStatus {
    return this.status;
  }

  getIsGameOver(): boolean {
    return (
      this.status === "ENDED" || this.status === "LOST" || this.status === "WON"
    );
  }

  getUserId(): string {
    return this.userId;
  }

  getCurrentLevel(): Level {
    return this.levels[this.currentLevelIndex];
  }

  getCurrentLevelIndex(): number {
    return this.currentLevelIndex;
  }

  getScore(): number {
    return this.totalScore;
  }

  getLevelsCount(): number {
    return this.levels.length;
  }
}
