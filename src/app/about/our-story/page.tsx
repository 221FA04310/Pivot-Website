"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/sections/Navbar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { ArrowUp } from "lucide-react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardData {
  id: string;
  title: string;
  items: string[];
}

const cardsData: CardData[] = [
  {
    id: "01",
    title: "ORIGIN",
    items: ["Why Pivot", "The Beginning", "First Vision", "Foundation"],
  },
  {
    id: "02",
    title: "PURPOSE",
    items: ["Mission", "Vision", "Commitment", "Growth"],
  },
  {
    id: "03",
    title: "JOURNEY",
    items: ["Milestones", "Progress", "Today", "Tomorrow"],
  },
  {
    id: "04",
    title: "CRAFT",
    items: ["Strategy", "Design", "Engineering", "Delivery"],
  },
  {
    id: "05",
    title: "PEOPLE",
    items: ["Team", "Culture", "Learning", "Careers"],
  },
  {
    id: "06",
    title: "FUTURE",
    items: ["AI", "Cloud", "Innovation", "Beyond"],
  },
];

export default function OurStoryPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubtitleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Ending Section Refs
  const endingTrackRef = useRef<HTMLDivElement>(null);
  const endingPinRef = useRef<HTMLDivElement>(null);
  const endingCanvasWrapperRef = useRef<HTMLDivElement>(null);
  const endingVideoRef = useRef<HTMLVideoElement>(null);
  const endingContentRef = useRef<HTMLDivElement>(null);
  const endingFooterRef = useRef<HTMLDivElement>(null);
  
  const [isAligned, setIsAligned] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@pivot.studio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Avoid running on SSR
    if (typeof window === "undefined") return;

    const cardsContainer = cardsContainerRef.current;
    const hero = heroRef.current;
    const heroSubtitle = heroSubtitleRef.current;
    const track = trackRef.current;
    const pin = pinRef.current;
    const heroVideo = heroVideoRef.current;

    // Ending refs
    const endingTrack = endingTrackRef.current;
    const endingPin = endingPinRef.current;
    const endingCanvasWrapper = endingCanvasWrapperRef.current;
    const endingVideo = endingVideoRef.current;
    const endingContent = endingContentRef.current;
    const endingFooter = endingFooterRef.current;

    if (!cardsContainer || !hero || !heroSubtitle || !track || !pin || !heroVideo ||
        !endingTrack || !endingPin || !endingCanvasWrapper || !endingVideo || !endingContent || !endingFooter) return;

    // --- MOUSE PARALLAX FOR HERO SECTION ---
    const handleHeroMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;

      // Background glows drift the least (max 4px)
      gsap.to(".hero-bg-glow-1", {
        x: nx * -8,
        y: ny * -8,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(".hero-bg-glow-2", {
        x: nx * 8,
        y: ny * 8,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto"
      });

      // PIVOT label wrapper drifts slightly (max 6px)
      gsap.to(".hero-pivot-wrapper", {
        x: nx * 12,
        y: ny * 12,
        duration: 0.95,
        ease: "power2.out",
        overwrite: "auto"
      });

      // OUR STORY title wrapper drifts slightly more (max 12px)
      gsap.to(".hero-heading-wrapper", {
        x: nx * 22,
        y: ny * 22,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto"
      });

      // Editorial text wrapper drifts independently (max 9px)
      gsap.to(".hero-subtitle-wrapper", {
        x: nx * -18,
        y: ny * -18,
        duration: 1.0,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleHeroMouseLeave = () => {
      // Smooth return to base centered coordinates
      gsap.to([
        ".hero-bg-glow-1",
        ".hero-bg-glow-2",
        ".hero-pivot-wrapper",
        ".hero-heading-wrapper",
        ".hero-subtitle-wrapper"
      ], {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const heroContainer = pin;
    if (heroContainer) {
      heroContainer.addEventListener("mousemove", handleHeroMouseMove);
      heroContainer.addEventListener("mouseleave", handleHeroMouseLeave);
    }

    const ctx = gsap.context(() => {
      // --- SECTION 0: CINEMATIC ENTRANCE STAGGER FOR HERO ---
      const entranceTl = gsap.timeline({ delay: 0.25 });
      
      // Ensure absolute transparent starting points for animation elements
      gsap.set(heroVideo, { opacity: 0 });
      gsap.set(".hero-pivot-wrapper", { opacity: 0, y: 15 });
      gsap.set(".hero-heading-wrapper", { opacity: 0, scale: 0.96, y: 12 });
      gsap.set(heroSubtitle, { opacity: 0, x: 20 });

      // Step 1: Video fades in softly first
      entranceTl.to(heroVideo, {
        opacity: 1,
        duration: 1.4,
        ease: "power2.out"
      });

      // Step 2: PIVOT label reveals and floats up
      entranceTl.to(".hero-pivot-wrapper", {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power2.out"
      }, "-=0.7");

      // Step 3: OUR STORY main title scales and fades in
      entranceTl.to(".hero-heading-wrapper", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.6");

      // Step 4: Editorial subtitle slides in
      entranceTl.to(heroSubtitle, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");


      // --- SECTION 1: OUR STORY DECK SCROLL ANIMATIONS ---
      const containerRect = cardsContainer.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      const offsets = cardsData.map((_, index) => {
        const cardWrapper = cardsContainer.querySelector(`.story-card-wrapper-${index}`) as HTMLElement;
        if (!cardWrapper) return { x: 0, y: 0 };
        
        const cardRect = cardWrapper.getBoundingClientRect();
        const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top - containerRect.top + cardRect.height / 2;

        return {
          x: centerX - cardCenterX,
          y: centerY - cardCenterY,
        };
      });

      cardsData.forEach((_, index) => {
        const cardWrapper = cardsContainer.querySelector(`.story-card-wrapper-${index}`) as HTMLElement;
        if (!cardWrapper) return;

        const offset = offsets[index] || { x: 0, y: 0 };
        
        gsap.set(cardWrapper, {
          x: offset.x,
          y: offset.y,
          rotateX: 10,
          rotateY: 180,
          z: -500 - index * 2,
          opacity: 0,
        });
      });

      const tl = gsap.timeline();

      // Step A: Hero text exits (Background video remains visible behind cards!)
      tl.to(hero, {
        y: "-120vh",
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });

      tl.to(heroSubtitle, {
        y: "-60vh",
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, "<");

      tl.to({}, { duration: 0.6 });

      // Step B: Stacked block fades in
      tl.to(".story-card-wrapper", {
        opacity: 1,
        scale: 0.85,
        duration: 0.8,
        ease: "power2.out",
      });

      tl.to({}, { duration: 0.5 });

      // Step C: Cards separate and rotate Y to 0
      cardsData.forEach((_, index) => {
        const cardWrapper = cardsContainer.querySelector(`.story-card-wrapper-${index}`) as HTMLElement;
        if (!cardWrapper) return;

        tl.to(cardWrapper, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          scale: 1,
          duration: 2.5,
          ease: "power4.inOut",
        }, "separate-start");
      });

      // Step D: Content fades in
      tl.fromTo(".story-card-title", 
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.08, 
          ease: "power2.out" 
        },
        "separate-start+=2.0"
      );

      tl.fromTo(".story-card-item", 
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.03, 
          ease: "power2.out" 
        },
        "separate-start+=2.4"
      );

      tl.to({}, { duration: 0.5 });

      // Step E: Fade out the background video smoothly at the very end as the cards section completes
      tl.to(heroVideo, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
      });

      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        animation: tl,
        onUpdate: (self) => {
          if (self.progress >= 0.72) {
            setIsAligned(true);
          } else {
            setIsAligned(false);
          }
        },
      });

      // --- SECTION 2: STORY ENDING & FOOTER REVEAL SCROLL ANIMATIONS ---
      const endingTl = gsap.timeline();

      // Heading block starts centered but slightly lower (y: 30) and invisible
      gsap.set(endingContent, { autoAlpha: 0, y: 30 });
      gsap.set(endingVideo, { opacity: 0 });
      gsap.set(endingCanvasWrapper, { autoAlpha: 1 });
      gsap.set(endingFooter, { autoAlpha: 0, y: 30 });

      // Fade in the ending content, landing at y: 0 (perfect center with navbar padding top)
      endingTl.to(endingContent, {
        autoAlpha: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out"
      }, "cta-fade-in");

      // Hold view while scrolling (giving plenty of interaction space)
      endingTl.to({}, { duration: 1.2 });

      // Smoothly transition CTA and particles out, fade in water video and custom footer
      endingTl.to(endingContent, {
        autoAlpha: 0,
        y: -30,
        duration: 1.0,
        ease: "power2.inOut"
      }, "transition-start");

      endingTl.to(endingCanvasWrapper, {
        autoAlpha: 0,
        duration: 1.0,
        ease: "power2.inOut"
      }, "transition-start");

      endingTl.to(endingVideo, {
        opacity: 0.55, // video fades in smoothly
        duration: 1.2,
        ease: "power2.inOut"
      }, "transition-start+=0.2");

      endingTl.to(endingFooter, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "transition-start+=0.5");

      // Hold the footer at the very end
      endingTl.to({}, { duration: 0.8 });

      ScrollTrigger.create({
        trigger: endingTrack,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        animation: endingTl,
        invalidateOnRefresh: true,
      });
    });

    // Window level cursor movement parallax for the CTA typography container (endingContent)
    const handleEndingMouseMoveGlobal = (e: MouseEvent) => {
      const pX = (e.clientX / window.innerWidth - 0.5) * -12;
      const pY = (e.clientY / window.innerHeight - 0.5) * -12;
      gsap.to(endingContentRef.current, {
        x: pX,
        y: pY,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleEndingMouseDepartureGlobal = () => {
      gsap.to(endingContentRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    window.addEventListener("mousemove", handleEndingMouseMoveGlobal);
    document.addEventListener("mouseleave", handleEndingMouseDepartureGlobal);

    return () => {
      window.removeEventListener("mousemove", handleEndingMouseMoveGlobal);
      document.removeEventListener("mouseleave", handleEndingMouseDepartureGlobal);
      if (heroContainer) {
        heroContainer.removeEventListener("mousemove", handleHeroMouseMove);
        heroContainer.removeEventListener("mouseleave", handleHeroMouseLeave);
      }
      ctx.revert(); 
    };
  }, []);

  return (
    <>
      <Navbar introComplete={true} />
      
      {/* Outer Scroll Track for Deck Reveal */}
      <div 
        ref={trackRef} 
        className="story-scroll-track w-full h-[320vh] relative bg-[#071A2F] text-white"
      >
        {/* Sticky Pinned Viewport Container */}
        <div 
          ref={pinRef} 
          className="story-pin-section sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle noise grain filter */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-noise" />

          {/* Extended background video (covers Hero and continues behind cards!) */}
          <video
            ref={heroVideoRef}
            src="https://res.cloudinary.com/lklwu102/video/upload/v1784272821/our_story_toep19.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-0"
            style={{
              filter: "blur(2px) brightness(0.85) contrast(1.1)",
              transition: "opacity 1.2s ease-in-out"
            }}
          />

          {/* Dark Navy Overlay Gradient above video (62% to 66% opacity for water visibility) */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(7, 24, 39, 0.62) 0%, rgba(11, 26, 44, 0.66) 100%)"
            }}
          />

          {/* Decorative ambient lighting with slow continuous shifts */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#1F6FA9]/8 blur-[130px] opacity-75 hero-bg-glow-1" />
            <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#27A7A2]/8 blur-[150px] opacity-75 hero-bg-glow-2" />
          </div>

          {/* 1. Hero Content Screen */}
          <div 
            ref={heroRef} 
            className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center select-none z-10 pointer-events-none"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className="flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
              {/* Outer Wrapper for Mouse Parallax */}
              <div className="hero-pivot-wrapper opacity-0 pointer-events-none">
                {/* Inner Element for CSS Breathing Animation */}
                <span className="hero-pivot-cinema block text-xs uppercase tracking-[0.4em] text-[#27A7A2] font-black mb-3">
                  PIVOT
                </span>
              </div>
              
              {/* Outer Wrapper for Mouse Parallax */}
              <div className="hero-heading-wrapper relative opacity-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                {/* Subtle light bloom behind OUR STORY */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-[#27A7A2]/5 blur-[80px] pointer-events-none rounded-full hero-bloom-glow z-0" />
                
                {/* Inner Element for CSS Breathing & 3D perspective Animation */}
                <h1 className="hero-heading-cinema relative z-10 text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-black uppercase tracking-tighter text-[#F8FBFC] leading-none">
                  OUR STORY
                </h1>
              </div>
            </div>
          </div>

          {/* Editorial Subtitle (Top Right) */}
          {/* Outer Wrapper for Mouse Parallax */}
          <div 
            ref={heroSubtitleRef}
            className="hero-subtitle-wrapper absolute top-28 right-6 sm:right-12 md:right-20 lg:right-32 text-right z-10 opacity-0 pointer-events-none max-w-xs"
          >
            {/* Inner Element for CSS Breathing Animation */}
            <p className="hero-subtitle-cinema text-[10px] sm:text-xs font-mono font-bold text-[#6FD7B7] tracking-[0.2em] leading-relaxed uppercase">
              THE STORY OF OUR COMPANY,<br />
              OUR PEOPLE,<br />
              OUR JOURNEY,<br />
              AND OUR VISION.
            </p>
          </div>

          {/* 2. Interactive Cards Stack Area */}
          <div 
            ref={cardsContainerRef} 
            className={cn(
              "relative w-full max-w-7xl mx-auto px-6 z-20 flex flex-wrap lg:flex-nowrap justify-center items-center gap-4 transition-all duration-300",
              isAligned ? "cards-aligned" : "pointer-events-none"
            )}
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {cardsData.map((card, idx) => (
              <div
                key={card.id}
                className={cn(
                  `story-card-wrapper story-card-wrapper-${idx} shrink-0 origin-center`,
                  "w-[290px] h-[160px] sm:w-[310px] sm:h-[160px] lg:w-[185px] lg:h-[255px] xl:w-[200px] xl:h-[270px]"
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Middle Layer for continuous out-of-sync Floating Animation */}
                <div 
                  className="story-card-float w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Inner Card (handles premium styling and CSS hover lift) */}
                  <div 
                    className={cn(
                      "story-card w-full h-full p-5 lg:p-6 rounded-2xl flex flex-col justify-between select-none relative overflow-hidden",
                      "bg-gradient-to-b from-[#0D233E]/78 to-[#081E36]/82 border border-[#27A7A2]/45",
                      "shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),_0_20px_50px_rgba(3,10,20,0.6)]",
                      isAligned ? "cursor-pointer" : ""
                    )}
                    style={{ backdropFilter: "blur(12px)" }}
                    onClick={() => {
                      if (isAligned) {
                        console.log(`Card clicked: ${card.title} - Video trigger`);
                      }
                    }}
                  >
                    {/* Subtle glass texture glow inside card */}
                    <div className="absolute inset-0 bg-[#27A7A2]/[0.015] pointer-events-none" />

                    {/* Header/Number */}
                    <div className="flex justify-between items-start">
                      <span className="text-[#27A7A2] text-xs font-mono font-bold tracking-widest">
                        {card.id}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div>
                      <h3 className="story-card-title text-[#F8FBFC] text-lg lg:text-xl xl:text-2xl font-bold tracking-wide uppercase font-heading mb-2 lg:mb-4">
                        {card.title}
                      </h3>
                      {/* Grid representation on mobile (2x2) and vertical list on desktop (lg/xl) */}
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 lg:flex lg:flex-col lg:space-y-1.5 xl:space-y-2">
                        {card.items.map((item, itemIdx) => (
                          <li 
                            key={itemIdx} 
                            className="story-card-item text-[#D9E8F4]/55 text-[10px] sm:text-xs lg:text-[13px] font-sans tracking-wide transition-colors duration-300"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Full-Screen Story Ending Section */}
      <div 
        ref={endingTrackRef} 
        className="story-ending-track w-full h-[220vh] relative bg-[#071827] text-white"
      >
        {/* Sticky Pinned Ending Viewport */}
        <div 
          ref={endingPinRef} 
          className="story-ending-pin sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#071827]"
        >
          {/* Loop, autoplay, muted background video with 2.5px blur */}
          <video
            ref={endingVideoRef}
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
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(7, 24, 39, 0.78) 0%, rgba(14, 36, 56, 0.82) 100%)"
            }}
          />

          {/* Subtle noise grain filter */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.015] bg-noise" />

          {/* WebGL 3D Particle Scene */}
          <div 
            ref={endingCanvasWrapperRef} 
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          >
            <Scene3D />
          </div>

          {/* Central Typography, Supporting Text, and Button (z-30: forefront) */}
          <div 
            ref={endingContentRef} 
            className="relative z-30 flex flex-col items-center justify-center text-center max-w-4xl px-6 pt-[85px] pointer-events-none select-none mx-auto h-full"
          >
            {/* Ambient Pulse Glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full blur-[130px] pointer-events-none z-0"
              style={{
                background: "radial-gradient(circle, rgba(89, 225, 214, 0.08) 0%, rgba(27, 77, 99, 0) 70%)",
                animation: "glowPulse 6s ease-in-out infinite"
              }}
            />

            {/* Split Heading with individual rows for spacing and zero overlap */}
            <div className="flex flex-col items-center gap-y-5 sm:gap-y-6 mb-10 pointer-events-auto">
              <h2 className="text-[#F8FBFC] text-center mx-auto tracking-tight font-heading font-extrabold leading-none text-2xl sm:text-3xl md:text-[2.75rem] xl:text-[3.25rem]">
                Every Great Business
              </h2>
              <h3 className="text-[#59E1D6] text-center mx-auto tracking-tight font-heading font-extrabold leading-none text-xl sm:text-2xl md:text-[2.35rem] xl:text-[2.85rem]">
                Has A Story.
              </h3>
              <h4 className="text-[#F8FBFC] text-center mx-auto tracking-tight font-heading font-extrabold leading-none text-2xl sm:text-3xl md:text-[2.75rem] xl:text-[3.25rem]">
                Let&apos;s Build Yours.
              </h4>
            </div>

            <p className="text-[#D9E8F4]/60 text-center mx-auto text-balance text-xs sm:text-sm md:text-base font-sans max-w-[650px] mb-14 leading-relaxed pointer-events-auto">
              Your vision deserves technology that inspires, performs, and grows with your business. Let&apos;s create something remarkable together.
            </p>

            <div className="pointer-events-auto">
              <Link href="/contact">
                <Button
                  variant="primary"
                  magnetic={true}
                  className="h-[60px] px-8 rounded-full text-xs sm:text-sm uppercase tracking-widest shadow-lg bg-[#27A7A2] border border-[#59E1D6]/30 text-white font-bold hover:shadow-[0_0_25px_rgba(89,225,214,0.35)]"
                >
                  Initiate Your Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Custom Our Story Footer (Cinema Style, no particles, calm water background) */}
          <div 
            ref={endingFooterRef}
            className="absolute inset-0 flex flex-col justify-between px-6 sm:px-12 md:px-20 lg:px-24 py-12 md:py-16 z-40 opacity-0 pointer-events-none select-none max-w-[1400px] mx-auto h-full"
          >
            {/* Visual Separator Line at the top of the footer */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#27A7A2]/20 to-transparent" />

            {/* Footer Columns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 my-auto pt-8">
              {/* Col 1: Logo & Socials */}
              <div className="md:col-span-4 space-y-6 text-left">
                <Link href="/" className="text-3xl font-heading font-extrabold tracking-widest text-[#F8FAFC] pointer-events-auto">
                  PIVOT<span className="text-[#27A7A2]">.</span>
                </Link>
                <p className="text-[#D9E8F4]/60 text-xs sm:text-sm leading-relaxed max-w-sm">
                  Building intelligent software solutions that help businesses innovate, scale, and grow.
                </p>
                
                {/* Social Icons with hover teal glow */}
                <div className="flex items-center gap-4 pt-2 pointer-events-auto">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="LinkedIn Profile" 
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/45 hover:text-[#27A7A2] hover:border-[#27A7A2]/50 hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(57,200,201,0.55)] transition-all duration-300 bg-white/5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="GitHub Repository" 
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/45 hover:text-[#27A7A2] hover:border-[#27A7A2]/50 hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(57,200,201,0.55)] transition-all duration-300 bg-white/5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Instagram Account" 
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/45 hover:text-[#27A7A2] hover:border-[#27A7A2]/50 hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(57,200,201,0.55)] transition-all duration-300 bg-white/5"
                  >
                    <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/45 hover:text-[#27A7A2] hover:border-[#27A7A2]/50 hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(57,200,201,0.55)] transition-all duration-300 bg-white/5"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Col 2: Company Links */}
              <div className="md:col-span-2 space-y-4 text-left pointer-events-auto">
                <h4 className="text-xs uppercase tracking-widest text-[#27A7A2] font-bold">Company</h4>
                <ul className="space-y-3 text-[11px] font-semibold uppercase tracking-wider">
                  <li>
                    <Link href="/about" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Services Links */}
              <div className="md:col-span-3 space-y-4 text-left pointer-events-auto">
                <h4 className="text-xs uppercase tracking-widest text-[#27A7A2] font-bold">Services</h4>
                <ul className="space-y-3 text-[11px] font-semibold uppercase tracking-wider">
                  <li>
                    <Link href="/services/web-development" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      Website Development
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/web-applications" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      Web Applications
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/mobile-applications" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      Mobile Applications
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/cloud-applications" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      Cloud Applications
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/ai-solutions" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      AI Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/custom-software" className="text-white/60 hover:text-[#27A7A2] transition-colors duration-300">
                      Custom Software
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 4: Contact Info */}
              <div className="md:col-span-3 space-y-4 text-left pointer-events-auto">
                <h4 className="text-xs uppercase tracking-widest text-[#27A7A2] font-bold">Contact</h4>
                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-wider text-white/40 font-bold">Email</span>
                    <div className="flex items-center gap-2">
                      <a 
                        href="mailto:hello@pivot.studio"
                        className="text-[#F8FAFC] hover:text-[#27A7A2] transition-all duration-300 font-semibold border-b border-white/10 hover:border-[#27A7A2] pb-0.5 text-xs sm:text-sm"
                      >
                        hello@pivot.studio
                      </a>
                      <button
                        onClick={copyEmail}
                        className="text-[8px] uppercase tracking-widest text-[#27A7A2] hover:text-[#39C8C9] border border-[#27A7A2]/30 px-1.5 py-0.5 rounded transition-all duration-200"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-wider text-white/40 font-bold">Phone</span>
                    <a 
                      href="tel:+919999999999"
                      className="text-[#F8FAFC] hover:text-[#27A7A2] transition-all duration-300 font-semibold text-xs sm:text-sm"
                    >
                      +91 99999 99999
                    </a>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-wider text-white/40 font-bold">Location</span>
                    <span className="text-[#F8FAFC]/80 font-semibold text-xs">India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar with copyright and back to top */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40 pointer-events-auto">
              <div className="text-center sm:text-left">
                <span>&copy; 2026 Pivot Software & Consultants. All Rights Reserved.</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Designed & Developed by Pivot.</span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 cursor-pointer shadow-sm uppercase tracking-widest font-semibold"
                  aria-label="Scroll Back to Top"
                >
                  <span>Back To Top</span>
                  <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300 text-[#27A7A2]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS Inject for safe transitions and custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .story-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.4s ease, 
                      box-shadow 0.4s ease,
                      background-color 0.4s ease;
        }

        /* Continuous subtle float animation on middle layer */
        @keyframes cardFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        /* Delay float triggers until scroll-revealed, assigning out-of-sync delays and durations */
        .cards-aligned .story-card-wrapper-0 .story-card-float {
          animation: cardFloat 6.0s ease-in-out infinite;
          animation-delay: 0.1s;
        }
        .cards-aligned .story-card-wrapper-1 .story-card-float {
          animation: cardFloat 6.8s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        .cards-aligned .story-card-wrapper-2 .story-card-float {
          animation: cardFloat 6.4s ease-in-out infinite;
          animation-delay: 2.4s;
        }
        .cards-aligned .story-card-wrapper-3 .story-card-float {
          animation: cardFloat 7.2s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        .cards-aligned .story-card-wrapper-4 .story-card-float {
          animation: cardFloat 6.6s ease-in-out infinite;
          animation-delay: 1.8s;
        }
        .cards-aligned .story-card-wrapper-5 .story-card-float {
          animation: cardFloat 7.0s ease-in-out infinite;
          animation-delay: 3.0s;
        }
        
        /* Only apply hover effects when ScrollTrigger has fully separated the cards */
        .cards-aligned .story-card-wrapper:hover .story-card {
          transform: translateY(-6px);
          border-color: rgba(39, 167, 162, 0.9);
          background-color: rgba(13, 35, 62, 0.95);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2),
                      0 0 25px rgba(39, 167, 162, 0.35), 
                      0 30px 60px rgba(3, 10, 20, 0.7);
        }

        .cards-aligned .story-card-wrapper:hover .story-card-item {
          color: rgba(217, 232, 244, 0.95);
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.68;
            transform: translate(-50%, -50%) scale(1.0);
          }
          50% {
            opacity: 1.0;
            transform: translate(-50%, -50%) scale(1.12);
          }
        }

        /* --- HERO CINEMATIC ANIMATIONS --- */
        
        /* Heading float + 3D camera rotation keys */
        @keyframes headingCinema {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotateX(0deg) rotateY(0deg) translateZ(0px);
          }
          25% {
            transform: translateY(-2px) translateX(0.5px) rotateX(-0.5deg) rotateY(0.5deg) translateZ(3px);
          }
          50% {
            transform: translateY(-4px) translateX(-0.5px) rotateX(-1deg) rotateY(-0.5deg) translateZ(6px);
          }
          75% {
            transform: translateY(-2px) translateX(-1px) rotateX(-0.5deg) rotateY(-1deg) translateZ(3px);
          }
        }
        .hero-heading-cinema {
          animation: headingCinema 14s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        /* PIVOT label float keys */
        @keyframes pivotCinema {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-2px) translateX(0.5px);
          }
        }
        .hero-pivot-cinema {
          animation: pivotCinema 18s ease-in-out infinite;
        }

        /* Subtitle editorial float keys */
        @keyframes subtitleCinema {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(1.5px) translateX(-1.5px);
          }
        }
        .hero-subtitle-cinema {
          animation: subtitleCinema 16s ease-in-out infinite;
        }

        /* Background glows drift keys */
        @keyframes bgGlowShift1 {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(25px, -15px) scale(1.04);
          }
        }
        @keyframes bgGlowShift2 {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(-35px, 20px) scale(0.96);
          }
        }
        .hero-bg-glow-1 {
          animation: bgGlowShift1 24s ease-in-out infinite;
        }
        .hero-bg-glow-2 {
          animation: bgGlowShift2 28s ease-in-out infinite;
        }

        /* Subtle bloom pulse behind heading */
        @keyframes bloomPulse {
          0%, 100% {
            opacity: 0.05;
            transform: translate(-50%, -50%) scale(0.95);
          }
          50% {
            opacity: 0.08;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
        .hero-bloom-glow {
          animation: bloomPulse 9s ease-in-out infinite;
        }
      `}} />
    </>
  );
}
