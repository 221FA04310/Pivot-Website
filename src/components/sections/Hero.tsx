"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H1, Body } from "../ui/Typography";
import { Button } from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

// Register ScrollTrigger client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  const slides = [
    {
      chapter: "Chapter I: The Idea",
      heading: "Don't Let a Great Idea Stay Just an Idea.",
      subheading: "Every successful company began with someone taking the first step. Tell us your vision—we'll help turn it into a product.",
      buttonText: "Take the First Step",
      overlayClass: "from-[#141414]/80 via-[#141414]/55 to-transparent",
    },
    {
      chapter: "Chapter II: The Vision",
      heading: "Turn Your Vision Into a Website People Can't Ignore.",
      subheading: "Your website is often the first impression of your business. We make sure it's one that inspires, earns trust, and drives real results.",
      buttonText: "Bring Life to Your Vision",
      overlayClass: "from-[#141923]/85 via-[#141923]/55 to-transparent",
    },
    {
      chapter: "Chapter III: The Creation",
      heading: "Your Success Story Could Be the Next One We Tell.",
      subheading: "Every project began with someone who had an idea and a vision. Explore the digital experiences we have created and imagine what we could build together.",
      buttonText: "Explore Our Success Stories",
      overlayClass: "from-[#19141e]/85 via-[#19141e]/55 to-transparent",
    },
  ];

  // Slide transition controller
  const goToSlide = (nextIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentVideo = videoRefs[currentSlide].current;
    const nextVideo = videoRefs[nextIndex].current;

    // Fade current text out
    gsap.to(textRef.current, {
      opacity: 0,
      y: -25,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Pause previous video
        if (currentVideo) {
          currentVideo.pause();
        }

        // Setup and play next video
        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {});
        }

        // Swap visual slide states
        setCurrentSlide(nextIndex);
        setProgress(0);
        setIsTransitioning(false);
      }
    });
  };

  // Text Entrance Animation upon slide change
  useEffect(() => {
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const button = buttonRef.current;
    const textWrapper = textRef.current;

    if (heading && subheading && button && textWrapper) {
      // Ensure container is visible
      gsap.set(textWrapper, { opacity: 1, y: 0 });

      // Run staggered upward reveal timeline
      const tl = gsap.timeline();
      tl.fromTo(heading,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      )
      .fromTo(subheading,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(button,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      );
    }
  }, [currentSlide]);

  // Sync scroll positioning to slide Hero elements up organically
  useEffect(() => {
    const container = containerRef.current;
    const textContainer = textRef.current;

    if (container && textContainer) {
      const scrollAnimation = gsap.to(textContainer, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      return () => {
        scrollAnimation.scrollTrigger?.kill();
        scrollAnimation.kill();
      };
    }
  }, []);

  // Update progress width based on current video playhead position
  const handleTimeUpdate = (index: number) => {
    const video = videoRefs[index].current;
    if (video && index === currentSlide) {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage || 0);
    }
  };

  // Track cursor coordinates for hardware accelerated parallax shift
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);

    gsap.to(videoContainerRef.current, {
      x: x * 12,
      y: y * 12,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      x: -x * 20,
      y: -y * 20,
      duration: 1.0,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-screen w-full relative overflow-hidden bg-[#141414] select-none"
    >
      {/* 1. GPU-Accelerated Parallax Video Canvas Container */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 w-[105%] h-[105%] left-[-2.5%] top-[-2.5%] z-0"
      >
        <video
          ref={videoRefs[0]}
          src="/hero-1.mp4"
          preload="auto"
          muted
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: currentSlide === 0 ? 1 : 0 }}
          onTimeUpdate={() => handleTimeUpdate(0)}
          onEnded={() => goToSlide(1)}
        />
        <video
          ref={videoRefs[1]}
          src="/hero-2.mp4"
          preload="none"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: currentSlide === 1 ? 1 : 0 }}
          onTimeUpdate={() => handleTimeUpdate(1)}
          onEnded={() => goToSlide(2)}
        />
        <video
          ref={videoRefs[2]}
          src="/hero-3.mp4"
          preload="none"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: currentSlide === 2 ? 1 : 0 }}
          onTimeUpdate={() => handleTimeUpdate(2)}
          onEnded={() => goToSlide(0)}
        />
      </div>

      {/* 2. Premium Light Gradient Mask Overlay */}
      <div 
        className={cn(
          "absolute inset-0 z-10 transition-all duration-1000 bg-gradient-to-r pointer-events-none",
          slides[currentSlide].overlayClass
        )}
      />

      {/* 3. Centered Content bounds (1400px maximum width aligned) */}
      <div className="absolute inset-0 z-20 flex items-center max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 pointer-events-none">
        <div 
          ref={textRef}
          className="max-w-[620px] text-left flex flex-col items-start pointer-events-auto"
        >
          <span className="text-xs uppercase tracking-widest text-[#F7F4EE]/60 font-bold mb-5 block">
            {slides[currentSlide].chapter}
          </span>
          <H1 
            ref={headingRef} 
            className="text-white text-[34px] sm:text-[46px] md:text-[58px] font-extrabold tracking-tight leading-[1.15] mb-6 normal-case"
          >
            {slides[currentSlide].heading}
          </H1>
          <Body 
            ref={subheadingRef}
            className="text-[16px] sm:text-[18px] md:text-[20px] font-sans font-normal text-white/85 leading-[1.65] max-w-[580px] mb-8"
          >
            {slides[currentSlide].subheading}
          </Body>
          
          <Button 
            ref={buttonRef}
            variant="primary" 
            magnetic={true}
            className="h-[58px] px-8 rounded-[18px] text-base"
          >
            {slides[currentSlide].buttonText}
          </Button>
        </div>
      </div>

      {/* 4. Glassmorphic Navigation Arrows */}
      <div className="absolute inset-y-0 left-6 sm:left-10 z-30 flex items-center">
        <button
          onClick={() => goToSlide(currentSlide === 0 ? 2 : currentSlide - 1)}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:scale-108 hover:bg-white/10 transition-all duration-300 cursor-pointer outline-none pointer-events-auto shadow-md"
          aria-label="Previous Slide"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-6 sm:right-10 z-30 flex items-center">
        <button
          onClick={() => goToSlide(currentSlide === 2 ? 0 : currentSlide + 1)}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:scale-108 hover:bg-white/10 transition-all duration-300 cursor-pointer outline-none pointer-events-auto shadow-md"
          aria-label="Next Slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* 5. Pagination Progress Bar Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 pointer-events-auto">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="relative cursor-pointer focus:outline-none"
            aria-label={`Go to slide ${idx + 1}`}
          >
            {idx === currentSlide ? (
              // Active expanded pill with play progress fill
              <div className="h-2 w-12 rounded-full bg-white/20 overflow-hidden relative transition-all duration-500">
                <div 
                  className="h-full bg-accent-terracotta transition-all duration-100 ease-linear rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            ) : (
              // Inactive small circle
              <div className="h-2 w-2 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-500" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
