import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TechFlowDiagram } from "@/components/industries/TechFlowDiagram";
import { industriesData } from "@/data/industryData";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Sparkles, Layers, Shield, Cpu, Activity, GraduationCap, ShoppingBag, Rocket, Building2, Brain, CloudLightning, Briefcase } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const industry = industriesData[params.slug];
  if (!industry) {
    return {
      title: "Industry Not Found | PIVOT",
      description: "Explore Pivot software engineering capabilities across modern industries."
    };
  }

  return {
    title: `${industry.hero.title} | PIVOT Software & Consultancy`,
    description: industry.hero.description,
    openGraph: {
      title: `${industry.hero.title} | PIVOT`,
      description: industry.hero.description,
      type: "website"
    }
  };
}

export default function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const industry = industriesData[params.slug];

  if (!industry) {
    notFound();
  }

  const MainIcon = industryIcons[industry.slug] || Cpu;

  return (
    <>
      <Navbar introComplete={true} />
      <main className="min-h-screen pt-32 pb-24 px-6 sm:px-12 md:px-20 bg-[#071827] relative overflow-hidden transition-colors duration-500">
        
        {/* Subtle noise and ambient glow backgrounds */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-noise" />
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-15"
            style={{ backgroundColor: industry.theme.highlightColor }}
          />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#1F6FA9]/10 blur-[160px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Top Breadcrumb Navigation */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link 
              href="/industries" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6FD7B7] hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> All Industries
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono text-white/50">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: industry.theme.highlightColor }} />
              <span>INDUSTRY // {industry.number}</span>
            </div>
          </div>

          {/* =========================================================================
              HERO SECTION
          ========================================================================= */}
          <section className="mb-20">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#6FD7B7] bg-[#6FD7B7]/10 border border-[#6FD7B7]/20">
                <MainIcon className="w-3.5 h-3.5 text-[#6FD7B7]" />
                {industry.theme.badgeText}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs uppercase tracking-widest text-white/40 font-mono">
                Software Engineering & Architecture
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold text-[#F8FBFC] tracking-tight mb-6 leading-[1.08]">
              {industry.hero.title}
            </h1>

            <p className="text-xl sm:text-2xl text-[#6FD7B7] font-sans max-w-3xl leading-snug mb-6 font-medium">
              {industry.hero.tagline}
            </p>

            <p className="text-base sm:text-lg text-white/70 font-sans max-w-3xl leading-relaxed mb-10">
              {industry.hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact">
                <Button variant="primary" className="h-[52px] px-8 rounded-xl text-xs uppercase tracking-widest">
                  <span>{industry.hero.primaryCta}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary" className="h-[52px] px-8 rounded-xl text-xs uppercase tracking-widest">
                  <span>{industry.hero.secondaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </section>


          {/* =========================================================================
              SECTION 1: TECHNOLOGY OVERVIEW / CARDS
          ========================================================================= */}
          <section className="mb-24 pt-8 border-t border-white/10">
            <div className="mb-12">
              <div className="text-xs uppercase tracking-widest text-[#6FD7B7] font-bold font-mono mb-2">
                01 // Industry Technology Scope
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
                {industry.overview.sectionTitle}
              </h2>
              {industry.overview.intro && (
                <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
                  {industry.overview.intro}
                </p>
              )}
            </div>

            {/* Grid of overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.overview.cards.map((card, cIdx) => (
                <div 
                  key={cIdx}
                  className="p-6 rounded-2xl bg-[#091E34]/70 border border-white/10 hover:border-[#6FD7B7]/40 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#6FD7B7] group-hover:scale-110 group-hover:bg-[#27A7A2]/20 transition-all duration-200">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono text-white/30 font-bold">
                        {String(cIdx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#6FD7B7] transition-colors duration-200 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-sans">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* =========================================================================
              SECTION 2: BUILDING TECHNOLOGY / APPROACH & ARCHITECTURE FLOW
          ========================================================================= */}
          <section className="mb-24 pt-8 border-t border-white/10">
            <div className="mb-10">
              <div className="text-xs uppercase tracking-widest text-[#6FD7B7] font-bold font-mono mb-2">
                02 // Engineering Methodology
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
                {industry.approach.sectionTitle}
              </h2>
              {industry.approach.subtitle && (
                <div className="text-lg text-[#6FD7B7] font-semibold mb-4">
                  {industry.approach.subtitle}
                </div>
              )}
              <div className="space-y-4 max-w-3xl">
                {industry.approach.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-lg text-white/80 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Architecture Flow Visualization */}
            {industry.approach.flows && industry.approach.flows.map((flow, fIdx) => (
              <TechFlowDiagram 
                key={fIdx} 
                flow={flow} 
                accentColor={industry.theme.highlightColor} 
              />
            ))}
          </section>


          {/* =========================================================================
              SECTION 3: WHAT PIVOT CAN DEVELOP / CAPABILITIES
          ========================================================================= */}
          <section className="mb-24 pt-8 border-t border-white/10">
            <div className="mb-12">
              <div className="text-xs uppercase tracking-widest text-[#6FD7B7] font-bold font-mono mb-2">
                03 // Technical Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
                {industry.capabilities.sectionTitle}
              </h2>
              {industry.capabilities.subtitle && (
                <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
                  {industry.capabilities.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industry.capabilities.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="p-6 rounded-2xl bg-[#0B2540]/80 border border-white/10 hover:border-[#27A7A2]/50 transition-all duration-300 shadow-md group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#6FD7B7] shrink-0 mt-0.5 group-hover:bg-[#27A7A2]/20 transition-all duration-200">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#6FD7B7] transition-colors duration-200 mb-1.5">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-white/70 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* =========================================================================
              SECTION 4: MODERN SOFTWARE / FOUNDATION & STACK
          ========================================================================= */}
          <section className="mb-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#091E34]/90 to-[#071827] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-widest text-[#6FD7B7] font-bold font-mono mb-2">
                04 // Architecture Foundation
              </div>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-3">
                {industry.foundation.sectionTitle}
              </h2>
              {industry.foundation.subtitle && (
                <p className="text-base sm:text-lg text-[#6FD7B7] font-medium mb-3">
                  {industry.foundation.subtitle}
                </p>
              )}
              {industry.foundation.description && (
                <p className="text-sm sm:text-base text-white/70 max-w-3xl mb-6">
                  {industry.foundation.description}
                </p>
              )}

              {/* Secondary Flow if provided (e.g. Startups progression or Business lifecycle) */}
              {industry.foundation.secondaryFlow && (
                <TechFlowDiagram 
                  flow={industry.foundation.secondaryFlow} 
                  accentColor={industry.theme.highlightColor} 
                />
              )}

              {/* Technology Tags Grid */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 my-6">
                {industry.foundation.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium text-white/90 bg-white/5 border border-white/10 hover:border-[#6FD7B7]/50 hover:bg-white/10 transition-all duration-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6FD7B7]" />
                    {tag}
                  </span>
                ))}
              </div>

              {industry.foundation.closingNote && (
                <p className="text-sm text-white/60 font-sans mt-4 pt-4 border-t border-white/5 italic max-w-3xl">
                  {industry.foundation.closingNote}
                </p>
              )}
            </div>
          </section>


          {/* =========================================================================
              SECTION 5: FINAL CTA
          ========================================================================= */}
          <section className="border border-[#27A7A2]/30 bg-gradient-to-r from-[#091E34] via-[#0B2540] to-[#071827] rounded-3xl p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div 
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
              style={{ backgroundColor: industry.theme.highlightColor }}
            />

            <div className="text-left relative z-10 max-w-2xl">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#6FD7B7] font-bold mb-3">
                Let&apos;s Build Together
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight mb-4">
                {industry.finalCta.title}
              </h3>
              <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
                {industry.finalCta.description}
              </p>
            </div>

            <div className="shrink-0 w-full lg:w-auto relative z-10">
              <Link href="/contact" className="block w-full">
                <Button variant="primary" className="h-[56px] px-8 rounded-xl text-xs uppercase tracking-widest w-full justify-center shadow-xl">
                  <span>{industry.finalCta.buttonText}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(industriesData).map(slug => ({ slug }));
}
