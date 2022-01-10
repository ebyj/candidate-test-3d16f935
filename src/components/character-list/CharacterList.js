import React from "react";
import PropTypes from "prop-types";
import generateCharacterKey from "./generateKey";
import styles from "./CharacterList.module.scss";
import { capitalize } from "lodash";

const CharacterPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  significanceIndex: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
});

const CharacterListItem = ({ character }) => (
  <div className={styles.characterListItem}>
    <img
      className={styles.avatar}
      src={`characters/${character.avatar}`}
      alt={character.name}
    />
    <div className={styles.characterInfo}>
      <div className={styles.characterName}>{character.name}</div>
      <div className={styles.characterCategory}>
        {capitalize(character.category)}
      </div>
      <div className={styles.description}>{character.description}</div>
    </div>
  </div>
);

CharacterListItem.propTypes = { character: CharacterPropType };

const CharacterList = ({ characters }) => {
  return (
    <div className={styles.characterList}>
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
