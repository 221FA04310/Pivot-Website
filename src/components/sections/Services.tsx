/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, Body, H3 } from "../ui/Typography";
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
  ctaText: string;
  stats: Array<{
    value: number;
    decimal?: boolean;
    suffix: string;
    label: string;
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
  const bgImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const narrativeWrapperRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const servicesData: ServiceData[] = [
    {
      number: "01",
      label: "Website Development",
      summary: "Premium responsive websites that elevate your brand.",
      heading: "Website Development",
      description: "Build fast, responsive and visually stunning websites that establish your digital identity and convert visitors into customers.",
      ctaText: "Explore Website Solutions",
      stats: [
        { value: 150, suffix: "+", label: "Websites Delivered" },
        { value: 98, suffix: "%", label: "Client Satisfaction" }
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
      ctaText: "Discover Web Applications",
      stats: [
        { value: 200, suffix: "+", label: "Applications Built" },
        { value: 99.9, decimal: true, suffix: "%", label: "System Uptime" }
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
      ctaText: "Explore Mobile Apps",
      stats: [
        { value: 80, suffix: "+", label: "Apps Published" },
        { value: 4.9, decimal: true, suffix: "★", label: "Average App Rating" }
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
      ctaText: "Discover Cloud Solutions",
      stats: [
        { value: 50, suffix: "+", label: "Clouds Constructed" },
        { value: 100, suffix: "%", label: "Secure Isolation" }
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
      ctaText: "Initiate Modernization",
      stats: [
        { value: 120, suffix: "+", label: "Legacy Projects Rebuilt" },
        { value: 40, suffix: "%", label: "Resource Speed Gain" }
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
      ctaText: "Schedule Migration Dialogue",
      stats: [
        { value: 90, suffix: "+", label: "Migrations Completed" },
        { value: 99.9, decimal: true, suffix: "%", label: "Downtime Prevented" }
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
      ctaText: "Begin Custom Design",
      stats: [
        { value: 110, suffix: "+", label: "Custom Stacks Built" },
        { value: 100, suffix: "%", label: "Bespoke Logic Fit" }
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
      ctaText: "Review Support Programs",
      stats: [
        { value: 300, suffix: "+", label: "Systems Protected" },
        { value: 24, suffix: "/7", label: "Engineer Monitoring" }
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
      ctaText: "Explore Edge Hosting",
      stats: [
        { value: 400, suffix: "+", label: "Websites Hosted" },
        { value: 99.99, decimal: true, suffix: "%", label: "Network Availability" }
      ],
      features: [
        { icon: <Globe className="w-3.5 h-3.5" />, title: "Global CDN", desc: "Content cached near readers." },
        { icon: <Lock className="w-3.5 h-3.5" />, title: "Cloud Security", desc: "Auto SSL updates." },
        { icon: <Server className="w-3.5 h-3.5" />, title: "Performance Stats", desc: "DDoS filtering shields." },
        { icon: <Infinity className="w-3.5 h-3.5" />, title: "Unlimited Bandwidth", desc: "Matches peak holiday loads." }
      ]
    }
  ];

  // Camera Parallax Timeline & Pinned Navigation setup
  useEffect(() => {
    const container = containerRef.current;
    const bgImage = bgImageRef.current;
    const bgWrapper = bgWrapperRef.current;
    const narrative = narrativeWrapperRef.current;
    if (!container || !bgImage || !bgWrapper) return;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      // 1. Pinned ScrollTrigger setup (duration 7.2x viewport height)
      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=720%", 
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: 1 / 8,
          duration: { min: 0.2, max: 0.4 },
          delay: 0.1,
          ease: "power1.out"
        },
        onUpdate: (self) => {
          const rawProgress = self.progress;
          let idx = 0;
          if (rawProgress <= 0.14) {
            idx = 0;
          } else if (rawProgress >= 0.94) {
            idx = 8;
          } else {
            const normalized = (rawProgress - 0.14) / 0.80;
            idx = Math.min(8, Math.floor(normalized * 9));
          }
          setActiveIdx(idx);
          window.dispatchEvent(new CustomEvent("services-scroll", { detail: rawProgress }));
        },
      });

      // 2. Slow scroll-parallax dolly container movement
      const cameraTween = gsap.fromTo(bgWrapper, 
        { 
          scale: 1.04, 
          xPercent: 1.5, 
          yPercent: -4.5,
          rotation: -0.6,
          transformPerspective: 1200,
          rotateX: -1.2,
          rotateY: 1.2
        },
        {
          scale: 1.15,
          xPercent: -2.5,
          yPercent: 4.5,
          rotation: 0.6,
          rotateX: 1.2,
          rotateY: -1.2,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=720%",
            scrub: true,
          }
        }
      );

      // 3. Multi-layer depth layout translation (sliding console at a different rate)
      let consoleTween: gsap.core.Tween | null = null;
      if (narrative) {
        consoleTween = gsap.fromTo(narrative,
          { yPercent: 3.5, transformPerspective: 1000, rotateY: 1.5 },
          {
            yPercent: -3.5,
            rotateY: -1.5,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=720%",
              scrub: true,
            }
          }
        );
      }

      // 4. Infinite ambient camera breathing loops (runs only when in viewport)
      const ambientTimeline = gsap.timeline({ repeat: -1 });
      ambientTimeline.to(bgImage, {
        xPercent: 1.8,
        yPercent: -0.6,
        scale: 1.025,
        rotation: 0.18,
        duration: 7,
        ease: "sine.inOut"
      })
      .to(bgImage, {
        xPercent: -1.8,
        yPercent: 0.8,
        scale: 1.03,
        rotation: -0.22,
        duration: 7,
        ease: "sine.inOut"
      })
      .to(bgImage, {
        xPercent: 0.8,
        yPercent: -0.8,
        scale: 1.015,
        rotation: 0.25,
        duration: 7,
        ease: "sine.inOut"
      })
      .to(bgImage, {
        xPercent: 0,
        yPercent: 0,
        scale: 1.00,
        rotation: 0,
        duration: 7,
        ease: "sine.inOut"
      });

      ambientTimeline.pause();

      // 5. Visualizer cards glow breathing loops
      const visualizerCards = container.querySelectorAll(".video-visualizer-container");
      let glowTimeline: gsap.core.Timeline | null = null;
      if (visualizerCards.length > 0) {
        glowTimeline = gsap.timeline({ repeat: -1 });
        glowTimeline.to(visualizerCards, {
          borderColor: "rgba(169, 106, 77, 0.22)",
          boxShadow: "0 0 25px rgba(214, 178, 110, 0.06)",
          duration: 6,
          ease: "sine.inOut"
        })
        .to(visualizerCards, {
          borderColor: "rgba(169, 106, 77, 0.12)",
          boxShadow: "0 0 10px rgba(214, 178, 110, 0.02)",
          duration: 6,
          ease: "sine.inOut"
        });
        
        glowTimeline.pause();
      }

      const visibilityTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          ambientTimeline.play();
          if (glowTimeline) glowTimeline.play();
        },
        onEnterBack: () => {
          ambientTimeline.play();
          if (glowTimeline) glowTimeline.play();
        },
        onLeave: () => {
          ambientTimeline.pause();
          if (glowTimeline) glowTimeline.pause();
        },
        onLeaveBack: () => {
          ambientTimeline.pause();
          if (glowTimeline) glowTimeline.pause();
        }
      });

      return () => {
        pinTrigger.kill();
        cameraTween.kill();
        cameraTween.scrollTrigger?.kill();
        ambientTimeline.kill();
        visibilityTrigger.kill();
        if (glowTimeline) glowTimeline.kill();
        if (consoleTween) {
          consoleTween.kill();
          consoleTween.scrollTrigger?.kill();
        }
      };
    });

    matchMedia.add("(max-width: 767px)", () => {
      // 1. Pinned ScrollTrigger setup for Mobile (duration 7.2x viewport height)
      const pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=720%", 
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: 1 / 8,
          duration: { min: 0.2, max: 0.4 },
          delay: 0.1,
          ease: "power1.out"
        },
        onUpdate: (self) => {
          const rawProgress = self.progress;
          let idx = 0;
          if (rawProgress <= 0.14) {
            idx = 0;
          } else if (rawProgress >= 0.94) {
            idx = 8;
          } else {
            const normalized = (rawProgress - 0.14) / 0.80;
            idx = Math.min(8, Math.floor(normalized * 9));
          }
          setActiveIdx(idx);
          window.dispatchEvent(new CustomEvent("services-scroll", { detail: rawProgress }));
        },
      });

      // 2. Mobile camera scroll-parallax targeted to bgWrapper Dolly
      const cameraTween = gsap.fromTo(bgWrapper, 
        { 
          scale: 1.05, 
          yPercent: -8,
          transformPerspective: 1000,
          rotateX: -0.8
        },
        {
          scale: 1.12,
          yPercent: 8,
          rotateX: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=720%",
            scrub: true,
          }
        }
      );

      // 3. Mobile ambient breathing
      const ambientTimeline = gsap.timeline({ repeat: -1 });
      ambientTimeline.to(bgImage, {
        xPercent: 1.5,
        yPercent: -0.5,
        scale: 1.025,
        rotation: 0.15,
        duration: 7,
        ease: "sine.inOut"
      })
      .to(bgImage, {
        xPercent: -1.5,
        yPercent: 0.5,
        scale: 1.03,
        rotation: -0.15,
        duration: 7,
        ease: "sine.inOut"
      })
      .to(bgImage, {
        xPercent: 0.8,
        yPercent: -0.8,
        scale: 1.015,
        rotation: 0.2,
        duration: 7,
        ease: "sine.inOut"
      })
      .to(bgImage, {
        xPercent: 0,
        yPercent: 0,
        scale: 1.00,
        rotation: 0,
        duration: 7,
        ease: "sine.inOut"
      });

      ambientTimeline.pause();

      // Mobile visualizer card glow breathing
      const visualizerCards = container.querySelectorAll(".video-visualizer-container");
      let glowTimeline: gsap.core.Timeline | null = null;
      if (visualizerCards.length > 0) {
        glowTimeline = gsap.timeline({ repeat: -1 });
        glowTimeline.to(visualizerCards, {
          borderColor: "rgba(169, 106, 77, 0.22)",
          boxShadow: "0 0 25px rgba(214, 178, 110, 0.06)",
          duration: 6,
          ease: "sine.inOut"
        })
        .to(visualizerCards, {
          borderColor: "rgba(169, 106, 77, 0.12)",
          boxShadow: "0 0 10px rgba(214, 178, 110, 0.02)",
          duration: 6,
          ease: "sine.inOut"
        });
        
        glowTimeline.pause();
      }

      const visibilityTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          ambientTimeline.play();
          if (glowTimeline) glowTimeline.play();
        },
        onEnterBack: () => {
          ambientTimeline.play();
          if (glowTimeline) glowTimeline.play();
        },
        onLeave: () => {
          ambientTimeline.pause();
          if (glowTimeline) glowTimeline.pause();
        },
        onLeaveBack: () => {
          ambientTimeline.pause();
          if (glowTimeline) glowTimeline.pause();
        }
      });

      return () => {
        pinTrigger.kill();
        cameraTween.kill();
        cameraTween.scrollTrigger?.kill();
        ambientTimeline.kill();
        visibilityTrigger.kill();
        if (glowTimeline) glowTimeline.kill();
      };
    });

    return () => matchMedia.revert();
  }, []);

  // Gold floating canvas dust particles & ambient reactive lighting
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track scroll progress to animate lighting shift
    let scrollProgress = 0;
    const handleScrollProgress = (e: Event) => {
      scrollProgress = (e as CustomEvent).detail;
    };
    window.addEventListener("services-scroll", handleScrollProgress);

    // Multi-layer depth particles (3 layers of depth multipliers)
    const particles = Array.from({ length: 24 }).map(() => {
      const depth = Math.random() * 1.2 + 0.4; // layer depth [0.4, 1.6]
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 1.3 + 0.5) * depth,
        vx: (Math.random() - 0.5) * 0.05 * depth,
        vy: (-Math.random() * 0.12 - 0.03) * depth,
        alpha: (Math.random() * 0.16 + 0.04) / depth,
        depth
      };
    });

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.003;

      // Light glow reacts softly to scroll progress (ambient shift) and automatic breathing loop
      const isDesktop = width >= 768;
      const glowX = isDesktop 
        ? width * 0.72 + Math.cos(scrollProgress * Math.PI) * 45 
        : width * 0.5;
      const glowY = isDesktop 
        ? height * 0.55 + Math.sin(scrollProgress * Math.PI) * 35 
        : height * 0.75;
      const glowRadius = Math.min(width, height) * (0.45 + scrollProgress * 0.06);

      const grad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
      // Soft breathing brightening/dimming loop over time
      const breathing = 1.0 + Math.sin(time * 3.5) * 0.15; // ±15% brightness breathing
      const alphaVal = (0.065 + Math.sin(scrollProgress * Math.PI) * 0.015) * breathing;
      
      grad.addColorStop(0, `rgba(169, 106, 77, ${alphaVal})`); 
      grad.addColorStop(0.5, `rgba(214, 178, 110, ${0.015 * breathing})`); 
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;

        ctx.fillStyle = `rgba(214, 178, 110, ${p.alpha})`; 
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("services-scroll", handleScrollProgress);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Title, Desc, and stats entrance transitions on idx changes
  useEffect(() => {
    const narrative = narrativeWrapperRef.current;
    if (narrative) {
      const titles = narrative.querySelectorAll(".animate-title");
      const descs = narrative.querySelectorAll(".animate-desc");
      const stats = narrative.querySelectorAll(".animate-stats");
      const ctas = narrative.querySelectorAll(".animate-cta");
      const gridCards = narrative.querySelectorAll(".animate-gridcard");
      
      // Clean up active animations to prevent overlapping
      gsap.killTweensOf([titles, descs, stats, ctas, gridCards]);
      
      gsap.fromTo(titles, 
        { opacity: 0, y: 12, filter: "blur(4px)" }, 
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "power2.out" }
      );
      gsap.fromTo(descs, 
        { opacity: 0, y: 8 }, 
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 }
      );
      gsap.fromTo(gridCards, 
        { opacity: 0, y: 10, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.06, ease: "power2.out", delay: 0.12 }
      );
      gsap.fromTo(stats, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out", delay: 0.22 }
      );
      gsap.fromTo(ctas, 
        { opacity: 0, scale: 0.96 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.3 }
      );
    }
  }, [activeIdx]);

  return (
    <div 
      ref={containerRef} 
      className="w-full relative bg-[#F4F0EA] bg-noise min-h-screen flex flex-col justify-center gap-6 md:gap-8 py-[16px] px-[20px] md:p-[64px] lg:pt-[120px] lg:pb-[120px] lg:px-[80px] overflow-hidden select-none services-container"
    >
      <style>{`
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseRipple {
          0% {
            transform: scale(0.6) translate(-65px, -50px);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.3) translate(-25px, -20px);
            opacity: 0;
          }
        }
        @keyframes flowParticles {
          0% {
            transform: translateX(-45px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(130px);
            opacity: 0;
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes float-slow {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          15% {
            opacity: 0.65;
          }
          85% {
            opacity: 0.65;
          }
          100% {
            transform: translateY(-80px);
            opacity: 0;
          }
        }
        @keyframes slide-up-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-16px);
          }
        }
        @keyframes assemble-left {
          0% {
            transform: translate(-12px, -4px);
            opacity: 0.65;
          }
          100% {
            transform: translate(0, 0);
            opacity: 1;
          }
        }
        @keyframes assemble-right {
          0% {
            transform: translate(12px, -4px);
            opacity: 0.65;
          }
          100% {
            transform: translate(0, 0);
            opacity: 1;
          }
        }
        @keyframes assemble-bottom {
          0% {
            transform: translate(0, 12px);
            opacity: 0.65;
          }
          100% {
            transform: translate(0, 0);
            opacity: 1;
          }
        }
        .animate-float-slow {
          animation: float-slow 4.5s infinite linear;
        }
        .animate-slide-up-slow {
          animation: slide-up-slow 5.5s infinite ease-in-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3.8s infinite ease-in-out;
        }
        .animate-assemble-left {
          animation: assemble-left 2s infinite alternate ease-in-out;
        }
        .animate-assemble-right {
          animation: assemble-right 2.2s infinite alternate ease-in-out;
        }
        .animate-assemble-bottom {
          animation: assemble-bottom 2.4s infinite alternate ease-in-out;
        }
        @keyframes blinkLED {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        @keyframes dashConnection {
          to {
            stroke-dashoffset: -20;
          }
        }
        .led-blink-1 {
          animation: blinkLED 1.2s infinite ease-in-out;
        }
        .led-blink-2 {
          animation: blinkLED 1.8s infinite ease-in-out 0.3s;
        }
        .led-blink-3 {
          animation: blinkLED 1.5s infinite ease-in-out 0.6s;
        }
        .animate-connection-line {
          stroke-dasharray: 4, 4;
          animation: dashConnection 1.5s infinite linear;
        }
        @keyframes videoBreathing {
          0%, 100% {
            transform: scale(1.00);
          }
          50% {
            transform: scale(1.03);
          }
        }
        .animate-video-breathing {
          animation: videoBreathing 14s infinite ease-in-out;
        }
        @media (max-height: 850px) {
          .services-container {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
            gap: 20px !important;
          }
          .headline-intro {
            padding-bottom: 12px !important;
          }
          .desktop-panels-grid {
            height: calc(100vh - 240px) !important;
            max-height: calc(100vh - 240px) !important;
            gap: 24px !important;
          }
          .narrative-console-card {
            padding: 20px 24px !important;
            gap: 24px !important;
          }
          .content-card-spacing {
            gap: 20px !important;
            padding-top: 20px !important;
          }
          .features-grid-spacing {
            gap: 20px !important;
          }
        }
        @media (max-height: 720px) {
          .services-container {
            padding-top: 16px !important;
            padding-bottom: 16px !important;
            gap: 12px !important;
          }
          .headline-intro {
            padding-bottom: 4px !important;
          }
          .headline-intro h2 {
            font-size: 1.5rem !important;
            line-height: 1.25 !important;
          }
          .headline-intro p {
            font-size: 0.8rem !important;
            line-height: 1.3 !important;
          }
          .desktop-panels-grid {
            height: calc(100vh - 170px) !important;
            max-height: calc(100vh - 170px) !important;
            gap: 16px !important;
          }
          .narrative-console-card {
            padding: 12px 18px !important;
            gap: 16px !important;
            border-radius: 12px !important;
          }
          .content-card-spacing {
            gap: 12px !important;
            padding-top: 12px !important;
          }
          .features-grid-spacing {
            gap: 12px !important;
          }
          .stats-row-spacing {
            padding-top: 8px !important;
          }
        }
      `}</style>

      {/* Background Image layer with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div ref={bgWrapperRef} className="absolute inset-0 w-full h-full">
          <img
            ref={bgImageRef}
            src="https://res.cloudinary.com/v9znuxjo/image/upload/v1783068617/Servicespic_ojtheo.png"
            alt=""
            loading="lazy"
            className="absolute left-0 top-0 w-full h-[120%] object-cover object-center md:object-[60%_center] pointer-events-none select-none"
          />
        </div>
        {/* Premium Overlay */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(248, 246, 242, 0.72) 0%, rgba(248, 246, 242, 0.58) 40%, rgba(248, 246, 242, 0.72) 100%)"
          }}
        />
      </div>

      {/* Floating Canvas Particles & Ambient Glow */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* 2. Headline Intro (fades out as pin begins) */}
      <div 
        ref={introRef}
        className="max-w-[760px] mx-auto text-center pb-[20px] relative z-10 flex flex-col items-center gap-2 md:gap-3 headline-intro"
      >
        <span className="text-xs uppercase tracking-widest text-[#A96A4D] font-bold">
          Our Services
        </span>
        <H2 className="uppercase text-[#1B2430] text-[28px] sm:text-[36px] md:text-[46px]">How Can We Shape Your Digital Future?</H2>
        <Body className="text-[#5B6575] leading-relaxed">
          Every business has a different destination. Explore how PIVOT transforms ideas into meaningful digital experiences.
        </Body>
      </div>

      {/* 3. Immersive Split Panels */}
      <div className="max-w-[1400px] mx-auto pb-12 md:pb-0 md:flex-1 relative z-10 md:flex md:items-center w-full">
        
        {/* Desktop Split Layout (md and up) - 35% Left, 65% Right */}
        <div className="hidden md:grid md:grid-cols-[35fr_65fr] gap-[48px] w-full h-[52vh] items-center relative desktop-panels-grid">
          
          {/* Left side list menu - Pinned Navigation with 20px gap spacing */}
          <div className="flex flex-col gap-[20px] items-start justify-center relative z-20 h-full">
            {servicesData.map((item, idx) => (
              <div 
                key={item.label}
                className="flex flex-col items-start justify-center cursor-pointer"
                onClick={() => setActiveIdx(idx)}
              >
                <div className="flex items-center gap-4">
                  {/* Active vertical side bar indicator */}
                  <div 
                    className={cn(
                      "w-1.5 h-6 bg-[#A96A4D] rounded-full transition-all duration-500 origin-top",
                      activeIdx === idx ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    )}
                  />
                  
                  <div className="flex flex-col text-left select-none">
                    <div className="flex items-baseline gap-2">
                      <span className={cn(
                        "font-sans font-bold text-[10px] tracking-wider transition-colors duration-500",
                        activeIdx === idx ? "text-[#A96A4D]" : "text-[#1B2430]/25"
                      )}>
                        {item.number}
                      </span>
                      <span 
                        className={cn(
                          "font-heading font-extrabold transition-all duration-500 tracking-tight leading-none",
                          activeIdx === idx 
                            ? "text-[23px] text-[#A96A4D]" 
                            : "text-[18px] text-[#1B2430]/40"
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side narrative and visual ecosystem console (65% width grid block) */}
          <div ref={narrativeWrapperRef} className="w-full h-full relative flex items-center justify-center z-20">
            
            <div className="w-full h-full flex gap-[32px] items-center bg-cardBg/30 border border-[#A96A4D]/15 shadow-premium rounded-premium p-8 relative backdrop-blur-md narrative-console-card">
              
              {/* Left Column: Text & Features (45%) */}
              <div className="w-[45%] flex flex-col justify-center text-left h-full z-10">
                
                {/* Heading -> Description Spacing: 28px */}
                <div className="flex flex-col gap-[28px] items-start">
                  <div className="space-y-[6px]">
                    <span className="text-[10px] uppercase font-bold text-[#A96A4D] tracking-wider block">
                      Milestone {servicesData[activeIdx].number}
                    </span>
                    <H3 className="text-[#1B2430] text-2xl font-extrabold tracking-tight animate-title leading-[1.25] max-w-[650px]">
                      {servicesData[activeIdx].heading}
                    </H3>
                  </div>
                  <p className="text-[11px] text-[#5B6575] leading-relaxed font-sans font-normal animate-desc max-w-[620px]">
                    {servicesData[activeIdx].description}
                  </p>
                </div>

                {/* Description -> CTA / Spacing block: 36px */}
                <div className="pt-[36px] flex flex-col gap-[32px] w-full content-card-spacing">
                  
                  {/* 2x2 Feature Cards Grid - Spacing gap: 32px */}
                  <div className="grid grid-cols-2 gap-[32px] w-full features-grid-spacing">
                    {servicesData[activeIdx].features.map((feat, fIdx) => (
                      <div 
                        key={fIdx} 
                        className="animate-gridcard glassmorphism p-2.5 rounded-xl border border-white/45 bg-white/72 flex flex-col gap-1 select-text"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[#A96A4D]">{feat.icon}</span>
                          <span className="font-heading font-extrabold text-[10px] text-[#1B2430] tracking-tight leading-none">
                            {feat.title}
                          </span>
                        </div>
                        <p className="text-[8px] text-[#5B6575] leading-tight font-sans font-normal">
                          {feat.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Statistics Row with gap 32px */}
                  <div className="flex gap-[32px] border-t border-border/20 pt-4 animate-stats text-left stats-row-spacing">
                    {servicesData[activeIdx].stats.map((stat, sIdx) => (
                      <div key={sIdx} className="text-left">
                        <span 
                          className="stat-val font-heading font-extrabold text-lg text-[#A96A4D]"
                        >
                          {stat.value}{stat.suffix}
                        </span>
                        <span className="block text-[8px] uppercase tracking-wider text-[#5B6575] mt-0.5 font-bold">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Call to action button */}
                  <div className="animate-cta">
                    <Button variant="primary" className="h-[44px] px-5 rounded-lg text-[10px] uppercase tracking-widest bg-[#A96A4D] hover:bg-[#BC7A55] text-white border-transparent shadow-[0_10px_20px_rgba(169,106,77,0.25)]">
                      {servicesData[activeIdx].ctaText}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column: Holographic Interactive Environment Visualizer (55%) */}
              <div className="w-[55%] h-full rounded-xl border border-[#A96A4D]/15 bg-[#FCFAF6]/20 relative overflow-hidden flex items-center justify-center z-10 backdrop-blur-sm video-visualizer-container">
                <HolographicVisualizer index={activeIdx} />
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Layout (under md breakpoint) - Centered and stacked */}
        <div className="flex md:hidden flex-col gap-[14px] w-full relative z-10 items-center text-center">
          
          {/* Centered Navigation scroll row */}
          <div className="w-full overflow-x-auto no-scrollbar py-1 border-b border-white/10 flex justify-start sm:justify-center items-center gap-[12px] px-2">
            {servicesData.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-300",
                  activeIdx === idx 
                    ? "border-[#A96A4D] bg-[#A96A4D]/10 text-[#A96A4D]" 
                    : "border-transparent text-[#1B2430]/40"
                )}
              >
                <span className="text-[9px]">{item.number}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Content panel: Heading -> Description Spacing: 28px */}
          <div className="w-full flex flex-col gap-[14px] items-center max-w-[620px]">
            <div className="space-y-[6px] text-center">
              <span className="text-[10px] uppercase font-bold text-[#A96A4D] tracking-wider block">
                Milestone {servicesData[activeIdx].number}
              </span>
              <H3 className="text-[#1B2430] text-lg font-extrabold tracking-tight leading-[1.3] max-w-[650px] mx-auto">
                {servicesData[activeIdx].heading}
              </H3>
              <p className="text-[11px] text-[#5B6575] leading-relaxed font-sans font-normal max-w-[620px] mx-auto">
                {servicesData[activeIdx].description}
              </p>
            </div>

            {/* Description -> CTA Spacing: 36px including layout */}
            <div className="w-full flex flex-col gap-[16px] items-center pt-[4px]">
              
              {/* Mobile Holographic Visualizer (Video plays here now) */}
              <div className="w-full h-[180px] rounded-xl border border-[#A96A4D]/15 bg-[#FCFAF6]/30 relative overflow-hidden flex items-center justify-center backdrop-blur-md video-visualizer-container">
                <HolographicVisualizer index={activeIdx} />
              </div>

              {/* 2x2 Feature Cards Grid (Icons/feature cards) */}
              <div className="grid grid-cols-2 gap-[12px] w-full">
                {servicesData[activeIdx].features.map((feat, fIdx) => (
                  <div 
                    key={fIdx} 
                    className="glassmorphism p-2.5 rounded-xl border border-white/45 bg-white/72 flex flex-col gap-1 items-center text-center"
                  >
                    <span className="text-[#A96A4D] p-1.5 bg-[#A96A4D]/5 rounded-full">{feat.icon}</span>
                    <span className="font-heading font-extrabold text-[10px] text-[#1B2430] tracking-tight leading-none">
                      {feat.title}
                    </span>
                    <p className="text-[8px] text-[#5B6575] leading-normal font-sans font-normal">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stats Row with gap 24px */}
              <div className="flex justify-center gap-[24px] w-full border-t border-border/20 pt-4">
                {servicesData[activeIdx].stats.map((stat, sIdx) => (
                  <div key={sIdx} className="text-center">
                    <span className="font-heading font-extrabold text-lg text-[#A96A4D]">
                      {stat.value}{stat.suffix}
                    </span>
                    <span className="block text-[8px] uppercase tracking-wider text-[#5B6575] mt-0.5 font-bold">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Full width button on mobile (Explore CTA) */}
              <div className="w-full pt-[4px]">
                <Button variant="primary" className="h-[40px] w-full rounded-lg text-[10px] uppercase tracking-widest bg-[#A96A4D] hover:bg-[#BC7A55] text-white border-transparent shadow-[0_10px_20px_rgba(169,106,77,0.25)]">
                  {servicesData[activeIdx].ctaText}
                </Button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const videoUrls = [
  "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077418/video-6_taoxl7.mp4", // Website Development
  "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077162/video-2_nywpd7.mp4", // Web Applications
  "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077483/video-7_vbmmpn.mp4", // Mobile Applications
  "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077299/video-4_e9tahn.mp4", // Cloud Applications
  "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077162/video-2_nywpd7.mp4", // Application Modernization
  "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077065/video-1_ojlcka.mp4", // Migration Services
  "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077418/video-6_taoxl7.mp4", // Custom Software Development
  "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077357/video-5_esapb1.mp4", // Support & Maintenance
  "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077236/video-3_kouxvh.mp4"  // Cloud Hosting Services
];

function HolographicVisualizer({ index }: { index: number }) {
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  // Parity determines active buffer and source paths
  const activeBuffer = index % 2 === 0 ? 'A' : 'B';
  const srcA = activeBuffer === 'A' ? videoUrls[index] : videoUrls[(index + 1) % 9];
  const srcB = activeBuffer === 'B' ? videoUrls[index] : videoUrls[(index + 1) % 9];

  useEffect(() => {
    const videoA = videoRefA.current;
    const videoB = videoRefB.current;

    if (activeBuffer === 'A') {
      if (videoA) {
        videoA.play().catch(() => {});
      }
      const timer = setTimeout(() => {
        if (videoRefB.current && index % 2 === 0) {
          videoRefB.current.pause();
        }
      }, 700);
      return () => clearTimeout(timer);
    } else {
      if (videoB) {
        videoB.play().catch(() => {});
      }
      const timer = setTimeout(() => {
        if (videoRefA.current && index % 2 !== 0) {
          videoRefA.current.pause();
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeBuffer, srcA, srcB, index]);

  return (
    <div className="w-full h-full relative flex items-center justify-center z-10 overflow-hidden rounded-xl">
      {/* Soft Gold holographic ambient light sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#A96A4D]/5 via-[#D6B26E]/5 to-transparent z-0 pointer-events-none rounded-xl" />

      {/* Buffer A element */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out overflow-hidden rounded-xl transform-gpu",
          activeBuffer === 'A' ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
        )}
      >
        <video
          ref={videoRefA}
          src={srcA}
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center animate-video-breathing rounded-xl"
          style={{
            background: "transparent"
          }}
        />
        <div 
          className="absolute inset-0 pointer-events-none z-20 rounded-xl"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.08) 100%)"
          }}
        />
      </div>

      {/* Buffer B element */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out overflow-hidden rounded-xl transform-gpu",
          activeBuffer === 'B' ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
        )}
      >
        <video
          ref={videoRefB}
          src={srcB}
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center animate-video-breathing rounded-xl"
          style={{
            background: "transparent"
          }}
        />
        <div 
          className="absolute inset-0 pointer-events-none z-20 rounded-xl"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.08) 100%)"
          }}
        />
      </div>
    </div>
  );
}

export default Services;
