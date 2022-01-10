import React from "react";
import PropTypes from "prop-types";
import generateCharacterKey from "./generateKey";

const CharacterPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  significanceIndex: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
});

const CharacterListItem = ({ character }) => (
  <div>
    <div>
      <img
        src={`characters/${character.avatar}`}
        alt={character.name}
        loading={"lazy"}
      />
    </div>
    <div>
      <h3 className="character-list-item-name">{character.name}</h3>
      <p className="character-list-item-description">{character.description}</p>
    </div>
  </div>
);

CharacterListItem.propTypes = { character: CharacterPropType };

const CharacterList = ({ characters }) => {
  return (
    <div>
      {characters.map((character, i) => (
        <CharacterListItem
          key={generateCharacterKey(i, character.name)}
          character={character}
        />
      ))}
    </div>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(CharacterPropType).isRequired,
};

export default CharacterList;
