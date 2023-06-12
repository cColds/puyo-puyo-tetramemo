import { useState } from "react";
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

  function getCardsClickedCount(targetCards) {
    return targetCards.filter((card) => card.hasClicked).length;
  }

  function generateNewCards(targetCards) {
    const shuffledCards = getShuffledCards(targetCards);

    const cardsToGenerate = getCardsClickedCount(targetCards) + 2;

    let i = 0;
    const newCards = shuffledCards.map((card) => {
      if (!card.hasClicked && cardsToGenerate > i) {
        i += 1;
        return { ...card, isCardInUse: true };
      }

      return card;
    });
    return newCards;
  }

  const [cards, setCards] = useState(generateNewCards(cardsData));
  const cardsInUse = cards.filter((card) => card.isCardInUse);
  return (
    <div>
      <Cards cards={cardsInUse} />
    </div>
  );
}

// TODO:
/* 
- Add event listener to cards
- 

*/
