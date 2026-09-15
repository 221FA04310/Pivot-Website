"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlight?: boolean;
  spotlightColor?: string;
  theme?: "light" | "secondary" | "dark";
}

export function Card({
  className,
  children,
  spotlight = true,
  spotlightColor = "rgba(201, 107, 74, 0.06)", // Extremely subtle terracotta glow
  theme = "light",
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative rounded-premium overflow-hidden transition-all duration-500 border border-border/40 p-[1px] bg-border/20",
        theme === "light" && "bg-[#FCFBF8] text-foreground shadow-premium hover:shadow-premiumHover",
        theme === "secondary" && "bg-backgroundSecondary text-foreground shadow-premium",
        theme === "dark" && "bg-darkSection/95 text-[#F7F4EE] border-[#F7F4EE]/10 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.3)]",
        className
      )}
      {...props}
    >
      {/* Outer Border Spotlight Glow */}
      {spotlight && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
          style={{
            opacity,
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, var(--accent-terracotta), transparent 75%)`,
          }}
        />
      )}

      {/* Inner Card Layer */}
      <div
        className={cn(
          "relative z-10 w-full h-full rounded-[19px] p-8 overflow-hidden transition-colors duration-500",
          theme === "light" && "bg-[#FCFBF8]",
          theme === "secondary" && "bg-[#EFE9E1]",
          theme === "dark" && "bg-darkSection"
        )}
      >
        {/* Soft Radial Backlight Spotlight */}
        {spotlight && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
            style={{
              opacity,
              background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
            }}
          />
        )}
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    </div>
  );
}
