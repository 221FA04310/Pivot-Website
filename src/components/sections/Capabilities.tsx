"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Globe, 
  Laptop, 
  Smartphone, 
  Cloud, 
  Zap, 
  RefreshCw, 
  Wrench, 
  Settings, 
  Server,
  ArrowRight,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Capability {
  id: string;
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  whereItHelps: string;
  howItHelps: string;
  path: string;
}

const capabilitiesData: Capability[] = [
  {
    id: "web-dev",
    title: "Website Development",
    tag: "Online Visibility",
    icon: Globe,
    whereItHelps: "Local businesses, salons, repair shops, and restaurants needing online visibility.",
    howItHelps: "Customers find you on Google search with location, hours, contact info, and Google Maps integration.",
    path: "/services/web-development"
  },
  {
    id: "web-apps",
    title: "Web Apps Development",
    tag: "Inventory & Dashboards",
    icon: Laptop,
    whereItHelps: "Multi-store retail businesses struggling to track inventory across different locations.",
    howItHelps: "Provides a single dashboard showing live inventory, automatic low-stock alerts, and item availability online.",
    path: "/services/web-applications"
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps Development",
    tag: "24/7 Orders & Bookings",
    icon: Smartphone,
    whereItHelps: "Local cafes, bakeries, or service providers wanting to streamline customer orders and bookings.",
    howItHelps: "Allows customers to order 24/7 or book appointments directly through an app with automated reminders.",
    path: "/services/mobile-applications"
  },
  {
    id: "cloud-apps",
    title: "Cloud Applications Development",
    tag: "Auto-Scaling & Sync",
    icon: Cloud,
    whereItHelps: "Small manufacturing or retail businesses facing unpredictable demand spikes.",
    howItHelps: "Automatically scales computing power during high-demand seasons and syncs data across distributed warehouses.",
    path: "/services/cloud-applications"
  },
  {
    id: "app-mod",
    title: "Application Modernization",
    tag: "Legacy System Overhaul",
    icon: Zap,
    whereItHelps: "Businesses running slow, outdated legacy systems that crash often and resist new features.",
    howItHelps: "Replaces old software with modern cloud systems or connects modern web interfaces on top of existing databases.",
    path: "/services/application-modernization"
  },
  {
    id: "migration",
    title: "Migration",
    tag: "Zero Downtime Cloud Move",
    icon: RefreshCw,
    whereItHelps: "Companies running expensive on-premise servers with high maintenance and air conditioning costs.",
    howItHelps: "Moves your entire application, database, and hosting to secure cloud environments like AWS, Azure, or Google Cloud with zero downtime.",
    path: "/services/migration-services"
  },
  {
    id: "support-main",
    title: "Support & Maintenance",
    tag: "24/7 Monitoring & Fixes",
    icon: Wrench,
    whereItHelps: "Businesses experiencing website or system crashes during peak festival or sales seasons.",
    howItHelps: "Delivers 24/7 monitoring, emergency response teams, traffic scaling, and rapid security patch deployment.",
    path: "/services/support-maintenance"
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    tag: "Bespoke Workflows",
    icon: Settings,
    whereItHelps: "Companies with unique business processes, custom pricing models, or specialized quality control procedures.",
    howItHelps: "Builds bespoke software tailored precisely to your workflow and integrates multiple legacy systems into a unified dashboard.",
    path: "/services/custom-software-development"
  },
  {
    id: "cloud-hosting",
    title: "Cloud Services (Hosting)",
    tag: "Enterprise Infrastructure",
    icon: Server,
    whereItHelps: "Fast-growing businesses whose local infrastructure and hardware cannot keep up with traffic.",
    howItHelps: "Provides automatic server scaling, daily backups, enterprise-grade data security, and robust disaster recovery.",
    path: "/services/cloud-hosting-services"
  }
];

export function Capabilities() {
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
          stagger: 0.08,
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
      id="capabilities"
      ref={containerRef}
      className="w-full relative py-28 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#081B33] select-none overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#1F6FA9]/10 blur-[150px]" />
        <div className="absolute bottom-[15%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#27A7A2]/10 blur-[150px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="max-w-3xl text-center mx-auto mb-20 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#39C8C9] font-bold font-heading">
            WHAT WE DO
          </span>
          <h2 className="text-white font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.2]">
            Our Capabilities
          </h2>
          <p className="text-[#C8D3E0] font-sans text-base sm:text-lg leading-relaxed max-w-2xl mt-2">
            We introduce modern software development and digital consultancy through real business solutions designed for lasting impact.
          </p>
        </div>

        {/* 3x3 Capabilities Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {capabilitiesData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={cn(
                  "relative rounded-[22px] p-7 sm:p-8 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.25)] flex flex-col justify-between transition-all duration-300 ease-out group",
                  "hover:-translate-y-2 hover:border-[#27A7A2]/40 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(39,167,162,0.15)]"
                )}
              >
                {/* Subtle top animated gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#27A7A2] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-t-[22px]" />

                {/* Card Top: Icon, Tag & Title */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#27A7A2]/15 border border-[#27A7A2]/30 flex items-center justify-center text-[#39C8C9] group-hover:scale-105 group-hover:text-[#59E1D6] group-hover:bg-[#27A7A2]/25 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[#6FD7B7]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-white font-heading font-bold text-xl sm:text-2xl tracking-tight leading-snug mb-5 group-hover:text-[#59E1D6] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Problem / Solution structured blocks */}
                  <div className="space-y-4 text-left">
                    {/* Where It Helps */}
                    <div className="p-3.5 rounded-xl bg-black/20 border border-white/5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#D6B26E] uppercase tracking-wider mb-1.5 font-heading">
                        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Where It Helps</span>
                      </div>
                      <p className="text-sm text-[#D9E8F4]/80 leading-relaxed font-sans">
                        {item.whereItHelps}
                      </p>
                    </div>

                    {/* How It Helps */}
                    <div className="p-3.5 rounded-xl bg-[#27A7A2]/[0.08] border border-[#27A7A2]/20">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#39C8C9] uppercase tracking-wider mb-1.5 font-heading">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#6FD7B7]" />
                        <span>How It Helps</span>
                      </div>
                      <p className="text-sm text-[#E6F4F1] leading-relaxed font-sans font-medium">
                        {item.howItHelps}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Explore link */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={item.path}
                    className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#39C8C9] group-hover:text-[#59E1D6] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[10px] text-white/30 font-mono">
                    PIVOT ENG
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

export default Capabilities;
