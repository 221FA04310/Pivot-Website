"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Layout, 
  Database, 
  Cloud, 
  Terminal
} from "lucide-react";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TechCategory {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  technologies: string[];
}

const techCategories: TechCategory[] = [
  {
    title: "Frontend & UI",
    description: "Modern, responsive, and accessible client-side interfaces.",
    icon: Layout,
    accentColor: "#39C8C9",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"]
  },
  {
    title: "Backend & Database",
    description: "Reliable database modeling and transactional data integrity.",
    icon: Database,
    accentColor: "#6FD7B7",
    technologies: ["PostgreSQL", "Supabase", "ORM Architectures", "REST & GraphQL APIs"]
  },
  {
    title: "Cloud & Deployment",
    description: "Edge-distributed networks with instant global availability.",
    icon: Cloud,
    accentColor: "#1F6FA9",
    technologies: ["Cloudflare Pages", "Cloudflare R2", "Vercel", "Zero-Downtime CI/CD"]
  },
  {
    title: "Development & Automation",
    description: "Rigorous version control, AI modeling, and developer tooling.",
    icon: Terminal,
    accentColor: "#D6B26E",
    technologies: ["Git", "GitHub", "Google AI Studio", "Google Antigravity IDE"]
  }
];

export function TechEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onComplete: () => {
            if (gridRef.current) {
              gsap.set(gridRef.current.children, { clearProps: "all" });
            }
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="technology"
      ref={containerRef}
      className="w-full relative py-28 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#071A2F] border-t border-[#1F6FA9]/10 select-none overflow-hidden"
    >
      {/* Subtle background ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1F6FA9]/10 blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#27A7A2]/10 blur-[140px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="max-w-3xl text-center mx-auto mb-20 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#39C8C9] font-bold font-heading">
            TECHNICAL ARCHITECTURE
          </span>
          <h2 className="text-white font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.2]">
            Technology Ecosystem
          </h2>
          <p className="text-[#C8D3E0] font-sans text-base sm:text-lg leading-relaxed max-w-2xl mt-2">
            The modern technology stack we utilize to deliver secure, scalable, and high-performance solutions.
          </p>
        </div>

        {/* 4 Pillars Clean Restrained Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {techCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "relative rounded-[22px] p-7 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.25)] flex flex-col justify-between transition-all duration-300 ease-out group",
                  "hover:-translate-y-2 hover:border-[#27A7A2]/40 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(39,167,162,0.15)]"
                )}
              >
                {/* Top indicator line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-[22px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${cat.accentColor}, transparent)` }}
                />

                {/* Top info */}
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#39C8C9] mb-6 group-hover:scale-105 group-hover:border-[#27A7A2]/40 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-white font-heading font-bold text-xl tracking-tight mb-2">
                    {cat.title}
                  </h3>
                  
                  <p className="text-xs text-[#C8D3E0]/70 font-sans leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                {/* Tech Badges List */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {cat.technologies.map((t, tIdx) => (
                    <div 
                      key={tIdx} 
                      className="flex items-center gap-2.5 text-xs text-white/90 font-medium font-sans"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#27A7A2] shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default TechEcosystem;
