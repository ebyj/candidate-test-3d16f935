import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import styles from "./App.module.scss";
import CharacterList from "./character-list/CharacterList";
import getCharacterList from "./getCharacterList";

export default function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacterList().then(setCharacters);
  }, []);

  return (
    <div className={styles.App}>
      <header className={styles["App-header"]}>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <h1 className="App-title">Lord of the Rings Character Index</h1>
      </header>

      <section className="App-content">
        <CharacterList characters={characters} />
      </section>
    </div>
  );
}
