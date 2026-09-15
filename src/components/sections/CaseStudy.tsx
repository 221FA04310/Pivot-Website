"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  AlertCircle, 
  Compass, 
  CheckCircle, 
  Zap, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Layers
} from "lucide-react";
import { Button } from "../ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onComplete: () => {
            if (contentRef.current) {
              gsap.set(contentRef.current.children, { clearProps: "all" });
            }
          }
        }
      );
    }
  }, []);

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "Cloudflare Pages"
  ];

  const outcomes = [
    {
      value: "+150%",
      label: "Online Appointment Bookings",
      detail: "Massive conversion increase from automated scheduling calendars",
      icon: TrendingUp
    },
    {
      value: "40%",
      label: "Admin Overhead Reduction",
      detail: "Eliminated manual phone logging and scheduling conflicts",
      icon: Users
    },
    {
      value: "< 1s",
      label: "Page Load Time",
      detail: "Lightning-fast static pre-rendering on Cloudflare edge network",
      icon: Zap
    }
  ];

  return (
    <section
      id="case-study"
      ref={containerRef}
      className="w-full relative py-28 px-6 sm:px-12 md:px-16 lg:px-20 bg-gradient-to-b from-[#081B33] via-[#071827] to-[#0A2033] select-none overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#27A7A2]/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] rounded-full bg-[#6FD7B7]/8 blur-[130px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="max-w-3xl text-center mx-auto mb-16 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#D6B26E] font-bold font-heading">
            REAL RESULTS, REAL IMPACT
          </span>
          <h2 className="text-white font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.2]">
            Case Study
          </h2>
          <p className="text-[#C8D3E0] font-sans text-base sm:text-lg leading-relaxed max-w-2xl mt-2">
            Deep dive into a signature project demonstrating end-to-end execution excellence.
          </p>
        </div>

        {/* Quantifiable Metrics Strip */}
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {outcomes.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative rounded-[22px] p-7 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex flex-col items-center text-center group hover:border-[#27A7A2]/50 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#27A7A2]/15 border border-[#27A7A2]/30 flex items-center justify-center text-[#39C8C9] mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-heading font-extrabold text-4xl sm:text-5xl text-[#39C8C9] tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="font-heading font-bold text-base sm:text-lg text-white mb-1.5">
                  {stat.label}
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#D9E8F4]/70 leading-relaxed max-w-xs">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Case Study Story Container */}
        <div 
          ref={contentRef}
          className="rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          {/* Subtle top teal glowing bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#27A7A2] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Challenge & Approach */}
            <div className="lg:col-span-6 space-y-10 text-left">
              
              {/* Challenge Block */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D6B26E]/10 border border-[#D6B26E]/30 text-[#D6B26E] text-xs font-bold uppercase tracking-wider font-heading">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>The Challenge</span>
                </div>
                <h3 className="text-white font-heading font-bold text-xl sm:text-2xl leading-snug">
                  Fragmented bookings & poor mobile response across branches
                </h3>
                <p className="text-[#C8D3E0] font-sans text-base leading-relaxed">
                  A growing multi-branch service enterprise struggled with fragmented manual bookings, lack of centralized customer data, and slow website performance across mobile devices.
                </p>
              </div>

              {/* Approach Block */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F6FA9]/20 border border-[#1F6FA9]/40 text-[#6FD7B7] text-xs font-bold uppercase tracking-wider font-heading">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Our Approach</span>
                </div>
                <h3 className="text-white font-heading font-bold text-xl sm:text-2xl leading-snug">
                  Comprehensive audit & unified multi-location architecture
                </h3>
                <p className="text-[#C8D3E0] font-sans text-base leading-relaxed">
                  Conducted a comprehensive technical audit, designed a unified multi-location web architecture, and structured an intuitive UI/UX navigation workflow.
                </p>
              </div>

            </div>

            {/* Right Column: Solution & Tech Ecosystem */}
            <div className="lg:col-span-6 space-y-10 text-left">
              
              {/* Solution Block */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#27A7A2]/15 border border-[#27A7A2]/30 text-[#39C8C9] text-xs font-bold uppercase tracking-wider font-heading">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>The Solution</span>
                </div>
                <h3 className="text-white font-heading font-bold text-xl sm:text-2xl leading-snug">
                  Custom Next.js Web App with automated sync & branch management
                </h3>
                <p className="text-[#C8D3E0] font-sans text-base leading-relaxed">
                  Developed a custom Next.js web application featuring automated scheduling calendars, centralized branch management dashboards, and instant SMS reminder triggers.
                </p>
              </div>

              {/* Technologies Used */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 font-heading">
                  <Layers className="w-3.5 h-3.5 text-[#27A7A2]" />
                  <span>Technology Used</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-bold text-white tracking-wide uppercase font-sans hover:border-[#27A7A2] hover:text-[#39C8C9] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4">
                <Link href="/contact">
                  <Button
                    variant="primary"
                    magnetic={true}
                    className="h-[52px] px-7 rounded-xl text-xs uppercase tracking-wider font-bold"
                  >
                    <span>Discuss A Similar Project</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CaseStudy;
