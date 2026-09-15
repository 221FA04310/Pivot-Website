"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, Body } from "../ui/Typography";
import { Search, Palette, Cpu, Shield, Heart, Lightbulb } from "lucide-react";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureCardData {
  icon: React.ReactNode;
  heading: string;
  description: string;
}

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features: FeatureCardData[] = [
    {
      icon: <Search className="w-9 h-9" />,
      heading: "We Understand Before We Build",
      description: "Every successful project begins by understanding your business goals, users and challenges before writing a single line of code."
    },
    {
      icon: <Palette className="w-9 h-9" />,
      heading: "Beautiful Experiences",
      description: "Every interface is designed to feel intuitive, modern and memorable while improving business results."
    },
    {
      icon: <Cpu className="w-9 h-9" />,
      heading: "Future Ready Solutions",
      description: "We build scalable software that grows with your business and adapts to future technologies."
    },
    {
      icon: <Shield className="w-9 h-9" />,
      heading: "Secure By Design",
      description: "Every application follows modern security standards to protect your business and customer data."
    },
    {
      icon: <Heart className="w-9 h-9" />,
      heading: "Long-Term Partnership",
      description: "Our relationship continues long after deployment with continuous support and improvement."
    },
    {
      icon: <Lightbulb className="w-9 h-9" />,
      heading: "Built For Growth",
      description: "We help businesses innovate with modern technologies that create lasting competitive advantages."
    }
  ];

  useEffect(() => {
    const intro = introRef.current;
    const cards = cardsRef.current;
    if (!intro || !cards) return;

    const heading = intro.querySelector("h2");
    const subtitle = intro.querySelector("p");
    const badge = intro.querySelector("span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // 1. Heading (badge + title) fades upward
    if (badge || heading) {
      tl.fromTo(
        [badge, heading].filter(Boolean),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    }

    // 2. Subtitle fades in
    if (subtitle) {
      tl.fromTo(
        subtitle,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
    }

    // 3. Cards appear one after another with staggered animations
    tl.fromTo(
      cards.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        onComplete: () => {
          // Clear GSAP inline styles so that CSS transitions can trigger smoothly for hover scale/translate/etc.
          gsap.set(cards.children, { clearProps: "all" });
        }
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const particleItems = [
    { className: "animate-float-1 w-2 h-2 top-[15%] left-[10%]" },
    { className: "animate-float-2 w-3 h-3 top-[25%] right-[15%]" },
    { className: "animate-float-3 w-1.5 h-1.5 top-[60%] left-[8%]" },
    { className: "animate-float-1 w-2.5 h-2.5 top-[75%] right-[12%]" },
    { className: "animate-float-2 w-2 h-2 top-[40%] left-[45%]" },
    { className: "animate-float-3 w-3 h-3 top-[80%] left-[30%]" },
    { className: "animate-float-1 w-1.5 h-1.5 top-[10%] right-[35%]" },
    { className: "animate-float-2 w-2 h-2 top-[70%] left-[50%]" },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full relative min-h-screen flex flex-col justify-center py-[120px] px-6 sm:px-12 md:px-20 bg-gradient-to-b from-[#071827] via-[#0A2033] to-[#0B2238] select-none overflow-hidden"
    >
      <style>{`
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 0.35; }
        }
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
          50% { transform: translateY(-30px) translateX(-15px); opacity: 0.4; }
        }
        @keyframes float-particle-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          50% { transform: translateY(-50px) translateX(10px); opacity: 0.3; }
        }
        .animate-float-1 {
          animation: float-particle-1 12s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-particle-2 16s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-particle-3 20s ease-in-out infinite;
        }
      `}</style>

      {/* Subtle radial teal glow in the center behind the cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#39C8C9]/5 blur-[120px] pointer-events-none z-0" />

      {/* Floating particles */}
      {particleItems.map((p, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute rounded-full bg-[#39C8C9]/20 blur-[0.5px] pointer-events-none z-0",
            p.className
          )}
        />
      ))}

      {/* Very faint digital grid lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #39C8C9 1px, transparent 1px),
            linear-gradient(to bottom, #39C8C9 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
        }}
      />

      {/* Low-opacity network texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="radialMask" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <mask id="networkMask">
            <rect width="100%" height="100%" fill="url(#radialMask)" />
          </mask>
        </defs>
        <g mask="url(#networkMask)" stroke="#39C8C9" strokeWidth="1">
          <line x1="10%" y1="20%" x2="25%" y2="35%" />
          <line x1="25%" y1="35%" x2="40%" y2="15%" />
          <line x1="40%" y1="15%" x2="60%" y2="30%" />
          <line x1="60%" y1="30%" x2="75%" y2="10%" />
          <line x1="75%" y1="10%" x2="90%" y2="25%" />
          <line x1="25%" y1="35%" x2="30%" y2="65%" />
          <line x1="30%" y1="65%" x2="55%" y2="50%" />
          <line x1="55%" y1="50%" x2="60%" y2="80%" />
          <line x1="60%" y1="80%" x2="80%" y2="70%" />
          <line x1="80%" y1="70%" x2="90%" y2="25%" />
          <line x1="30%" y1="65%" x2="15%" y2="85%" />
          <line x1="55%" y1="50%" x2="75%" y2="35%" />
          
          <circle cx="10%" cy="20%" r="3" fill="#39C8C9" />
          <circle cx="25%" cy="35%" r="4" fill="#39C8C9" />
          <circle cx="40%" cy="15%" r="3" fill="#39C8C9" />
          <circle cx="60%" cy="30%" r="4" fill="#39C8C9" />
          <circle cx="75%" cy="10%" r="3" fill="#39C8C9" />
          <circle cx="90%" cy="25%" r="3" fill="#39C8C9" />
          <circle cx="30%" cy="65%" r="4" fill="#39C8C9" />
          <circle cx="55%" cy="50%" r="3" fill="#39C8C9" />
          <circle cx="60%" cy="80%" r="4" fill="#39C8C9" />
          <circle cx="80%" cy="70%" r="3" fill="#39C8C9" />
          <circle cx="15%" cy="85%" r="3" fill="#39C8C9" />
          <circle cx="75%" cy="35%" r="3" fill="#39C8C9" />
        </g>
      </svg>

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center justify-between h-full text-center">
        
        {/* Headline Intro Header */}
        <div 
          ref={introRef}
          className="max-w-[700px] flex flex-col items-center gap-4"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#39C8C9]">
            WHY PIVOT
          </span>
          <H2 className="text-white font-extrabold tracking-tight">Why Businesses Choose Pivot</H2>
          <Body className="text-[#B8C6D6] leading-relaxed text-sm sm:text-base mt-[20px] max-w-[600px]">
            We build secure, scalable, and future-ready software solutions that help businesses grow with confidence.
          </Body>
        </div>

        {/* 2x3 Grid Feature Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-[60px] w-full text-left"
        >
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={cn(
                "relative p-8 md:p-10 rounded-[24px] border border-[#39C8C9]/18 bg-white/[0.05] backdrop-blur-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex flex-col items-start gap-5 transition-all duration-[350ms] ease-out text-left select-text group overflow-hidden",
                "hover:-translate-y-[10px] hover:scale-[1.03] hover:border-[#59E1D6]/40 hover:shadow-[0_20px_50px_rgba(57,200,201,0.15)]"
              )}
            >
              {/* Thin animated teal line across the top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#59E1D6] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms] ease-out origin-center" />

              {/* Icon placed above heading */}
              <div className="w-10 h-10 text-[#39C8C9] group-hover:text-[#59E1D6] group-hover:brightness-110 transition-colors duration-[350ms] flex items-center justify-center">
                {feat.icon}
              </div>
              
              <h4 className="text-[20px] md:text-[22px] font-bold text-white leading-snug font-heading tracking-tight mt-1">
                {feat.heading}
              </h4>
              
              <p className="text-[15px] md:text-[16px] font-normal text-[#B8C6D6] leading-[1.6] font-sans">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
