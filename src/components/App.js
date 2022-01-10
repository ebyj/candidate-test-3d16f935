import React from "react";
import logo from "../logo.svg";
import styles from "./App.module.scss";

// Character list is available in the public directory

export default function App() {
  return (
    <div className={styles.App}>
      <header className={styles["App-header"]}>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <h1 className="App-title">Lord of the Rings Character Index</h1>
      </header>

      <section className="App-content">
        {/* Lovely character list goes here */}
      </section>
    </div>
  );
}
