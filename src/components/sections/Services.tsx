/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, Body, H3 } from "../ui/Typography";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { 
  Globe, Smartphone, 
  RefreshCw, Database, Server, Settings, Activity,
  Shield, Zap, TrendingUp, Infinity, Cloud, Lock, Code
} from "lucide-react";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceData {
  number: string;
  label: string;
  summary: string;
  heading: string;
  description: string;
  heroImage: string;
  ctaText: string;
  stats: Array<{
    value: number;
    decimal?: boolean;
    suffix: string;
    label: string;
  }>;
  floatingCards: Array<{
    title: string;
    detail: string;
  }>;
  features: Array<{
    icon: React.ReactNode;
    title: string;
    desc: string;
  }>;
}

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const servicesData: ServiceData[] = [
    {
      number: "01",
      label: "Website Development",
      summary: "Premium responsive websites that elevate your brand.",
      heading: "Website Development",
      description: "Build fast, responsive and visually stunning websites that establish your digital identity and convert visitors into customers.",
      heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      ctaText: "Explore Website Solutions",
      stats: [
        { value: 150, suffix: "+", label: "Websites Delivered" },
        { value: 98, suffix: "%", label: "Client Satisfaction" }
      ],
      floatingCards: [
        { title: "Browser Window", detail: "Safari • Live Preview" },
        { title: "Responsive Layout", detail: "Viewport Adaptive" }
      ],
      features: [
        { icon: <Smartphone className="w-3.5 h-3.5" />, title: "Responsive Design", desc: "Aesthetic scale on every screen." },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, title: "SEO Optimized", desc: "High organic search crawl." },
        { icon: <Zap className="w-3.5 h-3.5" />, title: "Lightning Fast", desc: "Sub-second load times." },
        { icon: <Globe className="w-3.5 h-3.5" />, title: "Modern UI", desc: "Next-gen creative patterns." }
      ]
    },
    {
      number: "02",
      label: "Web Applications",
      summary: "Scalable business applications built for growth.",
      heading: "Web Applications",
      description: "Build scalable, secure and intelligent web applications that streamline operations and accelerate business growth.",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      ctaText: "Discover Web Applications",
      stats: [
        { value: 200, suffix: "+", label: "Applications Built" },
        { value: 99.9, decimal: true, suffix: "%", label: "System Uptime" }
      ],
      floatingCards: [
        { title: "Revenue Growth", detail: "+$24.5k Monthly" },
        { title: "Live Sync", detail: "1,420 Online Users" }
      ],
      features: [
        { icon: <TrendingUp className="w-3.5 h-3.5" />, title: "Scalable", desc: "Engineered for infinite growth." },
        { icon: <Lock className="w-3.5 h-3.5" />, title: "Secure", desc: "Advanced data shielding rules." },
        { icon: <Zap className="w-3.5 h-3.5" />, title: "High Performance", desc: "60 FPS rendering pipelines." },
        { icon: <Server className="w-3.5 h-3.5" />, title: "Enterprise Ready", desc: "Modular, robust configurations." }
      ]
    },
    {
      number: "03",
      label: "Mobile Applications",
      summary: "Native and cross-platform mobile experiences.",
      heading: "Mobile Applications",
      description: "Design and build native and cross-platform mobile experiences optimized for fluid interactions and smooth visual frame transitions.",
      heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      ctaText: "Explore Mobile Apps",
      stats: [
        { value: 80, suffix: "+", label: "Apps Published" },
        { value: 4.9, decimal: true, suffix: "★", label: "Average App Rating" }
      ],
      floatingCards: [
        { title: "Push System", detail: "2.4m Daily Alerts" },
        { title: "UX Feedback", detail: "Haptics Enabled" }
      ],
      features: [
        { icon: <Smartphone className="w-3.5 h-3.5" />, title: "Android", desc: "Native Material Design UI." },
        { icon: <Smartphone className="w-3.5 h-3.5" />, title: "iOS", desc: "Smooth Swift interfaces." },
        { icon: <RefreshCw className="w-3.5 h-3.5" />, title: "Cross Platform", desc: "Single React Native stack." },
        { icon: <Zap className="w-3.5 h-3.5" />, title: "Smooth UX", desc: "Zero lag gesture dynamics." }
      ]
    },
    {
      number: "04",
      label: "Cloud Applications",
      summary: "Resilient serverless cloud environments.",
      heading: "Cloud Applications",
      description: "Build robust, highly scalable, and secure cloud infrastructures designed to synchronize complex database records on the edge.",
      heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      ctaText: "Discover Cloud Solutions",
      stats: [
        { value: 50, suffix: "+", label: "Clouds Constructed" },
        { value: 100, suffix: "%", label: "Secure Isolation" }
      ],
      floatingCards: [
        { title: "Cloud Node", detail: "Edge Synced" },
        { title: "Cluster Health", detail: "100% Operational" }
      ],
      features: [
        { icon: <Cloud className="w-3.5 h-3.5" />, title: "Serverless Node", desc: "Auto-scaling lambda power." },
        { icon: <Server className="w-3.5 h-3.5" />, title: "Edge Networks", desc: "Cached delivery near users." },
        { icon: <Shield className="w-3.5 h-3.5" />, title: "DDoS Shield", desc: "Real-time traffic screening." },
        { icon: <Database className="w-3.5 h-3.5" />, title: "Hot Backup", desc: "Redundant snapshot syncs." }
      ]
    },
    {
      number: "05",
      label: "Application Modernization",
      summary: "Upgrading legacy structures to next-gen tech.",
      heading: "Application Modernization",
      description: "Convert legacy code structures and terminal panels into modern, lightweight, glassmorphic Next.js application frontends.",
      heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      ctaText: "Initiate Modernization",
      stats: [
        { value: 120, suffix: "+", label: "Legacy Projects Rebuilt" },
        { value: 40, suffix: "%", label: "Resource Speed Gain" }
      ],
      floatingCards: [
        { title: "Legacy Code", detail: "Decommissioned v1" },
        { title: "Next-Gen Stack", detail: "Next.js 14 Activated" }
      ],
      features: [
        { icon: <Code className="w-3.5 h-3.5" />, title: "Before / After", desc: "Incremental modular swap." },
        { icon: <RefreshCw className="w-3.5 h-3.5" />, title: "Next-Gen Tech", desc: "React state engine setup." },
        { icon: <TrendingUp className="w-3.5 h-3.5" />, title: "Code Audits", desc: "Removal of technical debt." },
        { icon: <Infinity className="w-3.5 h-3.5" />, title: "Aesthetic Swap", desc: "Clean modern design system." }
      ]
    },
    {
      number: "06",
      label: "Migration Services",
      summary: "Seamless zero-downtime data migrations.",
      heading: "Migration Services",
      description: "Migrate live enterprise databases and network frameworks smoothly across cloud hosting environments with zero visual downtime.",
      heroImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
      ctaText: "Schedule Migration Dialogue",
      stats: [
        { value: 90, suffix: "+", label: "Migrations Completed" },
        { value: 99.9, decimal: true, suffix: "%", label: "Downtime Prevented" }
      ],
      floatingCards: [
        { title: "DB Sync", detail: "Active Replication" },
        { title: "Downtime Lag", detail: "< 80ms Connection" }
      ],
      features: [
        { icon: <Database className="w-3.5 h-3.5" />, title: "Data Pipelines", desc: "Continuous stream channels." },
        { icon: <Lock className="w-3.5 h-3.5" />, title: "Checksum checks", desc: "Cryptographic validation." },
        { icon: <Zap className="w-3.5 h-3.5" />, title: "Minimal Latency", desc: "Optimized synchronization." },
        { icon: <Server className="w-3.5 h-3.5" />, title: "Rollback Protection", desc: "Instant automated backup." }
      ]
    },
    {
      number: "07",
      label: "Custom Software Development",
      summary: "Bespoke systems built for unique workflows.",
      heading: "Custom Software Development",
      description: "Build bespoke enterprise applications designed from blueprints to resolve complex business flows and optimize analytics parameters.",
      heroImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      ctaText: "Begin Custom Design",
      stats: [
        { value: 110, suffix: "+", label: "Custom Stacks Built" },
        { value: 100, suffix: "%", label: "Bespoke Logic Fit" }
      ],
      floatingCards: [
        { title: "Custom Logic", detail: "Algorithm v3 Active" },
        { title: "Data Crypt", detail: "AES-256 Enabled" }
      ],
      features: [
        { icon: <Settings className="w-3.5 h-3.5" />, title: "Blueprints", desc: "Bespoke planning architecture." },
        { icon: <Code className="w-3.5 h-3.5" />, title: "Design Wireframes", desc: "UX workflow mapping." },
        { icon: <Shield className="w-3.5 h-3.5" />, title: "Highly Secure", desc: "Encrypted database layers." },
        { icon: <Infinity className="w-3.5 h-3.5" />, title: "System Bridges", desc: "Integrated external APIs." }
      ]
    },
    {
      number: "08",
      label: "Support & Maintenance",
      summary: "Continuous optimization and system reliability.",
      heading: "Support & Maintenance",
      description: "Maintain continuous system integrity, resolve performance bottlenecks, and execute weekly security patches.",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      ctaText: "Review Support Programs",
      stats: [
        { value: 300, suffix: "+", label: "Systems Protected" },
        { value: 24, suffix: "/7", label: "Engineer Monitoring" }
      ],
      floatingCards: [
        { title: "Status Check", detail: "All Systems Operational" },
        { title: "Live Heartbeat", detail: "Latency Normal" }
      ],
      features: [
        { icon: <Activity className="w-3.5 h-3.5" />, title: "Live Monitors", desc: "Server health live checks." },
        { icon: <Zap className="w-3.5 h-3.5" />, title: "Speed Audits", desc: "Weekly rendering checking." },
        { icon: <Shield className="w-3.5 h-3.5" />, title: "Dependency Patches", desc: "Automated vulnerability loops." },
        { icon: <Infinity className="w-3.5 h-3.5" />, title: "Direct Team", desc: "Dedicated Slack channels." }
      ]
    },
    {
      number: "09",
      label: "Cloud Hosting Services",
      summary: "High-performance edge hosting environments.",
      heading: "Cloud Hosting Services",
      description: "Host digital storefronts on secure global cloud clusters optimized for low latency, query caches, and high traffic volumes.",
      heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      ctaText: "Explore Edge Hosting",
      stats: [
        { value: 400, suffix: "+", label: "Websites Hosted" },
        { value: 99.99, decimal: true, suffix: "%", label: "Network Availability" }
      ],
      floatingCards: [
        { title: "Edge Cache", detail: "Globally Distributed" },
        { title: "DDoS Shielding", detail: "Traffic Filtration Active" }
      ],
      features: [
        { icon: <Globe className="w-3.5 h-3.5" />, title: "Global CDN", desc: "Content cached near readers." },
        { icon: <Lock className="w-3.5 h-3.5" />, title: "Cloud Security", desc: "Auto SSL updates." },
        { icon: <Server className="w-3.5 h-3.5" />, title: "Performance Stats", desc: "DDoS filtering shields." },
        { icon: <Infinity className="w-3.5 h-3.5" />, title: "Unlimited Bandwidth", desc: "Matches peak holiday loads." }
      ]
    }
  ];

  // Set up ScrollTrigger pinning for desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=180%", 
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const rawProgress = self.progress;
          const idx = Math.min(8, Math.floor(rawProgress * 9));
          setActiveIdx(idx);
        },
      });

      return () => {
        pinTrigger.kill();
      };
    });

    return () => matchMedia.revert();
  }, []);

  // Intro fade animations
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
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full relative bg-[#F7F4EE] bg-noise md:h-screen md:flex md:flex-col md:justify-between md:py-16 md:overflow-hidden select-none"
    >
      {/* 1. Subdued animated ambient glow and moving grids */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/3 left-1/3 w-[800px] h-[800px] rounded-full bg-accent-mutedGold/5 blur-[160px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-[600px] h-[600px] rounded-full bg-accent-terracotta/5 blur-[140px] animate-pulse-slow" />
      </div>

      {/* 2. Headline Intro (fades out as pin begins) */}
      <div 
        ref={introRef}
        className="max-w-[760px] mx-auto text-center pt-16 md:pt-0 pb-8 px-6 relative z-10 flex flex-col items-center gap-3 md:gap-4"
      >
        <span className="text-xs uppercase tracking-widest text-accent-terracotta font-bold">
          Our Services
        </span>
        <H2 className="uppercase">How Can We Shape Your Digital Future?</H2>
        <Body className="text-foreground/75 leading-relaxed">
          Every business has a different destination. Explore how PIVOT transforms ideas into meaningful digital experiences.
        </Body>
      </div>

      {/* 3. Immersive Split Panels */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 pb-12 md:pb-0 md:flex-1 relative z-10 md:flex md:items-center w-full">
        
        {/* Desktop Split Layout (md and up) */}
        <div className="hidden md:flex gap-12 w-full h-[55vh] items-center relative">
          
          {/* Left side list menu (30% width) */}
          <div className="w-[30%] flex flex-col items-start justify-center relative z-20">
            {servicesData.map((item, idx) => (
              <div 
                key={item.label}
                onMouseEnter={() => setActiveIdx(idx)}
                className="flex flex-col items-start cursor-pointer my-[10px] h-[46px] justify-center group"
              >
                <div className="flex items-center gap-4">
                  {/* Active vertical side bar indicator */}
                  <div 
                    className={cn(
                      "w-1.5 h-6 bg-accent-terracotta rounded-full transition-all duration-500 origin-top",
                      activeIdx === idx ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    )}
                  />
                  
                  <div className="flex flex-col text-left">
                    {/* Number and Title */}
                    <div className="flex items-baseline gap-2">
                      <span className={cn(
                        "font-sans font-bold text-[10px] tracking-wider transition-colors duration-500",
                        activeIdx === idx ? "text-accent-terracotta" : "text-foreground/25"
                      )}>
                        {item.number}
                      </span>
                      <span 
                        className={cn(
                          "font-heading font-extrabold transition-all duration-500 select-none tracking-tight",
                          activeIdx === idx 
                            ? "text-[24px] text-accent-terracotta leading-none" 
                            : "text-[18px] text-foreground/40 group-hover:text-foreground/60 leading-none"
                        )}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Description one liner */}
                    <span className={cn(
                      "text-[10px] font-sans transition-all duration-500 mt-1 max-w-[260px] truncate block",
                      activeIdx === idx ? "text-foreground/60 opacity-100" : "text-foreground/20 opacity-0 pointer-events-none"
                    )}>
                      {item.summary}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side visuals window (70% width) */}
          <div className="w-[70%] h-full relative flex items-center justify-center">
            
            {servicesData.map((service, idx) => (
              <EnvironmentWrapper key={service.heading} active={activeIdx === idx}>
                <div className="w-full h-full flex gap-8 items-center bg-[#FCFBF8] border border-border/40 shadow-premium rounded-premium p-8 relative">
                  
                  {/* Left Column: Text & Features (45%) */}
                  <div className="w-[45%] flex flex-col justify-between text-left h-full py-1">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-accent-forestGreen tracking-wider block">
                        Milestone {service.number}
                      </span>
                      <H3 className="text-foreground text-2xl font-extrabold tracking-tight animate-item">
                        {service.heading}
                      </H3>
                      <p className="text-[11px] text-foreground/60 leading-relaxed font-sans font-normal animate-item">
                        {service.description}
                      </p>
                    </div>

                    {/* 2x2 Feature Cards Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {service.features.map((feat, fIdx) => (
                        <div 
                          key={fIdx} 
                          className="animate-card glassmorphism p-2.5 rounded-xl border border-foreground/[0.04] bg-[#FCFBF8]/30 flex flex-col gap-1 select-text"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-accent-terracotta">{feat.icon}</span>
                            <span className="font-heading font-extrabold text-[10px] text-foreground tracking-tight leading-none">
                              {feat.title}
                            </span>
                          </div>
                          <p className="text-[8px] text-foreground/50 leading-tight font-sans font-normal">
                            {feat.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Statistics Row */}
                    <div className="flex gap-6 border-t border-border/20 pt-3 mt-1">
                      {service.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="animate-stat text-left">
                          <span 
                            className="stat-val font-heading font-extrabold text-lg text-accent-terracotta"
                            data-value={stat.value}
                            data-suffix={stat.suffix}
                            data-decimal={stat.decimal ? "true" : "false"}
                          >
                            0{stat.suffix}
                          </span>
                          <span className="block text-[8px] uppercase tracking-wider text-foreground/45 mt-0.5">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Call to action button */}
                    <div className="pt-3 animate-cta">
                      <Button variant="primary" className="h-[44px] px-5 rounded-lg text-[10px] uppercase tracking-widest bg-[#C96B4A] hover:bg-[#C96B4A]/90 text-white border-transparent">
                        {service.ctaText}
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Hero Image & 2 Floating UI Cards (55%) */}
                  <div className="w-[55%] h-full rounded-xl border border-border/20 bg-[#F7F4EE]/30 relative overflow-hidden flex items-center justify-center">
                    {/* The Premium Hero Image */}
                    <img 
                      src={service.heroImage} 
                      alt={service.heading}
                      className="animate-img w-[88%] h-[88%] object-cover rounded-lg shadow-lg"
                    />

                    {/* Floating UI Card 1 */}
                    <div className="animate-card absolute top-6 right-6 glassmorphism border border-white/20 rounded-lg p-2.5 shadow-xl select-none max-w-[130px] text-left">
                      <span className="text-[8px] font-heading font-bold uppercase text-foreground/45 tracking-wider block">
                        {service.floatingCards[0].title}
                      </span>
                      <span className="text-[10px] font-sans font-semibold text-foreground/80 mt-0.5 block leading-none">
                        {service.floatingCards[0].detail}
                      </span>
                    </div>

                    {/* Floating UI Card 2 */}
                    <div className="animate-card absolute bottom-6 left-6 glassmorphism border border-white/20 rounded-lg p-2.5 shadow-xl select-none max-w-[130px] text-left">
                      <span className="text-[8px] font-heading font-bold uppercase text-foreground/45 tracking-wider block">
                        {service.floatingCards[1].title}
                      </span>
                      <span className="text-[10px] font-sans font-semibold text-foreground/80 mt-0.5 block leading-none">
                        {service.floatingCards[1].detail}
                      </span>
                    </div>
                  </div>

                </div>
              </EnvironmentWrapper>
            ))}

          </div>
        </div>

        {/* Mobile Accordion Stack Layout (under md breakpoint) */}
        <div className="flex md:hidden flex-col gap-6 w-full">
          {servicesData.map((item, idx) => (
            <Card key={item.heading} className="p-0 border border-border/40">
              <div 
                onClick={() => setActiveIdx(activeIdx === idx ? -1 : idx)}
                className="p-6 flex items-center justify-between cursor-pointer"
              >
                <span className="font-heading font-extrabold text-[18px] text-foreground">
                  {item.label}
                </span>
                <span className="text-accent-terracotta text-lg font-bold">
                  {activeIdx === idx ? "−" : "+"}
                </span>
              </div>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-500 bg-[#FCFBF8]/80 border-t border-border/30",
                  activeIdx === idx ? "max-h-[300px] p-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                )}
              >
                <div className="flex flex-col gap-3 text-left">
                  <span className="text-xs uppercase tracking-widest text-accent-terracotta font-bold">
                    Milestone 0{idx + 1}
                  </span>
                  <Body className="text-sm text-foreground/60 leading-relaxed font-sans font-normal">
                    {idx === 0 && "Build fast, responsive and visually stunning websites that establish your digital identity and convert visitors into customers."}
                    {idx === 1 && "Build scalable, secure and intelligent web applications that streamline operations and accelerate business growth."}
                    {idx === 2 && "Design and build native and cross-platform mobile experiences optimized for fluid interactions and smooth visual frame transitions."}
                    {idx === 3 && "Build robust, highly scalable, and secure cloud infrastructures designed to synchronize complex database records on the edge."}
                    {idx === 4 && "Convert legacy code structures and terminal panels into modern, lightweight, glassmorphic Next.js application frontends."}
                    {idx === 5 && "Migrate live enterprise databases and network frameworks smoothly across cloud hosting environments with zero visual downtime."}
                    {idx === 6 && "Build bespoke enterprise applications designed from blueprints to resolve complex business flows and optimize analytics parameters."}
                    {idx === 7 && "Maintain continuous system integrity, resolve performance bottlenecks, and execute weekly security patches."}
                    {idx === 8 && "Host digital storefronts on secure global cloud clusters optimized for low latency, query caches, and high traffic volumes."}
                  </Body>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}

// Visual environment layout wrapper
function EnvironmentWrapper({ active, children }: { active: boolean; children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (el) {
      if (active) {
        gsap.killTweensOf(el);
        const childrenNodes = el.querySelectorAll(".animate-item");
        const imgNode = el.querySelector(".animate-img");
        const cardsNodes = el.querySelectorAll(".animate-card");
        const statsNodes = el.querySelectorAll(".animate-stat");
        const ctaNode = el.querySelector(".animate-cta");

        // Set initial reset values
        gsap.set(el, { opacity: 0 });
        gsap.set(childrenNodes, { opacity: 0, y: 15 });
        gsap.set(imgNode, { opacity: 0, scale: 0.95, x: 20 });
        gsap.set(cardsNodes, { opacity: 0, scale: 0.9, y: 10 });
        gsap.set(ctaNode, { opacity: 0, y: 10 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        
        // Quick visual swap timeline completing within 0.8 seconds
        tl.to(el, { opacity: 1, duration: 0.25 }, 0);
        tl.to(childrenNodes, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, 0.1);
        tl.to(imgNode, { opacity: 1, scale: 1, x: 0, duration: 0.45 }, 0.15);
        tl.to(cardsNodes, { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.06 }, 0.2);

        // Count stats values up dynamically using object value interpolation
        statsNodes.forEach((stat) => {
          const valElement = stat.querySelector(".stat-val");
          if (valElement) {
            const targetVal = parseFloat(valElement.getAttribute("data-value") || "0");
            const suffix = valElement.getAttribute("data-suffix") || "";
            const isDecimal = valElement.getAttribute("data-decimal") === "true";
            const counterObj = { value: 0 };
            
            tl.to(counterObj, {
              value: targetVal,
              duration: 0.55,
              ease: "power2.out",
              onUpdate: () => {
                valElement.textContent = (isDecimal ? counterObj.value.toFixed(1) : Math.floor(counterObj.value)) + suffix;
              }
            }, 0.2);
          }
        });

        tl.to(ctaNode, { opacity: 1, y: 0, duration: 0.25 }, 0.45);
      } else {
        gsap.killTweensOf(el);
        gsap.to(el, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
      }
    }
  }, [active]);

  return (
    <div 
      ref={elementRef} 
      className={cn("absolute inset-0 w-full h-full transition-all duration-500", active ? "pointer-events-auto z-10" : "pointer-events-none z-0")}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
export default Services;
