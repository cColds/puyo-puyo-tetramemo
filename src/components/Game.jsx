import { useState } from "react";
import Cards from "./Cards";
import LoseModal from "./LoseModal";
import WinModal from "./WinModal";
import { generateNewCards } from "../utils";
import cardsData from "../data/cards";

export default function Game() {
  const [cards, setCards] = useState(generateNewCards(cardsData));
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const activeCards = cards.filter((card) => card.isActive);

  const resetCards = () => {
    setCards(generateNewCards(cardsData));
  };

  return (
    <div>
      <div className="score-container">
        <div className="current-score">Current score: {currentScore}</div>
        <div className="best-score">Best score: {bestScore}</div>
      </div>

      <Cards
        cards={cards}
        activeCards={activeCards}
        currentScore={currentScore}
        bestScore={bestScore}
        setCards={setCards}
        setBestScore={setBestScore}
        generateNewCards={generateNewCards}
        setIsGameLost={setIsGameLost}
        setIsGameWon={setIsGameWon}
        setCurrentScore={setCurrentScore}
      />

      <LoseModal
        setIsGameLost={setIsGameLost}
        isGameLost={isGameLost}
        resetCards={resetCards}
      />
      <WinModal
        setIsGameWon={setIsGameWon}
        isGameWon={isGameWon}
        resetCards={resetCards}
        setCurrentScore={setCurrentScore}
      />
    </div>
  );
}

// TODO:
/* 
- Clean code
- Add stats when player wins or loses the game
- Animate current score
- Animate best score
- Figure out why the cards sometimes don't shuffle (at least the first level)

*/

// Completed TODOS (sorted by oldest):
/* 
- End game if clicked the same card
- Add current score counter
- Add best score counter
- Generate more cards after clicking on all cards (maybe unique ones only)
- Randomize cards on click
- Add more cards to cards.js
- Add Nunito font for base and Modulus font for title
- Center app's children
- Remove card button's border
- Add gap between cards
- Style title's text
- End Game if all cards including previous cards have been clicked
- isCardInUse prop to isInUse for conciseness (or maybe to active)
- Convert the rest of the functions to arrow functions
- Add modal for winning and losing game
*/
