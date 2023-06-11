import { useState } from "react";
import Cards from "./Cards";
import data from "../data/characters.json";

export default function Game() {
  function getShuffledCards(targetCards) {
    const copy = [...targetCards];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  const { characters } = data;
  const [cards, setCards] = useState(getShuffledCards(characters));

  return (
    <div>
      <Cards />
    </div>
  );
}
