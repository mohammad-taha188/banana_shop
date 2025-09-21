import { supabase } from "@/app/supabase";
import GetID from "@/components/GetID";
import Image from "next/image";
import Link from "next/link";

async function productsPage() {
  const { data, error } = await supabase.from("products").select("*");

  let userId = await GetID();

  let userProduct = data.filter((p) => {
    return p.userId == userId?.userId;
  });
  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message);
  }

  return (
    <div className="flex flex-col items-center">
      <h2>your product</h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full">
        {userProduct?.map((product) => {
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
              <p>🍌{product.price}$🍌</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default productsPage;
