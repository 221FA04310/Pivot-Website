"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { 
  Globe, 
  Laptop, 
  Smartphone, 
  Settings, 
  Cloud, 
  Zap, 
  RefreshCw, 
  Wrench, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ChevronDown, 
  Sparkles,
  Layers
} from "lucide-react";
import { cn } from "@/utils/cn";

interface SubFieldItem {
  id: string;
  name: string;
}

interface ServiceData {
  number: string;
  id: string;
  title: string;
  tagline: string;
  intro: string;
  icon: React.ComponentType<{ className?: string }>;
  problemsHeading: string;
  problems: string[];
  subFields: SubFieldItem[];
  capabilities: string[];
  thinkingHeading: string;
  thinkingBody: string;
  processHeading: string;
  processSteps: string[];
  whatChanges: string;
  builtFor?: string;
  whyPivot?: string;
  threeWays?: { number: string; title: string; desc: string }[];
  inheritNote?: string;
  faqs: { question: string; answer: string }[];
}

const servicesList: ServiceData[] = [
  {
    number: "01",
    id: "website-development",
    title: "Website Development",
    tagline: "Your website is where the conversation begins.",
    intro: "Before a customer calls, enquires, visits, or buys, they've probably already met your business online. We create websites that make your business easy to understand, hard to forget, and simple to engage with — built around your brand, your customers, and where you want the business to go.",
    icon: Globe,
    problemsHeading: "Is your website keeping up?",
    problems: [
      "Your site looks like a template instead of your brand",
      "Customers struggle to find the information they need",
      "Mobile visitors aren't getting the experience they deserve",
      "Every small update requires a developer",
      "Your website has become a limitation rather than an advantage"
    ],
    subFields: [
      { id: "strategy", name: "Strategy" },
      { id: "ux", name: "UX" },
      { id: "ui", name: "UI" },
      { id: "cms", name: "CMS" },
      { id: "seo", name: "SEO" },
      { id: "ecommerce", name: "E-commerce" },
      { id: "booking", name: "Booking" },
      { id: "integrations", name: "Integrations" },
      { id: "security", name: "Security" }
    ],
    capabilities: [
      "Custom UI/UX designed around your brand — not a template",
      "Mobile-first experiences, built for the phone first",
      "An easy-to-manage CMS your team can actually run — no developer needed for day-to-day changes",
      "SEO and performance foundations — fast, and built to be found",
      "Lead capture and enquiry journeys that turn visitors into leads",
      "Booking calendars and payment experiences",
      "E-commerce capabilities where the business needs to sell online",
      "Maps, analytics, APIs and third-party integrations",
      "SSL, backups and security hardening from day one"
    ],
    thinkingHeading: "Clarity before complexity.",
    thinkingBody: "Every page should answer one simple question: “What should I do next?” We remove friction before adding features.",
    processHeading: "From first idea to launch",
    processSteps: ["Strategy", "UX", "UI", "Development", "Integrations", "QA", "Launch", "Support"],
    whatChanges: "A website that doesn't just look good — it works for the business behind it: explains you clearly, loads fast, and gives you room to grow.",
    builtFor: "Businesses launching their first serious digital presence, companies outgrowing templates, service businesses that need enquiries or bookings, and manufacturers or B2B companies building digital credibility.",
    whyPivot: "We don't build websites for the handover day. We build them for what happens after it — when your business grows, your content changes, and your digital presence needs to evolve.",
    faqs: [
      {
        question: "How long does it take?",
        answer: "Depends on scope — we'll give you a clear timeline after the first conversation."
      },
      {
        question: "Can I update it myself?",
        answer: "Yes — the CMS is built for your team, not just developers."
      },
      {
        question: "I already have a website.",
        answer: "We can rebuild it and carry your existing content, structure and search rankings across carefully."
      }
    ]
  },
  {
    number: "02",
    id: "web-applications",
    title: "Web Applications",
    tagline: "Turn the way you work into software.",
    intro: "Spreadsheets. Emails. Chat threads. Manual approvals. Multiple systems. They work — until they don't. We turn complicated business processes into connected web applications that give your teams one place to work, see, manage and act.",
    icon: Laptop,
    problemsHeading: "When work starts getting complicated",
    problems: [
      "Your team is living in spreadsheets",
      "The same information exists in several places",
      "Systems don't talk to each other",
      "Manual processes are slowing people down",
      "Standard software forces your team to work differently",
      "Nobody has one reliable view of what's happening"
    ],
    subFields: [
      { id: "customer-portals", name: "Customer Portals" },
      { id: "operations-platforms", name: "Operations Platforms" },
      { id: "dashboards", name: "Dashboards" },
      { id: "booking-systems", name: "Booking Systems" },
      { id: "inventory-systems", name: "Inventory Systems" },
      { id: "internal-tools", name: "Internal Tools" }
    ],
    capabilities: [
      "Role-based access — the right view for admin, staff and customers",
      "Real-time dashboards and reporting, a live picture of the business",
      "Business-specific workflows built around your data, not a generic template",
      "Centralized data as a single source of truth",
      "Payment and accounting integrations",
      "APIs for other systems or a future mobile app",
      "Notifications and live updates where they genuinely help",
      "Automated testing and staged deployment, so updates don't break things"
    ],
    thinkingHeading: "Don't digitize the mess. Redesign it.",
    thinkingBody: "We first understand how work actually happens — including the spreadsheets, shortcuts and workarounds nobody put in the original process document. Then we design the system around reality.",
    processHeading: "From workflow to working software",
    processSteps: ["Discover", "Define", "Architect", "Design", "Develop", "Integrate", "Test", "Deploy", "Evolve"],
    whatChanges: "One system. One source of truth. Less chasing. Less duplication. More control.",
    whyPivot: "Custom isn't always the answer. If an existing product can solve the problem better and faster, we'll tell you.",
    faqs: [
      {
        question: "Do we need a mobile app too?",
        answer: "A web app works on any device with a browser, phones included. Many start there and add a dedicated app later only if it's genuinely needed."
      },
      {
        question: "Will it connect to what we already use?",
        answer: "In most cases, yes — we design with integrations in mind from the start."
      },
      {
        question: "What happens to our existing data?",
        answer: "We plan a tested migration so historical data moves across accurately."
      }
    ]
  },
  {
    number: "03",
    id: "mobile-applications",
    title: "Mobile Applications",
    tagline: "Build something people want to come back to.",
    intro: "A mobile app shouldn't exist just because every business seems to have one. It should make something faster, easier, more useful or more accessible. We design and develop mobile experiences around real behaviour — from customer apps to field-workforce tools.",
    icon: Smartphone,
    problemsHeading: "When mobile makes sense",
    problems: [
      "Customers need frequent access while they're away from a desk",
      "Field teams work where connectivity isn't guaranteed",
      "Push notifications can improve engagement",
      "GPS, camera or biometrics are part of the workflow",
      "A browser simply isn't the right experience"
    ],
    subFields: [
      { id: "customer-apps", name: "Customer Apps" },
      { id: "workforce-apps", name: "Workforce Apps" },
      { id: "field-apps", name: "Field Apps" },
      { id: "booking-apps", name: "Booking Apps" },
      { id: "commerce-apps", name: "Commerce Apps" },
      { id: "on-demand-platforms", name: "On-Demand Platforms" }
    ],
    capabilities: [
      "Native or cross-platform development, chosen for your users and budget",
      "One-handed, mobile-first UX designed for real phone use",
      "Push and in-app messaging, timely and worth opening",
      "Offline capability with local data sync",
      "Camera, GPS and biometrics, where useful",
      "Analytics and crash monitoring, issues caught early",
      "App Store and Play Store launch support, listings and approval handled"
    ],
    thinkingHeading: "Don't build an app because your business wants an app.",
    thinkingBody: "Build it because your users need a better way to do something.",
    processHeading: "From idea to the app store",
    processSteps: ["Product Discovery", "UX", "Design", "Architecture", "Development", "Testing", "Launch", "Improvement"],
    whatChanges: "An app that becomes part of the user's routine — not another icon they forget about.",
    faqs: [
      {
        question: "iPhone, Android, or both?",
        answer: "Depends on where your customers are — we'll decide based on your actual user base."
      },
      {
        question: "Do we need a separate backend?",
        answer: "Usually yes, for data, logins and content — built alongside the app."
      },
      {
        question: "How do store approvals work?",
        answer: "We handle submission and any review feedback from Apple or Google."
      }
    ]
  },
  {
    number: "04",
    id: "custom-software-development",
    title: "Custom Software Development",
    tagline: "Your business isn't standard. Your software shouldn't be either.",
    intro: "Every business has its own rules. Its own processes. Its own exceptions. Its own way of making decisions. When generic software becomes the constraint, we build around the business instead.",
    icon: Settings,
    problemsHeading: "Have generic tools become the problem?",
    problems: [
      "Your processes are too specific for standard software",
      "Teams are creating workarounds",
      "Your systems don't integrate",
      "Manual work is consuming valuable time",
      "Your current platform can't scale with the business",
      "Your software has become part of your competitive advantage"
    ],
    subFields: [
      { id: "processes", name: "Processes" },
      { id: "workflows", name: "Workflows" },
      { id: "business-rules", name: "Business Rules" },
      { id: "approvals", name: "Approvals" },
      { id: "dashboards", name: "Dashboards" },
      { id: "data", name: "Data" },
      { id: "integrations", name: "Integrations" }
    ],
    capabilities: [
      "Business process analysis and a solution blueprint, documented before build",
      "Custom workflow and business logic, built around your exact process",
      "Legacy data migration, moved carefully from spreadsheets or old systems",
      "Role-based dashboards per team or department",
      "Reporting built around your actual KPIs, not generic metrics",
      "Integration with the tools you already run on",
      "Documentation and training, so your team can run and maintain it"
    ],
    thinkingHeading: "“How does the business actually work?” — not “what features do you want?”",
    thinkingBody: "We don't begin with a feature list. We begin with how the business actually works, then translate that into architecture, workflows and software.",
    processHeading: "From business problem to business system",
    processSteps: ["Understand", "Define", "Validate", "Design", "Architect", "Build", "Test", "Launch", "Evolve"],
    whatChanges: "Software that fits the way your business operates — without forcing your people into someone else's workflow.",
    whyPivot: "Custom software isn't automatically better. If configuring an existing platform gives you the right result at a lower cost and risk, we'll recommend it.",
    faqs: [
      {
        question: "How is this different from a web application?",
        answer: "Custom software often covers deeper business logic across several processes; a web app usually focuses on one function. We scope based on what you actually need."
      },
      {
        question: "What if our process changes later?",
        answer: "We build with flexibility in mind, and support adjusting the system as you evolve."
      },
      {
        question: "Do you offer fixed pricing?",
        answer: "We scope in detail first, so you get an agreed cost before development starts."
      }
    ]
  },
  {
    number: "05",
    id: "cloud-applications",
    title: "Cloud Applications",
    tagline: "Build for today. Engineer for what's next.",
    intro: "Growth changes the technology equation. More users. More data. More traffic. More locations. More expectations. We build cloud applications designed to handle that growth without turning infrastructure into a constant headache.",
    icon: Cloud,
    problemsHeading: "Is your infrastructure ready for growth?",
    problems: [
      "Traffic spikes are becoming difficult to handle",
      "Infrastructure costs are unpredictable",
      "Releases are slow and risky",
      "Teams need secure access from anywhere",
      "Your current architecture wasn't designed to scale"
    ],
    subFields: [
      { id: "cloud-architecture", name: "Cloud Architecture" },
      { id: "scalability", name: "Scalability" },
      { id: "security", name: "Security" },
      { id: "databases", name: "Databases" },
      { id: "ci-cd", name: "CI/CD" },
      { id: "monitoring", name: "Monitoring" },
      { id: "cost-optimization", name: "Cost Optimization" }
    ],
    capabilities: [
      "Serverless, containers or managed infrastructure, whichever fits",
      "Auto-scaling for traffic spikes, handled automatically",
      "Managed databases with automated backups",
      "Identity and access management, secure logins and proper permissions",
      "Automated CI/CD deployment pipelines for every release",
      "Monitoring and alerting, problems flagged before customers notice",
      "Cloud cost optimization, so the bill doesn't creep"
    ],
    thinkingHeading: "It's not about AWS, Azure or Google Cloud.",
    thinkingBody: "It's about choosing the right architecture for the business. AWS · Microsoft Azure · Google Cloud — selected according to your requirements, not because we have a preferred sales pitch.",
    processHeading: "How we get there",
    processSteps: ["Cloud Strategy", "Architecture Design", "Development", "Security Hardening", "Load Testing", "Monitoring Setup"],
    whatChanges: "Infrastructure that grows with the business instead of becoming the thing that slows it down.",
    faqs: [
      {
        question: "Which cloud provider is best for us?",
        answer: "Depends on your existing tools, budget and technical needs — we'll recommend based on your project, not a blanket preference."
      },
      {
        question: "Will the cloud cut our costs?",
        answer: "Often, yes, especially versus physical servers — we'll give you a realistic picture, not a pitch."
      },
      {
        question: "Is our data safe in the cloud?",
        answer: "Yes, when architected properly — encryption, access controls and monitoring built in from the start."
      }
    ]
  },
  {
    number: "06",
    id: "application-modernization",
    title: "Application Modernization",
    tagline: "Keep what works. Modernize what doesn't.",
    intro: "Your legacy application isn't just old technology. It may contain years of business rules, customer data, operational knowledge and processes that still matter. We modernize the technology without casually throwing away the value inside it.",
    icon: Zap,
    problemsHeading: "Is your legacy system holding you back?",
    problems: [
      "Simple changes take too long",
      "Your team is afraid to touch the system",
      "New tools can't connect to it",
      "Parts of the technology are unsupported",
      "Technical debt has become operational risk",
      "Your system works — but only with constant workarounds"
    ],
    subFields: [
      { id: "architecture", name: "Architecture" },
      { id: "code", name: "Code" },
      { id: "infrastructure", name: "Infrastructure" },
      { id: "dependencies", name: "Dependencies" },
      { id: "data", name: "Data" },
      { id: "integrations", name: "Integrations" },
      { id: "user-experience", name: "User Experience" }
    ],
    capabilities: [
      "A legacy codebase and infrastructure audit — a detailed look at what's actually there",
      "Database and data-structure modernization, better organized and easier to work with",
      "An API layer connecting old and new systems during transition",
      "A UI/UX refresh alongside the backend work",
      "Phased migration planning to avoid disruption",
      "Deployment pipeline improvements",
      "Post-modernization performance benchmarking, confirming it actually improved"
    ],
    thinkingHeading: "Don't rebuild because something is old.",
    thinkingBody: "Rebuild because something needs to change. We assess what should stay, what should change, and what should disappear.",
    processHeading: "A safer path forward",
    processSteps: ["Assess", "Prioritize", "Architect", "Modernize", "Validate", "Transition", "Optimize"],
    whatChanges: "Less technical risk. Faster development. Better integrations. A system ready for the next chapter of the business.",
    faqs: [
      {
        question: "Do we need to rebuild from scratch?",
        answer: "Usually not — we replace individual parts where there's a genuine need, keeping what works."
      },
      {
        question: "Will the business stop running during this?",
        answer: "No — the old system keeps running until the new one's proven."
      },
      {
        question: "How risky is this?",
        answer: "We test old and new side by side before switching, with a rollback plan ready."
      }
    ]
  },
  {
    number: "07",
    id: "migration-services",
    title: "Migration Services",
    tagline: "Move with confidence.",
    intro: "Changing infrastructure shouldn't feel like gambling with your business. Whether you're moving to the cloud, changing providers, consolidating platforms, or moving databases, we plan the move before we make it.",
    icon: RefreshCw,
    problemsHeading: "When it's time to move",
    problems: [
      "You're changing cloud or hosting providers",
      "Your infrastructure has reached its limits",
      "Multiple systems need to become one",
      "Your current platform is approaching end-of-support",
      "You need a more scalable environment"
    ],
    subFields: [
      { id: "applications", name: "Applications" },
      { id: "data", name: "Data" },
      { id: "databases", name: "Databases" },
      { id: "infrastructure", name: "Infrastructure" },
      { id: "platforms", name: "Platforms" },
      { id: "cloud-environments", name: "Cloud Environments" }
    ],
    capabilities: [
      "Full dependency mapping — every connection identified upfront",
      "A migration plan with rollback procedures — a clear way to undo the move",
      "Destination environment setup and configuration",
      "A test migration — a trial run with copied data before go-live",
      "Data validation and integrity checks, before and after",
      "Cutover planning, timed to minimize downtime",
      "Post-migration monitoring and a support window"
    ],
    thinkingHeading: "No migration without a rollback plan.",
    thinkingBody: "We map dependencies, test the migration, validate data and plan the cutover before touching production. If something goes wrong: You don't improvise. You roll back. Then try again when the system and the business are ready.",
    processHeading: "Before anything moves",
    processSteps: ["Map", "Assess", "Plan", "Prepare", "Test", "Migrate", "Validate", "Cut Over"],
    whatChanges: "A new environment without unnecessary disruption — with your data accounted for and your business ready to keep moving.",
    faqs: [
      {
        question: "How much downtime should we expect?",
        answer: "We plan cutovers for low-traffic windows — the exact amount depends on the systems involved."
      },
      {
        question: "What if something goes wrong?",
        answer: "We always prepare a rollback plan to reverse the change safely."
      },
      {
        question: "Can you migrate live systems without stopping the business?",
        answer: "In most cases, yes — through staged migration and careful timing."
      }
    ]
  },
  {
    number: "08",
    id: "support-maintenance",
    title: "Support & Maintenance",
    tagline: "Launch is only the beginning.",
    intro: "Software lives in the real world after launch. Users behave differently. Traffic changes. Dependencies get updated. Security threats evolve. Businesses change direction. We keep your technology healthy, secure and moving forward.",
    icon: Wrench,
    problemsHeading: "What happens after launch?",
    problems: [
      "Who is watching the system?",
      "Who catches performance issues?",
      "Are your backups actually recoverable?",
      "Who handles critical bugs?",
      "When was the last security update?",
      "Who improves the product as the business changes?"
    ],
    threeWays: [
      {
        number: "01",
        title: "Reactive: Something broke. We fix it.",
        desc: "For businesses that need dependable help when something goes wrong."
      },
      {
        number: "02",
        title: "Proactive: Find the problem before your users do.",
        desc: "Monitoring, maintenance and health checks designed to prevent avoidable incidents, with agreed response-time tiers."
      },
      {
        number: "03",
        title: "Continuous Engineering: Don't just maintain it. Keep making it better.",
        desc: "A long-term engineering partnership for products that continuously evolve."
      }
    ],
    subFields: [
      { id: "security", name: "Security" },
      { id: "performance", name: "Performance" },
      { id: "uptime", name: "Uptime" },
      { id: "backups", name: "Backups" },
      { id: "reliability", name: "Reliability" },
      { id: "bugs", name: "Bugs" },
      { id: "infrastructure", name: "Infrastructure" },
      { id: "improvements", name: "Improvements" }
    ],
    capabilities: [
      "Scheduled security patching and dependency updates",
      "Uptime and performance monitoring with alerting",
      "Bug fixing with agreed response-time tiers",
      "Backup verification — tested restores, not just backups sitting untested",
      "Small feature enhancements and optimizations",
      "Regular health-check reporting",
      "Priority support for critical issues"
    ],
    thinkingHeading: "And yes, we can inherit existing systems.",
    thinkingBody: "You don't have to start with software built by Pivot. We begin with an assessment, understand the system, identify the risks and establish a support model that makes sense.",
    processHeading: "How we work",
    processSteps: ["Setup", "Monitor", "Maintain", "Respond", "Review", "Improve"],
    whatChanges: "Your software stays dependable after launch — without your team having to constantly worry about what's happening behind the scenes.",
    faqs: [
      {
        question: "Can you support software you didn't build?",
        answer: "Yes — we start with a review of the existing system before taking over."
      },
      {
        question: "What counts as urgent?",
        answer: "Anything affecting users' ability to use the system — we agree on definitions and response times upfront."
      },
      {
        question: "Can we change our plan later?",
        answer: "Yes — plans scale up or down as needs change."
      }
    ]
  }
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<Record<string, boolean>>({});
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    // Handle initial hash on page load or on hashchange
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        setActiveHash(hash);
        const targetId = hash.replace("#", "");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const toggleFaq = (key: string) => {
    setOpenFaq((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Navbar />

      {/* Global CSS for scroll-margin so anchors are never covered by the fixed sticky header */}
      <style dangerouslySetInnerHTML={{ __html: `
        section[id], div[id] {
          scroll-margin-top: 110px !important;
        }
        @keyframes target-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(39, 167, 162, 0); }
          50% { box-shadow: 0 0 25px 4px rgba(39, 167, 162, 0.4); border-color: #27A7A2; }
        }
        :target {
          animation: target-pulse 2s ease-out 1;
        }
      `}} />

      <main className="min-h-screen pt-32 pb-24 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#071827] text-white relative overflow-hidden select-none">
        
        {/* Ambient background glows */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-[10%] left-[10%] w-[700px] h-[700px] rounded-full bg-[#1F6FA9]/10 blur-[150px]" />
          <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#27A7A2]/10 blur-[150px]" />
          <div className="absolute bottom-[20%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#6FD7B7]/8 blur-[160px]" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          {/* Top Breadcrumb & Page Hero */}
          <div className="mb-16 text-left max-w-4xl">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#39C8C9] hover:text-[#59E1D6] transition-colors duration-200 mb-6 font-heading"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <span className="text-xs uppercase tracking-[0.25em] text-[#39C8C9] font-bold block mb-3 font-heading">
              PIVOT — SERVICES
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Technology built around your business.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#C8D3E0] font-sans leading-relaxed">
              We don&apos;t start with technology. We start with how your business works, where it&apos;s going, and what is getting in the way.
            </p>
            <p className="text-base sm:text-lg text-[#C8D3E0]/80 font-sans leading-relaxed mt-4">
              Then we design and build the technology to move it forward — from digital experiences and custom applications to cloud platforms, modernization, migration, and long-term engineering support.
            </p>
            <div className="inline-block mt-4 px-4 py-1.5 rounded-full bg-[#27A7A2]/10 border border-[#27A7A2]/30 text-xs text-[#39C8C9] font-bold uppercase tracking-wider font-heading">
              One partner. From first idea to everything that comes after.
            </div>
          </div>

          {/* Quick Sticky Anchor Jump Filter */}
          <div className="sticky top-[84px] z-30 mb-20 py-3 px-4 rounded-2xl bg-[#071A2F]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-x-auto scrollbar-none flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 mr-2 shrink-0 font-heading">
              Jump To:
            </span>
            {servicesList.map((srv) => (
              <a
                key={srv.id}
                href={`#${srv.id}`}
                className="shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap font-sans"
              >
                {srv.number}. {srv.title}
              </a>
            ))}
          </div>

          {/* 8 Comprehensive Service Sections */}
          <div className="space-y-32">
            {servicesList.map((service) => {
              const Icon = service.icon;

              return (
                <section
                  key={service.id}
                  id={service.id}
                  className="relative rounded-[32px] p-8 sm:p-12 lg:p-16 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 group"
                >
                  {/* Subtle top teal glowing line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#27A7A2] to-transparent" />

                  {/* Header: Service Number, Icon, Title & Tagline */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10 border-b border-white/10">
                    <div className="text-left space-y-3 max-w-3xl">
                      <div className="flex items-center gap-3">
                        <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#39C8C9]">
                          {service.number}
                        </span>
                        <span className="text-white/20">—</span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-lg sm:text-xl font-heading font-semibold text-[#59E1D6] italic">
                        &ldquo;{service.tagline}&rdquo;
                      </p>
                      <p className="text-sm sm:text-base text-[#C8D3E0] font-sans leading-relaxed pt-2">
                        {service.intro}
                      </p>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-[#27A7A2]/15 border border-[#27A7A2]/30 flex items-center justify-center text-[#39C8C9] shrink-0 self-start">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Main Service Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 text-left">
                    
                    {/* Left Column (5 Cols): Business Problems & Our Thinking */}
                    <div className="lg:col-span-5 space-y-10">
                      
                      {/* Business Problems Box */}
                      <div className="rounded-2xl p-6 sm:p-8 bg-black/25 border border-white/5 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6B26E] font-heading">
                          <AlertCircle className="w-4 h-4" />
                          <span>{service.problemsHeading}</span>
                        </div>
                        <ul className="space-y-3">
                          {service.problems.map((problem, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#D9E8F4]/85 font-sans leading-relaxed">
                              <span className="text-[#D6B26E] mt-0.5">•</span>
                              <span>{problem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Three ways to work (if present) */}
                      {service.threeWays && (
                        <div className="space-y-4">
                          <span className="text-xs uppercase font-bold tracking-wider text-[#39C8C9] font-heading block">
                            Three Ways to Work With Us
                          </span>
                          <div className="space-y-3">
                            {service.threeWays.map((way, wIdx) => (
                              <div key={wIdx} className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                                <span className="text-xs font-bold text-[#6FD7B7] block font-heading mb-1">
                                  {way.title}
                                </span>
                                <p className="text-xs text-white/70 font-sans leading-relaxed">
                                  {way.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Our Thinking Quote Block */}
                      <div className="rounded-2xl p-6 bg-[#27A7A2]/[0.08] border border-[#27A7A2]/20 space-y-2.5">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#39C8C9] font-heading block">
                          OUR THINKING
                        </span>
                        <h4 className="text-base font-bold text-white font-heading">
                          {service.thinkingHeading}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#E6F4F1] font-sans leading-relaxed">
                          {service.thinkingBody}
                        </p>
                      </div>

                      {/* Built for / Why Pivot */}
                      {service.builtFor && (
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 font-heading block">
                            BUILT FOR
                          </span>
                          <p className="text-xs text-[#C8D3E0]/80 leading-relaxed font-sans">
                            {service.builtFor}
                          </p>
                        </div>
                      )}

                      {service.whyPivot && (
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#59E1D6] font-heading block">
                            WHY PIVOT
                          </span>
                          <p className="text-xs text-[#C8D3E0]/80 leading-relaxed font-sans">
                            {service.whyPivot}
                          </p>
                        </div>
                      )}

                    </div>

                    {/* Right Column (7 Cols): What We Build (Sub-Fields & Capabilities), Process & FAQs */}
                    <div className="lg:col-span-7 space-y-10">
                      
                      {/* What We Build + Clickable Sub-fields */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white font-heading flex items-center gap-2">
                            <Layers className="w-5 h-5 text-[#39C8C9]" />
                            <span>What We Build</span>
                          </h3>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 font-mono">
                            CORE CAPABILITIES
                          </span>
                        </div>

                        {/* Clickable Sub-Field Chips with Anchor IDs */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {service.subFields.map((sub) => {
                            const subFieldAnchor = `${service.id}-${sub.id}`;
                            const isSelected = activeHash === `#${subFieldAnchor}`;

                            return (
                              <div
                                key={sub.id}
                                id={subFieldAnchor}
                                className={cn(
                                  "px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 font-heading cursor-pointer",
                                  isSelected 
                                    ? "bg-[#27A7A2] text-white shadow-[0_0_15px_rgba(39,167,162,0.6)] scale-105"
                                    : "bg-white/[0.06] border border-white/10 text-[#39C8C9] hover:border-[#27A7A2] hover:bg-[#27A7A2]/20 hover:text-white"
                                )}
                              >
                                <a href={`#${subFieldAnchor}`}>
                                  {sub.name}
                                </a>
                              </div>
                            );
                          })}
                        </div>

                        {/* Detailed Capabilities Checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {service.capabilities.map((cap, cIdx) => (
                            <div 
                              key={cIdx} 
                              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3 hover:border-white/15 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#6FD7B7] shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-[#D9E8F4]/90 font-sans leading-relaxed">
                                {cap}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Process Pipeline */}
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <span className="text-xs uppercase font-bold tracking-wider text-[#39C8C9] font-heading block">
                          {service.processHeading}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {service.processSteps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-semibold text-white font-sans">
                                {step}
                              </span>
                              {sIdx < service.processSteps.length - 1 && (
                                <span className="text-white/30 text-xs font-bold">→</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* What Changes Result Callout */}
                      <div className="p-5 rounded-2xl bg-white/[0.04] border border-[#27A7A2]/20 flex items-start gap-3.5">
                        <Sparkles className="w-5 h-5 text-[#59E1D6] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#59E1D6] font-heading block mb-1">
                            WHAT CHANGES
                          </span>
                          <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed">
                            {service.whatChanges}
                          </p>
                        </div>
                      </div>

                      {/* Quick Answers / FAQs */}
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        <span className="text-xs uppercase font-bold tracking-wider text-[#D6B26E] font-heading flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4" />
                          <span>Quick Answers</span>
                        </span>
                        <div className="space-y-2.5">
                          {service.faqs.map((faq, fIdx) => {
                            const faqKey = `${service.id}-faq-${fIdx}`;
                            const isOpen = !!openFaq[faqKey];

                            return (
                              <div
                                key={fIdx}
                                className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
                              >
                                <button
                                  onClick={() => toggleFaq(faqKey)}
                                  className="w-full py-3.5 px-4 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors cursor-pointer outline-none"
                                >
                                  <span className="text-xs sm:text-sm font-bold text-white font-heading">
                                    {faq.question}
                                  </span>
                                  <ChevronDown className={cn("w-4 h-4 text-white/40 transition-transform duration-200", isOpen && "rotate-180 text-[#39C8C9]")} />
                                </button>
                                {isOpen && (
                                  <div className="px-4 pb-3.5 pt-1 text-xs sm:text-sm text-[#C8D3E0]/80 font-sans leading-relaxed border-t border-white/5">
                                    {faq.answer}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                  </div>

                </section>
              );
            })}
          </div>

          {/* Section 9: Let's Start With The Problem Final CTA */}
          <div className="mt-32 rounded-[32px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-[#27A7A2]/30 p-10 sm:p-16 text-center max-w-4xl mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#27A7A2]/20 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#6FD7B7]/20 blur-[100px] pointer-events-none" />

            <span className="text-xs uppercase tracking-[0.25em] text-[#39C8C9] font-bold block mb-3 font-heading">
              LET&apos;S START WITH THE PROBLEM
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
              Not sure what you need yet? That&apos;s okay.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#C8D3E0] font-sans leading-relaxed max-w-2xl mx-auto mb-8">
              You don&apos;t need to arrive with a technical specification. Tell us what you&apos;re trying to achieve, what&apos;s getting in the way, or what isn&apos;t working today. We&apos;ll help you work out what should happen next.
            </p>

            <Link href="/contact">
              <Button
                variant="primary"
                magnetic={true}
                className="h-[58px] px-8 rounded-2xl text-xs uppercase tracking-wider font-extrabold shadow-lg bg-[#27A7A2] hover:bg-[#1F6FA9] border-transparent text-white"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
