"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface GradientBackgroundProps {
  className?: string;
  variant?: "terracotta" | "gold" | "plum" | "mixed";
}

export function GradientBackground({ className, variant = "mixed" }: GradientBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.25]", className)}>
      {variant === "terracotta" && (
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-accent-terracotta/20 blur-[120px]"
        />
      )}
      {variant === "gold" && (
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-mutedGold/15 blur-[140px]"
        />
      )}
      {variant === "plum" && (
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, 30, -35, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/3 w-[450px] h-[450px] rounded-full bg-accent-softPlum/12 blur-[130px]"
        />
      )}
      {variant === "mixed" && (
        <>
          <motion.div
            animate={{
              x: [0, 50, -40, 0],
              y: [0, -30, 50, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-terracotta/10 blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -40, 30, 0],
              y: [0, 40, -40, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] rounded-full bg-accent-mutedGold/10 blur-[130px]"
          />
        </>
      )}
    </div>
  );
}
