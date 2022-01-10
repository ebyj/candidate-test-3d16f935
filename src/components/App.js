import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import styles from "./App.module.scss";
import CharacterList from "./CharacterList/CharacterList";

export default function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getCharacterList = async () => {
      const response = await fetch("http://localhost:3000/characters.json");
      return await response.json();
    };

    getCharacterList().then((data) => {
      setCharacters(data);
    });
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
