import PropTypes from "prop-types";

export default function Cards({
  cards,
  cardsInUse,
  setCards,
  incrementCurrentScore,
  resetGame,
  updateBestScore,
  isBestScore,
  generateNewCards,
}) {
  const setCardsClicked = (targetCards, cardToUpdate) => {
    const updatedCards = targetCards.map((card) => {
      if (card.id === cardToUpdate.id) {
        return { ...cardToUpdate, hasClicked: true };
      }
      return card;
    });

    return updatedCards;
  };

  const setAllCardsInUse = (targetCards) => {
    const updatedCards = targetCards.map((card) => {
      if (card.isCardInUse) {
        return { ...card, isCardInUse: false };
      }

      return card;
    });

    return updatedCards;
  };

  const areAllCardsInUseClicked = (targetCards) => {
    const cardsInUseFiltered = targetCards.filter((card) => card.isCardInUse);
    return cardsInUseFiltered.every((card) => card.hasClicked);
  };

  function getShuffledCards(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  return (
    <ul>
      {cardsInUse.map((card) => (
        <li key={card.id} className="card">
          <button
            type="button"
            className="card-button"
            onClick={() => {
              if (!card.hasClicked) {
                const updatedCards = setCardsClicked(
                  getShuffledCards(cards),
                  card
                );
                setCards(() => updatedCards);
                incrementCurrentScore();
                console.log(updatedCards);
                if (areAllCardsInUseClicked(updatedCards)) {
                  console.log(true);
                  setCards(generateNewCards(setAllCardsInUse(updatedCards)));
                }

                return;
              }

              if (card.hasClicked) {
                alert("You lost!");
                resetGame();
              }

              if (isBestScore()) {
                updateBestScore();
              }
            }}
          >
            <img
              className="character-image"
              src={`/assets/characters/${card.image}`}
              alt="Character"
            />
            <div className="character-name">{card.name}</div>
          </button>
        </li>
      ))}
    </ul>
  );
}

Cards.propTypes = {
  cardsInUse: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      hasClicked: PropTypes.bool,
      isCardInUse: PropTypes.bool,
      id: PropTypes.string,
    })
  ).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      hasClicked: PropTypes.bool,
      isCardInUse: PropTypes.bool,
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
