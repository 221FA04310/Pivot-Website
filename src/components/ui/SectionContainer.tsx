"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
  theme?: "light" | "secondary" | "dark";
  useGrid?: boolean;
}

export function SectionContainer({
  className,
  children,
  id,
  theme = "light",
  useGrid = true,
  ...props
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen w-full relative flex items-center justify-center py-20 sm:py-28 md:py-36 px-6 sm:px-12 md:px-16 transition-colors duration-500 overflow-hidden",
        theme === "light" && "bg-background text-foreground",
        theme === "secondary" && "bg-backgroundSecondary text-foreground",
        theme === "dark" && "bg-darkSection text-[#F7F4EE] dark",
        className
      )}
      {...props}
    >
      {/* 1400px Max-Width Content Bounds */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-center relative z-10">
        {useGrid ? (
          <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
