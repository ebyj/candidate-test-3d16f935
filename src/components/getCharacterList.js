const getCharacterList = () =>
  fetch("characters.json")
    .then((res) => res.json())
    .catch(console.error);

export default getCharacterList;
