"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const child = container.children[0] as HTMLElement;
    if (!child) return;

    // Use GPU-accelerated spring curves for elastic snapback
    const xTo = gsap.quickTo(child, "x", { duration: 1, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(child, "y", { duration: 1, ease: "elastic.out(1, 0.4)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        // Pull towards mouse proportionally
        xTo(distanceX * strength);
        yTo(distanceY * strength);
      } else {
        // Reset when mouse moves out of range
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
