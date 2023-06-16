import PropTypes from "prop-types";

export default function Cards({
  cards,
  activeCards,
  setCards,
  incrementCurrentScore,
  resetGame,
  updateBestScore,
  isBestScore,
  generateNewCards,
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

  const getShuffledCards = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleGameLost = () => {
    alert("You lost!");
    resetGame();
    if (isBestScore()) updateBestScore();
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
  resetGame: PropTypes.func.isRequired,
  updateBestScore: PropTypes.func.isRequired,
  isBestScore: PropTypes.func.isRequired,
  generateNewCards: PropTypes.func.isRequired,
};
