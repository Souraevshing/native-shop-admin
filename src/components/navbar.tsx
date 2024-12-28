"use client";

import { CircleUser, Menu, Package2Icon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAVBAR_LINKS } from "@/constants/navbar-links";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { ToggleTheme } from "./toggle-theme";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2Icon color="#52b788" className="h-6 w-6" />
        </Link>
        {NAVBAR_LINKS.map(({ id, href, label }) => {
          return (
            <Link
              id={id}
              key={href}
              href={href}
              className={cn(
                "transition-colors hover:text-foreground text-muted-foreground",
                {
                  "text-foreground font-bold": pathname === href,
                }
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2Icon className="h-6 w-6" />
            </Link>
            {NAVBAR_LINKS.map(({ id, href, label }) => {
              return (
                <Link
                  id={id}
                  key={href}
                  href={href}
                  className={cn("hover:text-foreground text-muted-foreground", {
                    "text-foreground font-bold": pathname === href,
                  })}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] items-center justify-center flex"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <CircleUser color="blue" className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 hover:bg-red-600 hover:text-white !important"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ToggleTheme />
      </div>
    </header>
  );
};
