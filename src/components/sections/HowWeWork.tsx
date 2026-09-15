"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Search, 
  Layers, 
  Code, 
  Rocket, 
  ShieldCheck
} from "lucide-react";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "Understanding your business model, target audience, and specific operational bottlenecks.",
    icon: Search
  },
  {
    step: "02",
    title: "UI/UX Design & Prototyping",
    description: "Crafting custom wireframes and interactive prototypes tailored to your brand identity.",
    icon: Layers
  },
  {
    step: "03",
    title: "Agile Development & Testing",
    description: "Building scalable modules using modern tech stacks accompanied by rigorous load testing and latency checks.",
    icon: Code
  },
  {
    step: "04",
    title: "Deployment & Optimization",
    description: "Seamless launch on high-speed cloud infrastructure with ongoing monitoring and performance tuning.",
    icon: Rocket
  },
  {
    step: "05",
    title: "Dedicated Support",
    description: "Continuous maintenance, feature updates, and scaling assistance as your business grows.",
    icon: ShieldCheck
  }
];

export function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

    if (stepsRef.current) {
      gsap.fromTo(
        stepsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onComplete: () => {
            if (stepsRef.current) {
              gsap.set(stepsRef.current.children, { clearProps: "all" });
            }
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="w-full relative py-28 px-6 sm:px-12 md:px-16 lg:px-20 bg-gradient-to-b from-[#071827] via-[#0A2033] to-[#081B33] select-none overflow-hidden"
    >
      {/* Background glow textures */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#27A7A2]/8 blur-[160px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="max-w-4xl text-center mx-auto mb-20 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#39C8C9] font-bold font-heading">
            HOW WE WORK / WHY US
          </span>
          <h2 className="text-white font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.2]">
            Our structured, transparent engineering process designed to take projects from concept to market success.
          </h2>
        </div>

        {/* 5-Step Process Grid */}
        <div 
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {processSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "relative rounded-[22px] p-7 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.25)] flex flex-col justify-between transition-all duration-300 ease-out group",
                  "hover:-translate-y-2 hover:border-[#27A7A2]/40 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(39,167,162,0.15)]"
                )}
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#39C8C9]/40 group-hover:text-[#39C8C9] transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#39C8C9] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Step Title & Details */}
                <div className="flex-1 flex flex-col justify-start">
                  <h3 className="text-white font-heading font-bold text-lg sm:text-xl tracking-tight leading-snug mb-3 group-hover:text-[#59E1D6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C8D3E0]/80 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Progress bar visualizer */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#27A7A2] to-[#6FD7B7] rounded-full transition-all duration-500"
                      style={{ width: `${(idx + 1) * 20}%` }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HowWeWork;
