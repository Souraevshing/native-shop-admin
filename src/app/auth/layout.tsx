import { redirect } from "next/navigation";

import { ADMIN_ROUTE } from "@/constants/routes";
import { ADMIN } from "@/constants/user-types";
import { createClient } from "@/utils/supabase/server";

export default async function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const supabase = createClient();

  const { data: authData } = await (await supabase).auth.getUser();

  if (authData.user) {
    const { data, error } = await (await supabase)
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error || !data) {
      console.error(error.message);
      return;
    }

    if (data.type === ADMIN) {
      return redirect(ADMIN_ROUTE);
    }
  }

  return <>{children}</>;
}
