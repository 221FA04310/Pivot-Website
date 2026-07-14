"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface IntroProps {
  onStartFade?: () => void;
  onComplete?: () => void;
}

export function Intro({ onStartFade, onComplete }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const blackOverlayRef = useRef<HTMLDivElement>(null);


  const onStartFadeRef = useRef(onStartFade);
  const onCompleteRef = useRef(onComplete);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Sync callbacks with refs to avoid timeline rebuilds when callbacks change
  useEffect(() => {
    onStartFadeRef.current = onStartFade;
    onCompleteRef.current = onComplete;
  }, [onStartFade, onComplete]);

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

    // Initialize 50 gold background sparkles that twinkle
    const particleCount = 50;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      alpha: number;
      phase: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.05,
        vy: -Math.random() * 0.12 - 0.03,
        baseAlpha: Math.random() * 0.25 + 0.1,
        alpha: 0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Gold sparkles list that rises from the letters bounds
    const goldParticles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    // Interactive Golden Cursor Particles
    interface CursorParticle {
      x: number;
      y: number;
      size: number;
      targetSize: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      maxLife: number;
      life: number;
    }
    const cursorParticles: CursorParticle[] = [];

    let lastX = 0;
    let lastY = 0;

    // Cache elements for quick distance updates on mousemove
    let cachedLetters: HTMLElement[] = [];
    const refreshLettersCache = () => {
      cachedLetters = Array.from(document.querySelectorAll(".intro-letter")) as HTMLElement[];
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // 1. Spawning interactive gold cursor particles
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > 5) { // Spawn every 5px of mouse movement
        const count = Math.floor(Math.random() * 4) + 3; // 3 to 6 particles
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 0.45 + 0.2;
          const size = Math.random() * 3 + 2; // 2px to 5px
          const targetSize = size * (Math.random() * 0.35 + 1.15); // Expand slightly
          const color = Math.random() > 0.45 ? "#D6B26E" : "#F2E2A4";
          const maxLife = Math.random() * 24 + 48; // 0.8s to 1.2s at 60fps (48 to 72 frames)
          cursorParticles.push({
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            size,
            targetSize,
            vx: Math.cos(angle) * speed * 0.4,
            vy: -Math.random() * 0.6 - 0.3, // float upward naturally
            color,
            alpha: 0,
            maxLife,
            life: maxLife
          });
        }
        lastX = x;
        lastY = y;
      }

      // 2. Interactive golden shimmer text reaction on hover approach
      if (cachedLetters.length === 0) {
        refreshLettersCache();
      }

      const threshold = 90;
      cachedLetters.forEach((el) => {
        const opacityStr = window.getComputedStyle(el).opacity;
        const opacity = parseFloat(opacityStr || "0");
        if (opacity < 0.1) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(x - centerX, y - centerY);

        if (distance < threshold) {
          const isGlowing = el.dataset.glowing === "true";
          if (!isGlowing) {
            el.dataset.glowing = "true";
            gsap.killTweensOf(el, { color: true, textShadow: true });
            
            // Subtle golden shimmer glow
            gsap.fromTo(el, 
              { 
                color: "#FFF8EB",
                textShadow: "0 0 15px rgba(214, 178, 110, 0.95), 0 0 30px rgba(214, 178, 110, 0.7)"
              },
              {
                color: "", // Restores standard CSS default color
                textShadow: "none",
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                  el.dataset.glowing = "false";
                }
              }
            );
          }
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    let spawnGold = false;
    let time = 0;

    const render = () => {
      time += 0.002;

      // Base background radial gradient circle at top
      const bgGrad = ctx.createRadialGradient(width / 2, 0, 0, width / 2, 0, Math.max(width, height));
      bgGrad.addColorStop(0, "#243247");
      bgGrad.addColorStop(0.45, "#1A2333");
      bgGrad.addColorStop(1, "#151D2B");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle warm-gold ambient light drifting slowly
      const gx1 = width / 2 + Math.sin(time * 1.4) * (width * 0.15);
      const gy1 = height / 2 + Math.cos(time * 1.1) * (height * 0.1);
      const gRadius1 = Math.min(width, height) * 0.65;
      const grad1 = ctx.createRadialGradient(gx1, gy1, 0, gx1, gy1, gRadius1);
      grad1.addColorStop(0, "rgba(214, 178, 110, 0.035)");
      grad1.addColorStop(0.5, "rgba(214, 178, 110, 0.01)");
      grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Subtle plum/indigo ambient light drifting slowly
      const gx2 = width / 2 + Math.cos(time * 1.0) * (width * 0.2);
      const gy2 = height / 2 + Math.sin(time * 1.3) * (height * 0.15);
      const gRadius2 = Math.min(width, height) * 0.75;
      const grad2 = ctx.createRadialGradient(gx2, gy2, 0, gx2, gy2, gRadius2);
      grad2.addColorStop(0, "rgba(169, 106, 77, 0.025)");
      grad2.addColorStop(0.5, "rgba(169, 106, 77, 0.008)");
      grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw and update twinkling background gold sparkles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        p.alpha = p.baseAlpha + Math.sin(time * 12 + p.phase) * (p.baseAlpha * 0.4);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(214, 178, 110, ${p.alpha * 0.25})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw and update cursor interactive particles
      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const p = cursorParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        const ratio = p.life / p.maxLife; // 1 -> 0
        if (ratio > 0.85) {
          p.alpha = (1 - ratio) / 0.15;
        } else {
          p.alpha = ratio / 0.85;
        }

        const currentSize = p.size + (p.targetSize - p.size) * (1 - ratio);

        if (p.life <= 0) {
          cursorParticles.splice(i, 1);
          continue;
        }

        ctx.shadowColor = "rgba(214, 178, 110, 0.35)";
        ctx.shadowBlur = 4;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0; // reset shadows

      // Spawn gold sparkles around the letters of the logo bounds
      if (spawnGold && titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        if (goldParticles.length < 150 && rect.width > 0) {
          for (let k = 0; k < 2; k++) {
            goldParticles.push({
              x: rect.left + Math.random() * rect.width,
              y: rect.top + Math.random() * rect.height,
              size: Math.random() * 2.5 + 0.6, // slightly larger sparkles
              vx: (Math.random() - 0.5) * 0.4,
              vy: -Math.random() * 0.8 - 0.25, // floating upwards
              alpha: Math.random() * 0.25, // Max particle alpha 0.25
            });
          }
        }
      }

      // Draw and update gold sparkles
      for (let i = goldParticles.length - 1; i >= 0; i--) {
        const p = goldParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.005;

        if (p.alpha <= 0) {
          goldParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(214, 178, 110, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // GSAP Timeline setup
    const letters = document.querySelectorAll(".intro-letter");

    gsap.set(letters, { opacity: 0, x: -120 });
    gsap.set(titleRef.current, { scale: 1, opacity: 1 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // STAGE 1: Background fades in from black (0.8s)
    tl.to(blackOverlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, 0);

    // Start spawning gold sparkles when letters start appearing (0.8s)
    tl.call(() => {
      spawnGold = true;
    }, [], 0.8);

    // Stagger slide in PIVOT letters from LEFT (duration 0.4s, stagger 0.15s)
    tl.to(letters, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.15,
      ease: "power3.out",
    }, 0.8);

    // Glowing Light Sweep starts at 1.9s (duration 0.4s, stagger 0.15s)
    tl.to(letters, {
      color: "#FFF8EB",
      textShadow: "0 0 25px rgba(214, 178, 110, 0.95), 0 0 45px rgba(214, 178, 110, 0.6)",
      duration: 0.40,
      stagger: 0.15,
      ease: "power1.out",
    }, 1.9);

    tl.to(letters, {
      color: "#FFFFFF",
      textShadow: "0 0 0px rgba(214, 178, 110, 0)",
      duration: 0.40,
      stagger: 0.15,
      ease: "power1.in",
    }, 2.2);

    // Stop gold sparkles spawning at the transition start (4.0s)
    tl.call(() => {
      spawnGold = false;
    }, [], 4.0);

    // EXIT PIVOT: slowly fade away (opacity 1 -> 0, scale 1 -> 0.98, duration 1.0s, start at 4.0s)
    tl.to(titleRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 1.0,
      ease: "power2.inOut",
    }, 4.0);

    // TRANSITION: Fade out the container (starts at 4.0s, duration 0.75s)
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.75,
      ease: "power2.inOut",
    }, 4.0);

    // Prevent blocking clicks on components underneath
    tl.set(containerRef.current, { pointerEvents: "none" }, 4.0);

    // Call onStartFade to trigger homepage fade-in (4.0s)
    tl.call(() => {
      if (onStartFadeRef.current) onStartFadeRef.current();
      window.dispatchEvent(new Event("pivot-intro-start-play"));
    }, [], 4.0);

    // Call onComplete to unmount the preloader (5.0s)
    tl.call(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, [], 5.0);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
      cursorParticles.length = 0;
      cachedLetters.length = 0;
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, []);



  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#151D2B] bg-noise select-none overflow-hidden"
      style={{
        background: "radial-gradient(circle at top, #243247 0%, #1A2333 45%, #151D2B 100%)"
      }}
    >
      {/* Graphite overlay to fade out during Stage 1 */}
      <div 
        ref={blackOverlayRef} 
        className="absolute inset-0 bg-[#151D2B] z-20 pointer-events-none" 
      />

      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />
      
      <div 
        ref={wrapperRef}
        className="w-full h-full flex flex-col items-center justify-center relative z-10"
        style={{ transformOrigin: "center center" }}
      >
        {/* Phase 1: PIVOT Logo */}
        <div
          ref={titleRef}
          id="intro-title"
          className="flex font-heading font-black uppercase select-none leading-none text-[72px] md:text-[120px] lg:text-[clamp(160px,18vw,340px)] text-white absolute"
          style={{
            letterSpacing: "normal",
            transformOrigin: "center center",
            width: "80%",
            justifyContent: "center",
          }}
        >
          <span className="intro-letter inline-block opacity-0">P</span>
          <span className="intro-letter inline-block opacity-0">I</span>
          <span className="intro-letter inline-block opacity-0">V</span>
          <span className="intro-letter inline-block opacity-0">O</span>
          <span className="intro-letter inline-block opacity-0">T</span>
        </div>


      </div>
    </div>
  );
}

export default Intro;
