import React from "react";
import Game from "./components/Game";
import "./styles/css/cards.css";
import "./styles/css/app.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="header-text">puyo puyo tetramemo</h1>
        <Game />
      </header>
    </div>
  );
}

export default App;
