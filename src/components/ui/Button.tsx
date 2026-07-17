"use client";

import React, { useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { cn } from "@/utils/cn";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  magnetic?: boolean;
}

// Morphing path coordinates (Flat Baseline -> Bulging Wave Dome -> Solid Flat Rectangle)
const SHAPE_EMPTY = "M 0 100 Q 0 100, 0 100 Q 50 100, 100 100 Q 100 100, 100 100 Z";
const SHAPE_BULGE = "M 0 100 Q 0 100, 0 60 Q 50 -15, 100 60 Q 100 100, 100 100 Z";
const SHAPE_FILLED = "M 0 100 Q 0 50, 0 0 Q 50 0, 100 0 Q 100 50, 100 100 Z";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", magnetic = true, ...props }, ref) => {
    const [hoverDirection, setHoverDirection] = useState<"top" | "bottom" | "left" | "right">("left");
    const [exitDirection, setExitDirection] = useState<"top" | "bottom" | "left" | "right">("left");
    const [isHovered, setIsHovered] = useState(false);

    // Direction-aware edge computation
    const getDirection = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const edgeDistances = [
        y, // top
        rect.height - y, // bottom
        x, // left
        rect.width - x // right
      ];

      const minIndex = edgeDistances.indexOf(Math.min(...edgeDistances));
      const directions: ("top" | "bottom" | "left" | "right")[] = ["top", "bottom", "left", "right"];
      return directions[minIndex];
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      const dir = getDirection(e);
      setHoverDirection(dir);
      setIsHovered(true);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const dir = getDirection(e);
      setExitDirection(dir);
      setIsHovered(false);
    };

    // Snap edge angles for parent rotation alignment
    const getAngleForDirection = (dir: "top" | "bottom" | "left" | "right") => {
      switch (dir) {
        case "top":
          return 180;
        case "bottom":
          return 0;
        case "left":
          return 90;
        case "right":
          return -90;
      }
    };

    const angle = getAngleForDirection(hoverDirection);
    const exitAngle = getAngleForDirection(exitDirection);

    const buttonElement = (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative p-[8px] -m-[8px] flex items-center justify-center pointer-events-auto"
      >
        <motion.button
          ref={ref}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "relative h-[58px] px-7 rounded-premium font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 transition-colors duration-300 outline-none cursor-pointer border overflow-hidden group shadow-sm select-none",
            // Primary Default: Deep Navy, Teal border
            variant === "primary" && 
              "bg-[#071A2F] border-[#27A7A2]/30 text-white shadow-[0_4px_20px_rgba(7,26,47,0.4)]",
            // Secondary Default: Transparent glass, Teal border
            variant === "secondary" && 
              "bg-transparent border-[#27A7A2]/30 text-white backdrop-blur-sm",
            // Hover styling
            isHovered && "border-[#27A7A2] shadow-[0_0_20px_rgba(39,167,162,0.35)]",
            className
          )}
          {...props}
        >
          {/* Liquid Fill Overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] z-0">
            {/* Parent Rotating Container */}
            <motion.div
              animate={{ rotate: isHovered ? angle : exitAngle }}
              transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
              className="absolute left-1/2 top-1/2 w-[240%] aspect-square pointer-events-none z-0"
              style={{ x: "-50%", y: "-50%", originX: 0.5, originY: 0.5 }}
            >
              {/* SVG Morphing Liquid Dome */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full absolute inset-0 pointer-events-none z-0"
              >
                <defs>
                  <linearGradient id="liquid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1B5E8A" />
                    <stop offset="50%" stopColor="#27A7A2" />
                    <stop offset="100%" stopColor="#6FD7B7" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={false}
                  animate={
                    isHovered
                      ? {
                          d: [SHAPE_EMPTY, SHAPE_BULGE, SHAPE_FILLED],
                          opacity: [0, 1]
                        }
                      : {
                          d: [SHAPE_FILLED, SHAPE_BULGE, SHAPE_EMPTY],
                          opacity: 0
                        }
                  }
                  transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
                  d={SHAPE_EMPTY}
                  fill="url(#liquid-grad)"
                />
              </svg>
            </motion.div>
          </div>

          {/* Text and children */}
          <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-[1.01]">{children}</span>
        </motion.button>
      </div>
    );

    if (magnetic) {
      return <Magnetic range={50} strength={0.25}>{buttonElement}</Magnetic>;
    }

    return buttonElement;
  }
);

Button.displayName = "Button";



