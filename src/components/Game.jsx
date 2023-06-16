import { useState } from "react";
import Cards from "./Cards";
import LoseModal from "./LoseModal";
import { generateNewCards } from "../utils";
import cardsData from "../data/cards";

export default function Game() {
  const [cards, setCards] = useState(generateNewCards(cardsData));
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameLost, setIsGameLost] = useState(false);
  const activeCards = cards.filter((card) => card.isActive);

  const resetCards = () => {
    setCards(generateNewCards(cardsData));
  };

  const isBestScore = () => currentScore > bestScore;

  const incrementCurrentScore = () => setCurrentScore(currentScore + 1);

  const updateBestScore = () => setBestScore(currentScore);

  return (
    <div>
      <div className="score-container">
        <div className="current-score">Current score: {currentScore}</div>
        <div className="best-score">Best score: {bestScore}</div>
      </div>

      <Cards
        cards={cards}
        activeCards={activeCards}
        setCards={setCards}
        incrementCurrentScore={incrementCurrentScore}
        updateBestScore={updateBestScore}
        isBestScore={isBestScore}
        generateNewCards={generateNewCards}
        setIsGameLost={setIsGameLost}
        setCurrentScore={setCurrentScore}
      />

      <LoseModal
        setIsGameLost={setIsGameLost}
        isGameLost={isGameLost}
        resetCards={resetCards}
      />
    </div>
  );
}

// TODO:
/* 
- Add modal for winning and losing game

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
*/
