import PropTypes from "prop-types";

export default function LoseModal({ isGameLost, setIsGameLost, resetCards }) {
  return (
    <div className={`modal-overlay ${isGameLost ? "active" : ""}`}>
      <div className="modal-content">
        <h3 className="modal-header">You lost! Better luck next time.</h3>
        <button
          className="play-again"
          type="button"
          onClick={() => {
            setIsGameLost(false);
            resetCards();
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

LoseModal.propTypes = {
  isGameLost: PropTypes.bool.isRequired,
  setIsGameLost: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
};
