"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GetID from "./GetID";

export default function LinksBanana({ user }) {
  const [rotated, setRotated] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    async function fetchData() {
      let id = await GetID();

      setUserId(id);
    }
    fetchData();
  }, []);

  let params = usePathname(); // path name site
  if (userId?.userId)
    return (
      <div className="">
        {open && (
          <div
            className={`links w-9 border border-gray-300 shadow shadow-gray-200 rounded-sm px-1 py-1 fixed top-20 left-5 cursor-pointer animate-open flex flex-col items-center gap-3 bg-white`}
          >
            <Link href={"/account"}>
              <Image
                src={
                  params == "/account"
                    ? "/icon/user-full.svg"
                    : "/icon/user.svg"
                } //if params equal /account , params = user full icon , else user
                alt="user"
                width={40}
                height={40}
              ></Image>
            </Link>
            <Link href={"/account/products"}>
              <Image
                src={
                  params == "/account/products"
                    ? "/icon/products-full.svg"
                    : "/icon/products.svg"
                } //if params equal /card , params = card full icon , else card
                alt="products"
                width={40}
                height={40}
              ></Image>
            </Link>
            {user[0].isAdmin && (
              <Link href={"/account/admin-dashboard"}>
                <Image
                  src={
                    params == "/account/admin-dashboard"
                      ? "/icon/dashboard-full.svg"
                      : "/icon/dashboard.svg"
                  } //if params equal /card , params = card full icon , else card
                  alt="dashboard"
                  width={40}
                  height={40}
                  className={`${params == "/add-product" && "plus-rotate"} `}
                ></Image>
              </Link>
            )}
          </div>
        )}

        <div
          className={`links-banana w-10 h-10 border border-gray-300 shadow shadow-gray-200 rounded-full px-1 py-1 fixed top-5 left-5  cursor-pointer transition-transform duration-700 bg-white ${
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
