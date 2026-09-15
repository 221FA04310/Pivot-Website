import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { industriesData } from "@/data/industryData";
import { 
  ArrowLeft, ArrowRight, Activity, GraduationCap, ShoppingBag, Rocket, 
  Building2, Brain, CloudLightning, Briefcase, ChevronRight, Sparkles 
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | PIVOT Software & Consultancy",
  description: "Explore how PIVOT develops custom software, digital platforms, APIs, data systems, cloud architectures, and AI solutions across modern industries."
};

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "healthcare": Activity,
  "education": GraduationCap,
  "retail": ShoppingBag,
  "startups": Rocket,
  "enterprise": Building2,
  "ai-solutions": Brain,
  "cloud-transformation": CloudLightning,
  "business-solutions": Briefcase
};

export default function IndustriesIndexPage() {
  const industriesList = Object.values(industriesData);

  return (
    <>
      <Navbar introComplete={true} />
      <main className="min-h-screen pt-32 pb-24 px-6 sm:px-12 md:px-20 bg-[#071827] relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-noise" />
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#27A7A2]/10 blur-[150px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#1F6FA9]/10 blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-16">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6FD7B7] hover:text-white transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            
            <div className="flex items-center gap-2 text-xs font-mono text-[#6FD7B7] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Software Engineering By Industry</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-[#F8FBFC] tracking-tight mb-6">
              Industries We Power
            </h1>
            
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl leading-relaxed">
              PIVOT develops purpose-built digital platforms, custom software architectures, integrations, data layers, cloud environments, and practical AI capabilities tailored to modern industry requirements.
            </p>
          </div>

          {/* 8 Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {industriesList.map((ind) => {
              const Icon = industryIcons[ind.slug] || Activity;
              return (
                <Link 
                  key={ind.slug} 
                  href={`/industries/${ind.slug}`}
                  className="group block p-8 rounded-2xl bg-[#091E34]/80 border border-white/10 hover:border-[#6FD7B7]/50 hover:bg-[#0B2540] transition-all duration-300 shadow-xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#6FD7B7] group-hover:scale-110 group-hover:bg-[#27A7A2]/20 transition-all duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-white/40 font-bold tracking-widest">
                      {"//"} {ind.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-white group-hover:text-[#6FD7B7] transition-colors duration-200 mb-2">
                    {ind.name}
                  </h3>

                  <p className="text-sm font-semibold text-[#6FD7B7] mb-3">
                    {ind.hero.tagline}
                  </p>

                  <p className="text-sm text-white/70 leading-relaxed line-clamp-3 mb-6 font-sans">
                    {ind.hero.description}
                  </p>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#6FD7B7] group-hover:text-white transition-colors duration-200">
                    <span className="font-bold uppercase tracking-wider">Explore Capabilities</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Callout */}
          <div className="border border-[#27A7A2]/30 bg-gradient-to-r from-[#091E34] via-[#0B2540] to-[#071827] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 backdrop-blur-md shadow-2xl">
            <div className="text-left max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                Have a project in mind?
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-sans">
                Contact our software engineering team to review system architectures, requirements, and development roadmaps.
              </p>
            </div>
            <Link href="/contact" className="shrink-0 w-full sm:w-auto">
              <Button variant="primary" className="h-[54px] px-8 rounded-xl text-xs uppercase tracking-widest w-full sm:w-auto justify-center">
                <span>Talk to Our Software Team</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
