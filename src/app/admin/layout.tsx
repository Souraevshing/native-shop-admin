import { redirect } from "next/navigation";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import RenderMounted from "@/components/render-mounted";
import { HOME_ROUTE } from "@/constants/routes";
import { ADMIN } from "@/constants/user-types";
import { createClient } from "@/utils/supabase/server";

export default async function AdminLaYOUT({
  children,
}: {
  children: Readonly<React.ReactNode>;
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
      console.error(error.message);
      return;
    }

    if (data.type === ADMIN) {
      return redirect(HOME_ROUTE);
    }
  }

  return (
    <RenderMounted>
      <Navbar />
      <main className="min-h-[calc(100svh-128px)] py-3">{children}</main>
      <Footer />
    </RenderMounted>
  );
}
