"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Users,
  Globe,
  Laptop,
  Smartphone,
  Cloud,
  RefreshCw,
  Wrench,
  ChevronRight,
  TrendingUp,
  Compass,
} from "lucide-react";

export function AboutClient() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 1. Trust Pillars / Values
  const values = [
    {
      title: "Business-First Thinking",
      description: "We start with what your business needs to achieve — not with a technology stack.",
      icon: Briefcase,
    },
    {
      title: "Practical Solutions",
      description: "We build technology that works in the real world, with your people and processes.",
      icon: Cpu,
    },
    {
      title: "A Partner, Not a Vendor",
      description: "We stay involved beyond delivery, helping your systems evolve as your business grows.",
      icon: Users,
    },
    {
      title: "Trust by Design",
      description: "We treat your systems, information and business decisions with the care they deserve.",
      icon: ShieldCheck,
    },
  ];

  // 2. The Problems We Help Solve
  const problems = [
    {
      title: "Manual processes",
      description: "Replace repetitive work with smarter systems and automation.",
      icon: RefreshCw,
      tag: "Automation",
    },
    {
      title: "Disconnected systems",
      description: "Bring your data and teams together.",
      icon: Layers,
      tag: "Integration",
    },
    {
      title: "Outdated software",
      description: "Modernize and extend what you already have.",
      icon: Sparkles,
      tag: "Modernization",
    },
    {
      title: "Growing businesses",
      description: "Build scalable solutions for what’s next.",
      icon: TrendingUp,
      tag: "Scalability",
    },
    {
      title: "Customer access",
      description: "Create exceptional digital experiences.",
      icon: Globe,
      tag: "Experience",
    },
    {
      title: "Reliability and support",
      description: "Keep your systems secure and running smoothly.",
      icon: ShieldCheck,
      tag: "Continuity",
    },
  ];

  // 3. How We Work
  const steps = [
    {
      number: "01",
      name: "Listen",
      description: "We take the time to understand your goals, challenges and the way your business actually works.",
      focus: "Understanding context, pain points & business metrics",
    },
    {
      number: "02",
      name: "Explore",
      description: "We look at the options — including what you already have — before recommending a direction.",
      focus: "Assessing architecture, feasibility & practical pathways",
    },
    {
      number: "03",
      name: "Build",
      description: "We design, develop and integrate carefully, keeping the outcome in focus.",
      focus: "Modern engineering, robust testing & agile delivery",
    },
    {
      number: "04",
      name: "Support",
      description: "We stay with you as your systems evolve, scale and change.",
      focus: "Ongoing reliability, system health & long-term evolution",
    },
  ];

  // 4. What We Help Businesses Build
  const capabilities = [
    {
      title: "Websites & Digital Experiences",
      description: "Build your online presence and reach your customers.",
      href: "/services/web-development",
      icon: Globe,
    },
    {
      title: "Business Applications",
      description: "Solve unique business needs with custom software.",
      href: "/services/web-applications",
      icon: Laptop,
    },
    {
      title: "Mobile Applications",
      description: "Engage your users anytime, anywhere.",
      href: "/services/mobile-applications",
      icon: Smartphone,
    },
    {
      title: "Cloud & Infrastructure",
      description: "Scale securely and cost-effectively.",
      href: "/services/cloud-applications",
      icon: Cloud,
    },
    {
      title: "Modernization & Migration",
      description: "Give your existing systems a new lease of life.",
      href: "/services/application-modernization",
      icon: RefreshCw,
    },
    {
      title: "Ongoing Support",
      description: "Keep your systems running at their best.",
      href: "/services/support-maintenance",
      icon: Wrench,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#071A2F] text-white pt-28 sm:pt-32 pb-16 relative overflow-hidden select-none">
        
        {/* Ambient Background & Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025] bg-noise" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0 pointer-events-none" />
        
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#1F6FA9]/10 blur-[130px] pointer-events-none" />
        <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#27A7A2]/8 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#1B5E8A]/10 blur-[140px] pointer-events-none" />

        {/* SECTION 1: HERO */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 pt-8 pb-20 sm:pb-28">
          
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27A7A2] hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs uppercase tracking-[8px] text-[#27A7A2] font-extrabold block mb-4">
                ABOUT PIVOT
              </span>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.12] mb-6">
                We exist to turn real business challenges into real progress.
              </h1>
              
              <p className="text-[#D9E8F4]/85 text-base sm:text-lg md:text-xl leading-relaxed font-sans max-w-2xl mb-10">
                PIVOT is a software and technology consultancy helping businesses solve everyday challenges, modernize the systems they rely on, and build what’s next — with practical, reliable technology.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto">
                <Button
                  variant="primary"
                  magnetic={true}
                  onClick={() => scrollToSection("how-we-work")}
                  className="h-[56px] px-8 rounded-xl text-sm uppercase tracking-widest font-bold bg-gradient-to-r from-[#12446A] via-[#1B7898] to-[#27A7A2] hover:brightness-110 shadow-[0_10px_30px_rgba(39,167,162,0.25)]"
                >
                  Our Approach
                </Button>

                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    magnetic={true}
                    className="h-[56px] px-8 rounded-xl text-sm uppercase tracking-widest font-bold border-white/20 hover:border-[#27A7A2] text-white w-full sm:w-auto"
                  >
                    Let’s Talk
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Reference / Collaboration Atmosphere */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl border border-[#1F6FA9]/30 bg-[#0A223B]/60 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(7,26,47,0.8)] overflow-hidden">
                
                {/* Decorative glow inside card */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#27A7A2]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1F6FA9]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#27A7A2] animate-pulse" />
                      <span className="text-xs uppercase tracking-widest text-[#6FD7B7] font-mono font-bold">
                        PIVOT CONSULTANCY ETHOS
                      </span>
                    </div>
                    <span className="text-[11px] text-[#D9E8F4]/50 font-mono">B2B TECHNOLOGY</span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-wider text-[#27A7A2] font-semibold">Problem-First Positioning</p>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-snug">
                      Practical, reliable technology designed around real business needs.
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#071A2F]/80 border border-white/10 text-left">
                      <span className="text-[11px] font-mono text-[#27A7A2] block mb-1">STRATEGY</span>
                      <span className="text-xs font-medium text-[#D9E8F4]/90">Business-First Direction</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#071A2F]/80 border border-white/10 text-left">
                      <span className="text-[11px] font-mono text-[#6FD7B7] block mb-1">EXECUTION</span>
                      <span className="text-xs font-medium text-[#D9E8F4]/90">End-to-End Delivery</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#123657]/40 border border-[#27A7A2]/20 flex items-center justify-between text-left">
                    <div className="flex items-center gap-3">
                      <Compass className="w-5 h-5 text-[#27A7A2] shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-white block">Consultative Partnership</span>
                        <span className="text-[11px] text-[#D9E8F4]/60">Beyond delivery, scaling with your growth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: VALUES / TRUST PILLARS */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-16 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-3">
              OUR TRUST PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
              Values that anchor everything we build.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-7 rounded-2xl bg-[#0B2238]/60 border border-white/10 hover:border-[#27A7A2]/60 hover:bg-[#0E2C48]/80 transition-all duration-300 flex flex-col justify-between text-left shadow-lg hover:shadow-[0_10px_30px_rgba(39,167,162,0.15)] hover:-translate-y-1"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#1F6FA9]/20 border border-[#27A7A2]/30 flex items-center justify-center text-[#27A7A2] group-hover:text-[#6FD7B7] mb-6 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-3">
                      {val.title}
                    </h3>
                    <p className="text-sm text-[#D9E8F4]/75 font-sans leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#6FD7B7] opacity-60 group-hover:opacity-100 transition-opacity">
                    <span>PILLAR 0{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: OUR STORY / WHY PIVOT EXISTS */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-3">
                OUR PURPOSE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight leading-tight mb-6">
                Why PIVOT exists
              </h2>
              <div className="p-6 rounded-2xl bg-[#091F35] border border-[#27A7A2]/25 shadow-inner">
                <p className="text-sm sm:text-base text-[#6FD7B7] font-mono font-semibold tracking-wide">
                  &ldquo;Different businesses. Different challenges. A common goal — progress.&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left text-[#D9E8F4]/85 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                Businesses rarely struggle because technology doesn’t exist. They struggle because the technology they have doesn’t fit the way they work.
              </p>
              <p>
                Processes become manual. Systems stop communicating. Software becomes outdated. Growth puts pressure on infrastructure. Good ideas get delayed because there’s no clear path to bring them to life.
              </p>
              <p className="text-white font-medium">
                PIVOT exists to help businesses move from these everyday challenges to technology that is simpler, more connected and ready for what’s next — with practical solutions and a team that understands the business behind the requirement.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 4: THE PROBLEMS WE HELP SOLVE */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-3">
              PROBLEM-FIRST PERSPECTIVE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Real challenges. Real solutions.
            </h2>
            <p className="text-[#D9E8F4]/80 text-base sm:text-lg font-sans">
              Our clients come to us with everyday business challenges — and together, we turn them into opportunities for growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {problems.map((prob, idx) => {
              const Icon = prob.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-[#092037]/70 border border-white/10 hover:border-[#1F6FA9] hover:bg-[#0D2845] transition-all duration-300 text-left flex flex-col justify-between group shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#123657] border border-[#27A7A2]/30 flex items-center justify-center text-[#27A7A2] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full bg-[#27A7A2]/10 border border-[#27A7A2]/30 text-[#6FD7B7]">
                        {prob.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-[#6FD7B7] transition-colors">
                      {prob.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#D9E8F4]/75 font-sans leading-relaxed">
                      {prob.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#27A7A2]">
                    <span className="font-mono">CHALLENGE 0{idx + 1}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: HOW WE WORK */}
        <section id="how-we-work" className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-3">
              OUR PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              A clear and collaborative journey.
            </h2>
            <p className="text-[#D9E8F4]/80 text-base sm:text-lg font-sans">
              We keep things simple, transparent and focused on what matters — your outcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-7 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between cursor-pointer ${
                  activeStep === idx
                    ? "bg-[#0E2C48] border-[#27A7A2] shadow-[0_0_25px_rgba(39,167,162,0.2)] scale-[1.02]"
                    : "bg-[#081F35]/70 border-white/10 hover:border-white/20 hover:bg-[#0A243D]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-mono font-extrabold text-[#27A7A2]">
                      {step.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#6FD7B7]" />
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    {step.name}
                  </h3>
                  
                  <p className="text-sm text-[#D9E8F4]/80 font-sans leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono text-[#6FD7B7] block mb-1">KEY FOCUS</span>
                  <span className="text-xs text-[#D9E8F4]/60 font-sans">{step.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: PEOPLE BEHIND PIVOT */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="rounded-3xl border border-[#1F6FA9]/30 bg-gradient-to-br from-[#0A2540]/80 via-[#071D33]/90 to-[#0A2540]/80 p-8 sm:p-12 md:p-16 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#27A7A2]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl text-left space-y-6">
              <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block">
                THE TEAM
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
                Engineers. Thinkers. Problem-solvers.
              </h2>
              
              <p className="text-[#D9E8F4]/85 text-base sm:text-xl font-sans leading-relaxed">
                We’re a close-knit team of engineers, consultants and problem-solvers who genuinely enjoy what we do — because we get to make a difference in how businesses work and grow.
              </p>

              <div className="pt-4">
                <Link href="/contact">
                  <Button
                    variant="primary"
                    magnetic={true}
                    className="h-[54px] px-8 rounded-xl text-xs uppercase tracking-widest font-bold bg-[#27A7A2] hover:bg-[#208b87] text-white"
                  >
                    <span>Meet the Team</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 7: WHAT WE HELP BUSINESSES BUILD */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-3">
                SERVICES & CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
                Practical expertise. Real-world outcomes.
              </h2>
              <p className="text-[#D9E8F4]/80 text-base sm:text-lg font-sans">
                Our expertise covers the full journey — from building new solutions to modernizing existing systems and keeping them running.
              </p>
            </div>

            <Link href="/services" className="shrink-0">
              <Button variant="secondary" className="h-[50px] px-6 text-xs uppercase tracking-widest font-bold">
                <span>Explore Our Services</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <Link
                  key={idx}
                  href={cap.href}
                  className="p-8 rounded-2xl bg-[#092037]/70 border border-white/10 hover:border-[#27A7A2] hover:bg-[#0D2A48] transition-all duration-300 text-left flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#123657] border border-[#27A7A2]/30 flex items-center justify-center text-[#27A7A2] mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-[#6FD7B7] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-[#D9E8F4]/75 font-sans leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-[#27A7A2] group-hover:text-white transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* SECTION 8: PROOF / CASE STUDIES BRIDGE */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#081E33] border border-[#1F6FA9]/30 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block">
                PROOF OF IMPACT
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
                See how we’ve helped businesses move forward.
              </h3>
              <p className="text-sm sm:text-base text-[#D9E8F4]/75 font-sans leading-relaxed">
                We believe the best evidence of capability is real progress made in real business environments. Explore our delivered client outcomes across industries.
              </p>
            </div>

            <Link href="/projects" className="shrink-0 w-full sm:w-auto">
              <Button
                variant="primary"
                magnetic={true}
                className="h-[56px] px-8 rounded-xl text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-[#12446A] via-[#1B7898] to-[#27A7A2] hover:brightness-110 w-full sm:w-auto justify-center"
              >
                <span>View Case Studies</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* SECTION 9: ABOUT CLOSING CTA */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 pt-16 pb-24 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[8px] text-[#27A7A2] font-mono font-bold block">
              REAL CHALLENGES. CLEARER PATHS. BETTER OUTCOMES.
            </span>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Have a challenge in mind?
            </h2>
            
            <p className="text-[#D9E8F4]/80 text-base sm:text-xl font-sans leading-relaxed max-w-xl mx-auto">
              Let’s talk about how PIVOT can help you move forward.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  magnetic={true}
                  className="h-[58px] px-9 rounded-xl text-sm uppercase tracking-widest font-bold bg-[#27A7A2] hover:bg-[#208b87] text-white shadow-[0_10px_35px_rgba(39,167,162,0.3)] w-full sm:w-auto justify-center"
                >
                  Start a Conversation
                </Button>
              </Link>

              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  magnetic={true}
                  className="h-[58px] px-8 rounded-xl text-sm uppercase tracking-widest font-bold border-white/20 hover:border-[#27A7A2] text-white w-full sm:w-auto justify-center"
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer hideCTA={true} />
    </>
  );
}
