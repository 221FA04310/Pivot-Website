"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/utils/cn";

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.3"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("relative z-10", className)}>
      <p className="flex flex-wrap text-foreground">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word = ({ children, range, progress }: WordProps) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative inline-block mr-[0.25em] last:mr-0 select-none">
      {/* Background ghost word to maintain layout and shape */}
      <span className="absolute opacity-[0.12] pointer-events-none text-foreground">
        {children}
      </span>
      <motion.span style={{ opacity }} className="text-foreground">
        {children}
      </motion.span>
    </span>
  );
};
