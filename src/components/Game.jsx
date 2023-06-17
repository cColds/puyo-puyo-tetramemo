import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const scoreRef = useRef(null);
  const cardRef = useRef(null);

  const resetCards = () => {
    setCards(generateNewCards(cardsData));
  };

  useEffect(() => {
    let timer;
    if (currentScore !== 0) {
      const scoreNode = scoreRef.current;
      const cardNode = cardRef.current;
      const newCardIds = cards.map((card) => ({ ...card, id: uuidv4() }));

      scoreNode.classList.add("animate-scale-score");
      cardNode.classList.add("hide");
      setCards(newCardIds);
      timer = setTimeout(() => {
        scoreNode.classList.remove("animate-scale-score");
        cardNode.classList.remove("hide");
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [currentScore]);

  return (
    <div>
      <div className="score-container">
        <div className="current-score" ref={scoreRef}>
          Current score: {currentScore}
        </div>
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
        ref={cardRef}
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
- Animate current score
- Animate best score

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
- Increase default cards from 2 to 4
- Animate cards when they respawn

*/
