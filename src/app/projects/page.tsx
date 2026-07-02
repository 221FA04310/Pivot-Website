"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Cpu, Globe, Layout } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const categories = [
    { title: "Vortex Analytics", desc: "Data pipelines & core engineering", type: Cpu },
    { title: "Solstice OS", desc: "Responsive web client and application design", type: Globe },
    { title: "Apex UI", desc: "Premium designer components & systems", type: Layout },
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
              Project Archive
            </h1>
            <p className="text-base md:text-xl text-foreground/60 max-w-2xl leading-relaxed">
              Explore the detailed directory of design systems, software components, and premium platforms engineered by PIVOT.
            </p>
          </div>

          {/* Directory list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((project, idx) => {
              const Icon = project.type;
              return (
                <Card key={idx} spotlight={true} className="flex flex-col justify-between h-64 p-6">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-accent-indigo/10 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-accent-indigo" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-xs text-foreground/50 leading-relaxed">{project.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-border mt-auto">
                    <Button variant="secondary" className="w-full text-xs py-2 px-4">
                      Inspect Artifacts
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
