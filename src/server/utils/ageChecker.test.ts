import { ageChecker } from "./ageChecker";

describe("test ageChecker function", () => {
  it("should return true for age less than 10 (2020/15/11)", () => {
    expect(ageChecker("2020/15/11")).toBeTruthy();
  });
  it("should return false for age more than 10 (2010/15/11)", () => {
    expect(ageChecker("2010/15/11")).toBeFalsy();
  });
});
