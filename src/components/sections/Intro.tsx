"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface IntroProps {
  onComplete?: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initial ambient dust particles
    const dustCount = 35;
    const dustParticles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.3 - 0.05,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    // Dissolve gold particles list
    const goldParticles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }> = [];

    let spawnGold = false;

    // Moving ambient light coordinates
    const light = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: Math.min(width, height) * 0.7,
    };

    const render = () => {
      ctx.fillStyle = "#141414";
      ctx.fillRect(0, 0, width, height);

      // 1. Moving ambient light overlay
      light.x += (light.targetX - light.x) * 0.03;
      light.y += (light.targetY - light.y) * 0.03;
      const grad = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius);
      grad.addColorStop(0, "rgba(201, 107, 74, 0.05)"); // Terracotta glow
      grad.addColorStop(0.5, "rgba(111, 78, 139, 0.015)"); // Plum soft tone
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle film grain overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.008)";
      for (let i = 0; i < 800; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        ctx.fillRect(rx, ry, 1, 1);
      }

      // 3. Floating dust particles
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Gold particles dissolving from letters
      if (spawnGold && titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        if (goldParticles.length < 120 && rect.width > 0) {
          // Spawn a couple particles per frame near the text bounds
          goldParticles.push({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            size: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -Math.random() * 1.0 - 0.3,
            alpha: 1.0,
            color: Math.random() > 0.45 ? "#C8A54A" : "#C96B4A", // Muted Gold / Terracotta
          });
        }
      }

      for (let i = goldParticles.length - 1; i >= 0; i--) {
        const p = goldParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
          goldParticles.splice(i, 1);
          continue;
        }

        const colorStr = p.color === "#C8A54A" ? "200, 165, 74" : "201, 107, 74";
        ctx.fillStyle = `rgba(${colorStr}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Slowly shift ambient light center
      if (Math.random() < 0.008) {
        light.targetX = width / 2 + (Math.random() - 0.5) * 150;
        light.targetY = height / 2 + (Math.random() - 0.5) * 150;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // GSAP Sequence Timeline
    const letters = document.querySelectorAll(".intro-letter");
    gsap.set(letters, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 0.2s - 1.4s: Staggered letter reveal
    tl.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.3, // corresponding to 0.2, 0.5, 0.8, 1.1, 1.4 offsets
      ease: "power2.out",
    }, 0.2);

    // 2.0s: Light sweep begins
    tl.to(titleRef.current, {
      backgroundPosition: "0% 0%",
      duration: 1.0,
      ease: "power2.inOut",
    }, 2.0);

    // 2.5s: Gold dissolve begins
    tl.call(() => {
      spawnGold = true;
    }, [], 2.5);

    // 2.8s: Camera moves slightly forward (3% zoom)
    tl.to(wrapperRef.current, {
      scale: 1.03,
      duration: 1.4,
      ease: "power1.inOut",
    }, 2.8);

    // 3.0s: Shrink and move typography to upper-left (FLIP transition)
    tl.call(() => {
      const titleEl = titleRef.current;
      const navLogo = document.getElementById("navbar-logo");

      if (titleEl && navLogo) {
        spawnGold = false; // Halt gold dissolution

        const titleRect = titleEl.getBoundingClientRect();
        const navRect = navLogo.getBoundingClientRect();

        // Calculate scaling
        const scaleX = navRect.width / titleRect.width;
        const scaleY = navRect.height / titleRect.height;
        const scale = (scaleX + scaleY) / 2;

        // Calculate coordinate offsets from screen center to top-left Navbar logo target
        const titleCenterX = titleRect.left + titleRect.width / 2;
        const titleCenterY = titleRect.top + titleRect.height / 2;
        const navCenterX = navRect.left + navRect.width / 2;
        const navCenterY = navRect.top + navRect.height / 2;

        const deltaX = navCenterX - titleCenterX;
        const deltaY = navCenterY - titleCenterY;

        // 3.0s - 3.2s: scale down & slide to Navbar logo
        gsap.to(titleEl, {
          x: deltaX,
          y: deltaY,
          scale: scale,
          duration: 1.0,
          ease: "power4.inOut",
        });

        // Easing colors to match text-foreground (warm dark)
        gsap.to(letters, {
          color: "var(--foreground)",
          duration: 1.0,
          ease: "power4.inOut"
        });

        // 3.2s - 3.6s: transition intro background overlay opacity out
        gsap.to(containerRef.current, {
          backgroundColor: "rgba(247, 244, 238, 0)",
          opacity: 0,
          duration: 1.0,
          ease: "power3.inOut",
          delay: 0.2
        });
      }
    }, [], 3.0);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#141414] select-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      <div 
        ref={wrapperRef}
        className="w-full h-full flex items-center justify-center relative z-10"
        style={{ transformOrigin: "center center" }}
      >
        <div
          ref={titleRef}
          id="intro-title"
          className="flex font-heading font-extrabold text-[64px] sm:text-[100px] md:text-[140px] uppercase text-white tracking-[4px] select-none relative z-10 leading-none"
          style={{
            background: "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 35%, #C8A54A 50%, #FFFFFF 65%, #FFFFFF 100%)",
            backgroundSize: "200% auto",
            backgroundPosition: "200% 0%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transformOrigin: "center center",
          }}
        >
          <span className="intro-letter inline-block">P</span>
          <span className="intro-letter inline-block">I</span>
          <span className="intro-letter inline-block">V</span>
          <span className="intro-letter inline-block">O</span>
          <span className="intro-letter inline-block">T</span>
        </div>
      </div>
    </div>
  );
}
export default Intro;
