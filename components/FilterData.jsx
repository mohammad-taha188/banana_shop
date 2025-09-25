"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function FilterData() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState(
    new URLSearchParams(searchParams.toString())
  );

  // وقتی searchParams تغییر کنه sync بشه
  useEffect(() => {
    setParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const handleChange = (key, value) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set(key, value); // اگر بود آپدیت می‌کنه، اگر نبود اضافه
    router.push(`?${newParams.toString()}`);
    setParams(newParams);
  };

  return (
    <div className="mb-9 flex gap-5 justify-center">
      <select
        className="border border-gray-300 rounded text-gray-700 focus:outline focus:outline-gray-400"
        onChange={(e) => handleChange("f", e.target.value)}
        value={params.get("f") || ""}
      >
        <option value="" hidden>
          filter
        </option>
        <option value="">none</option>
        <option value="date">date</option>
        <option value="price">price</option>
      </select>

      <select
        className="border border-gray-300 rounded text-gray-700 focus:outline focus:outline-gray-400"
        onChange={(e) => handleChange("c", e.target.value)}
        value={params.get("c") || ""}
      >
        <option value="" hidden>
          category
        </option>
        <option value="">none</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Fun">Fun</option>
        <option value="Home-Kitchen">Home-Kitchen</option>
        <option value="groceries">groceries</option>
        <option value="Books-Stationery">Books-Stationery</option>
        <option value="Sports-Entertainment">Sports-Entertainment</option>
        <option value="Beauty-Personal-Care">Beauty-Personal-Care</option>
      </select>
    </div>
  );
}

export default FilterData;
