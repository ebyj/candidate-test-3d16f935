import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import generateCharacterKey from "./generateKey";
import styles from "./CharacterList.module.scss";
import { capitalize } from "lodash";
import useCharacterSorterFilter from "./useCharacterSorterFilter";
import getCharacterCategories from "./getCharacterCategories";

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
  const [categoryFilter, setCategoryFilter] = useState("");
  const [order, setOrder] = useState("significanceIndex");

  const sortedFilteredCharacters = useCharacterSorterFilter(
    characters,
    categoryFilter,
    order
  );

  const onCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const onOrderAlphabeticallyChange = (event) => {
    setOrder(event.target.value);
  };

  const categories = useMemo(
    () => getCharacterCategories(characters),
    [characters]
  );

  return (
    <div>
      <div className={styles.controls}>
        <div>
          <label htmlFor="character-category-select">Category</label>
          <select
            onChange={onCategoryFilterChange}
            id="character-category-select"
            value={categoryFilter}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {capitalize(category || "All")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="character-order-by">Order by</label>
          <select
            onChange={onOrderAlphabeticallyChange}
            id="character-order-by"
            value={order}
          >
            <option value="significanceIndex">Significance</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      <div className={styles.characterList}>
        {sortedFilteredCharacters.map((character, i) => (
          <CharacterListItem
            key={generateCharacterKey(i, character.name)}
            character={character}
          />
        ))}
      </div>
    </div>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(CharacterPropType).isRequired,
};

export default CharacterList;
