import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (authData.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error || !data) {
      console.error(error);
      return;
    }

    if (data.type === "ADMIN") {
      return redirect("/admin");
    }
  }

  return <>{children}</>;
}
