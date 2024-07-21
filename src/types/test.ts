import { Types } from "mongoose";

export type Category = "rus" | "ussr" | "world" | "all";

export type AnswerType =
  | "OneMovieWithImage"
  | "OneMovieWithoutImage"
  | "OneImageWithOutMovie"
  | "OnePersonWitImage"
  | "OnePersonWitOutImage"
  | "OneImageOfPerson"
  | "Year"
  | "Slogan";

export type TestType =
  | "PersonByMovie"
  | "MovieByPerson"
  | "MovieByFrame"
  | "FrameByMovie"
  | "PersonByPhoto"
  | "PhotoByPerson"
  | "YearByMovie"
  | "MovieByYear"
  | "SloganByMovie"
  | "MovieBySlogan"
  | "MovieByBudget";

export interface IVariant {
  id?: string | number;
  enName?: string;
  name?: string;
  year?: number;
  imageUrl?: string;
  slogan?: string;
}

export interface ITest {
  questionText: string;
  question: IVariant;
  variants: IVariant[];
  answer: string | number;
  testType: TestType;
}

export interface ITestWithCategory extends ITest {
  category: Category;
}

export interface ITestFromDB extends ITest {
  _id: Types.ObjectId;
  category: Category;
}

export interface TestDTO extends Omit<ITestFromDB, "answer" | "_id"> {
  id: string;
}
