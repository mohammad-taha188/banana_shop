import { supabase } from "@/app/supabase";
import GetID from "@/components/GetID";
import SearchC from "@/components/Search";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function adminDashboard({ searchParams }) {
  let userId = await GetID();
  let params = await searchParams;

  let search = params.s;

  let { data: userData, error } = await supabase.from("users").select("*");
  let thisUser = userData.filter((u) => u.userId == userId?.userId);

  let { data: products, error: errorProducts } = await supabase
    .from("products")
    .select("*");

  if (thisUser[0].isAdmin !== true) {
    return notFound();
  }

  let product = search
    ? products?.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div className="flex flex-col items-center">
      <h2>admin dashboard</h2>

      <details className="border border-gray-300 shadow shadow-gray-200 rounded-sm px-3 py-2 w-[90%] text-center my-5">
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

      <details className="border border-gray-300 shadow shadow-gray-200 rounded-sm px-3 py-2 w-[80%] text-center my-5">
        <summary className="cursor-pointer select-none">all users</summary>
        <div className="grid sm:grid-cols-2 grid-cols-1 w-full">
          {userData?.map((user) => {
            return (
              <Link
                className="overflow-hidden border border-yellow-300 flex flex-col items-center px-4 py-2 gap-3 m-8 rounded-sm shadow shadow-amber-200"
                href={`/user/${user.userId}`}
                key={user.userId}
              >
                <p>#{user.userName}</p>
                <p>{user.email}</p>
              </Link>
            );
          })}
        </div>
      </details>
    </div>
  );
}

export default adminDashboard;
