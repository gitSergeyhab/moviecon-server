import { Category, TestType } from "../types/test";

export const TEST_CATEGORIES: Category[] = ["rus", "ussr", "world"];

export const TEST_CATEGORIES_WITH_ALL: Category[] = ["all", ...TEST_CATEGORIES];

export const TEST_TYPES: TestType[] = [
  "FrameByMovie",
  "MovieByBudget",
  "MovieByFrame",
  "MovieByPerson",
  "MovieBySlogan",
  "MovieByYear",
  "PersonByMovie",
  "PersonByPhoto",
  "PhotoByPerson",
  "SloganByMovie",
  "YearByMovie",
];
