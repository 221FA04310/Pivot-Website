"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  BookOpen, 
  ArrowUpRight, 
  CreditCard, 
  Store, 
  Database, 
  Clock 
} from "lucide-react";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface InsightArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  icon: React.ComponentType<{ className?: string }>;
}

const articles: InsightArticle[] = [
  {
    id: "insight-1",
    title: "Scaling E-Commerce Checkouts",
    category: "E-Commerce & Payments",
    summary: "Best practices for integrating secure payment gateways like Razorpay and reducing cart abandonment.",
    readTime: "5 min read",
    icon: CreditCard
  },
  {
    id: "insight-2",
    title: "Why Local Businesses Need Modern Web Architecture",
    category: "Web & Architecture",
    summary: "Bridging the gap between physical storefronts and digital discovery.",
    readTime: "4 min read",
    icon: Store
  },
  {
    id: "insight-3",
    title: "Optimizing Database Performance",
    category: "Database Engineering",
    summary: "How proper indexing in PostgreSQL improves application speed and responsiveness.",
    readTime: "6 min read",
    icon: Database
  }
];

export function Insights() {
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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
      id="insights"
      ref={containerRef}
      className="w-full relative py-28 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#081B33] border-t border-[#1F6FA9]/10 select-none overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1F6FA9]/10 blur-[150px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="max-w-3xl text-center mx-auto mb-20 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#39C8C9] font-bold font-heading">
            KNOWLEDGE HUB
          </span>
          <h2 className="text-white font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.2]">
            Insights
          </h2>
          <p className="text-[#C8D3E0] font-sans text-base sm:text-lg leading-relaxed max-w-2xl mt-2">
            Lessons learned, tech insights, and digital transformation guides from our engineering team.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {articles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={cn(
                  "relative rounded-[24px] p-8 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.25)] flex flex-col justify-between transition-all duration-300 ease-out group cursor-pointer",
                  "hover:-translate-y-2 hover:border-[#27A7A2]/40 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(39,167,162,0.15)]"
                )}
              >
                {/* Top Badge & Read Time */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#27A7A2]/15 border border-[#27A7A2]/30 text-[#39C8C9]">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-white/40 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#39C8C9] mb-5 group-hover:scale-105 group-hover:text-[#59E1D6] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Article Title */}
                  <h3 className="text-white font-heading font-bold text-xl sm:text-2xl tracking-tight leading-snug mb-3 group-hover:text-[#59E1D6] transition-colors">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-[#C8D3E0]/80 font-sans leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#39C8C9] group-hover:text-[#59E1D6] transition-colors flex items-center gap-1.5">
                    <span>Read Guide</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono text-white/30 uppercase">
                    PIVOT INSIGHT
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Insights;
