"use client";

import { useEffect, useState } from "react";

function AddToCard({ id }) {
  const [cards, setCards] = useState([]);

  // load saved cards on mount
  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards") || "[]");
    setCards(savedCards);
  }, []);

  const isInCard = cards.includes(id); // boolean reactive

  const addToCard = () => {
    const newCards = [...cards, id];
    setCards(newCards); // update state → triggers re-render
    localStorage.setItem("cards", JSON.stringify(newCards));
  };

  const removeFromCard = () => {
    const newCards = cards.filter((c) => c !== id);
    setCards(newCards); // update state → triggers re-render
    localStorage.setItem("cards", JSON.stringify(newCards));
  };

  return (
    <button
      className={isInCard ? "btn btn-red" : "btn btn-green"}
      onClick={isInCard ? removeFromCard : addToCard}
    >
      {isInCard ? "Remove from card" : "Add to card"}
    </button>
  );
}

export default AddToCard;
