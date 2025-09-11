import GetProducts from "@/components/GetProducts";

export default function Home() {
  return (
    <div className="">
      <GetProducts />

      <footer className="footer w-full h-[200px] rounded-tl-[60%_20%] rounded-tr-[60%_20%] flex justify-end flex-col p-4">
        <div className="px-3 py-2"></div>
        &copy; {new Date().getFullYear()} Banana Shop
        <h3 className="">welcome to the banana shop🍌</h3>
      </footer>
    </div>
  );
}
