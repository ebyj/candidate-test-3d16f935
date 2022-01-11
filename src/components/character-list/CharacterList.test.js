import React from "react";
import useCharacterSorterFilter from "./useCharacterSorterFilter";
import getCharacterCategories from "./getCharacterCategories";
import { act, fireEvent, render, screen } from "@testing-library/react";
import CharacterList from "./CharacterList";

// mock out sorting/filtering hook and character category util
jest.mock("./useCharacterSorterFilter");
jest.mock("./getCharacterCategories");

describe("characterList", () => {
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
      name: "Samwise Gamgee",
      category: "hobbit",
      description:
        "Frodo's gardener at home, and his servant and friend on the quest. Sam is very fond of stories about dragons and elves. A member of the Fellowship, he stays with Frodo after it is broken.",
      significanceIndex: 2,
      avatar: "samwise_gamgee.jpg",
    },
  ];

  beforeEach(() => {
    useCharacterSorterFilter.mockImplementation((characters) => characters);
    getCharacterCategories.mockReturnValue(["", "hobbit", "wizard"]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders with no characters", () => {
    render(<CharacterList characters={[]} />);

    const characterListContainer = screen.getByTestId("character-list");

    expect(characterListContainer).not.toBeNull();
    expect(characterListContainer.children).toHaveLength(0);
  });

  it("renders characters", () => {
    render(<CharacterList characters={characters} />);

    const characterListContainer = screen.getByTestId("character-list");

    expect(characterListContainer).not.toBeNull();
    expect(characterListContainer.children).toHaveLength(3);

    // seems reasonable to check a snapshot here to ensure expected info
    // is rendered as expected
    expect(characterListContainer.children[0]).toMatchSnapshot();
  });

  it("displays filter options capitalised and includes 'All' option", () => {
    render(<CharacterList characters={characters} />);

    const dropdown = screen.getByTestId("character-category-select");

    expect(dropdown.options[0].textContent).toEqual("All");
    expect(dropdown.options[1].textContent).toEqual("Hobbit");
    expect(dropdown.options[2].textContent).toEqual("Wizard");
  });

  it("updates filter on dropdown category change", () => {
    render(<CharacterList characters={characters} />);

    expect(useCharacterSorterFilter).toHaveBeenCalledTimes(1);
    expect(useCharacterSorterFilter).toHaveBeenNthCalledWith(
      1,
      characters,
      "",
      "significanceIndex"
    );

    const dropdown = screen.getByTestId("character-category-select");

    act(() => {
      // simulate dropdown change
      fireEvent.change(dropdown, { target: { value: "hobbit" } });
    });

    expect(useCharacterSorterFilter).toHaveBeenCalledTimes(2);
    expect(useCharacterSorterFilter).toHaveBeenNthCalledWith(
      2,
      characters,
      "hobbit",
      "significanceIndex"
    );
  });

  it("updates sorter on sort by dropdown change", () => {
    render(<CharacterList characters={characters} />);

    expect(useCharacterSorterFilter).toHaveBeenCalledTimes(1);
    expect(useCharacterSorterFilter).toHaveBeenNthCalledWith(
      1,
      characters,
      "",
      "significanceIndex"
    );

    const dropdown = screen.getByTestId("character-order-by");

    act(() => {
      // simulate dropdown change
      fireEvent.change(dropdown, { target: { value: "alphabetical" } });
    });

    expect(useCharacterSorterFilter).toHaveBeenCalledTimes(2);
    expect(useCharacterSorterFilter).toHaveBeenNthCalledWith(
      2,
      characters,
      "",
      "alphabetical"
    );
  });

  it("only calls getCharacterCategories when characters updates", () => {
    const { rerender } = render(<CharacterList characters={characters} />);

    expect(getCharacterCategories).toHaveBeenCalledTimes(1);

    // manual rerender
    rerender(<CharacterList characters={characters} />);

    expect(getCharacterCategories).toHaveBeenCalledTimes(1);

    // trigger some kind of rerender by updating sort state
    const dropdown = screen.getByTestId("character-order-by");

    act(() => {
      fireEvent.change(dropdown, { target: { value: "alphabetical" } });
    });

    expect(getCharacterCategories).toHaveBeenCalledTimes(1);

    // new array ref should cause getCharacterCategories to be called again
    rerender(<CharacterList characters={[...characters]} />);
    expect(getCharacterCategories).toHaveBeenCalledTimes(2);
  });
});
