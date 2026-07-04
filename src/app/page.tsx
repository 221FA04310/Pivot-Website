"use client";

import { useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Intro } from "@/components/sections/Intro";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Collaborators } from "@/components/sections/Collaborators";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Footer } from "@/components/sections/Footer";

// Global client-side variable to track if the preloader has run.
// This survives client-side route changes but is reset when the page is refreshed.
let introPlayedGlobal = false;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (introPlayedGlobal) {
      setLoading(false);
      setHasPlayedIntro(true);
      if (typeof window !== "undefined") {
        (window as unknown as { __pivotIntroPlayed?: boolean }).__pivotIntroPlayed = true;
      }
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleIntroStartFade = useCallback(() => {
    setLoading(false);
  }, []);

  const handleIntroComplete = useCallback(() => {
    introPlayedGlobal = true;
    if (typeof window !== "undefined") {
      (window as unknown as { __pivotIntroPlayed?: boolean }).__pivotIntroPlayed = true;
    }
    setHasPlayedIntro(true);
  }, []);

  // Avoid hydration mismatch by waiting for client-side mount before deciding intro status
  if (!mounted) {
    return <div className="min-h-screen bg-[#101623]" />;
  }

  return (
    <>
      {!hasPlayedIntro && (
        <Intro 
          onStartFade={handleIntroStartFade} 
          onComplete={handleIntroComplete} 
        />
      )}
      
      <div 
        className={`transition-all duration-1000 ease-out ${
          loading ? "opacity-0 h-screen overflow-hidden pointer-events-none" : "opacity-100"
        }`}
      >
        <Navbar introComplete={!loading} />
        <main className="relative w-full">
          <Hero />
          <Services />
          <FeaturedProjects />
          <Collaborators />
          <WhyChooseUs />
        </main>
        <Footer />
      </div>
    </>
  );
}
