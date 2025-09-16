"use client";
import Image from "next/image";
import { useState } from "react";

function ImageProduct({ product }) {
  const [index, setIndex] = useState(0);
  if (product.imageURL.length > 1) {
    return (
      <div className="flex justify-center gap-3">
        <Image
          className="rounded-sm rotate-180 cursor-pointer"
          src={"/icon/arrow.svg"}
          width={40}
          height={40}
          alt={"back"}
          onClick={() => {
            if (index != 0) {
              setIndex(index - 1);
            } else {
              setIndex(product.imageURL.length - 1);
            } //back image
          }}
        ></Image>
        <Image
          className="w-[50%] rounded-sm  border border-yellow-200"
          src={product.imageURL[index]}
          width={100}
          height={100}
          alt={product.id}
        ></Image>
        <Image
          className=" rounded-sm  cursor-pointer"
          src={"/icon/arrow.svg"}
          width={40}
          height={40}
          alt={"next"}
          onClick={() => {
            if (index + 1 == product.imageURL.length) {
              setIndex(0);
            } else {
              setIndex(index + 1);
            } //next image
          }}
        ></Image>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center gap-3">
        <Image
          className="w-[50%] rounded-sm border border-yellow-200 "
          src={product.imageURL[0]}
          width={100}
          height={100}
          alt={product.id}
        ></Image>
      </div>
    );
  }
}

export default ImageProduct;
