import { useEffect, useState } from "react";

const useCharacterSorterFilter = (characters, categoryFilter, order) => {
  const [updatedCharacters, setUpdatedCharacters] = useState(characters);

  useEffect(() => {
    const charSlice = characters.slice();
    const updatedCharacters = categoryFilter
      ? charSlice.filter((character) => character.category === categoryFilter)
      : charSlice;

    if (order === "alphabetical") {
      updatedCharacters.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      updatedCharacters.sort(
        (a, b) => a.significanceIndex - b.significanceIndex
      );
    }

    setUpdatedCharacters(updatedCharacters);
  }, [characters, categoryFilter, order]);

  return updatedCharacters;
};

export default useCharacterSorterFilter;
