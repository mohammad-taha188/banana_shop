import SignUp from "@/components/Sign_up";

export default async function Page({ searchParams }) {
  let params = await searchParams;

  return (
    <div className="w-full">
      <SignUp params={params.model} />
    </div>
  );
}
