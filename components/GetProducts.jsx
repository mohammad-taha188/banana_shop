import { supabase } from "@/app/supabase";
import Image from "next/image";
import Link from "next/link";
import SearchC from "./Search";
import FilterData from "./FilterData";

async function GetProducts({ searchParams }) {
  let params = await searchParams;

  let category = params.c;
  let search = params.s;
  let filter = params.f;

  console.log(filter);

  let query = supabase.from("products").select("*");

  if (filter) {
    query = query.order(filter, { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message); // ← Next.js به error.jsx می‌ره
  }

  let product = category
    ? data.filter((p) => p.category == category)
    : search
    ? data?.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : data;

  return (
    <div className="flex items-center flex-col mt-6">
      <SearchC search={search} />
      <FilterData filter={filter} />
      <div className="">
        {category && (
          <Link href={"/"}>
            <p className="text-center px-2 py-1 bg-gray-200 rounded-sm cursor-pointer">
              {category}
            </p>
          </Link>
        )}
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full">
        {product?.map((product) => {
          return (
            <Link
              className="overflow-hidden border border-yellow-300 flex flex-col items-center px-4 py-2 gap-3 m-8 rounded-sm shadow shadow-amber-200"
              href={`/product/${product.productsId}`}
              key={product.productsId}
            >
              <Image
                src={product.imageURL[0]}
                width={100}
                height={100}
                alt={product.title}
                className="rounded-sm"
              ></Image>
              <h4 className="">{product.title}</h4>
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
    </div>
  );
}

export default GetProducts;
