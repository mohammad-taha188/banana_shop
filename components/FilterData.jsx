"use client";

import { useRouter } from "next/navigation";

function FilterData({ filter }) {
  let router = useRouter();
  return (
    <div className="">
      <select
        name=""
        id=""
        // value={filter && ""}
        onChange={(e) => {
          router.push(`?f=${e.target.value}`);
        }}
      >
        <option value="" hidden>
          filter
        </option>
        <option value="date">date</option>
        <option value="price">price</option>
      </select>
    </div>
  );
}

export default FilterData;
