"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor exactly at the mouse pointer
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1 });

    // Use gsap.quickTo for GPU-accelerated smooth animations
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { 
        scale: 1.8, 
        backgroundColor: "rgba(255, 255, 255, 0.15)", 
        border: "1.5px solid rgba(255, 255, 255, 0.9)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.35)",
        duration: 0.35,
        ease: "power2.out" 
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: "rgba(255, 255, 255, 0.05)", 
        border: "1px solid rgba(255, 255, 255, 0.45)",
        boxShadow: "none",
        duration: 0.35,
        ease: "power2.out" 
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Track standard interactive elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], [data-cursor="pointer"]');
      targets.forEach((target) => {
        target.addEventListener("mouseenter", onMouseEnterLink);
        target.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    addHoverListeners();

    // Listen for dynamically loaded DOM elements
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const targets = document.querySelectorAll('a, button, [role="button"], [data-cursor="pointer"]');
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", onMouseEnterLink);
        target.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
