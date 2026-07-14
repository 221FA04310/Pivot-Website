"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2 } from "../ui/Typography";
import { Button } from "../ui/Button";
import { ArrowUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLHeadingElement>(null);
  const buildRef = useRef<HTMLParagraphElement>(null);
  
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const btn1Ref = useRef<HTMLDivElement>(null);
  const btn2Ref = useRef<HTMLDivElement>(null);

  const footerLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const dustParticles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 35; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.3 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.3 - 0.05,
        alpha: Math.random() * 0.35 + 0.1,
      });
    }

    const light = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: Math.min(width, height) * 0.75,
      color: "rgba(214, 178, 110, 0.04)"
    };

    let animationFrameId: number;

    const render = () => {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#1C2738");
      bgGrad.addColorStop(0.4, "#182131");
      bgGrad.addColorStop(1, "#151D2B");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      light.x += (light.targetX - light.x) * 0.015;
      light.y += (light.targetY - light.y) * 0.015;
      const grad = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius);
      grad.addColorStop(0, light.color);
      grad.addColorStop(0.5, "rgba(169, 106, 77, 0.01)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.007)";
      for (let i = 0; i < 500; i++) {
        ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
      }

      dustParticles.forEach((p) => {
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

      if (Math.random() < 0.005) {
        light.targetX = width / 2 + (Math.random() - 0.5) * 120;
        light.targetY = height / 2 + (Math.random() - 0.5) * 120;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Initial states: everything is hidden initially
    gsap.set(stage1Ref.current, { opacity: 0, y: 40 });
    gsap.set([readyRef.current, buildRef.current], { opacity: 0, y: 40 });
    gsap.set([btn1Ref.current, btn2Ref.current], { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", // when the top of the footer enters the bottom of the viewport
        end: "bottom bottom",   // when the bottom of the footer is at the bottom of the viewport
        scrub: 0.6,          // smooth 600ms damping catch-up duration
        invalidateOnRefresh: true,
      }
    });

    // 1. Sentence fades in as user scrolls into the section
    tl.to(stage1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: "power2.out"
    }, 0);

    // Sentence stays visible (hold state) from 0.35 to 0.5

    // 2. Sentence fades out
    tl.to(stage1Ref.current, {
      opacity: 0,
      y: -40,
      duration: 0.15,
      ease: "power2.in"
    }, 0.5);

    // 3. Heading elements reveal in sequence after sentence fades out
    tl.to(readyRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    }, 0.65);

    tl.to(buildRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    }, 0.7);

    // Ambient background light shift and particle speed update
    tl.to(light, {
      color: "rgba(201, 107, 74, 0.05)",
      duration: 0.3,
      ease: "power2.inOut"
    }, 0.7);

    tl.call(() => {
      dustParticles.forEach((p) => {
        p.vy = -Math.random() * 0.8 - 0.2;
      });
    }, [], 0.75);

    // 4. Subtle wrapper shift and button reveal
    tl.to(textWrapperRef.current, {
      y: -30,
      duration: 0.2,
      ease: "power2.inOut"
    }, 0.8);

    tl.to(btn1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.15,
      ease: "power2.out"
    }, 0.85);

    tl.to(btn2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.15,
      ease: "power2.out"
    }, 0.9);

    gsap.fromTo(footerLinksRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerLinksRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
      tl.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      ref={containerRef}
      className="w-full relative bg-[#141414] select-none text-white overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="w-full min-h-[90vh] flex items-center justify-center relative z-10 px-6 sm:px-12 pointer-events-none">
        <div 
          ref={stage1Ref}
          className="absolute max-w-[900px] text-center pointer-events-auto"
        >
          <H2 className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15] normal-case">
            Every great journey starts with one brave decision.
          </H2>
        </div>

        <div 
          ref={textWrapperRef}
          className="flex flex-col items-center justify-center text-center max-w-[700px] gap-6"
        >
          <h2 
            ref={readyRef}
            className="text-white text-5xl sm:text-7xl md:text-8xl font-heading font-extrabold tracking-tight"
          >
            Ready?
          </h2>
          <p 
            ref={buildRef}
            className="text-white/80 text-2xl sm:text-4xl font-heading font-bold max-w-[600px] leading-tight"
          >
            Let&apos;s Build Your Future Together.
          </p>

          <div 
            ref={buttonWrapperRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 pointer-events-auto"
          >
            <div ref={btn1Ref}>
              <Button 
                variant="primary" 
                magnetic={true} 
                className="h-[60px] px-8 rounded-[20px] text-sm uppercase tracking-wider shadow-lg bg-[#A96A4D] hover:bg-[#C58B64] border-transparent text-white"
              >
                Start Your Project
              </Button>
            </div>
             <div ref={btn2Ref}>
              <Button 
                variant="secondary" 
                magnetic={true} 
                className="h-[60px] px-8 rounded-[20px] text-sm uppercase tracking-wider border border-[#A96A4D] bg-transparent text-white hover:bg-[#C58B64] hover:border-[#C58B64]"
              >
                Book Discovery Call
              </Button>
            </div>
          </div>
        </div>
      </div>
 
      <div 
        ref={footerLinksRef}
        className="w-full border-t border-white/10 py-16 px-6 sm:px-12 md:px-16 relative z-10 pointer-events-auto"
        style={{
          background: "linear-gradient(180deg, #1C2738 0%, #182131 40%, #151D2B 100%)"
        }}
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 pb-16">
          <div className="md:col-span-5 space-y-6 text-left">
            <Link href="/" className="text-3xl font-heading font-extrabold tracking-widest text-white">
              PIVOT<span className="text-[#A96A4D]">.</span>
            </Link>
            <p className="text-white/75 text-sm leading-relaxed max-w-sm">
              Transforming ideas into meaningful digital experiences through elite engineering and custom visual interfaces.
            </p>
          </div>
 
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Company</h4>
            <ul className="space-y-2 text-xs font-semibold uppercase tracking-wider">
              <li><Link href="/" className="text-[#D6B26E]/80 hover:text-white transition-colors duration-200">About</Link></li>
              <li><Link href="/services" className="text-[#D6B26E]/80 hover:text-white transition-colors duration-200">Services</Link></li>
              <li><Link href="/projects" className="text-[#D6B26E]/80 hover:text-white transition-colors duration-200">Projects</Link></li>
              <li><span className="text-white/40 cursor-not-allowed">Careers</span></li>
            </ul>
          </div>
 
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Resources</h4>
            <ul className="space-y-2 text-xs font-semibold uppercase tracking-wider">
              <li><span className="text-white/40 cursor-not-allowed">Blog</span></li>
              <li><span className="text-white/40 cursor-not-allowed">Privacy</span></li>
              <li><span className="text-white/40 cursor-not-allowed">Terms</span></li>
              <li><span className="text-white/40 cursor-not-allowed">FAQ</span></li>
            </ul>
          </div>
 
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Contact</h4>
            <ul className="space-y-2 text-xs font-semibold uppercase tracking-wider">
              <li><span className="text-[#D6B26E]/80">hello@pivot.studio</span></li>
              <li><span className="text-[#D6B26E]/80">+1 (555) 0192-384</span></li>
              <li className="flex items-center gap-3 pt-3 text-white/50">
                <a href="#" aria-label="Github Link" className="hover:text-white transition-colors duration-200">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn Link" className="hover:text-white transition-colors duration-200">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram Link" className="hover:text-white transition-colors duration-200">
                  <svg className="w-4.5 h-4.5 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/50">
          <div className="text-left space-y-1">
            <span>&copy; {new Date().getFullYear()} PIVOT. All rights reserved.</span>
            <span className="block text-[10px] text-white/30">Crafted with passion.</span>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 py-2 px-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300 cursor-pointer shadow-sm outline-none"
            aria-label="Scroll Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
