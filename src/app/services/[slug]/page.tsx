
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ServiceDetails {
  name: string;
  tagline: string;
  videoUrl: string;
  description: string;
  features: string[];
  stats: { label: string; value: string }[];
}

const servicesMap: Record<string, ServiceDetails> = {
  "web-development": {
    name: "Website Development",
    tagline: "Don't let a great business stay hidden behind an ordinary website.",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077418/video-6_taoxl7.mp4",
    description: "We create bespoke websites built on modern tech stacks. Designed from scratch for superior brand representation, fast page loads, and organic search engine discovery.",
    features: [
      "Responsive Layouts (optimized for all screen sizes)",
      "SEO Best Practices (built for high organic crawl rates)",
      "Performance Optimization (sub-second load speeds)",
      "Creative UI Motions (subtle, engaging interactions)"
    ],
    stats: [
      { label: "Performance Score", value: "98%+" },
      { label: "Mobile-First", value: "100%" }
    ]
  },
  "web-applications": {
    name: "Web Applications",
    tagline: "Powerful software that grows with your business, every step of the way.",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077162/video-2_nywpd7.mp4",
    description: "Engineered for high performance, ease of scalability, and rigid security. We build enterprise systems, dashboards, and online portals that automate complex operations.",
    features: [
      "Enterprise Ready Configurations",
      "Advanced Security Shielding Layers",
      "60 FPS Render Cycles",
      "High Query Caching Engines"
    ],
    stats: [
      { label: "System Uptime", value: "99.99%" },
      { label: "API Latency", value: "<50ms" }
    ]
  },
  "mobile-applications": {
    name: "Mobile Applications",
    tagline: "Stay connected with your customers wherever they are.",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077483/video-7_vbmmpn.mp4",
    description: "Native iOS/Android applications and cross-platform React Native solutions. Fluid layouts, seamless offline synchronization, and natural gesture behaviors.",
    features: [
      "Native Swift & SwiftUI layouts",
      "React Native Single Codebase Setup",
      "Offline-First Data Syncing",
      "Interactive Touch Frame Motion"
    ],
    stats: [
      { label: "Crash-Free Sessions", value: "99.9%" },
      { label: "App Store Rating", value: "4.9★" }
    ]
  },
  "cloud-applications": {
    name: "Cloud Applications",
    tagline: "Scale faster with secure cloud solutions built for the future.",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077299/video-4_e9tahn.mp4",
    description: "Leverage standard serverless deployments, autoscaling database layers, and edge cache distribution pipelines to minimize latency and hosting cost.",
    features: [
      "Serverless Architecture Setup",
      "DDoS Mitigation Layers",
      "Global Edge Deployment Nodes",
      "Database Auto-failover Protocols"
    ],
    stats: [
      { label: "Security Score", value: "A+" },
      { label: "Scale Threshold", value: "Infinite" }
    ]
  },
  "application-modernization": {
    name: "Application Modernization",
    tagline: "Transform legacy systems into modern digital experiences.",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077162/video-2_nywpd7.mp4",
    description: "Migrate legacy code and rigid structures into lightweight, modular, and fast React/Next.js frameworks. Zero business disruption, cleaner codebase, and less technical debt.",
    features: [
      "Legacy Code Refactoring Audits",
      "Incremental Feature Swapping Schedules",
      "Modern React State Engines",
      "Substantial Resource Speed Gains"
    ],
    stats: [
      { label: "Tech Debt Removed", value: "85%+" },
      { label: "Speed Improvement", value: "2.5x" }
    ]
  },
  "migration-services": {
    name: "Migration Services",
    tagline: "Move your business forward without leaving your data behind.",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077065/video-1_ojlcka.mp4",
    description: "Secure, audited database migrations and cloud provider transfers. Fully automated checklists, checksum validations, and rollback buffers that guarantee zero downtime.",
    features: [
      "Continuous Data Pipelines",
      "Cryptographic Checks & Controls",
      "Automated Rollback Systems",
      "Zero Service Downtime Metrics"
    ],
    stats: [
      { label: "Successful Migrations", value: "100%" },
      { label: "Data Integrity", value: "100%" }
    ]
  },
  "custom-software-development": {
    name: "Custom Software Development",
    tagline: "Software crafted exclusively around your business goals.",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077418/video-6_taoxl7.mp4",
    description: "Tailor-made software architectures crafted for your specific business goals, workflows, and tools. Built from initial wireframes to robust production deployments.",
    features: [
      "Tailored System Blueprints",
      "External API Integrations",
      "Interactive Dashboard Graphics",
      "Custom Encrypted Pipelines"
    ],
    stats: [
      { label: "Custom Fit Score", value: "100%" },
      { label: "Design Validation", value: "Verified" }
    ]
  },
  "support-maintenance": {
    name: "Support & Maintenance",
    tagline: "Reliable support that keeps your business running without interruption.",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077357/video-5_esapb1.mp4",
    description: "Continuous security patching, proactive servers monitoring, and weekly performance tune-ups to ensure your digital products remain secure and running fast.",
    features: [
      "24/7 Engine Monitoring",
      "Weekly Dependency Audits",
      "Rapid SLA Ticket Resolves",
      "Direct Support Channels"
    ],
    stats: [
      { label: "Response Time", value: "<15m" },
      { label: "Weekly Patches", value: "100%" }
    ]
  },
  "cloud-hosting-services": {
    name: "Cloud Hosting Services",
    tagline: "Fast, secure hosting that keeps your business online around the clock.",
    videoUrl: "https://res.cloudinary.com/v9znuxjo/video/upload/f_auto,q_auto/v1783077236/video-3_kouxvh.mp4",
    description: "High-performance edge servers matching peak global request volumes. Auto-renewing SSL certificates, global CDN routing, and server-side cache layers.",
    features: [
      "Global CDN Server Networks",
      "Auto SSL Certificates",
      "Performance DDoS Filtering",
      "Unlimited Scale Capacity"
    ],
    stats: [
      { label: "Network Availability", value: "99.99%" },
      { label: "Global Edge Nodes", value: "150+" }
    ]
  }
};

export default function ServiceSlugPage({ params }: { params: { slug: string } }) {
  const service = servicesMap[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar introComplete={true} />
      <main className="min-h-screen pt-32 pb-24 px-6 sm:px-12 md:px-20 bg-[#F5F9FA] dark:bg-[#071A2F] relative overflow-hidden select-none transition-colors duration-500">
        
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
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1F6FA9] dark:text-[#6FD7B7] hover:text-[#0A3B66] dark:hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Heading Section */}
          <div className="mb-16">
            <span className="text-xs uppercase tracking-widest text-[#1F6FA9] dark:text-[#6FD7B7] font-bold block mb-3">
              Services Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold text-[#0A3B66] dark:text-[#F8FBFC] tracking-tight mb-6">
              {service.name}
            </h1>
            <p className="text-lg sm:text-2xl text-[#1F6FA9]/80 dark:text-[#F8FBFC]/70 font-sans max-w-3xl leading-relaxed italic">
              &ldquo;{service.tagline}&rdquo;
            </p>
          </div>

          {/* Media & Content Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Cinematic Video Showcase */}
            <div className="lg:col-span-7 rounded-premium overflow-hidden bg-[#101623] border border-[#1F6FA9]/10 dark:border-white/5 shadow-premium aspect-[16/10] relative">
              <video
                src={service.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Service Details & Features */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl uppercase tracking-wider text-[#1F6FA9] dark:text-[#6FD7B7] font-bold mb-6 font-heading">
                  Capabilities & Features
                </h3>
                <p className="text-[#5B6575] dark:text-[#F8FBFC]/80 leading-relaxed font-sans mb-8">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-base text-[#0A3B66] dark:text-[#F8FBFC]/90 font-sans">
                      <CheckCircle2 className="w-5 h-5 text-[#27A7A2] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 gap-8 border-t border-[#0A3B66]/10 dark:border-white/10 pt-8 mt-8">
                {service.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="text-left">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1F6FA9] dark:text-[#6FD7B7]">
                      {stat.value}
                    </span>
                    <span className="block text-xs uppercase tracking-wider text-[#5B6575] dark:text-[#F8FBFC]/50 mt-1 font-bold">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Premium Bottom Inquire Callout */}
          <div className="mt-20 border border-[#1F6FA9]/15 bg-white/50 dark:bg-white/5 rounded-premium p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 backdrop-blur-md">
            <div className="text-left">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#0A3B66] dark:text-[#F8FBFC] mb-2">
                Ready to elevate your project?
              </h3>
              <p className="text-sm sm:text-base text-[#5B6575] dark:text-[#F8FBFC]/60 font-sans">
                Contact our engineering team to review technical specifications and blueprints.
              </p>
            </div>
            <Link href="/contact" className="shrink-0 w-full sm:w-auto">
              <Button variant="primary" className="h-[54px] px-8 rounded-xl text-xs uppercase tracking-widest bg-[#1F6FA9] hover:bg-[#0A3B66] text-white border-transparent w-full sm:w-auto justify-center">
                <span>Start a Project</span>
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
    { slug: "web-development" },
    { slug: "web-applications" },
    { slug: "mobile-applications" },
    { slug: "cloud-applications" },
    { slug: "application-modernization" },
    { slug: "migration-services" },
    { slug: "custom-software-development" },
    { slug: "support-maintenance" },
    { slug: "cloud-hosting-services" }
  ];
}

