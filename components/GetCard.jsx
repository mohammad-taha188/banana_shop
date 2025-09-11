"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function GetCard() {
  const [data, setData] = useState();
  const [cards, setCards] = useState();

  useEffect(() => {
    async function FetchData() {
      const res = await fetch("https://dummyjson.com/products"); //fetch data
      const productData = await res.json();

      setCards(JSON.parse(localStorage?.getItem("cards")));
      setData(await productData.products);
    }
    FetchData();
  }, []);

  if (cards) {
    let productsFilter = data.filter((product) => {
      return cards.includes(product.id);
    });

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
                href={`product/${product.id}`}
              >
                <Image
                  src={product.images[0]}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="rounded-sm"
                ></Image>
                <h4>{product.title}</h4>
                <p>🍌{product.price}$🍌</p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
  return <div className=""></div>;
}
export default GetCard;
