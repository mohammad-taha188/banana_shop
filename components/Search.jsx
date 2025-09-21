"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SearchC({ search }) {
  const [value, setValue] = useState("");
  let navigate = useRouter();

  useEffect(() => {
    search && setValue(search);
  }, []);

  return (
    <div className="w-full flex justify-center gap-4 mb-6">
      <input
        type="text"
        defaultValue={search ? search : ""}
        placeholder="search..."
        className="border border-gray-300 shadow shadow-gray-200 rounded-sm focus:outline focus:outline-gray-400 w-[80%] px-2 py-1"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            navigate.push(`/?s=${value}`);
          }
        }}
      />

      <button
        className="btn btn-yellow"
        onClick={() => {
          navigate.push(`/?s=${value}`);
        }}
      >
        search
      </button>
    </div>
  );
}

export default SearchC;
