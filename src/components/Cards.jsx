import data from "../data/characters.json";

export default function Cards() {
  const { characters } = data;
  const [{ name, image }] = characters;

  return (
    <ul>
      <li className="card">
        <img src={`/assets/characters/${image}`} alt="Character" />
        <div className="character-name">{name}</div>
      </li>
    </ul>
  );
}
