const getShuffledCards = (targetCards) => {
  const copy = [...targetCards];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const generateNewCards = (targetCards, activeCards = 2) => {
  const shuffledCards = getShuffledCards(targetCards);
  const cardsToGenerate = activeCards + 2;
  let generatedCards = 0;

  const newCards = shuffledCards.map((card) => {
    if (!card.hasClicked && cardsToGenerate > generatedCards) {
      generatedCards += 1;
      return { ...card, isActive: true };
    }

    return card;
  });
  return newCards;
};

export { getShuffledCards, generateNewCards };
