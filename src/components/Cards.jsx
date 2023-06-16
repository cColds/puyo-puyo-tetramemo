import PropTypes from "prop-types";
import { getShuffledCards } from "../utils";

export default function Cards({
  cards,
  activeCards,
  setCards,
  incrementCurrentScore,
  updateBestScore,
  isBestScore,
  generateNewCards,
  setIsGameLost,
  setIsGameWon,
  setCurrentScore,
}) {
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
    if (isBestScore()) updateBestScore();
  };

  const handleGameWon = () => {
    setIsGameWon(true);
    setCurrentScore(0);
    if (isBestScore()) updateBestScore();
  };

  const handleCardClick = (card) => {
    if (card.hasClicked) {
      handleGameLost();
      return;
    }

    const updatedCards = getCardsClicked(getShuffledCards(cards), card);
    if (areAllCardsClicked(updatedCards)) {
      handleGameWon();
      return;
    }

    if (areAllActiveCardsClicked(updatedCards)) {
      const newActiveCards = getNewActiveCards(updatedCards);
      setCards(generateNewCards(newActiveCards, activeCards.length));
    } else {
      setCards(updatedCards);
    }
    incrementCurrentScore();
  };

  return (
    <ul>
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
  incrementCurrentScore: PropTypes.func.isRequired,
  updateBestScore: PropTypes.func.isRequired,
  isBestScore: PropTypes.func.isRequired,
  generateNewCards: PropTypes.func.isRequired,
  setIsGameLost: PropTypes.func.isRequired,
  setIsGameWon: PropTypes.func.isRequired,
  setCurrentScore: PropTypes.func.isRequired,
};
