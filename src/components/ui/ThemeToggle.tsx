"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Magnetic } from "./Magnetic";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <Magnetic range={40} strength={0.3}>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-foreground/5 transition-colors duration-200 outline-none cursor-pointer"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-[18px] h-[18px] text-accent-cyan" />
        ) : (
          <Moon className="w-[18px] h-[18px] text-accent-indigo" />
        )}
      </button>
    </Magnetic>
  );
}
