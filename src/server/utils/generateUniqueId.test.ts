import { generateUniqueId } from "./generateUniqueId";

describe("test createDateFromFormat function", () => {
  // our api has specific format of YYYY/DD/MM
  it("should should be equal ", () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    expect(id1).not.toEqual(id2);
  });
});
