"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, H3, Body } from "../ui/Typography";
import { Button } from "../ui/Button";
import { X, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  quote: string;
  author: string;
}

interface Result {
  label: string;
  value: string;
}

interface Project {
  id: string;
  title: string;
  industry: string;
  desc: string;
  tech: string[];
  videoUrl: string;
  client: string;
  duration: string;
  challenge: string;
  solution: string;
  results: Result[];
  testimonial: Testimonial;
}

const projects: Project[] = [
  {
    id: "proj-1",
    title: "AURA",
    industry: "Spatial Intelligence",
    desc: "A premium spatial intelligence suite that maps real-time user behavior to responsive architectural ambient lights.",
    tech: ["Next.js", "Three.js", "GSAP", "TensorFlow"],
    videoUrl: "https://res.cloudinary.com/rznuvs5r/video/upload/v1782976841/hero-1_jntjwf.mp4",
    client: "AeroSpace Tech",
    duration: "6 Months",
    challenge: "Traditional smart workspaces feel static and require manual inputs. Our client wanted an ambient environment that adapts autonomously to group sizes, lighting conditions, and attention signals without cameras or privacy concerns.",
    solution: "We engineered AURA—a neural-mesh layer utilizing micro-radar arrays. Using GSAP and custom canvas layouts, we designed a responsive system control board that translates invisible radar points into ambient flows.",
    results: [
      { label: "Productivity Index", value: "+32%" },
      { label: "Energy Optimization", value: "40%" },
      { label: "User Adoption Rate", value: "96%" }
    ],
    testimonial: {
      quote: "PIVOT did not just develop our software; they redefined how humans interact with their architectural surroundings.",
      author: "Marcus Vance, Director of Innovation"
    }
  },
  {
    id: "proj-2",
    title: "KINETIC",
    industry: "Fintech Platforms",
    desc: "A real-time financial tracking dashboard managing multi-region assets under sub-millisecond execution constraints.",
    tech: ["React", "WebSockets", "D3.js", "Tailwind CSS"],
    videoUrl: "https://res.cloudinary.com/rznuvs5r/video/upload/v1782976839/hero-2_t0ppkd.mp4",
    client: "Centrum Capital",
    duration: "8 Months",
    challenge: "Centrum needed to present high-frequency asset movements in an intuitive, non-cluttered editorial layout to institutional managers who make million-dollar decisions under extreme cognitive loads.",
    solution: "We designed a dark-theme dashboard utilizing optimized rendering structures and custom chart packages. Manager focus is driven by subtle glowing indicators and organic color shifts.",
    results: [
      { label: "Data Latency Reduction", value: "85%" },
      { label: "User Session Retention", value: "+45%" },
      { label: "Transaction Velocity", value: "120k/s" }
    ],
    testimonial: {
      quote: "The interface feels like it anticipates the user's focus. The execution is flawless, premium, and extremely robust.",
      author: "Elena Rostova, Chief Product Officer"
    }
  },
  {
    id: "proj-3",
    title: "NEXUS",
    industry: "Logistics Systems",
    desc: "A cross-device premium tracking app integrating automated route mapping and driver safety parameters.",
    tech: ["React Native", "Mapbox", "Framer Motion", "Node.js"],
    videoUrl: "https://res.cloudinary.com/rznuvs5r/video/upload/v1782976836/hero-3_ov6msw.mp4",
    client: "Global Delivery Corp",
    duration: "5 Months",
    challenge: "Delivering tracking data to field workers in environments with poor connection speeds, while ensuring safety warnings do not distract drivers during heavy transit.",
    solution: "We created a mobile application focusing on high-contrast typographic layouts, Mapbox vector layers, and automated sync loops that queue coordinates offline.",
    results: [
      { label: "Route Efficiency", value: "+18%" },
      { label: "Driver Alert Response", value: "1.2s" },
      { label: "Offline Sync Accuracy", value: "99.9%" }
    ],
    testimonial: {
      quote: "The team built an application that feels premium and light, but handles deep complex mapping pipelines underneath.",
      author: "David Vance, Operations VP"
    }
  }
];

export function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cardImageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const detailOverlayRef = useRef<HTMLDivElement>(null);
  const overlayHeroRef = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);

  // Set up introductory scroll trigger fade
  useEffect(() => {
    const intro = introRef.current;
    if (intro) {
      gsap.fromTo(intro.children,
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
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  // Set up project card scroll triggers
  useEffect(() => {
    const cards = document.querySelectorAll(".project-exhibit-card");
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  // Shared Element Transition (FLIP) - Open Case Study
  const openCaseStudy = (project: Project, idx: number) => {
    const cardImg = cardImageRefs.current[idx];
    if (!cardImg) return;

    const rect = cardImg.getBoundingClientRect();
    setTriggerRect(rect);
    setSelectedProject(project);
    setIsCaseStudyOpen(true);
    document.body.style.overflow = "hidden"; // Lock page scroll

    // Wait for state to render the overlay, then animate
    setTimeout(() => {
      const hero = overlayHeroRef.current;
      const content = overlayContentRef.current;
      const overlay = detailOverlayRef.current;

      if (hero && content && overlay) {
        // Animate overlay background opacity
        gsap.to(overlay, {
          backgroundColor: "#F7F4EE",
          duration: 0.8,
          ease: "power3.inOut"
        });

        // Initialize hero position to match the trigger card rect
        gsap.set(hero, {
          position: "fixed",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: "24px"
        });

        // Animate hero to fullscreen top section
        gsap.to(hero, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "55vh",
          borderRadius: "0px",
          duration: 0.85,
          ease: "power4.inOut"
        });

        // Fade in details content
        gsap.fromTo(content,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5
          }
        );
      }
    }, 50);
  };

  // Close Case Study (Reverse FLIP)
  const closeCaseStudy = () => {
    const hero = overlayHeroRef.current;
    const content = overlayContentRef.current;
    const overlay = detailOverlayRef.current;
    const rect = triggerRect;

    if (hero && content && overlay && rect) {
      // Fade out details first
      gsap.to(content, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          // Animate hero background back to the card coordinates
          gsap.to(hero, {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            borderRadius: "24px",
            duration: 0.75,
            ease: "power4.inOut"
          });

          // Fade out background overlay
          gsap.to(overlay, {
            backgroundColor: "rgba(247, 244, 238, 0)",
            duration: 0.65,
            ease: "power3.inOut",
            onComplete: () => {
              setIsCaseStudyOpen(false);
              setSelectedProject(null);
              setTriggerRect(null);
              document.body.style.overflow = ""; // Unlock page scroll
            }
          });
        }
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full relative py-28 bg-[#F7F4EE] border-t border-border/40 select-none overflow-hidden"
    >
      {/* Subtle floating ambient grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-accent-terracotta/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-mutedGold/5 blur-[100px]" />
      </div>

      {/* Headline Intro */}
      <div
        ref={introRef}
        className="max-w-[720px] mx-auto text-center px-6 mb-28 relative z-10 flex flex-col items-center gap-6"
      >
        <span className="text-xs uppercase tracking-widest text-accent-terracotta font-bold">
          Selected Portfolio
        </span>
        <H2 className="uppercase">Featured Projects</H2>
        <Body className="text-[#555555] leading-relaxed">
          Every project began with one bold idea. Explore how we transformed visions into digital experiences that create real business impact.
        </Body>
      </div>

      {/* Editorial Exhibits */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 flex flex-col gap-36 relative z-10">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="project-exhibit-card w-full h-[70vh] sm:h-[80vh] flex flex-col justify-between relative group pointer-events-auto"
          >
            {/* Visual media block */}
            <div
              ref={(el) => {
                cardImageRefs.current[idx] = el;
              }}
              onClick={() => openCaseStudy(project, idx)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="w-full h-[75%] rounded-[24px] overflow-hidden relative border border-border/30 cursor-pointer shadow-premium select-none group"
            >
              {/* Overlay sheen gradients */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141414]/75 via-[#141414]/15 to-transparent pointer-events-none" />

              {/* Media element: AutoPlay video on hover, fallback Ken Burns image scaling */}
              <video
                src={project.videoUrl}
                muted
                playsInline
                loop
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out",
                  hoveredIdx === idx ? "scale-[1.03]" : "scale-100"
                )}
                ref={(el) => {
                  if (el) {
                    if (hoveredIdx === idx) {
                      el.play().catch(() => { });
                    } else {
                      el.pause();
                      el.currentTime = 0;
                    }
                  }
                }}
              />

              {/* Title & Metadata overlays */}
              <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-none">
                <div className="space-y-2 text-left">
                  <span className="text-xs font-semibold tracking-widest text-[#F7F4EE]/60 uppercase">
                    {project.industry}
                  </span>
                  <H3 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {project.title}
                  </H3>
                </div>

                <div className="flex items-center gap-2 group/btn py-2 px-5 rounded-full bg-[#FCFBF8]/10 backdrop-blur-md border border-[#FCFBF8]/10 text-white/90 hover:text-white transition-all duration-300">
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Inspect Artifacts
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </div>
              </div>
            </div>

            {/* Typography metadata under the card */}
            <div className="w-full h-[22%] pt-6 flex flex-col sm:flex-row items-start justify-between gap-6">
              <p className="text-left text-sm sm:text-base text-foreground/75 leading-relaxed max-w-[640px]">
                {project.desc}
              </p>

              {/* Project tech tags */}
              <div className="flex flex-wrap gap-2 justify-start sm:justify-end max-w-sm">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-border bg-[#FCFBF8] text-foreground/60 font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shared Element Case Study Detailed Overlay */}
      {isCaseStudyOpen && selectedProject && (
        <div
          ref={detailOverlayRef}
          className="fixed inset-0 z-[1000] overflow-y-auto bg-transparent select-none"
        >
          {/* 1. Fullscreen Zooming Media block */}
          <div
            ref={overlayHeroRef}
            className="relative overflow-hidden z-10"
          >
            <div className="absolute inset-0 z-10 bg-[#141414]/30 pointer-events-none" />
            <video
              src={selectedProject.videoUrl}
              muted
              playsInline
              autoPlay
              loop
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Header info in Hero */}
            <div className="absolute bottom-12 left-10 right-10 z-20 flex flex-col md:flex-row md:items-end justify-between gap-8 text-left text-white max-w-[1400px] mx-auto">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#F7F4EE]/70 font-semibold">
                  {selectedProject.industry}
                </span>
                <H2 className="text-white text-5xl sm:text-7xl font-extrabold tracking-tight uppercase leading-none">
                  {selectedProject.title}
                </H2>
              </div>

              <div className="flex items-center gap-12 border-l border-white/20 pl-8 h-16">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#F7F4EE]/50 block mb-1">Client</span>
                  <span className="text-sm font-semibold">{selectedProject.client}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#F7F4EE]/50 block mb-1">Duration</span>
                  <span className="text-sm font-semibold">{selectedProject.duration}</span>
                </div>
              </div>
            </div>

            {/* Absolute close button */}
            <button
              onClick={closeCaseStudy}
              className="fixed top-8 right-8 z-30 w-12 h-12 rounded-full border border-white/20 bg-[#141414]/40 hover:bg-[#141414]/70 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 cursor-pointer shadow-md pointer-events-auto"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Scrollable Details content page */}
          <div
            ref={overlayContentRef}
            className="w-full relative z-20 bg-[#F7F4EE] py-20 px-6 sm:px-12 md:px-16"
          >
            <div className="max-w-[1000px] mx-auto flex flex-col gap-28">

              {/* Side-by-side Challenge / Solution grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
                <div className="space-y-6">
                  <span className="text-xs uppercase tracking-widest text-accent-terracotta font-semibold">The Challenge</span>
                  <H3 className="text-foreground tracking-tight font-extrabold">Addressing Complex Systems Needs</H3>
                  <p className="text-base text-foreground/75 leading-relaxed font-sans font-normal">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div className="space-y-6">
                  <span className="text-xs uppercase tracking-widest text-accent-forestGreen font-semibold">The Solution</span>
                  <H3 className="text-foreground tracking-tight font-extrabold">Engineering Digital Transformation</H3>
                  <p className="text-base text-foreground/75 leading-relaxed font-sans font-normal">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Design process timeline visualizer */}
              <div className="w-full border-t border-border/40 pt-16 flex flex-col gap-10 text-left">
                <span className="text-xs uppercase tracking-widest text-accent-mutedGold font-semibold">Methodology</span>
                <H3 className="text-foreground font-extrabold tracking-tight">Our End-to-End Design Process</H3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 pt-6">
                  {[
                    { step: "01", name: "Research" },
                    { step: "02", name: "Strategy" },
                    { step: "03", name: "UI / UX" },
                    { step: "04", name: "Development" },
                    { step: "05", name: "Testing" },
                    { step: "06", name: "Deployment" }
                  ].map((phase) => (
                    <div
                      key={phase.step}
                      className="p-5 rounded-xl border border-border/30 bg-[#FCFBF8] shadow-sm flex flex-col gap-3"
                    >
                      <span className="text-xs text-accent-terracotta font-extrabold">{phase.step}</span>
                      <span className="text-sm font-semibold font-heading text-foreground">{phase.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Results Segment */}
              <div className="w-full border-t border-border/40 pt-16 flex flex-col gap-10 text-left">
                <span className="text-xs uppercase tracking-widest text-accent-terracotta font-semibold">Performance Metrics</span>
                <H3 className="text-foreground font-extrabold tracking-tight">Quantifiable Success Outcomes</H3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {selectedProject.results.map((res, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-8 rounded-premium bg-[#FCFBF8] border border-border/40 flex flex-col gap-3 items-start shadow-sm"
                    >
                      <span className="text-4xl sm:text-5xl font-heading font-extrabold text-accent-terracotta">
                        {res.value}
                      </span>
                      <span className="text-sm text-foreground/60 font-semibold font-sans">
                        {res.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used Grid */}
              <div className="w-full border-t border-border/40 pt-16 flex flex-col gap-8 text-left">
                <span className="text-xs uppercase tracking-widest text-accent-softPlum font-semibold">Integrations</span>
                <H3 className="text-foreground font-extrabold tracking-tight">The Modern Engineering Stack</H3>
                <div className="flex flex-wrap gap-3 pt-4">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs uppercase tracking-widest px-4 py-2 border border-border/40 bg-[#FCFBF8] rounded-full text-foreground/70 hover:border-accent-softPlum hover:text-accent-softPlum transition-colors duration-300 font-semibold shadow-sm cursor-pointer"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Testimonial quote card */}
              <div className="w-full rounded-premium bg-[#EFE9E1]/50 border border-border/30 p-8 sm:p-12 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 translate-x-[20px] translate-y-[-20px] text-foreground/5 text-9xl font-serif">
                  &ldquo;
                </div>
                <p className="text-xl sm:text-2xl font-heading font-medium text-foreground/90 italic leading-relaxed mb-6">
                  &ldquo;{selectedProject.testimonial.quote}&rdquo;
                </p>
                <span className="text-xs uppercase tracking-widest text-foreground/50 font-bold">
                  — {selectedProject.testimonial.author}
                </span>
              </div>

              {/* Case study closing call to action button */}
              <div className="w-full border-t border-border/40 pt-16 flex flex-col items-center gap-6 text-center">
                <H3 className="font-extrabold tracking-tight">Inspired by this project?</H3>
                <Body className="text-sm text-foreground/60 leading-relaxed max-w-sm">
                  Let&apos;s engineer your next digital success story together.
                </Body>
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Button
                    variant="primary"
                    onClick={closeCaseStudy}
                    className="h-[58px] px-8 rounded-xl text-base"
                  >
                    Start Your Project
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={closeCaseStudy}
                    className="h-[58px] px-8 rounded-xl text-base"
                  >
                    Book Discovery Call
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
