"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const offerings = [
    {
      tier: "Creative Frontends",
      desc: "Immersive high-performance web animations, interactive visualizers, web gl integrations, and high-fidelity graphics systems.",
      details: ["Next.js & React ecosystem", "GSAP Timeline coordination", "Framer Motion layout transitions", "Lenis fine-tuned scroll setups"],
    },
    {
      tier: "Full-Stack Platforms",
      desc: "Comprehensive product engineering services from server nodes, persistent query cache managers, cloud configs, to deployment pipelines.",
      details: ["TypeScript architecture", "Fast API design patterns", "Edge-runtime setups", "Modern state management"],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-grid-pattern">
        <div className="absolute inset-0 bg-radial-gradient z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-indigo hover:text-foreground transition-colors duration-200 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-7xl font-heading font-extrabold text-foreground tracking-tight mb-4">
              Services Directory
            </h1>
            <p className="text-base md:text-xl text-foreground/60 max-w-2xl leading-relaxed">
              Explore the engineering and design capabilities we offer to design systems, construct software, and optimize performance.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offerings.map((offering, idx) => (
              <Card key={idx} spotlight={true} className="flex flex-col justify-between p-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    {offering.tier}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/60 mb-8 leading-relaxed">
                    {offering.desc}
                  </p>
                  <ul className="space-y-3">
                    {offering.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-3 text-sm text-foreground/75">
                        <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8 border-t border-border mt-8">
                  <Button variant="primary" className="w-full text-sm">
                    Inquire for Specifications
                  </Button>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
