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
      icon: <Search className="w-9 h-9 text-[#A96A4D]" />,
      heading: "We Understand Before We Build",
      description: "Every successful project begins by understanding your business goals, users and challenges before writing a single line of code."
    },
    {
      icon: <Palette className="w-9 h-9 text-[#A96A4D]" />,
      heading: "Beautiful Experiences",
      description: "Every interface is designed to feel intuitive, modern and memorable while improving business results."
    },
    {
      icon: <Cpu className="w-9 h-9 text-[#A96A4D]" />,
      heading: "Future Ready Solutions",
      description: "We build scalable software that grows with your business and adapts to future technologies."
    },
    {
      icon: <Shield className="w-9 h-9 text-[#A96A4D]" />,
      heading: "Secure By Design",
      description: "Every application follows modern security standards to protect your business and customer data."
    },
    {
      icon: <Heart className="w-9 h-9 text-[#A96A4D]" />,
      heading: "Long-Term Partnership",
      description: "Our relationship continues long after deployment with continuous support and improvement."
    },
    {
      icon: <Lightbulb className="w-9 h-9 text-[#A96A4D]" />,
      heading: "Built For Growth",
      description: "We help businesses innovate with modern technologies that create lasting competitive advantages."
    }
  ];

  useEffect(() => {
    const intro = introRef.current;
    const cards = cardsRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    if (intro) {
      tl.fromTo(intro.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    }

    if (cards) {
      gsap.fromTo(cards.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          onComplete: () => {
            gsap.set(cards.children, { clearProps: "opacity,y" });
          }
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full relative min-h-screen flex flex-col justify-center py-[120px] px-6 sm:px-12 md:px-20 bg-[#EEE8DE] select-none overflow-hidden"
    >
      {/* 1. Subtle background glow highlights */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-mutedGold/5 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-terracotta/5 blur-[140px] animate-pulse-slow" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center justify-between h-full text-center">
        
        {/* 2. Headline Intro Header */}
        <div 
          ref={introRef}
          className="max-w-[700px] flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-widest text-[#A96A4D] font-bold">
            WHY PIVOT
          </span>
          <H2 className="uppercase text-[#1B2430]">Why Businesses Choose PIVOT</H2>
          <Body className="text-[#5B6575] leading-relaxed text-sm sm:text-base mt-[40px]">
            We combine creativity, engineering and long-term partnership to build digital products that create measurable business impact.
          </Body>
        </div>

        {/* 3. 2x3 Grid Feature Cards (Exactly mt-[60px] below subheading) */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[60px] w-full text-left"
        >
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={cn(
                "p-10 rounded-[24px] border border-white/45 bg-white/72 backdrop-blur-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col items-start gap-4 transition-all duration-500 ease-out text-left select-text",
                "hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:border-[#A96A4D]/50 group"
              )}
            >
              {/* Icon placed above heading */}
              <div className="w-9 h-9 text-[#A96A4D] transition-transform duration-500 group-hover:rotate-12 flex items-center justify-center">
                {feat.icon}
              </div>
              
              <h4 className="text-[26px] md:text-[32px] lg:text-[38px] font-bold text-[#1B2430] leading-[1.2] font-heading tracking-tight mt-2 transition-colors duration-300 group-hover:text-[#A96A4D]">
                {feat.heading}
              </h4>
              
              <p className="text-[18px] font-normal text-[#5B6575] leading-[1.7] max-w-[320px] font-sans">
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
