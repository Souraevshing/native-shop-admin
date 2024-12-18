import { redirect } from "next/navigation";

import { DASHBOARD_ROUTE } from "@/constants/routes";

export default function Admin() {
  return redirect(DASHBOARD_ROUTE);
}
