import generateKey from "./generateKey";

describe("generateKey", () => {
  it("generates a composite key based on index and name", () => {
    expect(generateKey(0, "name")).toBe("0-name");
  });

  it("replaces spaces with dashes", () => {
    expect(generateKey(0, "name with spaces")).toBe("0-name-with-spaces");
  });
});
