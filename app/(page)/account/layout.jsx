import { supabase } from "@/app/supabase";
import GetID from "@/components/GetID";
import LinkUser from "@/components/Links_user";

export default async function AccountLayout({ children }) {
  let isLogin = await GetID();

  let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("userId", isLogin?.userId);
  return (
    <div>
      <LinkUser user={user} />

      <div>{children}</div>
    </div>
  );
}
