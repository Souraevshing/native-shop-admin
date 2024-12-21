"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "@/components/ui/toggle";
import RenderMounted from "./render-mounted";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <RenderMounted>
      <Toggle
        variant={"outline"}
        aria-label="Toggle theme"
        onClick={handleToggle}
      >
        {theme === "light" ? (
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
        ) : (
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        )}
      </Toggle>
    </RenderMounted>
  );
}
