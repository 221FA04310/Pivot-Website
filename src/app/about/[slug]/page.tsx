import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, ChevronRight, Target, Settings, Code, Building, Heart, UserPlus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface AboutDetails {
  name: string;
  tagline: string;
  description: string;
  points: string[];
  stats: { label: string; value: string }[];
  icon: React.ComponentType<{ className?: string }>;
}

const aboutMap: Record<string, AboutDetails> = {
  "mission-vision": {
    name: "Mission & Vision",
    tagline: "Empowering businesses to grow without bounds using intelligent architecture.",
    description: "Our mission is to engineer high-velocity, reliable software systems that solve complex business bottlenecks. We envision a future where business software is fluid, secure, and accelerates daily human output, acting as a competitive advantage rather than administrative overhead.",
    points: [
      "Democratizing enterprise-scale software architecture",
      "Pioneering sub-second API rendering standards",
      "Rigid security protocols by default",
      "Continuous optimization frameworks for web ecosystems"
    ],
    stats: [
      { label: "Commitment Uptime", value: "99.99%" },
      { label: "Code Coverage", value: "90%+" }
    ],
    icon: Target
  },
  "our-process": {
    name: "Our Process",
    tagline: "A highly collaborative, sprint-based approach to launching systems.",
    description: "We deploy an agile methodology optimized for velocity and feedback. From architectural blueprints to rapid prototyping and automated testing, we align closely with business metrics to ship software smoothly.",
    points: [
      "Sprint-driven prototype cycles",
      "Automated continuous-integration verification pipelines",
      "Weekly client visual showcase sessions",
      "Rigorous pre-release performance audits"
    ],
    stats: [
      { label: "Sprint Cycles", value: "1-Week" },
      { label: "First MVP", value: "<4 Weeks" }
    ],
    icon: Settings
  },
  "technologies": {
    name: "Technologies",
    tagline: "Using modern, robust tech stacks engineered for hyperscale.",
    description: "We rely on modern, developer-friendly, and secure libraries. By building with Next.js, TypeScript, Node.js, and serverless edge databases, we keep codebases fast and hosting bills low.",
    points: [
      "React, Next.js, and Swift for client interfaces",
      "TypeScript, Rust, and Go for backend workloads",
      "Cloudflare Workers & AWS for globally distributed compute",
      "PostgreSQL and Redis for fast data availability"
    ],
    stats: [
      { label: "Tech Stack Score", value: "A+" },
      { label: "Compile Time", value: "Sub-Minute" }
    ],
    icon: Code
  },
  "industries": {
    name: "Industries We Serve",
    tagline: "Bringing specialized domain expertise to critical sectors.",
    description: "We don't believe in generic templates. Our engineering team brings deep compliance and performance standards to specialized sectors like digital finance, secure healthcare operations, education systems, and high-concurrency retail commerce.",
    points: [
      "Fintech: High-audit ledgers and payment integrations",
      "Healthcare: HIPAA-compliant data architectures",
      "E-commerce: Sub-second global page loads and checkout funnels",
      "Edtech: High-concurrency live video and performance reporting"
    ],
    stats: [
      { label: "Compliance Score", value: "100%" },
      { label: "Industries Served", value: "8+" }
    ],
    icon: Building
  },
  "our-values": {
    name: "Our Values",
    tagline: "The core principles that drive our engineering decisions.",
    description: "At the heart of Pivot is a commitment to craft, simplicity, transparency, and impact. We believe clean code is a long-term asset, and our goal is to build relationships based on integrity and shared technological success.",
    points: [
      "Simplicity: Refactor complex loops into readable architecture",
      "Aesthetics: Visual layout must feel fluid and responsive",
      "Communication: Direct developer access with zero project management clutter",
      "Ownership: We treat your product code as if it were our own"
    ],
    stats: [
      { label: "Developer Retention", value: "96%" },
      { label: "Customer NPS", value: "78" }
    ],
    icon: Heart
  },
  "careers": {
    name: "Careers",
    tagline: "Build the future of digital software with an elite team of engineers.",
    description: "We are always looking for curious, detail-oriented developers and product designers. We offer remote-first flexibility, a high-quality equipment budget, continuous education allowances, and a distraction-free, async-first workflow.",
    points: [
      "100% remote-first engineering setup",
      "Generous health & mental wellness benefits",
      "Annual technology and office workstation budget",
      "Collaborative learning labs and conference sponsorship"
    ],
    stats: [
      { label: "Open Positions", value: "5 Roles" },
      { label: "Team Size", value: "40+ Elite" }
    ],
    icon: UserPlus
  }
};

export default function AboutSlugPage({ params }: { params: { slug: string } }) {
  const item = aboutMap[params.slug];

  if (!item) {
    notFound();
  }

  const Icon = item.icon;

  return (
    <>
      <Navbar introComplete={true} />
      <main className="min-h-screen pt-32 pb-24 px-6 sm:px-12 md:px-20 bg-[#071A2F] relative overflow-hidden select-none transition-colors duration-500">
        
        {/* Subtle noise filter for organic texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25 bg-noise" />

        {/* Ambient background glows */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#27A7A2]/5 dark:bg-[#27A7A2]/10 blur-[130px]" />
          <div className="absolute bottom-[20%] right-[15%] w-[600px] h-[600px] rounded-full bg-[#6FD7B7]/5 dark:bg-[#6FD7B7]/10 blur-[160px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back Navigation */}
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6FD7B7] hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to About Us
          </Link>

          {/* Heading Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-widest text-[#6FD7B7] font-bold">
                Company Insights
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                About Pivot
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold text-[#F8FBFC] tracking-tight mb-6">
              {item.name}
            </h1>
            <p className="text-lg sm:text-2xl text-[#F8FBFC]/70 font-sans max-w-3xl leading-relaxed italic">
              &ldquo;{item.tagline}&rdquo;
            </p>
          </div>

          {/* Media & Content Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Visual Icon Grid */}
            <div className="lg:col-span-7 rounded-premium overflow-hidden bg-[#101623] border border-white/5 shadow-premium aspect-[16/10] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#27A7A2]/10 to-[#6FD7B7]/5 pointer-events-none" />
              <Icon className="w-32 h-32 text-[#27A7A2] opacity-40 animate-pulse" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl border border-white/10 bg-[#071A2F]/80 backdrop-blur-md">
                <span className="text-xs font-mono text-[#6FD7B7]">PIVOT VALUES SYSTEM</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-white uppercase">{item.name} Status</span>
                  <span className="flex items-center gap-1.5 text-xs text-[#6FD7B7]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6FD7B7] inline-block animate-ping" />
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* Core Details & Points */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl uppercase tracking-wider text-[#6FD7B7] font-bold mb-6 font-heading">
                  Overview
                </h3>
                <p className="text-[#F8FBFC]/80 leading-relaxed font-sans mb-8">
                  {item.description}
                </p>

                {/* Points List */}
                <ul className="space-y-4 mb-8">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-base text-[#F8FBFC]/90 font-sans">
                      <CheckCircle2 className="w-5 h-5 text-[#27A7A2] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-8">
                {item.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="text-left">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#6FD7B7]">
                      {stat.value}
                    </span>
                    <span className="block text-xs uppercase tracking-wider text-[#F8FBFC]/50 mt-1 font-bold">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Premium Bottom Inquire Callout */}
          <div className="mt-20 border border-[#1F6FA9]/15 bg-white/5 rounded-premium p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 backdrop-blur-md">
            <div className="text-left">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                Want to build with us?
              </h3>
              <p className="text-sm sm:text-base text-[#F8FBFC]/60 font-sans">
                Get in touch with our team to start your project or view active career openings.
              </p>
            </div>
            <Link href="/contact" className="shrink-0 w-full sm:w-auto">
              <Button variant="primary" className="h-[54px] px-8 rounded-xl text-xs uppercase tracking-widest w-full sm:w-auto justify-center">
                <span>Start Conversation</span>
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

export function generateStaticParams() {
  return [
    { slug: "mission-vision" },
    { slug: "our-process" },
    { slug: "technologies" },
    { slug: "industries" },
    { slug: "our-values" },
    { slug: "careers" }
  ];
}
