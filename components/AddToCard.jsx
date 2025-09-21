"use client";

import { useEffect, useState } from "react";
import GetID from "./GetID";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabase";

function AddToCard({ id }) {
  const [cards, setCards] = useState([]);
  const [isLogin, setIsLogin] = useState();
  const [userId, setUserId] = useState();
  const [inCard, setInCard] = useState();
  const [added, setAdded] = useState(false);

  const navigate = useRouter();

  useEffect(() => {
    async function isLoginF() {
      let token = await GetID();

      if (token?.userId) {
        setIsLogin(true);
        setUserId(token?.userId);
      } else {
        setIsLogin(false);
        setUserId(null);
      }
    }
    isLoginF();
  }, []);

  // load saved cards on mount

  useEffect(() => {
    if (!userId) return;
    async function fetchData() {
      let { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("userId", userId);

      if (error) {
        console.log(error);
      } else {
        const savedCards = await data[0]?.card;

        setCards(savedCards);
      }
    }
    fetchData();
  }, [userId]);

  useEffect(() => {
    setInCard(cards?.includes(id));
  }, [cards, id]);

  async function addToCard() {
    if (isLogin) {
      const newCards = cards && [...cards, id];
      setCards(newCards); // update state → triggers re-render

      let { data, error } = await supabase
        .from("users")
        .update({ card: newCards })
        .eq("userId", userId);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setAdded(true);
      }
    } else {
      navigate.push("/account");
    }
  }

  async function removeFromCard() {
    if (isLogin) {
      const newCards = cards.filter((c) => c !== id);
      setCards(newCards); // update state → triggers re-render

      let { data, error } = await supabase
        .from("users")
        .update({ card: newCards })
        .eq("userId", userId);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setAdded(true);
      }

      // localStorage.setItem("cards", JSON.stringify(newCards));
    } else {
      navigate.push("/account");
    }
  }
  if (isLogin) {
    return (
      <button
        className={inCard || added ? "btn btn-red" : "btn btn-green"}
        onClick={inCard || added ? removeFromCard : addToCard}
      >
        {inCard || added ? "Remove from card" : "Add to card"}
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
