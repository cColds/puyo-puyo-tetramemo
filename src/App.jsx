import React from "react";
import Game from "./components/Game";
import "./styles/css/cards.css";
import "./styles/css/app.css";
import "./styles/css/modal.css";
import "./styles/css/score.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="header-text">
          <span className="puyo-puyo">puyo puyo </span>
          <span className="tetramemo">tetramemo</span>
        </h1>
        <Game />
      </header>
    </div>
  );
}

export default App;
