import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, ChevronRight, Activity, GraduationCap, ShoppingBag, Rocket, Building2, Brain, CloudLightning, Briefcase } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectDetails {
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  stats: { label: string; value: string }[];
  icon: React.ComponentType<{ className?: string }>;
}

const projectsMap: Record<string, ProjectDetails> = {
  "healthcare": {
    name: "Healthcare Intelligence System",
    category: "Healthcare",
    tagline: "Revolutionizing patient care with smart workflow automation and predictive analytics.",
    description: "We built an enterprise healthcare system integrating electronic health records (EHR) with machine learning pipelines to predict patient stay durations, automate clinic schedules, and secure sensitive medical records with HIPAA-compliant cryptography.",
    features: [
      "HIPAA-Compliant Encrypted Patient Records",
      "Predictive Stay Duration Analysis Engines",
      "Automated Multi-Clinic Staff Scheduling",
      "Real-time Biometric Sensor Integration Layers"
    ],
    stats: [
      { label: "Scheduling Efficiency", value: "+40%" },
      { label: "EHR Sync Latency", value: "<120ms" }
    ],
    icon: Activity
  },
  "education": {
    name: "Next-Gen LMS Platform",
    category: "Education",
    tagline: "Empowering global educational institutions with collaborative, cloud-based learning tools.",
    description: "A highly-scalable Learning Management System (LMS) hosting millions of active learners. Features include live interactive classroom feeds, adaptive performance testing, grade book tracking, and automatic certificate distribution systems.",
    features: [
      "High-Concurrency Live Stream feeds",
      "Adaptive Test Engines with ML Grading",
      "Comprehensive Institutional Reports",
      "Bespoke Certificate Generation Engines"
    ],
    stats: [
      { label: "Active Learners", value: "1.2M+" },
      { label: "Platform Uptime", value: "99.98%" }
    ],
    icon: GraduationCap
  },
  "retail": {
    name: "Omnichannel Commerce Engine",
    category: "Retail",
    tagline: "Seamlessly connecting physical store inventories with high-performance digital commerce platforms.",
    description: "We created a headless commerce pipeline unifying brick-and-mortar ERP systems with global storefront instances. Supports localized checkout tax compliance, sub-second search indexes, and predictive logistics supply chain monitoring.",
    features: [
      "Headless CMS Storefront Interfaces",
      "Real-time Inventory Synchronizers",
      "Sub-second Search Autocomplete Indexing",
      "Auto-scaling Logistics Routing Algorithms"
    ],
    stats: [
      { label: "Page Load Speed", value: "0.4s" },
      { label: "Conversion Increase", value: "+24%" }
    ],
    icon: ShoppingBag
  },
  "startups": {
    name: "Launchpad MVP Hub",
    category: "Startups",
    tagline: "Accelerating speed-to-market with modular, high-impact product prototypes.",
    description: "A specialized framework of boilerplate engines, auth flows, and payment triggers built to ship products to early-stage adopters. Scalable, modular, and optimized for rapid pivot cycles and continuous deployment workflows.",
    features: [
      "Bespoke Auth & User Management",
      "Instant Stripe Billing Integrations",
      "Comprehensive Analytics Dashboards",
      "CI/CD Pipeline Auto-configurations"
    ],
    stats: [
      { label: "Avg. Ship Time", value: "3 Weeks" },
      { label: "Founding Teams Helped", value: "45+" }
    ],
    icon: Rocket
  },
  "enterprise": {
    name: "Global ERP Infrastructure",
    category: "Enterprise",
    tagline: "Secure, multi-region operational infrastructure for corporate automation.",
    description: "Enterprise Resource Planning middleware automating global resource tracking, accounting reconciliations, and human resources administration pipelines. Designed with ironclad corporate permissioning controls.",
    features: [
      "Multi-Region Server Failovers",
      "Role-Based Access Control Audit logs",
      "Automated Ledger Reconciliations",
      "Enterprise Database Cluster Configurations"
    ],
    stats: [
      { label: "Manual Labor Saved", value: "30h/wk" },
      { label: "Security Audits Passed", value: "SOC2 Type II" }
    ],
    icon: Building2
  },
  "ai-solutions": {
    name: "Cognitive Analytics Engine",
    category: "AI Solutions",
    tagline: "Unlocking structured business insights from unstructured operational datasets.",
    description: "Bespoke natural language processing pipelines and computer vision engines designed to inspect documents, parse complex inventory records, and predict customer behavior profiles with high confidence indicators.",
    features: [
      "LLM Fine-Tuning & Prompt Pipelines",
      "Secure OCR Document Parsers",
      "Predictive Trend Forecasting Models",
      "Advanced Vector Search Infrastructures"
    ],
    stats: [
      { label: "Data Parsed Daily", value: "5.5 TB" },
      { label: "Prediction Accuracy", value: "94.8%" }
    ],
    icon: Brain
  },
  "cloud-transformation": {
    name: "Cloud Migration Engine",
    category: "Cloud Transformation",
    tagline: "Transforming rigid legacy systems into auto-scaling microservices platforms.",
    description: "A systematic containerization blueprint moving monolithic systems onto modern Kubernetes clusters. Includes automated CI/CD deployments, zero-downtime database cutovers, and real-time network health monitors.",
    features: [
      "Kubernetes Orchestration Cluster blueprints",
      "Infrastructure-as-Code Terraform setups",
      "Auto-scaling Node Configuration Policies",
      "Proactive Metric Health Monitoring"
    ],
    stats: [
      { label: "Infrastructure Costs", value: "-35%" },
      { label: "Deploy Cycles Speed", value: "10x Faster" }
    ],
    icon: CloudLightning
  },
  "business-solutions": {
    name: "SaaS Operations Control",
    category: "Business Solutions",
    tagline: "Unifying distributed operational metrics into an elegant, high-impact command dashboard.",
    description: "An operations hub integrating CRM data, customer feedback channels, task management boards, and payroll processing pipelines. Empowers leadership teams with absolute visibility and real-time status telemetry.",
    features: [
      "Unified Third-Party API Adapters",
      "Real-time WebSockets Dashboard Feeds",
      "Custom Workflow Automation Rules",
      "Secure PDF/Excel Data Reporting Exports"
    ],
    stats: [
      { label: "Operational Visibility", value: "100%" },
      { label: "Active Dashboard Users", value: "8,500+" }
    ],
    icon: Briefcase
  }
};

export default function ProjectSlugPage({ params }: { params: { slug: string } }) {
  const project = projectsMap[params.slug];

  if (!project) {
    notFound();
  }

  const Icon = project.icon;

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
            href="/projects" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6FD7B7] hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          {/* Heading Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-widest text-[#6FD7B7] font-bold">
                Project Showcase
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                {project.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold text-[#F8FBFC] tracking-tight mb-6">
              {project.name}
            </h1>
            <p className="text-lg sm:text-2xl text-[#F8FBFC]/70 font-sans max-w-3xl leading-relaxed italic">
              &ldquo;{project.tagline}&rdquo;
            </p>
          </div>

          {/* Media & Content Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Project Cover Block */}
            <div className="lg:col-span-7 rounded-premium overflow-hidden bg-[#101623] border border-white/5 shadow-premium aspect-[16/10] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#27A7A2]/10 to-[#6FD7B7]/5 pointer-events-none" />
              <Icon className="w-32 h-32 text-[#27A7A2] opacity-40 animate-pulse" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl border border-white/10 bg-[#071A2F]/80 backdrop-blur-md">
                <span className="text-xs font-mono text-[#6FD7B7]">SYSTEM INTERFACE STATUS</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-white uppercase">{project.category} Core Deployment</span>
                  <span className="flex items-center gap-1.5 text-xs text-[#6FD7B7]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6FD7B7] inline-block animate-ping" />
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

            {/* Project Details & Features */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl uppercase tracking-wider text-[#6FD7B7] font-bold mb-6 font-heading">
                  Project Highlights
                </h3>
                <p className="text-[#F8FBFC]/80 leading-relaxed font-sans mb-8">
                  {project.description}
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-base text-[#F8FBFC]/90 font-sans">
                      <CheckCircle2 className="w-5 h-5 text-[#27A7A2] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-8">
                {project.stats.map((stat, sIdx) => (
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
                Need similar business capabilities?
              </h3>
              <p className="text-sm sm:text-base text-[#F8FBFC]/60 font-sans">
                Contact our engineering team to review system architectures and prototype strategies.
              </p>
            </div>
            <Link href="/contact" className="shrink-0 w-full sm:w-auto">
              <Button variant="primary" className="h-[54px] px-8 rounded-xl text-xs uppercase tracking-widest w-full sm:w-auto justify-center">
                <span>Engage Pivot</span>
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
    { slug: "healthcare" },
    { slug: "education" },
    { slug: "retail" },
    { slug: "startups" },
    { slug: "enterprise" },
    { slug: "ai-solutions" },
    { slug: "cloud-transformation" },
    { slug: "business-solutions" }
  ];
}
