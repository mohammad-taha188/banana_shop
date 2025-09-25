"use client";

import { supabase } from "@/app/supabase";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GetID from "./GetID";

function GetCard() {
  const [data, setData] = useState();
  const [cards, setCards] = useState();
  const [total, setTotal] = useState(0);

  const navigate = useRouter();

  useEffect(() => {
    async function FetchData() {
      let id = await GetID();

      let { data: productData, error } = await supabase
        .from("products")
        .select("*");

      let { data, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("userId", id?.userId);

      setCards(data[0]?.card);

      setData(productData);

      if (error) {
        navigate.push("/error");
      }
    }
    FetchData();
  }, []);

  if (cards) {
    let productsFilter = data.filter((product) => {
      return cards.includes(product.id);
    });

    const totalPrice = productsFilter.reduce(
      (acc, product) => acc + (product.discount || product.price),
      0
    );

    return (
      <div className="flex flex-col items-center mt-2">
        <span className="text-gray-800 text-[16px] lg:text-[24px] font-bold md:text-[22px] sm:text-[20px]">
          your card
        </span>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full">
          {productsFilter.map((product) => {
            return (
              <Link
                className="border border-yellow-300 flex flex-col items-center px-4 py-2 gap-3 m-8 rounded-sm shadow shadow-amber-200"
                key={product.id}
                href={`product/${product.productsId}`}
              >
                <Image
                  src={product.imageURL[0]}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="rounded-sm"
                ></Image>
                <h4>{product.title}</h4>
                {product.discount ? (
                  <div className="text-center">
                    <del>{product.price}$</del>
                    <p>🍌{product.discount}$🍌</p>
                  </div>
                ) : (
                  <p>🍌{product.price}$🍌</p>
                )}
              </Link>
            );
          })}
        </div>
        <div className="w-full h-px bg-black"></div>
        <h2 className="text-center">total : {totalPrice.toFixed(2)}$</h2>
      </div>
    );
  }
  return <div className=""></div>;
}
export default GetCard;
