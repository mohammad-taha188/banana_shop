"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LinksBanana() {
  const [rotated, setRotated] = useState(false);
  const [open, setOpen] = useState(false);

  let params = usePathname(); // path name site

  return (
    <div className="">
      {open && (
        <div
          className={`links w-9 border border-gray-300 shadow shadow-gray-200 rounded-sm px-1 py-1 fixed bottom-25 right-10 cursor-pointer animate-open flex flex-col items-center gap-3`}
        >
          <Link href={"/"}>
            <Image
              src={params == "/" ? "/icon/home-full.svg" : "/icon/home.svg"} //if params equal / , params = home full icon , else home
              alt="home"
              width={40}
              height={40}
            ></Image>
          </Link>
          <Link href={"/add-product"}>
            <Image
              src={"/icon/plus.svg"}
              alt="home"
              width={40}
              height={40}
              className={`
               ${params == "/add-product" && "rotate-45 animate-spin"} 
                `} //if params equal /add-product , params = rotate animation
            ></Image>
          </Link>{" "}
          <Link href={"/account"}>
            <Image
              src={
                params == "/account" ? "/icon/user-full.svg" : "/icon/user.svg"
              } //if params equal /account , params = user full icon , else user
              alt="account"
              width={40}
              height={40}
            ></Image>
          </Link>
        </div>
      )}

      <div
        className={`links-banana w-10 h-10 border border-gray-300 shadow shadow-gray-200 rounded-full px-1 py-1 fixed bottom-10 right-10 cursor-pointer transition-transform duration-700  ${
          rotated ? "rotate-360" : "rotate-0"
        }`}
        onClick={(e) => {
          setRotated(!rotated);
          setOpen(!open); //onclick for open sidebar or close sidbar
        }}
      >
        <Image
          src="/icon/banana.svg"
          alt="banana"
          width={40}
          height={40}
        ></Image>
      </div>
    </div>
  );
}
