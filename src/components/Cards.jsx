import PropTypes from "prop-types";

export default function Cards({
  cards,
  cardsInUse,
  setCardsClicked,
  incrementCurrentScore,
  resetGame,
  updateBestScore,
  isBestScore,
}) {
  return (
    <ul>
      {cardsInUse.map((card) => (
        <li key={card.id} className="card">
          <button
            type="button"
            className="card-button"
            onClick={() => {
              if (!card.hasClicked) {
                setCardsClicked(cards, card);
                incrementCurrentScore();
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
  setCardsClicked: PropTypes.func.isRequired,
  incrementCurrentScore: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  updateBestScore: PropTypes.func.isRequired,
  isBestScore: PropTypes.func.isRequired,
};
