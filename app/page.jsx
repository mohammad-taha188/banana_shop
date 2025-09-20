import GetProducts from "@/components/GetProducts";

export const revalidate = 0;

export default function Home({ searchParams }) {
  return (
    <div className="flex flex-col">
      <GetProducts searchParams={searchParams} />
    </div>
  );
}
