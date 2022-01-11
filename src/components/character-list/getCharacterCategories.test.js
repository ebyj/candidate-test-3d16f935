import getCharacterCategories from "./getCharacterCategories";

describe("getCharacterCategories", () => {
  const characters = [
    {
      name: "Frodo Baggins",
      category: "hobbit",
      description:
        "A young well-to-do hobbit. When he discovers that the magic ring left to him by his eccentric Uncle Bilbo is the One Ring, he reluctantly takes on the quest to destroy it. Often referred to as the Ringbearer.",
      significanceIndex: 0,
      avatar: "frodo_baggins.jpg",
    },
    {
      name: "Gandalf the Grey",
      category: "wizard",
      description:
        "A wizard best known among hobbits for his fireworks and mischievous sense of humor, but actually one of the greatest powers of Middle-earth. He reveals the truth about the Ring to Frodo and acts as a guide and counselor.",
      significanceIndex: 1,
      avatar: "gandalf_the_grey.jpg",
    },
  ];

  it("adds an empty category", () => {
    expect(getCharacterCategories([])).toEqual([""]);
  });

  it("returns categories from characters", () => {
    expect(getCharacterCategories(characters)).toEqual([
      "",
      "hobbit",
      "wizard",
    ]);
  });

  it("does not add duplicate categories", () => {
    expect(
      getCharacterCategories([...characters, characters[0], characters[1]])
    ).toEqual(["", "hobbit", "wizard"]);
  });
});
