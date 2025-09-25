import { supabase } from "@/app/supabase";
import GetID from "@/components/GetID";
import SearchC from "@/components/Search";
import Image from "next/image";
import Link from "next/link";

async function userPage({ params, searchParams }) {
  let userId = await params?.userId;
  let Searchparam = await searchParams;
  let ID = await GetID();

  let search = Searchparam.s;

  let { data, error } = await supabase.from("users").select("*");
  let { data: products, error: errorProduct } = await supabase
    .from("products")
    .select("*");

  let userProducts = products.filter((p) => p.userId == userId);

  let userPrevew = data.filter((u) => u.userId == ID?.userId);
  let thisUser = data.filter((u) => u.userId == userId);

  console.log(userPrevew);

  let product = search
    ? userProducts?.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : userProducts;

  return (
    <div className="flex flex-col items-center gap-2">
      <h2>#{thisUser[0]?.userName}</h2>
      <p>name : {thisUser[0]?.name}</p>
      <p>email : {thisUser[0]?.email}</p>
      <details className="border border-gray-300 shadow shadow-gray-200 rounded-sm px-3 py-2 w-[80%] text-center my-5">
        <summary className="cursor-pointer select-none">all products</summary>
        <div className="mt-5">
          <SearchC />
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
                <p>🍌{product.price}$🍌</p>
              </Link>
            );
          })}
        </div>
      </details>
      {error && (
        <p className="text-red-500">
          please try again <br /> {error}
        </p>
      )}{" "}
      {errorProduct && (
        <p className="text-red-500">
          please try again <br /> {errorProduct}
        </p>
      )}
    </div>
  );
}

export default userPage;
