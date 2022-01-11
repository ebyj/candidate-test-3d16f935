export const getCharacterList = () => {
  return fetch("http://localhost:3000/characters")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
