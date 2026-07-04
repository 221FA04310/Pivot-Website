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
          // Primary Variant: Bronze background, White text
          variant === "primary" && 
            "bg-[#A96A4D] hover:bg-[#BC7A55] text-white border-transparent shadow-[0_10px_25px_rgba(169,106,77,0.25)]",
          // Secondary Variant: Transparent background, Bronze border, Charcoal text
          variant === "secondary" && 
            "bg-transparent border-[#A96A4D] text-[#1B2430] hover:bg-[#A96A4D] hover:text-white hover:border-[#A96A4D]",
          className
        )}
        style={{
          "--box-shadow-hover": "0 15px 30px rgba(169, 106, 77, 0.35)",
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
