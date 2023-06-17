import PropTypes from "prop-types";
import { forwardRef } from "react";
import { getShuffledCards } from "../utils";

const Cards = forwardRef(
  (
    {
      cards,
      activeCards,
      setCards,
      currentScore,
      generateNewCards,
      setIsGameLost,
      setIsGameWon,
      setCurrentScore,
      bestScore,
      setBestScore,
    },
    ref
  ) => {
    const getCardsClicked = (targetCards, cardToUpdate) => {
      const updatedCards = targetCards.map((card) => {
        if (card.id !== cardToUpdate.id) return card;
        return { ...cardToUpdate, hasClicked: true };
      });

      return updatedCards;
    };

    const getNewActiveCards = (targetCards) => {
      const updatedCards = targetCards.map((card) => {
        if (card.isActive) {
          return { ...card, isActive: false };
        }

        return card;
      });

      return updatedCards;
    };

    const areAllActiveCardsClicked = (targetCards) => {
      const activeCardsFiltered = targetCards.filter((card) => card.isActive);
      return activeCardsFiltered.every((card) => card.hasClicked);
    };

    const areAllCardsClicked = (targetCards) =>
      targetCards.every((card) => card.hasClicked);

    const handleGameLost = () => {
      setIsGameLost(true);
      setCurrentScore(0);
      if (currentScore > bestScore) setBestScore(currentScore);
    };

    const handleGameWon = (updatedCurrentScore) => {
      setIsGameWon(true);
      if (updatedCurrentScore > bestScore) setBestScore(updatedCurrentScore);
    };

    const handleCardClick = (card) => {
      if (card.hasClicked) {
        handleGameLost();
        return;
      }

      const updatedCards = getCardsClicked(getShuffledCards(cards), card);

      if (areAllActiveCardsClicked(updatedCards)) {
        const newActiveCards = getNewActiveCards(updatedCards);
        setCards(generateNewCards(newActiveCards, activeCards.length));
      } else {
        setCards(updatedCards);
      }
      const updatedCurrentScore = currentScore + 1;
      setCurrentScore(updatedCurrentScore);

      if (areAllCardsClicked(updatedCards)) {
        handleGameWon(updatedCurrentScore);
      }
    };

    return (
      <ul ref={ref}>
        {activeCards.map((card) => (
          <li key={card.id} className="card">
            <button
              type="button"
              className="card-button"
              onClick={() => handleCardClick(card)}
            >
              <img
                className="character-image"
                src={`/assets/characters/${card.image}`}
                alt={card.name}
                draggable="false"
              />
              <div className="character-name">{card.name}</div>
            </button>
          </li>
        ))}
      </ul>
    );
  }
);

Cards.propTypes = {
  activeCards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      hasClicked: PropTypes.bool,
      isActive: PropTypes.bool,
      id: PropTypes.string,
    })
  ).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      hasClicked: PropTypes.bool,
      isActive: PropTypes.bool,
      id: PropTypes.string,
    })
  ).isRequired,
  setCards: PropTypes.func.isRequired,
  setBestScore: PropTypes.func.isRequired,
  generateNewCards: PropTypes.func.isRequired,
  setIsGameLost: PropTypes.func.isRequired,
  setIsGameWon: PropTypes.func.isRequired,
  currentScore: PropTypes.number.isRequired,
  setCurrentScore: PropTypes.func.isRequired,
  bestScore: PropTypes.number.isRequired,
};

export default Cards;
