// Unsure if significanceIndex is always unique
// Make composite key to ensure uniqueness
const generateCharacterKey = (index, name) => {
  return `${index}-${name.replace(/\s/g, "-")}`;
};

export default generateCharacterKey;
