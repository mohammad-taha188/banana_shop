import SignUp from "@/components/Sign_up";
import GetID from "@/components/GetID";
import Logout from "@/components/Logout";
import { supabase } from "@/app/supabase";

export default async function Page({ searchParams }) {
  let params = await searchParams;

  let isLogin = await GetID();

  let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("userId", isLogin?.userId);

  return (
    <div className="w-full">
      {isLogin?.userId ? (
        <div className="flex flex-col items-center mt-7">
          <div className="border border-yellow-200 shadow shadow-yellow-300 rounded-sm flex flex-col justify-center items-center px-4 py-3 gap-4 my-4">
            <h3>user name : {user[0].userName}</h3>
            <h3>name : {user[0].name}</h3>
            <h3>email : {user[0].email}</h3>
          </div>
          <Logout />
        </div>
      ) : (
        <SignUp params={params.model} />
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
