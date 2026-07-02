"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, Body } from "../ui/Typography";
import { Button } from "../ui/Button";
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
  const ctaRef = useRef<HTMLDivElement>(null);

  const features: FeatureCardData[] = [
    {
      icon: <Search className="w-9 h-9 text-[#C96B4A]" />,
      heading: "We Understand Before We Build",
      description: "Every successful project begins by understanding your business goals, users and challenges before writing a single line of code."
    },
    {
      icon: <Palette className="w-9 h-9 text-[#C96B4A]" />,
      heading: "Beautiful Experiences",
      description: "Every interface is designed to feel intuitive, modern and memorable while improving business results."
    },
    {
      icon: <Cpu className="w-9 h-9 text-[#C96B4A]" />,
      heading: "Future Ready Solutions",
      description: "We build scalable software that grows with your business and adapts to future technologies."
    },
    {
      icon: <Shield className="w-9 h-9 text-[#C96B4A]" />,
      heading: "Secure By Design",
      description: "Every application follows modern security standards to protect your business and customer data."
    },
    {
      icon: <Heart className="w-9 h-9 text-[#C96B4A]" />,
      heading: "Long-Term Partnership",
      description: "Our relationship continues long after deployment with continuous support and improvement."
    },
    {
      icon: <Lightbulb className="w-9 h-9 text-[#C96B4A]" />,
      heading: "Built For Growth",
      description: "We help businesses innovate with modern technologies that create lasting competitive advantages."
    }
  ];

  useEffect(() => {
    const intro = introRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;

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

    if (cta) {
      tl.fromTo(cta.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full relative min-h-screen flex flex-col justify-center py-[120px] px-6 sm:px-12 md:px-20 bg-[#F7F4EE] select-none overflow-hidden"
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
          <span className="text-xs uppercase tracking-widest text-accent-terracotta font-bold">
            WHY PIVOT
          </span>
          <H2 className="uppercase text-[#1F2937]">Why Businesses Choose PIVOT</H2>
          <Body className="text-[#4B5563] leading-relaxed text-sm sm:text-base mt-[40px]">
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
                "p-10 rounded-[24px] border border-black/[0.06] bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col items-start gap-4 transition-all duration-500 ease-out text-left select-text",
                "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:border-[#C96B4A] group"
              )}
            >
              {/* Icon placed above heading */}
              <div className="w-9 h-9 text-[#C96B4A] transition-transform duration-500 group-hover:rotate-12 flex items-center justify-center">
                {feat.icon}
              </div>
              
              <h4 className="text-[26px] md:text-[32px] lg:text-[38px] font-bold text-[#1F2937] leading-[1.2] font-heading tracking-tight mt-2 transition-colors duration-300 group-hover:text-[#C96B4A]">
                {feat.heading}
              </h4>
              
              <p className="text-[18px] font-normal text-[#4B5563] leading-[1.7] max-w-[320px] font-sans">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* 4. Final project invitation CTA (Exactly mt-[80px] below cards) */}
        <div 
          ref={ctaRef}
          className="max-w-[900px] w-full mt-[80px] border border-black/[0.06] bg-white/95 rounded-[28px] py-[100px] px-6 sm:px-[80px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col items-center text-center relative z-10"
        >
          <h2 className="text-[40px] sm:text-[56px] lg:text-[72px] font-extrabold text-[#1F2937] leading-[1.1] tracking-[-2px] max-w-[800px] text-center font-heading">
            Ready to Build<br className="hidden sm:block" />Something Extraordinary?
          </h2>
          <p className="text-[18px] sm:text-[22px] font-normal text-[#6B7280] leading-[1.7] max-w-[700px] text-center font-sans mt-[32px]">
            Let&apos;s transform your idea into a digital experience your customers will love.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center mt-[60px]">
            <Button 
              variant="primary" 
              className="h-[58px] px-10 rounded-full text-xs uppercase tracking-widest bg-[#C96B4A] hover:bg-[#C96B4A]/90 text-white border-transparent hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              Start Your Project
            </Button>
            <Button 
              variant="secondary" 
              className="h-[58px] px-10 rounded-full text-xs uppercase tracking-widest border border-[#1F2937]/35 hover:bg-foreground/5 text-[#1F2937] bg-transparent hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              Book a Free Consultation
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
export default WhyChooseUs;
