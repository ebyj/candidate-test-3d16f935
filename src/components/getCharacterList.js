const getCharacterList = () =>
  fetch("http://localhost:3000/characters.json")
    .then((res) => res.json())
    .catch(console.error);

export default getCharacterList;
