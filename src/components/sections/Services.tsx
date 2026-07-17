"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
  videoUrl: string;
  path: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "web-dev",
    name: "Website Development",
    tagline: "Don't let a great business stay hidden behind an ordinary website.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077418/video-6_taoxl7.mp4",
    path: "/services/web-development"
  },
  {
    id: "web-apps",
    name: "Web Applications",
    tagline: "Powerful software that grows with your business, every step of the way.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077162/video-2_nywpd7.mp4",
    path: "/services/web-applications"
  },
  {
    id: "mobile-apps",
    name: "Mobile Applications",
    tagline: "Stay connected with your customers wherever they are.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077483/video-7_vbmmpn.mp4",
    path: "/services/mobile-applications"
  },
  {
    id: "cloud-apps",
    name: "Cloud Applications",
    tagline: "Scale faster with secure cloud solutions built for the future.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077299/video-4_e9tahn.mp4",
    path: "/services/cloud-applications"
  },
  {
    id: "app-mod",
    name: "Application Modernization",
    tagline: "Transform legacy systems into modern digital experiences.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077162/video-2_nywpd7.mp4",
    path: "/services/application-modernization"
  },
  {
    id: "migration",
    name: "Migration Services",
    tagline: "Move your business forward without leaving your data behind.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077065/video-1_ojlcka.mp4",
    path: "/services/migration-services"
  },
  {
    id: "custom-software",
    name: "Custom Software Development",
    tagline: "Software crafted exclusively around your business goals.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077418/video-6_taoxl7.mp4",
    path: "/services/custom-software-development"
  },
  {
    id: "support-main",
    name: "Support & Maintenance",
    tagline: "Reliable support that keeps your business running without interruption.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077357/video-5_esapb1.mp4",
    path: "/services/support-maintenance"
  },
  {
    id: "cloud-hosting",
    name: "Cloud Hosting Services",
    tagline: "Fast, secure hosting that keeps your business online around the clock.",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077236/video-3_kouxvh.mp4",
    path: "/services/cloud-hosting-services"
  }
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Header reveal animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
  }, []);

  // Split data into left and right columns to establish continuous visual flow on desktop
  const leftColumnServices = servicesData.filter((_, idx) => idx % 2 === 0);
  const rightColumnServices = servicesData.filter((_, idx) => idx % 2 === 1);

  return (
    <section
      ref={containerRef}
      className="w-full relative pt-[40px] pb-[120px] md:pt-[60px] md:pb-[180px] px-6 sm:px-12 md:px-20 lg:px-32 bg-[#081B33] overflow-hidden select-none"
    >
      {/* 1. Viewport-Fixed Continuous Background Video (Constrained by clip-path to this section) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden [clip-path:inset(0_0_0_0)]">
        <div className="fixed inset-0 w-full h-full pointer-events-none">
          <video
            src="https://res.cloudinary.com/rznuvs5r/video/upload/v1784094190/services_pivot_nstx7x.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 2. Premium dark navy overlay above background video (55% opacity) */}
      <div className="absolute inset-0 bg-[#081B33]/55 z-10 pointer-events-none" />

      {/* 3. Main content wrapper layered on top */}
      <div className="max-w-[1400px] w-full mx-auto relative z-20">
        
        {/* Section Heading */}
        <div 
          ref={headerRef} 
          className="max-w-4xl text-center mx-auto mb-20 md:mb-24 flex flex-col gap-4"
        >
          <span className="text-sm sm:text-base font-semibold uppercase tracking-[10px] text-[#1F6FA9] block text-center mx-auto">
            SERVICES
          </span>
          <h2 className="text-white font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.3] tracking-tight max-w-3xl text-center mx-auto">
            We build digital products that help businesses grow, scale and lead with confidence.
          </h2>
        </div>

        {/* Desktop Staggered Masonry Flow Layout (md and up) - continuous visual flow */}
        <div className="hidden md:grid grid-cols-2 gap-x-6 md:gap-x-10 lg:gap-x-12 w-full relative">
          {/* Left Column (Card 1, 3, 5, 7, 9) */}
          <div className="flex flex-col gap-y-16 lg:gap-y-24">
            {leftColumnServices.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onExploreClick={() => setPreviewVideoUrl(service.videoUrl)} 
              />
            ))}
          </div>

          {/* Right Column (Card 2, 4, 6, 8) */}
          <div className="flex flex-col gap-y-16 lg:gap-y-24 pt-[150px] lg:pt-[195px]">
            {rightColumnServices.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onExploreClick={() => setPreviewVideoUrl(service.videoUrl)} 
              />
            ))}
          </div>
        </div>

        {/* Mobile Sequential Layout (under md) */}
        <div className="flex md:hidden flex-col gap-y-12 w-full relative">
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onExploreClick={() => setPreviewVideoUrl(service.videoUrl)} 
            />
          ))}
        </div>

      </div>

      {/* Cinematic Full-Screen Video Preview Overlay */}
      <AnimatePresence>
        {previewVideoUrl && (
          <VideoPreviewOverlay 
            videoUrl={previewVideoUrl} 
            onClose={() => setPreviewVideoUrl(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ServiceCardProps {
  service: ServiceItem;
  onExploreClick: () => void;
}

function ServiceCard({ service, onExploreClick }: ServiceCardProps) {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Reveal card animation
    if (cardContainerRef.current) {
      gsap.fromTo(
        cardContainerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardContainerRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Parallax scrolling effect
    if (parallaxRef.current) {
      gsap.fromTo(
        parallaxRef.current,
        { y: 30 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }
  }, []);

  // Handle play/pause on hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onExploreClick();
  };

  return (
    <div ref={cardContainerRef} className="w-full max-w-[620px]">
      <div ref={parallaxRef} className="w-full">
        <Link 
          href={service.path}
          className="group block w-full text-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card Media Wrapper */}
          <div className="relative w-full aspect-[16/10] md:h-[345px] md:w-[580px] max-w-full overflow-hidden rounded-[24px] bg-[#0A3B66] border border-[#1F6FA9]/10 dark:border-white/5 shadow-premium transition-all duration-700 ease-out transform-gpu group-hover:scale-[1.03] group-hover:shadow-[0_20px_50px_rgba(31,111,169,0.25)]">
            
            {/* Soft blue glow behind the card on hover */}
            <div 
              className="absolute inset-0 -z-10 rounded-[24px] bg-[#1F6FA9] blur-[25px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
            />

            {/* Static Image State (z-10) */}
            <img
              src={service.imageUrl}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out transform-gpu group-hover:scale-[1.05] z-10"
              style={{
                opacity: isHovered ? 0 : 1
              }}
            />

            {/* Video State (z-20 with preload="auto") */}
            <video
              ref={videoRef}
              src={service.videoUrl}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out transform-gpu z-20"
              style={{
                opacity: isHovered ? 1 : 0
              }}
            />

            {/* Premium Dark Overlay (z-30) */}
            <div 
              className="absolute inset-0 bg-black/50 transition-opacity duration-500 ease-in-out pointer-events-none z-30"
              style={{
                opacity: isHovered ? 1 : 0
              }}
            />

            {/* Centered Explore Button (z-40) */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out transform-gpu z-40"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered 
                  ? "translate(-50%, -50%) scale(1)" 
                  : "translate(-50%, -50%) scale(0.85)"
              }}
            >
              <button
                type="button"
                onClick={handleExploreClick}
                className="w-[110px] h-[110px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-[#0A3B66] hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center text-white text-[11px] uppercase tracking-widest font-bold font-heading gap-1 shadow-2xl outline-none cursor-pointer"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Card Metadata Centered Directly Below every Card */}
          <div className="mt-6 md:w-[580px] max-w-full text-center mx-auto flex flex-col items-center">
            <h3 className="text-white font-heading font-bold text-2xl sm:text-[28px] tracking-tight leading-[1.2] transition-colors duration-300 group-hover:text-[#1F6FA9] text-center">
              {service.name}
            </h3>
            <p className="mt-2.5 text-base sm:text-lg text-[#C8D3E0] font-sans font-normal leading-relaxed text-center max-w-[420px]">
              {service.tagline}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

interface VideoPreviewOverlayProps {
  videoUrl: string;
  onClose: () => void;
}

function VideoPreviewOverlay({ videoUrl, onClose }: VideoPreviewOverlayProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 w-screen h-screen z-[9999] bg-[#081B33] flex items-center justify-center overflow-hidden"
    >
      {/* Autoplay Loop Muted cover video */}
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />

      {/* Circular Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-20 w-12 h-12 rounded-full border border-white/20 bg-black/40 hover:bg-white hover:text-[#081B33] hover:scale-105 transition-all duration-300 flex items-center justify-center text-white cursor-pointer shadow-lg outline-none"
        aria-label="Close Preview"
      >
        <X className="w-6 h-6" />
      </button>
    </motion.div>
  );
}

export default Services;
