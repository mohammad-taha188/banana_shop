"use client";
import Link from "next/link";

function Header() {
  return (
    <header className="header w-full h-[200px] rounded-bl-[60%_20%] rounded-br-[60%_20%] flex justify-center">
      <div className="px-3 py-2"></div>
      <Link href={"/"} className="inline h-10">
        <h1 className="text-4xl mt-6 text-gray-800">Banana Shop</h1>
      </Link>
    </header>
  );
}

export default Header;
