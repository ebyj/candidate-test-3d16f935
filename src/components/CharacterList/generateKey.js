const generateCharacterKey = (index, name) =>
  `${index}-${name.replace(/\s/g, "-")}`;

export default generateCharacterKey;
