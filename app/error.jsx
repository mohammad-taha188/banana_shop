"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Banana Shop Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-5xl font-extrabold text-yellow-600 drop-shadow-lg">
        🍌 Oops!
      </h1>
      <h2 className="text-2xl font-semibold text-yellow-700 mt-4">
        Something went wrong in <span className="italic">Banana Shop</span>
      </h2>

      <p className="text-yellow-800 mt-2 max-w-md">
        It seems a banana slipped on the floor... Don’t worry, our monkeys are
        fixing it! 🐒
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="bg-white border border-yellow-500 text-yellow-700 hover:bg-yellow-200 px-4 py-2 rounded-lg shadow-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
