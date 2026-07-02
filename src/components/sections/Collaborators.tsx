/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, Body, H3 } from "../ui/Typography";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PartnerCard {
  id: string;
  name: string;
  type: string;
  desc: string;
  banner: string;
  logo: React.ReactNode;
}

export function Collaborators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  
  const [isPaused, setIsPaused] = useState(false);
  const carouselTweenRef = useRef<gsap.core.Tween | null>(null);
  const stripTweenRef = useRef<gsap.core.Tween | null>(null);

  const baseCards: PartnerCard[] = [
    {
      id: "pc-1",
      name: "Acme Corp",
      type: "Cloud Partner",
      desc: "Architecting high-availability secure cloud hosting frameworks.",
      banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
      logo: (
        <svg className="w-5 h-5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
          <polygon points="12,2 22,22 2,22" />
        </svg>
      )
    },
    {
      id: "pc-2",
      name: "Nova AI",
      type: "AI Solutions",
      desc: "Integrating predictive learning models into CRM workflows.",
      banner: "https://images.unsplash.com/photo-150751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80",
      logo: (
        <svg className="w-5 h-5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
    },
    {
      id: "pc-3",
      name: "Stellar",
      type: "Web Development",
      desc: "Co-engineering immersive 3D digital storefront layouts.",
      banner: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
      logo: (
        <svg className="w-5 h-5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    {
      id: "pc-4",
      name: "Vortex Labs",
      type: "Mobile Development",
      desc: "Deploying low-latency iOS/Android React Native stacks.",
      banner: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
      logo: (
        <svg className="w-5 h-5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12" y2="18" />
        </svg>
      )
    },
    {
      id: "pc-5",
      name: "Apex Systems",
      type: "Technology Partner",
      desc: "Configuring secure data transfer pipelines across regions.",
      banner: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80",
      logo: (
        <svg className="w-5 h-5 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z" />
        </svg>
      )
    }
  ];

  // Duplicate cards for seamless continuous scrolling
  const carouselCards = [...baseCards, ...baseCards];

  const brandLogos = [
    { name: "Google", color: "hover:text-[#4285F4] hover:border-[#4285F4]/30" },
    { name: "Microsoft", color: "hover:text-[#F25022] hover:border-[#F25022]/30" },
    { name: "AWS", color: "hover:text-[#FF9900] hover:border-[#FF9900]/30" },
    { name: "Adobe", color: "hover:text-[#FF0000] hover:border-[#FF0000]/30" },
    { name: "Slack", color: "hover:text-[#4A154B] hover:border-[#4A154B]/30" },
    { name: "Stripe", color: "hover:text-[#635BFF] hover:border-[#635BFF]/30" },
    { name: "IBM", color: "hover:text-[#052FAD] hover:border-[#052FAD]/30" },
    { name: "Oracle", color: "hover:text-[#F80000] hover:border-[#F80000]/30" },
    { name: "Cisco", color: "hover:text-[#1BA0D7] hover:border-[#1BA0D7]/30" },
    { name: "SAP", color: "hover:text-[#008FD3] hover:border-[#008FD3]/30" },
    { name: "Salesforce", color: "hover:text-[#00A1E0] hover:border-[#00A1E0]/30" },
    { name: "GitHub", color: "hover:text-[#24292E] hover:border-[#24292E]/30" },
  ];

  const scrollingLogos = [...brandLogos, ...brandLogos];

  // Continuous loop animation for the cards carousel marquee
  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    // Reset position to left edge of container (0px)
    gsap.set(track, { x: 0 });

    // Move track left by exactly width of 1 set: 5 * (280 width + 32 gap) = 1560px
    const tween = gsap.to(track, {
      x: -1560,
      ease: "none",
      repeat: -1,
      duration: 35
    });

    carouselTweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  // Sync tween playback based on state
  useEffect(() => {
    if (carouselTweenRef.current) {
      if (isPaused) {
        carouselTweenRef.current.pause();
      } else {
        carouselTweenRef.current.play();
      }
    }
  }, [isPaused]);

  // Header fade-up scroll animations
  useEffect(() => {
    const intro = introRef.current;
    if (intro) {
      gsap.fromTo(
        intro.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  // Stats count-up animation
  useEffect(() => {
    const statsContainer = statsRef.current;
    if (!statsContainer) return;

    const statsElements = statsContainer.querySelectorAll(".stat-val");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statsContainer,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    statsElements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-value") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      const countObj = { value: 0 };
      
      tl.to(countObj, {
        value: targetVal,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.floor(countObj.value) + suffix;
        }
      }, 0.1);
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Infinite scrolling logo strip animation
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    gsap.set(strip, { x: "0%" });
    const tween = gsap.to(strip, {
      x: "-50%",
      ease: "none",
      repeat: -1,
      duration: 24
    });

    stripTweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full relative min-h-screen flex flex-col justify-center py-[120px] px-6 sm:px-12 md:px-20 bg-[#F7F4EE] border-t border-border/40 select-none overflow-hidden"
    >
      {/* 1. Volumetric lighting and floating dust */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-accent-mutedGold/5 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[400px] rounded-full bg-accent-terracotta/5 blur-[100px] animate-pulse-slow" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col justify-between h-full">
        
        {/* 2. Headline Intro (Centered) */}
        <div 
          ref={introRef}
          className="max-w-[700px] mx-auto text-center flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-widest text-accent-terracotta font-bold">
            COLLABORATORS
          </span>
          <H2 className="uppercase text-foreground/95">Trusted by Visionaries Around the World</H2>
          <Body className="text-foreground/75 leading-relaxed text-sm sm:text-base">
            We partner with startups, enterprises and growing businesses to design, build and scale exceptional digital products.
          </Body>
        </div>

        {/* 3. Sliding Focus Showcase Carousel (Exactly mt-[60px] below header) */}
        <div className="w-full mt-[60px] relative overflow-hidden pointer-events-auto">
          <div 
            ref={carouselTrackRef}
            className="flex gap-[32px] items-center w-max py-4 will-change-transform"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {carouselCards.map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                className={cn(
                  "w-[280px] h-[370px] rounded-[24px] bg-[#FCFBF8]/60 border border-border/40 shadow-premium flex flex-col justify-between p-6 transition-all duration-500 ease-out shrink-0 group cursor-pointer",
                  "hover:-translate-y-1.5 hover:shadow-2xl hover:bg-[#FCFBF8]/90 hover:border-accent-terracotta/40 hover:scale-[1.03]"
                )}
              >
                {/* Large Cover Image with Hover Zoom */}
                <div className="w-full h-[40%] rounded-xl overflow-hidden relative">
                  <img 
                    src={card.banner} 
                    alt={card.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FCFBF8]/60 via-transparent to-transparent opacity-85" />
                </div>
                
                {/* Content Details (Always fully visible) */}
                <div className="flex-1 flex flex-col justify-between pt-4 text-left">
                  <div className="space-y-1.5">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#C96B4A] text-[9px] font-bold text-white uppercase tracking-wider">
                      {card.type}
                    </span>
                    <H3 className="text-[#1A1A1A] text-lg font-bold tracking-tight mt-1">{card.name}</H3>
                    <p className="text-[10px] text-foreground/60 leading-relaxed font-sans mt-1">
                      {card.desc}
                    </p>
                  </div>
                  
                  {/* Category logo footer */}
                  <div className="flex items-center justify-between border-t border-border/20 pt-3 mt-2">
                    <span className="text-[8px] uppercase tracking-wider text-foreground/35 font-bold">Partnership</span>
                    <div className="text-foreground/40">{card.logo}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Trust Statistics Metrics (Exactly mt-[70px] below carousel) */}
        <div 
          ref={statsRef}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 mt-[70px]"
        >
          {[
            { value: 250, suffix: "+", label: "Projects Delivered" },
            { value: 120, suffix: "+", label: "Happy Clients" },
            { value: 18, suffix: "+", label: "Countries Served" },
            { value: 98, suffix: "%", label: "Client Satisfaction" }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="glassmorphism rounded-2xl border border-border/30 bg-[#FCFBF8]/40 shadow-premium p-6 flex flex-col items-center justify-center gap-2 select-text w-full"
            >
              <span 
                className="stat-val font-heading font-extrabold text-3xl text-accent-terracotta leading-none"
                data-value={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/45">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* 5. Logo Strip Marquee (Exactly mt-[70px] below statistics) */}
        <div className="w-full border-t border-border/20 pt-8 mt-[70px] overflow-hidden select-none">
          <div className="w-full flex whitespace-nowrap overflow-hidden">
            <div 
              ref={stripRef}
              className="flex gap-10 whitespace-nowrap will-change-transform py-2 px-4"
              onMouseEnter={() => stripTweenRef.current?.pause()}
              onMouseLeave={() => stripTweenRef.current?.play()}
            >
              {scrollingLogos.map((logo, lIdx) => (
                <div 
                  key={`${logo.name}-${lIdx}`}
                  className={cn(
                    "px-8 py-3 rounded-xl border border-border/40 bg-[#FCFBF8]/40 backdrop-blur-md text-foreground/45 transition-all duration-300 font-heading font-extrabold uppercase tracking-widest text-[11px] select-none cursor-pointer",
                    logo.color
                  )}
                >
                  {logo.name}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
export default Collaborators;
