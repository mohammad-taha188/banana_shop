import { supabase } from "@/app/supabase";
import Image from "next/image";
import Link from "next/link";

async function GetProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message); // ← Next.js به error.jsx می‌ره
  }
  
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full">
      {data?.map((product) => {
        return (
          <Link
            className="border border-yellow-300 flex flex-col items-center px-4 py-2 gap-3 m-8 rounded-sm shadow shadow-amber-200"
            key={product.productsId}
            href={`/product/${product.productsId}`}
          >
            <Image
              src={product.imageURL[0]}
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
  );
}

export default GetProducts;
