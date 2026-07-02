"use client";

import { useEffect, useState } from "react";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if the preloader has already run in the current session
    const hasIntroRun = sessionStorage.getItem("pivot-intro-complete");
    if (hasIntroRun === "true") {
      setLoading(false);
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

  const handleIntroComplete = () => {
    sessionStorage.setItem("pivot-intro-complete", "true");
    setLoading(false);
  };

  // Avoid hydration mismatch by waiting for client-side mount before deciding intro status
  if (!mounted) {
    return <div className="min-h-screen bg-[#141414]" />;
  }

  return (
    <>
      {loading && <Intro onComplete={handleIntroComplete} />}
      
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
