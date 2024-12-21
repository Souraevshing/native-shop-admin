import { NavLinks } from "@/types/global";
import {
  ADMIN_CATEGORY_ROUTE,
  ADMIN_ORDERS_ROUTE,
  ADMIN_PRODUCTS_ROUTE,
  DASHBOARD_ROUTE,
} from "./routes";

export const NAV_LINKS: NavLinks[] = [
  { id: 1, href: DASHBOARD_ROUTE, label: "Dashboard" },
  { id: 2, href: ADMIN_ORDERS_ROUTE, label: "Orders" },
  { id: 3, href: ADMIN_PRODUCTS_ROUTE, label: "Products" },
  { id: 4, href: ADMIN_CATEGORY_ROUTE, label: "Categories" },
];
