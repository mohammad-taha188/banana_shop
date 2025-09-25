import { supabase } from "@/app/supabase";
import AddToCard from "@/components/AddToCard";
import EditProduct from "@/components/EditProduct";
import GetID from "@/components/GetID";
import ImageProduct from "@/components/ImageProduct";
import Link from "next/link";

async function Page({ params }) {
  let { id } = await params;

  let ID = await GetID();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("productsId", id[0]);

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*");

  let userAuthor = user.filter((u) => u.userId == data[0]?.userId);
  let userPrevew = user.filter((u) => u.userId == ID?.userId);

  let dateProduct = `${new Date(Number(data[0].date)).getHours()} : ${new Date(
    Number(data[0].date)
  ).getMinutes()}  ||  ${new Date(
    Number(data[0].date)
  ).getMonth()} / ${new Date(Number(data[0].date)).getDay()} / ${new Date(
    Number(data[0].date)
  ).getFullYear()}`;

  return (
    <div className="">
      {(ID?.userId == userAuthor[0]?.userId || userPrevew[0]?.isAdmin) && (
        <EditProduct product={data[0]} />
      )}

      <div className="flex justify-center mt-4 flex-col items-center w-full gap-6">
        <h2 className="text-3xl wrap-anywhere text-center px-3">
          {data[0].title}
        </h2>
        <p>author : {user[0]?.userName ? user[0]?.userName : "unknown"}</p>
        <p>date : {dateProduct}</p>

        <ImageProduct product={data[0]} />

        {data[0].discount ? (
          <div className="text-center">
            <del>{data[0].price}$</del>
            <p>🍌{data[0].discount}$🍌</p>
          </div>
        ) : (
          <p>{data[0].price}$</p>
        )}

        <p className="px-3 text-center">{data[0].desc}</p>

        <Link href={`/?c=${data[0].category}`}>
          <p className="px-3 text-center py-2 bg-gray-200 rounded-sm cursor-pointer">
            {data[0].category}
          </p>
        </Link>

        <AddToCard id={data[0].id} />
        <br />
        <br />
      </div>
      {error ||
        (userError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            <strong>Error:</strong> {error}
          </div>
        ))}
    </div>
  );
}

export default Page;
