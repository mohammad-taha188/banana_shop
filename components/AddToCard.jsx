"use client";

import { useEffect, useState } from "react";
import GetID from "./GetID";
import { useRouter } from "next/navigation";

function AddToCard({ id }) {
  const [cards, setCards] = useState([]);
  const [isLogin, setIsLogin] = useState();

  const navigate = useRouter();

  useEffect(() => {
    async function isLoginF() {
      let token = await GetID();

      if (token?.userId) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
    isLoginF();
  });

  // load saved cards on mount

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards") || "[]");
    setCards(savedCards);
  }, []);

  const isInCard = cards.includes(id); // boolean reactive

  const addToCard = () => {
    if (isLogin) {
      const newCards = [...cards, id];
      setCards(newCards); // update state → triggers re-render
      localStorage.setItem("cards", JSON.stringify(newCards));
    } else {
      navigate.push("/account");
    }
  };

  const removeFromCard = () => {
    if (isLogin) {
      const newCards = cards.filter((c) => c !== id);
      setCards(newCards); // update state → triggers re-render
      localStorage.setItem("cards", JSON.stringify(newCards));
    } else {
      navigate.push("/account");
    }
  };
  if (isLogin) {
    return (
      <button
        className={isInCard ? "btn btn-red" : "btn btn-green"}
        onClick={isInCard ? removeFromCard : addToCard}
      >
        {isInCard ? "Remove from card" : "Add to card"}
      </button>
    );
  } else {
    return (
      <button
        className={"btn btn-yellow"}
        onClick={() => {
          navigate.push("/account");
        }}
      >
        first login
      </button>
    );
  }
}

export default AddToCard;
