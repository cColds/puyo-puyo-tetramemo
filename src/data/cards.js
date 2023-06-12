import { v4 as uuidv4 } from "uuid";

const cardsData = [
  {
    name: "Ringo",
    image: "ringo.png",
    hasClicked: false,
    isCardInUse: false,
    id: uuidv4(),
  },
  {
    name: "Arle",
    image: "arle.png",
    hasClicked: false,
    isCardInUse: false,
    id: uuidv4(),
  },
  {
    name: "Amitie",
    image: "amitie.png",
    hasClicked: false,
    isCardInUse: false,
    id: uuidv4(),
  },
  {
    name: "Maguro",
    image: "maguro.png",
    hasClicked: false,
    isCardInUse: false,
    id: uuidv4(),
  },
];

export default cardsData;
