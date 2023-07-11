import {
  createDateFromFormat,
  formatDateWithSeconds,
  getAge,
  isValidDate,
} from "./dateStrings";

describe("test createDateFromFormat function", () => {
  // our api has specific format of YYYY/DD/MM
  it("should should be equal ", () => {
    expect(createDateFromFormat("2020/23/05")).toStrictEqual(
      new Date("2020/05/23")
    );
  });
  it("should should not be equal ", () => {
    expect(createDateFromFormat("2020/05/23")).not.toStrictEqual(
      new Date("2020/05/23")
    );
  });
});

describe("test getAge function", () => {
  // our api has specific format of YYYY/DD/MM
  it("should should be 10 ", () => {
    expect(getAge(createDateFromFormat("2013/23/05"))).toBe(10);
  });
  it("should should be invalid", () => {
    expect(getAge(createDateFromFormat("2010/05/23"))).not.toBe(Number);
  });
});

describe("test isValidDate function", () => {
  // our api has specific format of YYYY/DD/MM
  it("should should be 10 ", () => {
    expect(isValidDate(createDateFromFormat("2013/23/05"))).toBe(true);
  });
  it("should should be invalid", () => {
    expect(isValidDate(createDateFromFormat("2010/05/23"))).toBe(false);
  });
});

describe("test formatDateWithSeconds function", () => {
  // our api has specific format of YYYY/DD/MM
  it("should should be equal ", () => {
    expect(formatDateWithSeconds(new Date("2020/05/23"))).toStrictEqual(
      "2020-05-23 00:00:00"
    );
  });
});
