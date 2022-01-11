import React from "react";
import App from "./App";
import getCharacterList from "./getCharacterList";
import { render, waitFor } from "@testing-library/react";
import CharacterList from "./character-list";

jest.mock("./getCharacterList");
jest.mock("./character-list/CharacterList");

describe("App", () => {
  beforeEach(() => {
    getCharacterList.mockResolvedValue(["character1", "character2"]);
    CharacterList.mockReturnValue(<div>Character List</div>);
  });

  it("calls getCharacterList on mount", async () => {
    render(<App />);

    await waitFor(() => {
      expect(getCharacterList).toHaveBeenCalledTimes(1);
    });
  });

  it("renders character list with result from api call", async () => {
    render(<App />);

    // CharacterList is rendered empty initially
    expect(CharacterList.mock.calls[0][0]).toEqual({
      characters: [],
    });

    await waitFor(() => {
      expect(getCharacterList).toHaveBeenCalledTimes(1);
    });

    // Second render should include characters from api call
    expect(CharacterList.mock.calls[1][0]).toEqual({
      characters: ["character1", "character2"],
    });
  });
});
