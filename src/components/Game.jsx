import { useState, useCallback } from "react";
import Cards from "./Cards";
import cardsData from "../data/cards";

export default function Game() {
  function getShuffledCards(targetCards) {
    const copy = [...targetCards];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  const generateNewCards = useCallback((targetCards, cardsInUse = 0) => {
    const shuffledCards = getShuffledCards(targetCards);
    const cardsToGenerate = cardsInUse + 2;
    let i = 0;
    const newCards = shuffledCards.map((card) => {
      if (!card.hasClicked && cardsToGenerate > i) {
        i += 1;
        return { ...card, isCardInUse: true };
      }

      return card;
    });
    return newCards;
  });

  const [cards, setCards] = useState(generateNewCards(cardsData));
  const cardsInUse = cards.filter((card) => card.isCardInUse);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const resetCards = () => {
    setCards(generateNewCards(cardsData));
  };

  const isBestScore = () => currentScore > bestScore;

  const incrementCurrentScore = () => setCurrentScore(currentScore + 1);

  const updateBestScore = () => setBestScore(currentScore);

  const resetGame = () => {
    resetCards();
    setCurrentScore(0);
  };

  return (
    <div>
      <div className="score-container">
        <div className="current-score">Current score: {currentScore}</div>
        <div className="best-score">Best score: {bestScore}</div>
      </div>

      <Cards
        cards={cards}
        cardsInUse={cardsInUse}
        setCards={setCards}
        incrementCurrentScore={incrementCurrentScore}
        resetGame={resetGame}
        updateBestScore={updateBestScore}
        isBestScore={isBestScore}
        generateNewCards={generateNewCards}
      />
    </div>
  );
}

// TODO:
/* 

- Add Nunito font for base and Modulus font for title
- Center app's children
- Remove card button's border
- Add gap between cards
- Style title's text
- End Game if all cards including previous cards have been clicked
- Refactor code: 
- isCardInUse prop to isInUse for conciseness (or maybe to active)
- Convert the rest of the functions to arrow functions
- Refactor targetCards params

*/

// Completed TODOS (sorted by oldest):
/* 
- End game if clicked the same card
- Add current score counter
- Add best score counter
- Generate more cards after clicking on all cards (maybe unique ones only)
- Randomize cards on click
- Add more cards to cards.js
*/
