"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/Button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer({ hideCTA = false, ourStoryTheme = false, transparent = false }: { hideCTA?: boolean; ourStoryTheme?: boolean; transparent?: boolean }) {
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const footerGroupRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const headlineRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLParagraphElement>(null);
  const btnWrapperRef = useRef<HTMLDivElement>(null);

  // Footer Redesign Refs
  const footerLinksRef = useRef<HTMLDivElement>(null);
  const footerCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const logoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const companyColRef = useRef<HTMLDivElement>(null);
  const servicesColRef = useRef<HTMLDivElement>(null);
  const contactColRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@pivot.studio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!hideCTA) {
      // Initial state: Headline is fully visible at startup, others are hidden and masked
      gsap.set(headlineRef.current, { autoAlpha: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(buildRef.current, { autoAlpha: 0, y: 40, scale: 0.97, clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(btnWrapperRef.current, { autoAlpha: 0, y: 40, scale: 0.97, clipPath: "inset(100% 0% 0% 0%)" });

      // Initial background video opacity and overlay shading states
      gsap.set(videoRef.current, { opacity: 1 });
      gsap.set(overlayRef.current, { opacity: 0.65 });

      // Initialize footer elements to hidden state for staggered reveal animation (prevents FOUC)
      gsap.set([
        logoRef.current,
        socialRef.current,
        companyColRef.current,
        servicesColRef.current,
        contactColRef.current,
        bottomBarRef.current
      ], { opacity: 0, y: 35 });
    } else {
      // If hiding CTA, instantly show the footer items
      gsap.set([
        logoRef.current,
        socialRef.current,
        companyColRef.current,
        servicesColRef.current,
        contactColRef.current,
        bottomBarRef.current
      ], { opacity: 1, y: 0 });
    }

    const parentContainer = parentContainerRef.current;
    const footerGroup = footerGroupRef.current;

    // Multi-stage Pinned ScrollTrigger timeline on the parent wrapper (only if CTA is active)
    let tl: gsap.core.Timeline | null = null;
    if (!hideCTA && parentContainer && footerGroup) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentContainer,
          start: "top top",      // pin begins when top of CTA reaches top of viewport
          end: () => `+=${window.innerHeight * 2.2 + (footerGroupRef.current?.offsetHeight || 650)}`, // scroll track length while pinned
          scrub: 1.0,            // maximum scrub damping for buttery smooth 60fps tracking
          pin: true,             // pin parent container
          invalidateOnRefresh: true,
        }
      });

      // --- STAGE 1 & 2: Headline Exit (starts at 0.3) & Subtitle Entrance (starts at 0.4) ---
      tl.to(headlineRef.current, {
        autoAlpha: 0,
        y: -50,
        scale: 0.97,
        clipPath: "inset(0% 0% 100% 0%)", // wipe bottom-to-top
        duration: 0.2,
        ease: "power2.inOut"
      }, 0.3);

      tl.to(buildRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)", // wipe top-to-bottom
        duration: 0.18,
        ease: "power2.out"
      }, 0.4);

      // --- STAGE 3: Buttons Entrance below visible subtitle (starts at 0.72) ---
      tl.to(btnWrapperRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)", // wipe top-to-bottom
        duration: 0.18,
        ease: "power2.out"
      }, 0.72);

      // --- STAGE 4: Winding Down (starts at 0.90) ---
      tl.to(videoRef.current, {
        opacity: 0.78,
        duration: 0.25,
        ease: "power1.inOut"
      }, 0.90);

      tl.to(overlayRef.current, {
        opacity: 0.85,
        duration: 0.25,
        ease: "power1.inOut"
      }, 0.90);

      // --- STAGE 5: Footer Reveal (emerging from below) ---
      tl.fromTo(footerGroup,
        { y: 0 },
        {
          y: () => -(footerGroupRef.current?.offsetHeight || 650),
          duration: 0.6,
          ease: "power2.out"
        },
        1.4
      );

      // Synchronize the staggered reveal of the footer elements
      tl.fromTo(
        [
          logoRef.current,
          socialRef.current,
          companyColRef.current,
          servicesColRef.current,
          contactColRef.current,
          bottomBarRef.current
        ].filter(Boolean),
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: "power2.out"
        },
        1.5
      );
    }

    // --- FOOTER CANVAS BACKDROP RENDERER ---
    const footerCanvas = footerCanvasRef.current;
    let fFrameId: number;
    let handleFooterResize = () => {};

    // Track mouse coordinates for footer interactive particles (Our Story only)
    let fMouseX = -1000;
    let fMouseY = -1000;
    let fMouseActive = false;

    const handleFooterMouseMove = (e: MouseEvent) => {
      if (!footerCanvas) return;
      const rect = footerCanvas.getBoundingClientRect();
      fMouseX = e.clientX - rect.left;
      fMouseY = e.clientY - rect.top;
      fMouseActive = true;
    };

    const handleFooterMouseLeave = () => {
      fMouseX = -1000;
      fMouseY = -1000;
      fMouseActive = false;
    };

    const footerLinksElement = footerLinksRef.current;
    if (ourStoryTheme && footerLinksElement) {
      footerLinksElement.addEventListener("mousemove", handleFooterMouseMove);
      footerLinksElement.addEventListener("mouseleave", handleFooterMouseLeave);
    }

    if (footerCanvas) {
      const fctx = footerCanvas.getContext("2d");
      if (fctx) {
        let fwidth = (footerCanvas.width = footerCanvas.clientWidth || window.innerWidth);
        let fheight = (footerCanvas.height = footerCanvas.clientHeight || 600);

        handleFooterResize = () => {
          if (!footerCanvas) return;
          fwidth = footerCanvas.width = footerCanvas.clientWidth || window.innerWidth;
          fheight = footerCanvas.height = footerCanvas.clientHeight || 600;
        };
        window.addEventListener("resize", handleFooterResize);

        interface FParticle {
          x: number;
          y: number;
          homeX: number;
          homeY: number;
          vx: number;
          vy: number;
          size: number;
          color: string;
          shape: "circle" | "square" | "diamond" | "glow";
          alpha?: number;
        }

        const fParticles: FParticle[] = [];

        if (ourStoryTheme) {
          const colors = [
            "#59E1D6", // Pivot Teal
            "#39C8C9", // Soft Cyan
            "#1B4D63", // Deep Blue
            "rgba(255, 255, 255, 0.25)" // Small White Highlights
          ];
          const shapes: FParticle["shape"][] = ["circle", "square", "diamond", "glow"];

          for (let i = 0; i < 200; i++) {
            const x = Math.random() * fwidth;
            const y = Math.random() * fheight;
            fParticles.push({
              x: x,
              y: y,
              homeX: x,
              homeY: y,
              vx: (Math.random() - 0.5) * 0.22,
              vy: (Math.random() - 0.5) * 0.22,
              size: Math.random() * 2.2 + 0.8,
              color: colors[Math.floor(Math.random() * colors.length)],
              shape: shapes[Math.floor(Math.random() * shapes.length)],
            });
          }
        } else {
          for (let i = 0; i < 22; i++) {
            fParticles.push({
              x: Math.random() * fwidth,
              y: Math.random() * fheight,
              homeX: 0,
              homeY: 0,
              size: Math.random() * 1.3 + 0.4,
              vx: (Math.random() - 0.5) * 0.1,
              vy: -Math.random() * 0.2 - 0.05,
              color: "rgba(57, 200, 201, 1)",
              shape: "circle",
              alpha: Math.random() * 0.35 + 0.1,
            });
          }
        }

        let fOffset = 0;

        const renderFooter = () => {
          fctx.clearRect(0, 0, fwidth, fheight);

          // Deep navy gradient backdrop matching Pivots brand colors (#071827 -> #0B2238)
          const bgGrad = fctx.createLinearGradient(0, 0, 0, fheight);
          bgGrad.addColorStop(0, "#071827");
          bgGrad.addColorStop(1, "#0B2238");
          fctx.fillStyle = bgGrad;
          fctx.fillRect(0, 0, fwidth, fheight);

          // Moving network grid texture lines (extremely low 5% opacity)
          fOffset += 0.08;
          fctx.strokeStyle = "rgba(57, 200, 201, 0.04)";
          fctx.lineWidth = 0.5;
          const spacing = 95;
          for (let x = (fOffset % spacing); x < fwidth; x += spacing) {
            fctx.beginPath();
            fctx.moveTo(x, 0);
            fctx.lineTo(x, fheight);
            fctx.stroke();
          }
          for (let y = (fOffset % spacing); y < fheight; y += spacing) {
            fctx.beginPath();
            fctx.moveTo(0, y);
            fctx.lineTo(fwidth, y);
            fctx.stroke();
          }

          // Edge vignette overlay shading
          const fVignette = fctx.createRadialGradient(fwidth / 2, fheight / 2, Math.min(fwidth, fheight) * 0.5, fwidth / 2, fheight / 2, Math.max(fwidth, fheight) * 0.95);
          fVignette.addColorStop(0, "rgba(0, 0, 0, 0)");
          fVignette.addColorStop(1, "rgba(7, 24, 39, 0.72)");
          fctx.fillStyle = fVignette;
          fctx.fillRect(0, 0, fwidth, fheight);

          // Soft teal ambient center glow
          const fSpot = fctx.createRadialGradient(fwidth / 2, fheight / 2, 0, fwidth / 2, fheight / 2, Math.min(fwidth, fheight) * 0.75);
          fSpot.addColorStop(0, "rgba(57, 200, 201, 0.05)");
          fSpot.addColorStop(1, "rgba(0, 0, 0, 0)");
          fctx.fillStyle = fSpot;
          fctx.fillRect(0, 0, fwidth, fheight);

          // Render particles based on theme
          if (ourStoryTheme) {
            fParticles.forEach((p) => {
              p.homeX += p.vx;
              p.homeY += p.vy;

              if (p.homeX < 0) p.homeX = fwidth;
              if (p.homeX > fwidth) p.homeX = 0;
              if (p.homeY < 0) p.homeY = fheight;
              if (p.homeY > fheight) p.homeY = 0;

              let targetX = p.homeX;
              let targetY = p.homeY;

              if (fMouseActive) {
                const dx = fMouseX - p.x;
                const dy = fMouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const mouseRadius = 220;

                if (dist < mouseRadius) {
                  const force = (mouseRadius - dist) / mouseRadius;
                  targetX = p.homeX + (dx * force * 0.45);
                  targetY = p.homeY + (dy * force * 0.45);
                }
              }

              p.x += (targetX - p.x) * 0.07;
              p.y += (targetY - p.y) * 0.07;

              fctx.fillStyle = p.color;

              if (p.shape === "circle") {
                fctx.beginPath();
                fctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                fctx.fill();
              } else if (p.shape === "square") {
                fctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
              } else if (p.shape === "diamond") {
                fctx.beginPath();
                fctx.moveTo(p.x, p.y - p.size * 1.3);
                fctx.lineTo(p.x + p.size * 1.3, p.y);
                fctx.lineTo(p.x, p.y + p.size * 1.3);
                fctx.lineTo(p.x - p.size * 1.3, p.y);
                fctx.closePath();
                fctx.fill();
              } else if (p.shape === "glow") {
                fctx.beginPath();
                fctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                fctx.fill();

                fctx.fillStyle = "rgba(89, 225, 214, 0.12)";
                fctx.beginPath();
                fctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
                fctx.fill();
              }
            });

            // Draw connection paths near mouse
            if (fMouseActive) {
              for (let i = 0; i < fParticles.length; i++) {
                const p1 = fParticles[i];
                const dxM = fMouseX - p1.x;
                const dyM = fMouseY - p1.y;
                const distM = Math.sqrt(dxM * dxM + dyM * dyM);

                if (distM < 130) {
                  for (let j = i + 1; j < fParticles.length; j++) {
                    const p2 = fParticles[j];
                    const dxP = p2.x - p1.x;
                    const dyP = p2.y - p1.y;
                    const distP = Math.sqrt(dxP * dxP + dyP * dyP);

                    if (distP < 70) {
                      const dxM2 = fMouseX - p2.x;
                      const dyM2 = fMouseY - p2.y;
                      const distM2 = Math.sqrt(dxM2 * dxM2 + dyM2 * dyM2);

                      if (distM2 < 130) {
                        const alpha = (1 - (distP / 70)) * (1 - (distM / 130)) * 0.16;
                        fctx.strokeStyle = `rgba(89, 225, 214, ${alpha})`;
                        fctx.lineWidth = 0.5;
                        fctx.beginPath();
                        fctx.moveTo(p1.x, p1.y);
                        fctx.lineTo(p2.x, p2.y);
                        fctx.stroke();
                      }
                    }
                  }
                }
              }
            }
          } else {
            fParticles.forEach((p) => {
              p.x += p.vx;
              p.y += p.vy;
              if (p.x < 0) p.x = fwidth;
              if (p.x > fwidth) p.x = 0;
              if (p.y < 0) p.y = fheight;

              fctx.fillStyle = `rgba(57, 200, 201, ${p.alpha || 0.2})`;
              fctx.beginPath();
              fctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              fctx.fill();
            });
          }

          fFrameId = requestAnimationFrame(renderFooter);
        };

        renderFooter();
      }
    }

    // Force refresh coordinates to calculate pin offsets correctly
    ScrollTrigger.refresh();

    return () => {
      if (tl) tl.kill();
      if (footerCanvas) {
        window.removeEventListener("resize", handleFooterResize);
        cancelAnimationFrame(fFrameId);
        if (ourStoryTheme && !transparent && footerLinksElement) {
          footerLinksElement.removeEventListener("mousemove", handleFooterMouseMove);
          footerLinksElement.removeEventListener("mouseleave", handleFooterMouseLeave);
        }
      }
    };
  }, [hideCTA, ourStoryTheme, transparent]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      ref={parentContainerRef} 
      className={cn(
        "w-full relative overflow-hidden z-20",
        transparent ? "bg-transparent" : (hideCTA ? "bg-[#071827]" : "h-screen bg-[#04111F]")
      )}
    >
      {/* Pinned Pre-Footer CTA Section (Unmodified) */}
      {!hideCTA && (
        <section
          ref={ctaContainerRef}
          className="w-full h-full relative bg-[#071827] select-none text-white overflow-hidden z-10"
        >
        {/* Looping autoplaying cinematic background video */}
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/v9znuxjo/video/upload/v1784185305/309178_zih95r.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          style={{
            filter: "brightness(0.85) contrast(1.18)"
          }}
        />

        {/* Premium Navy Overlay + Vignette Shield */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(7, 24, 39, 0.45) 0%, rgba(7, 24, 39, 0.98) 100%), #071827"
          }}
        />

        {/* Soft teal ambient glow behind headline */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none z-10"
          style={{
            background: "radial-gradient(circle, rgba(57, 200, 201, 0.14) 0%, rgba(57, 200, 201, 0) 70%)"
          }}
        />

        <div className="relative w-full h-full pointer-events-none z-20">
          
          {/* Stage 1: Headline Block (starts fully visible, then fades/clips) */}
          <div 
            ref={headlineRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          >
            <h2 
              className="text-[#F8FAFC] tracking-tight select-none"
              style={{
                fontSize: "clamp(2.5rem, 4.8vw, 4.2rem)",
                fontWeight: 900,
                lineHeight: "0.98",
                letterSpacing: "-0.03em",
                maxWidth: "60vw"
              }}
            >
              Every great journey starts with one brave decision.
            </h2>
          </div>

          {/* Stage 2-3: Main CTA Block (Subtitle & Buttons grouped together) */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          >
            <div className="max-w-[60vw] flex flex-col items-center justify-center gap-8 pointer-events-auto">
              {/* Subtitle (fades in, remains visible) */}
              <p 
                ref={buildRef}
                className="font-heading select-none"
                style={{ 
                  color: "rgba(248, 250, 252, 0.72)",
                  fontSize: "clamp(2.0rem, 4vw, 3.2rem)",
                  fontWeight: 600,
                  lineHeight: "1.2",
                  letterSpacing: "-0.02em",
                  clipPath: "inset(100% 0% 0% 0%)"
                }}
              >
                Let&apos;s Build Your Future Together.
              </p>

              {/* Buttons (fade in below subtitle, remain visible) */}
              <div 
                ref={btnWrapperRef}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                style={{ clipPath: "inset(100% 0% 0% 0%)" }}
              >
                <Link href="/contact">
                  <Button
                    variant="primary"
                    magnetic={true}
                    className="h-[60px] px-8 rounded-[20px] text-sm uppercase tracking-wider shadow-lg bg-[#27A7A2] hover:bg-[#1F6FA9] border-transparent text-white"
                  >
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/contact/book-consultation">
                  <Button
                    variant="secondary"
                    magnetic={true}
                    className="h-[60px] px-8 rounded-[20px] text-sm uppercase tracking-wider border border-[#27A7A2] bg-transparent text-white hover:bg-[#27A7A2] hover:border-[#27A7A2]"
                  >
                    Book Discovery Call
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
      )}

      {/* Grouping visual divider and footer links into one sliding panel */}
      <div 
        ref={footerGroupRef} 
        className={cn(
          "w-full z-20",
          hideCTA ? "relative" : "absolute top-full left-0"
        )}
      >
        {/* Visual Divider: 1px Teal Gradient Separator + 135px/50px spacing space */}
        <div 
          className={cn(
            "w-full flex items-center justify-center relative z-10",
            transparent ? "h-[135px] bg-transparent" : (ourStoryTheme ? "h-[135px] bg-gradient-to-b from-[#071827] to-[#0A1F33]" : "h-[50px] bg-[#071827]")
          )}
        >
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#27A7A2]/30 to-transparent absolute top-0" />
        </div>

        {/* Redesigned Footer Section - Inspired by KOTA Layout */}
        <footer
          ref={footerLinksRef}
          className={cn(
            "w-full relative py-24 px-8 sm:px-12 md:px-20 lg:px-24 overflow-hidden z-10",
            transparent ? "bg-transparent" : "bg-gradient-to-b from-[#071827] to-[#0B2238]"
          )}
        >
          {!transparent && ourStoryTheme && (
            <>
              {/* Loop, autoplay, muted background video with 2.5px blur */}
              <video
                src="https://res.cloudinary.com/v9znuxjo/video/upload/v1784270759/footer_n8mcyl.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="footer-bg-video absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-0"
                style={{ filter: "blur(2.5px)", transition: "opacity 1.0s ease" }}
              />
              {/* Dark Navy Overlay Gradient above video */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, rgba(7, 24, 39, 0.78) 0%, rgba(14, 36, 56, 0.82) 100%)"
                }}
              />
            </>
          )}

          {/* Premium canvas background rendering network texture, vignettes and drifting particles */}
          {!transparent && (
            <canvas ref={footerCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
          )}

          <div className="relative max-w-[1400px] mx-auto z-10 grid grid-cols-1 md:grid-cols-12 gap-16 pb-20">
            
            {/* Column 1 - Brand Info */}
            <div ref={logoRef} className="md:col-span-4 space-y-8 text-left">
              <Link href="/" className="text-3xl font-heading font-extrabold tracking-widest text-[#F8FAFC]">
                PIVOT<span className="text-[#27A7A2]">.</span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                Building intelligent software solutions that help businesses innovate, scale, and grow.
              </p>
              
              {/* Social Icons list with hover teal glowing effects */}
              <div ref={socialRef} className="flex items-center gap-4 pt-2">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="LinkedIn Profile" 
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-[#27A7A2] hover:border-[#27A7A2]/50 hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(57,200,201,0.55)] transition-all duration-300 bg-white/5"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="GitHub Repository" 
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-[#27A7A2] hover:border-[#27A7A2]/50 hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(57,200,201,0.55)] transition-all duration-300 bg-white/5"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram Account" 
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-[#27A7A2] hover:border-[#27A7A2]/50 hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(57,200,201,0.55)] transition-all duration-300 bg-white/5"
                >
                  <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="X Account" 
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-[#27A7A2] hover:border-[#27A7A2]/50 hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(57,200,201,0.55)] transition-all duration-300 bg-white/5"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2 - Company Section */}
            <div ref={companyColRef} className="md:col-span-2 space-y-6 text-left">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Company</h4>
              <ul className="space-y-4 text-xs font-semibold uppercase tracking-wider">
                <li>
                  <Link href="/about" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>About Us</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>Services</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>Projects</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>Contact</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Services Section */}
            <div ref={servicesColRef} className="md:col-span-3 space-y-6 text-left">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Services</h4>
              <ul className="space-y-4 text-xs font-semibold uppercase tracking-wider">
                <li>
                  <Link href="/services/web-development" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>Website Development</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/web-applications" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>Web Applications</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/mobile-applications" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>Mobile Applications</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/cloud-applications" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>Cloud Applications</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/ai-solutions" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>AI Solutions</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/custom-software" className="group flex items-center gap-1.5 text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                    <span>Custom Software</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px]">
                      →
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Contact Info */}
            <div ref={contactColRef} className="md:col-span-3 space-y-6 text-left">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
              <div className="space-y-4">
                
                {/* Stateful Email interaction with click-to-copy */}
                <div className="space-y-1">
                  <span className="block text-xs uppercase tracking-wider text-white/40 font-bold">Email</span>
                  <div className="flex items-center gap-3">
                    <a 
                      href="mailto:hello@pivot.studio"
                      className="text-[#F8FAFC] hover:text-[#27A7A2] transition-all duration-300 font-semibold border-b border-white/20 hover:border-[#27A7A2] pb-0.5 hover:drop-shadow-[0_0_8px_rgba(57,200,201,0.45)]"
                    >
                      hello@pivot.studio
                    </a>
                    <button
                      onClick={copyEmail}
                      className="text-[9px] uppercase tracking-widest text-[#27A7A2] hover:text-[#39C8C9] border border-[#27A7A2]/30 hover:border-[#27A7A2] px-2 py-0.5 rounded transition-all duration-200"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Clickable Phone Number */}
                <div className="space-y-1">
                  <span className="block text-xs uppercase tracking-wider text-white/40 font-bold">Phone</span>
                  <a 
                    href="tel:+919999999999"
                    className="block text-[#F8FAFC] hover:text-[#27A7A2] transition-all duration-300 font-semibold border-b border-transparent hover:border-[#27A7A2] pb-0.5 inline-block"
                  >
                    +91 99999 99999
                  </a>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <span className="block text-xs uppercase tracking-wider text-white/40 font-bold">Location</span>
                  <span className="block text-[#F8FAFC]/80 font-semibold">India</span>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Footer Area */}
          <div ref={bottomBarRef} className="relative max-w-[1400px] mx-auto border-t border-white/10 pt-8 z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50">
              <div className="text-center md:text-left space-y-1">
                <span className="block">&copy; 2026 Pivot Software & Consultants.</span>
                <span className="block text-white/30 text-[10px]">All Rights Reserved.</span>
              </div>

              <span className="text-white/40 text-center md:text-left max-w-xs md:max-w-none">
                Designed & Developed by Pivot Software & Consultants.
              </span>

              {/* Back To Top Button with chevron translate animation */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 py-2.5 px-5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300 cursor-pointer shadow-sm outline-none font-semibold uppercase tracking-wider text-[10px]"
                aria-label="Scroll Back to Top"
              >
                <span>Back To Top</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-[#27A7A2]" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
