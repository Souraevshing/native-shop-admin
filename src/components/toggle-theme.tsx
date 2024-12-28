"use client";

import { SunDimIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "@/components/ui/toggle";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      variant={"outline"}
      aria-label="toggle-theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="active:animate-out transition-all duration-300"
    >
      {theme === "dark" ? (
        <SunDimIcon color="#ffc857" className="w-6 h-6" />
      ) : (
        <SunMoonIcon color="#2c2b3c" className="w-6 h-6" />
      )}
    </Toggle>
  );
};
