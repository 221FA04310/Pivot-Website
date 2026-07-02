"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { cn } from "@/utils/cn";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", magnetic = true, ...props }, ref) => {
    const buttonElement = (
      <motion.button
        ref={ref}
        whileHover={{ y: -2, boxShadow: "var(--box-shadow-hover)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }} // smooth, non-bouncy easing
        className={cn(
          "relative h-[58px] px-7 rounded-premium font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 transition-colors duration-300 outline-none cursor-pointer border",
          // Primary Variant: Terracotta background, White text
          variant === "primary" && 
            "bg-accent-terracotta text-white border-transparent hover:bg-opacity-95 shadow-sm",
          // Secondary Variant: Transparent background, Dark border
          variant === "secondary" && 
            "bg-transparent border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5",
          className
        )}
        style={{
          "--box-shadow-hover": "0 10px 25px -10px var(--accent-terracotta)",
        } as React.CSSProperties}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );

    if (magnetic) {
      return <Magnetic range={50} strength={0.25}>{buttonElement}</Magnetic>;
    }

    return buttonElement;
  }
);

Button.displayName = "Button";
