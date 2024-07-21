import { ITestFromDB, TestDTO } from "../../types/test";

export const toTestDTO = (test: ITestFromDB): TestDTO => ({
  question: test.question,
  questionText: test.questionText,
  testType: test.testType,
  variants: test.variants,
  id: test._id.toString(),
  category: test.category,
});
