"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/Button";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TechNode {
  label: string;
  emoji: string;
  tagline: string;
  x: number; // offset coordinate X in SVG viewbox (600x600 space, center is 300, 300)
  y: number; // offset coordinate Y in SVG viewbox
  path: string;
}

// Nodes positioned in a mathematically perfect circle (Radius = 210px)
const nodes: TechNode[] = [
  {
    label: "Web Development",
    emoji: "🌐",
    tagline: "Modern, responsive websites that grow your business.",
    x: -182,
    y: -105,
    path: "/services/web-development"
  },
  {
    label: "Cloud Services",
    emoji: "☁",
    tagline: "Secure, scalable cloud infrastructure.",
    x: 182,
    y: -105,
    path: "/services/cloud-hosting-services"
  },
  {
    label: "AI Solutions",
    emoji: "🤖",
    tagline: "Intelligent automation powered by modern AI.",
    x: 182,
    y: 105,
    path: "/services/web-applications"
  },
  {
    label: "Mobile Applications",
    emoji: "📱",
    tagline: "Native and cross-platform mobile experiences.",
    x: 0,
    y: 210,
    path: "/services/mobile-applications"
  },
  {
    label: "Web Applications",
    emoji: "💻",
    tagline: "Powerful business software for modern workflows.",
    x: -182,
    y: 105,
    path: "/services/web-applications"
  },
  {
    label: "Custom Software",
    emoji: "⚙",
    tagline: "Tailor-made software built around your business.",
    x: 0,
    y: -210,
    path: "/services/custom-software-development"
  }
];

export function AboutPivot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const orbitWrapperRef = useRef<HTMLDivElement>(null);
  
  // Left content refs
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Self-assembling scroll timeline sequence
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    
    // Set initial position of ecosystem exactly centered horizontally and vertically on the viewport
    let deltaX = 0;
    let deltaY = 0;
    if (isDesktop && visualContainerRef.current) {
      const rect = visualContainerRef.current.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const containerCenterX = rect.left + rect.width / 2;
      const containerCenterY = rect.top + rect.height / 2;
      deltaX = centerX - containerCenterX;
      deltaY = centerY - containerCenterY;
    }

    gsap.set(visualContainerRef.current, {
      x: deltaX,
      y: deltaY
    });

    // Set initial hidden states to prevent flashing of nodes, lines, or left side content
    gsap.set(".tech-node-el", { scale: 0, opacity: 0 });
    gsap.set([textWrapperRef.current, buttonRef.current], { opacity: 0, y: 30 });
    if (svgRef.current) {
      gsap.set(svgRef.current, { opacity: 0 });
    }

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      }
    });

    // 1. Pivot core appears first alone at center
    mainTl.fromTo(coreRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
    );

    // Hold core logo alone for about one second
    mainTl.to({}, { duration: 1.0 });

    // 2. SVG lines grow/fade in
    mainTl.fromTo(svgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    );

    // Lines glow dashOffset grows
    mainTl.fromTo(".dash-line-vis",
      { strokeDashoffset: 1000, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.8, duration: 1.2, ease: "power2.out" },
      "-=0.4"
    );

    // Six nodes appear one by one sequentially
    nodes.forEach((_, idx) => {
      mainTl.fromTo(`.node-container-${idx}`,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.4)" },
        "-=0.22"
      );
    });

    // Delay after node assembly completes
    mainTl.to({}, { duration: 0.6 });

    // 3. Move visual ecosystem container smoothly to the final split-screen position (x: 0, y: 0)
    const finalX = 0;
    mainTl.to(visualContainerRef.current, {
      x: finalX,
      y: 0,
      duration: 1.4,
      ease: "power3.inOut"
    });

    // 4. Left side content fades/slides up
    mainTl.fromTo([textWrapperRef.current, buttonRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.6"
    );

    // 5. Start continuous circular rotation (orbiting motion) of lines & nodes, keeping core stable
    mainTl.to(orbitWrapperRef.current, {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: "none"
    });
    // Counter-rotate nodes to keep cards and text labels perfectly upright/readable
    mainTl.to(".tech-node-el", {
      rotation: -360,
      duration: 40,
      repeat: -1,
      ease: "none"
    }, "-=40");

    // Viewport scroll out fade & upward movement transition
    const leaveAnim = gsap.to(containerRef.current, {
      opacity: 0,
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      mainTl.kill();
      leaveAnim.scrollTrigger?.kill();
      leaveAnim.kill();
    };
  }, []);

  // 3D Parallax shift on cursor coordinates movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = visualContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range: -0.5 to 0.5

    // Delicate 3D tilt coordinates rotation
    gsap.to(container, {
      rotateX: -y * 8,
      rotateY: x * 8,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    });

    // Shift background connection canvas
    if (svgRef.current) {
      gsap.to(svgRef.current, {
        x: x * 8,
        y: y * 8,
        duration: 0.65,
        ease: "power2.out",
      });
    }

    // Translate coordinates shifts for each circular node el
    gsap.to(".tech-node-el", {
      x: (index) => (index % 2 === 0 ? x * 12 : -x * 8),
      y: (index) => (index % 2 === 0 ? y * 12 : -y * 8),
      duration: 0.6,
      ease: "power2.out",
    });
  };

  // Reset sways and tilt properties on cursor leave
  const handleMouseLeave = () => {
    const container = visualContainerRef.current;
    if (!container) return;

    gsap.to(container, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    if (svgRef.current) {
      gsap.to(svgRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    gsap.to(".tech-node-el", {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen relative flex items-center justify-center py-32 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#071A2F] overflow-hidden select-none"
    >
      {/* 2.5% Opacity noise grain overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.025] bg-noise" />

      {/* Subtle digital grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0 pointer-events-none" />

      {/* Immersive background particles & ambient flows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Ambient background glows */}
        <div className="absolute top-[15%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#1F6FA9]/10 blur-[130px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#27A7A2]/8 blur-[120px]" />
        
        {/* Animated stars in background */}
        <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[15%] left-[45%] opacity-20 animate-pulse" />
        <div className="absolute w-[3px] h-[3px] bg-white rounded-full top-[42%] left-[85%] opacity-35 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute w-[2px] h-[2px] bg-[#6FD7B7] rounded-full top-[68%] left-[25%] opacity-25 animate-pulse" style={{ animationDelay: '2.8s' }} />
      </div>

      <div className="max-w-[1500px] w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-center">
        
        {/* Left Side: Storytelling Content Column */}
        <div className="lg:col-span-6 flex flex-col justify-center h-full relative z-30 text-left pt-6 pb-6 select-text">
          
          {/* Subtle low-opacity digital network background graphic in top-left empty space */}
          <div className="absolute -top-[16%] -left-[8%] w-[280px] h-[180px] opacity-15 pointer-events-none z-0">
            <svg viewBox="0 0 300 200" className="w-full h-full text-[#1F6FA9]" stroke="currentColor" fill="none">
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              <circle cx="150" cy="120" r="2.5" fill="currentColor" />
              <circle cx="250" cy="60" r="3.5" fill="currentColor" className="animate-pulse" />
              <line x1="50" y1="50" x2="150" y2="120" strokeWidth="0.75" strokeDasharray="3,3" />
              <line x1="150" y1="120" x2="250" y2="60" strokeWidth="0.75" />
              <line x1="50" y1="50" x2="250" y2="60" strokeWidth="0.5" strokeOpacity="0.5" />
            </svg>
          </div>

          <div ref={textWrapperRef} className="space-y-1 mb-10 relative z-10">
            <span className="text-xs uppercase tracking-[8px] text-[#27A7A2] font-extrabold block">
              ABOUT PIVOT
            </span>
            <p 
              ref={descRef} 
              className="text-[#D9E8F4]/90 text-lg sm:text-xl md:text-2xl leading-[1.65] font-sans font-normal max-w-xl"
            >
              Pivot transforms ambitious ideas into intelligent software solutions that help businesses innovate and grow.
            </p>
          </div>

          <div ref={buttonRef} className="relative z-10">
            <Button
              variant="primary"
              magnetic={true}
              onClick={() => {
                window.location.href = "/contact";
              }}
              className="h-[58px] px-8 rounded-xl text-base bg-gradient-to-br from-[#12446A] via-[#1B7898] to-[#27A7A2]"
            >
              Start Your Project
            </Button>
          </div>
        </div>

        {/* Right Side: Animated Digital Ecosystem Centerpiece */}
        <div
          ref={visualContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-6 relative w-full h-[600px] flex items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* Ambient lighting behind logo core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-[#1F6FA9]/10 via-[#27A7A2]/10 to-transparent blur-[70px] pointer-events-none z-0" />

          {/* Rotating Wrapper containing the orbiting network (lines and nodes) */}
          <div
            ref={orbitWrapperRef}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none origin-center"
          >
            {/* SVG Connection Lines & Animated Flowing Dash Particles */}
            <svg
              ref={svgRef}
              viewBox="0 0 600 600"
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            >
              {nodes.map((node, idx) => {
                const isActive = activeNode === idx;
                
                return (
                  <g key={idx}>
                    {/* Base connection path */}
                    <line
                      x1="300"
                      y1="300"
                      x2={300 + node.x}
                      y2={300 + node.y}
                      stroke={isActive ? "#27A7A2" : "#1F6FA9"}
                      strokeWidth={isActive ? "2" : "1.2"}
                      strokeOpacity={isActive ? "0.9" : "0.35"}
                      className="transition-all duration-300"
                    />
                    {/* Flowing energy particle dashes */}
                    <line
                      x1="300"
                      y1="300"
                      x2={300 + node.x}
                      y2={300 + node.y}
                      stroke={isActive ? "#6FD7B7" : "#27A7A2"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeOpacity="0.8"
                      strokeDasharray="6, 80"
                      className="dash-line-vis"
                      style={{
                        animation: "dashVis 3s linear infinite",
                        animationPlayState: "running",
                        animationDuration: isActive ? "1s" : "3s"
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Technology Nodes Arranged Hexagonally (150px wide) */}
            {nodes.map((node, idx) => {
              const isHovered = activeNode === idx;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveNode(idx)}
                  onMouseLeave={() => setActiveNode(null)}
                  onClick={() => {
                    window.location.href = node.path;
                  }}
                  className={cn(
                    `tech-node-el absolute pointer-events-auto cursor-pointer node-container-${idx} transition-all duration-300`
                  )}
                  style={{
                    left: `calc(50% + ${node.x}px)`,
                    top: `calc(50% + ${node.y}px)`,
                    transform: `translate(-50%, -50%) translateZ(25px)`,
                  }}
                >
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl border transition-all duration-300 text-center select-none w-[150px] relative overflow-hidden",
                      isHovered
                        ? "bg-[#0A2A4A]/80 border-[#1F6FA9] shadow-[0_0_25px_rgba(39,167,162,0.3)] scale-[1.08]"
                        : "bg-[#071A2F]/75 border-white/10 shadow-lg"
                    )}
                  >
                    {/* Subtle teal glow layer behind hovered item */}
                    {isHovered && (
                      <div className="absolute inset-0 bg-[#27A7A2]/5 rounded-xl pointer-events-none" />
                    )}
                    
                    <div className="flex items-center gap-1.5 justify-center w-full">
                      <span className="text-xs transition-opacity duration-300">{node.emoji}</span>
                      <span
                        className={cn(
                          "text-[9px] tracking-wider font-extrabold uppercase transition-colors duration-300 truncate",
                          isHovered ? "text-[#6FD7B7]" : "text-white/70"
                        )}
                      >
                        {node.label}
                      </span>
                    </div>

                    {/* Node Hover Tagline Descriptions */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 6 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="text-[8px] text-[#D9E8F4]/80 leading-normal font-sans tracking-wide text-left"
                        >
                          {node.tagline}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Pivot Core (NOT rotating, keeps logo stable and aligned at center) */}
          <div
            ref={coreRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#071A2F]/90 border border-white/20 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_60px_rgba(31,111,169,0.35),_0_0_60px_rgba(39,167,162,0.35)] z-20 pointer-events-auto cursor-pointer animate-float-logo"
            style={{ transform: "translate(-50%, -50%) translateZ(45px)" }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1F6FA9]/10 via-[#27A7A2]/15 to-transparent animate-pulse" />
            
            {/* Logo image with slight pulse */}
            <img
              src="/logo.png"
              alt="PIVOT Core"
              className="h-11 w-auto object-contain brightness-125 relative z-10 transition-transform duration-300 hover:scale-105"
            />
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dash-line-vis {
          stroke-dasharray: 8;
        }
        @keyframes dashVis {
          to {
            stroke-dashoffset: -1000;
          }
        }
        @keyframes floatLogo {
          0% {
            transform: translate(-50%, -50%) translateZ(45px) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateZ(45px) translateY(-6px);
          }
          100% {
            transform: translate(-50%, -50%) translateZ(45px) translateY(0px);
          }
        }
        .animate-float-logo {
          animation: floatLogo 6s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}

export default AboutPivot;
