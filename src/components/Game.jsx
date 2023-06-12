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

  const setCardsClicked = useCallback(
    (targetCards, cardToUpdate) => {
      const updatedCards = targetCards.map((card) => {
        if (card.id === cardToUpdate.id) {
          return { ...cardToUpdate, hasClicked: true };
        }

        return card;
      });

      setCards(updatedCards);
    },
    [setCards]
  );

  return (
    <div>
      <Cards
        cards={cards}
        cardsInUse={cardsInUse}
        setCardsClicked={setCardsClicked}
      />
    </div>
  );
}

// TODO:
/* 
- End game if clicked the same card
- Add more cards to test if cards generate and all cards clicked
- End Game if all cards including previous cards have been clicked
- Add current score counter
- Add best score counter

*/
