import PropTypes from "prop-types";

export default function WinModal({
  isGameWon,
  setIsGameWon,
  resetCards,
  setCurrentScore,
}) {
  return (
    <div className={`modal-overlay ${isGameWon ? "active" : ""}`}>
      <div className="modal-content">
        <h3 className="modal-header">Congratulations, you won!</h3>
        <button
          className="play-again"
          type="button"
          onClick={() => {
            setIsGameWon(false);
            resetCards();
            setCurrentScore(0);
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

WinModal.propTypes = {
  isGameWon: PropTypes.bool.isRequired,
  setIsGameWon: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  setCurrentScore: PropTypes.func.isRequired,
};
