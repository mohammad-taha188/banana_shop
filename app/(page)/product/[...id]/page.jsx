import AddToCard from "@/components/AddToCard";
import ImageProduct from "@/components/ImageProduct";
import Image from "next/image";

async function Page({ params }) {
  let { id } = await params;

  const res = await fetch("https://dummyjson.com/products"); //fetch data
  const data = await res.json();

  const product = data.products.filter((product) => {
    return product.id == id[0];
  });

  return (
    <div className="flex justify-center mt-4 flex-col items-center w-full gap-6">
      <h2 className="text-3xl">{product[0].title}</h2>
      <ImageProduct product={product[0]} />
      <p>{product[0].price}$</p>
      <p className="px-3 text-center">{product[0].description}$</p>
      <p>{product[0].rating}⭐</p>
      <AddToCard id={product[0].id}/>
      <br />
      <br />
    </div>
  );
}

export default Page;
