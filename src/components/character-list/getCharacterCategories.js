// Ideally would have a store and selectors to get this kind of information
const getCharacterCategories = (characters) =>
  characters.reduce(
    (acc, character) => {
      if (!acc.includes(character.category)) {
        acc.push(character.category);
      }
      return acc;
    },
    [""]
  );

export default getCharacterCategories;
