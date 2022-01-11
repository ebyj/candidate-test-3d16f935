import { renderHook } from "@testing-library/react-hooks";
import useCharacterSorterFilter from "./useCharacterSorterFilter";

describe("useCharacterSorterFilter", () => {
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
    {
      name: "Legolas",
      category: "elf",
      description:
        "Son of Thranduil, king of the Mirkwood elves. He is a great archer with keen eyesight. A member of the Fellowship. Close friend of Gimli the dwarf and companion of Aragorn.",
      significanceIndex: 6,
      avatar: "legolas.jpg",
    },
    {
      name: "Aragorn",
      category: "human",
      description:
        "The heir of Isildur and the rightful king of Gondor, a mighty warrior and healer. He was raised by the elves of Rivendell and now lives in exile as leader of the Dúnedain, the Rangers of the North. The time has now come for him to reclaim the throne. He leads the Fellowship after Gandalf's fall. Other names: Strider, Elessar, Elfstone, Dúnadan.",
      significanceIndex: 5,
      avatar: "aragorn.jpg",
    },
    {
      name: "Gimli",
      category: "dwarf",
      description:
        "Son of Glóin, a dwarf of the Lonely Mountain. A member of the Fellowship. Close friend of Legolas the elf and companion of Aragorn. He falls in love with Galadriel.",
      significanceIndex: 7,
      avatar: "gimli.jpg",
    },
    {
      name: "Samwise Gamgee",
      category: "hobbit",
      description:
        "Frodo's gardener at home, and his servant and friend on the quest. Sam is very fond of stories about dragons and elves. A member of the Fellowship, he stays with Frodo after it is broken.",
      significanceIndex: 2,
      avatar: "samwise_gamgee.jpg",
    },
  ];

  describe("filtering", () => {
    it("returns same list if no filter is set", () => {
      const sortedList = characters
        .slice()
        .sort((a, b) => a.significanceIndex - b.significanceIndex);

      const { result } = renderHook(() =>
        useCharacterSorterFilter(sortedList, "", "significanceIndex")
      );

      expect(result.current).toEqual(sortedList);
    });

    it("filters characters by category if it is provided", () => {
      const { result } = renderHook(() =>
        useCharacterSorterFilter(characters, "hobbit", "significanceIndex")
      );

      expect(result.current).toEqual([characters[0], characters[5]]);
    });

    it("returns an empty array if the category matches nothing", () => {
      const { result } = renderHook(() =>
        useCharacterSorterFilter(characters, "goblin", "significanceIndex")
      );

      expect(result.current).toEqual([]);
    });
  });

  describe("sorting", () => {
    it("returns list in significance order", () => {
      const { result } = renderHook(() =>
        useCharacterSorterFilter(characters, "", "significanceIndex")
      );

      expect(result.current).toEqual([
        characters[0],
        characters[1],
        characters[5],
        characters[3],
        characters[2],
        characters[4],
      ]);
    });

    it("returns list in alphabetical order", () => {
      const { result } = renderHook(() =>
        useCharacterSorterFilter(characters, "", "alphabetical")
      );

      expect(result.current).toEqual([
        characters[3],
        characters[0],
        characters[1],
        characters[4],
        characters[2],
        characters[5],
      ]);
    });
  });

  describe("filtering and sorting", () => {
    const extraCharacter = {
      name: "Adaldrida Brandybuck",
      category: "hobbit",
      significanceIndex: 50,
    };

    const extraCharacters = [...characters, extraCharacter];

    it("can filter and sort the list", () => {
      const { result } = renderHook(() =>
        useCharacterSorterFilter(extraCharacters, "hobbit", "alphabetical")
      );

      expect(result.current).toEqual([
        extraCharacter,
        characters[0],
        characters[5],
      ]);
    });

    it("handles one filtered result", () => {
      const { result } = renderHook(() =>
        useCharacterSorterFilter(extraCharacters, "elf", "alphabetical")
      );

      expect(result.current).toEqual([characters[2]]);
    });

    it("handles zero filtered results", () => {
      const { result } = renderHook(() =>
        useCharacterSorterFilter(extraCharacters, "goblin", "alphabetical")
      );

      expect(result.current).toEqual([]);
    });
  });
});
