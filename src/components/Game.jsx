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
  const bestScoreRef = useRef(null);
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
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [currentScore]);

  useEffect(() => {
    let timer;

    if (currentScore > bestScore || isGameWon) {
      const bestScoreNode = bestScoreRef.current;
      bestScoreNode.classList.add("animate-scale-score");

      timer = setTimeout(() => {
        bestScoreNode.classList.remove("animate-scale-score");
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [bestScore]);

  return (
    <div>
      <div className="score-container">
        <div className="current-score" ref={scoreRef}>
          Current score: {currentScore}
        </div>
        <div className="best-score" ref={bestScoreRef}>
          Best score: {bestScore}
        </div>
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
