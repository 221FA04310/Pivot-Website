export interface IndustryCard {
  title: string;
  description: string;
}

export interface CapabilityItem {
  title: string;
  description?: string;
}

export interface ArchitectureFlow {
  label?: string;
  type: "linear" | "matrix" | "triplet" | "dual";
  steps: string[];
  subSteps?: string[];
}

export interface IndustryData {
  slug: string;
  number: string;
  name: string;
  hero: {
    title: string;
    tagline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  overview: {
    sectionTitle: string;
    intro?: string;
    cards: IndustryCard[];
  };
  approach: {
    sectionTitle: string;
    subtitle?: string;
    paragraphs: string[];
    flows?: ArchitectureFlow[];
  };
  capabilities: {
    sectionTitle: string;
    subtitle?: string;
    items: CapabilityItem[];
  };
  foundation: {
    sectionTitle: string;
    subtitle?: string;
    description?: string;
    tags: string[];
    closingNote?: string;
    secondaryFlow?: ArchitectureFlow;
  };
  finalCta: {
    title: string;
    description: string;
    buttonText: string;
  };
  theme: {
    badgeText: string;
    accentGlow: string;
    borderAccent: string;
    highlightColor: string;
  };
}

export const industriesData: Record<string, IndustryData> = {
  "healthcare": {
    slug: "healthcare",
    number: "01",
    name: "Healthcare",
    hero: {
      title: "Healthcare Software Solutions",
      tagline: "Smarter software for a healthier future.",
      description: "Healthcare organizations rely on software to manage information, connect systems, strengthen collaboration, and make better use of data. Pivot Software & Consultancy develops websites, web applications, and digital platforms that support these technology needs across healthcare.",
      primaryCta: "Discuss a Healthcare Project",
      secondaryCta: "Explore Our Services"
    },
    overview: {
      sectionTitle: "Technology Across Healthcare",
      intro: "Software in healthcare works as a technology layer across digital experiences, information, data, integration, automation, and intelligent services.",
      cards: [
        {
          title: "Digital Platforms",
          description: "Websites and web applications that give healthcare organizations modern digital experiences and easy access to information."
        },
        {
          title: "Information Management",
          description: "Software that helps organize, manage, search, and present large volumes of healthcare-related information."
        },
        {
          title: "Data & Analytics",
          description: "Dashboards, reporting systems, and data solutions that turn operational information into useful insights."
        },
        {
          title: "System Integration",
          description: "API-driven software that connects existing platforms, services, and data sources so they can work together."
        },
        {
          title: "Automation",
          description: "Software automation that reduces repetitive administrative work and brings greater consistency to digital operations."
        },
        {
          title: "Mobile Experiences",
          description: "Responsive web applications and mobile solutions designed for patients, professionals, teams, and management."
        },
        {
          title: "AI-Powered Software",
          description: "AI capabilities for intelligent search, information processing, content analysis, assistance, and workflow automation."
        },
        {
          title: "Cloud Applications",
          description: "Scalable cloud-based applications and infrastructure designed for accessibility, maintainability, and future growth."
        }
      ]
    },
    approach: {
      sectionTitle: "Building Technology for Healthcare",
      paragraphs: [
        "Pivot focuses on software development, applying web, mobile, cloud, data, integration, and AI technologies to the specific requirements of healthcare organizations.",
        "This can mean creating a new digital platform, improving an existing website, connecting systems, building an analytics layer, or adding intelligent capabilities to existing software."
      ]
    },
    capabilities: {
      sectionTitle: "Software Capabilities for Healthcare",
      subtitle: "The technology approach is selected around the organization's requirements—not a fixed healthcare product.",
      items: [
        {
          title: "Web Development",
          description: "Responsive healthcare websites, portals, and web applications."
        },
        {
          title: "Custom Software",
          description: "Purpose-built software around specific business and technology requirements."
        },
        {
          title: "API & Integrations",
          description: "Connections between existing healthcare, business, and third-party systems."
        },
        {
          title: "Data Solutions",
          description: "Data platforms, dashboards, reporting, and business intelligence."
        },
        {
          title: "Mobile Development",
          description: "Mobile-first experiences and applications for different user groups."
        },
        {
          title: "AI Development",
          description: "Practical AI features integrated into existing or new software."
        }
      ]
    },
    foundation: {
      sectionTitle: "Modern Software, Applied to Healthcare",
      subtitle: "The technology stack can be shaped around the project, existing systems, and long-term requirements.",
      tags: [
        "Web Applications",
        "Cloud Platforms",
        "APIs & Integrations",
        "Data & Analytics",
        "Mobile Applications",
        "AI & Automation",
        "Secure Architecture",
        "Responsive UX"
      ]
    },
    finalCta: {
      title: "Powering the Next Generation of Healthcare Technology",
      description: "From healthcare websites and digital platforms to custom applications, integrations, analytics, and AI-powered capabilities, Pivot builds software around the technology requirements of modern healthcare organizations.",
      buttonText: "Talk to Our Software Team"
    },
    theme: {
      badgeText: "Healthcare Software Engineering",
      accentGlow: "from-[#27A7A2]/15 via-[#39C8C9]/10 to-transparent",
      borderAccent: "border-[#27A7A2]/30",
      highlightColor: "#27A7A2"
    }
  },

  "education": {
    slug: "education",
    number: "02",
    name: "Education",
    hero: {
      title: "Education Software Solutions",
      tagline: "Building the future of learning, one platform at a time.",
      description: "Technology is changing how educational organizations deliver digital experiences, manage content, use data, and connect people and platforms. Pivot develops the software technology that supports these evolving needs across education.",
      primaryCta: "Discuss an Education Project",
      secondaryCta: "Explore Our Services"
    },
    overview: {
      sectionTitle: "Technology Across Education",
      intro: "Education software can support digital learning, information, content, data, communication, and intelligent experiences—not just one fixed product.",
      cards: [
        {
          title: "Learning Platforms",
          description: "Digital platforms for delivering, managing, and accessing learning content across devices."
        },
        {
          title: "Digital Classrooms",
          description: "Interactive web and mobile experiences that support modern digital learning environments."
        },
        {
          title: "Assessment Technology",
          description: "Software for online assessments, evaluations, results, and performance insights."
        },
        {
          title: "Education Data",
          description: "Dashboards and analytics that turn learning and organizational data into useful insights."
        },
        {
          title: "Content & Knowledge",
          description: "Platforms for organizing, searching, and delivering digital educational content."
        },
        {
          title: "AI for Education",
          description: "AI-powered assistance, intelligent search, content support, and personalized digital experiences."
        }
      ]
    },
    approach: {
      sectionTitle: "Building Technology for Education",
      paragraphs: [
        "Pivot applies software engineering to the specific technology requirements of education organizations.",
        "From digital platforms and data solutions to integrations, mobile applications, and AI capabilities, the technology is shaped around the project."
      ],
      flows: [
        {
          label: "Education Technology Ecosystem",
          type: "triplet",
          steps: ["Web ↔ Mobile ↔ Data", "Content ↔ APIs ↔ Cloud", "Analytics ↔ AI"]
        }
      ]
    },
    capabilities: {
      sectionTitle: "What Pivot Can Develop",
      subtitle: "Software capabilities that can be applied to education technology requirements.",
      items: [
        { title: "Web Development", description: "Scalable educational portals, learning hubs, and responsive web platforms." },
        { title: "Custom Software", description: "Purpose-built academic management and institutional workflows." },
        { title: "API & Integrations", description: "Interconnected student information, content repositories, and third-party services." },
        { title: "Data & Analytics", description: "Performance telemetry, learning metrics, and administrative reporting dashboards." },
        { title: "Mobile Development", description: "Cross-platform mobile applications for students, faculty, and administrators." },
        { title: "AI Development", description: "Intelligent tutoring, content summarization, automated grading, and smart search." },
        { title: "Cloud Development", description: "Resilient cloud infrastructure built for high-concurrency academic peaks." },
        { title: "UI/UX Engineering", description: "Accessible, engaging, and frictionless learning interfaces for all audiences." }
      ]
    },
    foundation: {
      sectionTitle: "Modern Software, Applied to Education",
      subtitle: "The technology stack can be selected around the organization's digital goals, existing systems, and long-term requirements.",
      tags: [
        "Web Applications",
        "Cloud Platforms",
        "APIs & Integrations",
        "Data & Analytics",
        "Mobile Applications",
        "AI & Automation",
        "Secure Architecture",
        "Responsive UX",
        "Backend Services",
        "Data Platforms"
      ]
    },
    finalCta: {
      title: "Shaping the Future of Education, One Platform at a Time",
      description: "Pivot develops digital platforms, custom software, integrations, analytics, mobile experiences, cloud applications, and AI-powered capabilities for the education industry.",
      buttonText: "Talk to Our Software Team"
    },
    theme: {
      badgeText: "Education Technology Engineering",
      accentGlow: "from-[#39C8C9]/15 via-[#27A7A2]/10 to-transparent",
      borderAccent: "border-[#39C8C9]/30",
      highlightColor: "#39C8C9"
    }
  },

  "retail": {
    slug: "retail",
    number: "03",
    name: "Retail",
    hero: {
      title: "Retail Software Solutions",
      tagline: "Technology that connects every part of the modern retail experience.",
      description: "Retail organizations use software across digital commerce, customer experiences, product information, business data, and connected systems. Pivot develops the technology that helps retail organizations build, connect, and improve these digital capabilities.",
      primaryCta: "Discuss a Retail Project",
      secondaryCta: "Explore Our Services"
    },
    overview: {
      sectionTitle: "Where Software Shapes Retail",
      cards: [
        {
          title: "Digital Commerce",
          description: "Software powers online storefronts, product discovery, digital transactions, and connected shopping experiences across web and mobile."
        },
        {
          title: "Omnichannel Experiences",
          description: "Technology connects customer touchpoints to create consistent experiences across digital and physical channels."
        },
        {
          title: "Product Information",
          description: "Software helps organizations structure, manage, search, and distribute product information across digital channels."
        },
        {
          title: "Customer Experience",
          description: "Web and mobile technologies enable personalized experiences, intelligent search, recommendations, and customer-facing digital services."
        },
        {
          title: "Retail Data",
          description: "Data platforms bring information together to support dashboards, reporting, analytics, and clearer business visibility."
        },
        {
          title: "Intelligent Retail",
          description: "AI can be integrated into retail software for recommendations, search, content processing, customer assistance, data analysis, and automation."
        }
      ]
    },
    approach: {
      sectionTitle: "Connecting Retail Technology",
      paragraphs: [
        "Retail software rarely works alone. Digital commerce platforms, product data, customer-facing applications, APIs, analytics systems, and cloud services often need to work together.",
        "Pivot develops integration-focused software architectures that connect these technologies around existing systems and requirements."
      ],
      flows: [
        {
          label: "Connected Retail Architecture",
          type: "linear",
          steps: ["Commerce", "APIs", "Data", "Analytics", "AI"]
        }
      ]
    },
    capabilities: {
      sectionTitle: "What Pivot Builds for Retail",
      items: [
        {
          title: "Web & Digital Commerce",
          description: "Retail web platforms and digital experiences."
        },
        {
          title: "Mobile Applications",
          description: "Customer-facing and connected mobile experiences."
        },
        {
          title: "Product & Content Platforms",
          description: "Systems for managing and delivering structured product information."
        },
        {
          title: "Data & Analytics",
          description: "Data platforms, dashboards, reporting, and analytics solutions."
        },
        {
          title: "API & System Integration",
          description: "Connections between existing platforms, services, and data sources."
        },
        {
          title: "AI-Powered Features",
          description: "Search, recommendations, assistance, content intelligence, and automation."
        },
        {
          title: "Cloud Applications",
          description: "Scalable applications built around modern cloud architectures."
        },
        {
          title: "Custom Software",
          description: "Purpose-built technology for unique retail requirements."
        }
      ]
    },
    foundation: {
      sectionTitle: "Technology Built Around Retail",
      subtitle: "There is no single technology stack for every retail organization. Pivot can shape the architecture around existing platforms, digital goals, integration requirements, data environments, and future growth.",
      tags: [
        "Web",
        "Mobile",
        "APIs",
        "Cloud",
        "Data",
        "Analytics",
        "AI",
        "Automation"
      ]
    },
    finalCta: {
      title: "Build Better Retail Technology",
      description: "From digital commerce and connected experiences to integrations, data solutions, mobile applications, and AI capabilities, Pivot develops software around the technology needs of modern retail organizations.",
      buttonText: "Talk to Our Software Team"
    },
    theme: {
      badgeText: "Digital Commerce & Retail Engineering",
      accentGlow: "from-[#27A7A2]/15 via-[#6FD7B7]/10 to-transparent",
      borderAccent: "border-[#6FD7B7]/30",
      highlightColor: "#6FD7B7"
    }
  },

  "startups": {
    slug: "startups",
    number: "04",
    name: "Startups",
    hero: {
      title: "Software Solutions for Startups",
      tagline: "Turn bold ideas into software that scales.",
      description: "Startups depend on software to turn ideas into usable products, validate concepts, reach users, and evolve quickly as requirements change. Pivot helps startups design, develop, and scale software products around their technology goals.",
      primaryCta: "Discuss Your Startup Idea",
      secondaryCta: "Explore Our Services"
    },
    overview: {
      sectionTitle: "From Idea to Working Product",
      intro: "Build Fast. Build to Evolve. For startups, software needs to move from concept to working product without unnecessary technical complexity. Pivot can transform an initial product idea into a functional digital experience, establish the underlying architecture, and create a foundation that can evolve as the product grows.",
      cards: [
        {
          title: "Product Prototyping",
          description: "Turn product concepts and user requirements into functional prototypes and software experiences that can be tested and refined."
        },
        {
          title: "MVP Development",
          description: "Build focused minimum viable products with the essential functionality needed to launch, learn, and iterate."
        },
        {
          title: "Custom Product Development",
          description: "Develop web and mobile products around the startup's unique business model, users, and technical requirements."
        },
        {
          title: "Product Evolution",
          description: "Extend an existing product with new functionality, integrations, data capabilities, and stronger technical architecture as requirements grow."
        }
      ]
    },
    approach: {
      sectionTitle: "Technology That Grows With the Product",
      paragraphs: [
        "A startup's first version should be focused—but its technology should not become a limitation.",
        "Pivot can design software architectures that support progressive development as product requirements, users, and data increase."
      ],
      flows: [
        {
          label: "Scalable Startup Product Architecture",
          type: "linear",
          steps: ["Product", "Application", "APIs", "Data", "Cloud", "Scale"]
        }
      ]
    },
    capabilities: {
      sectionTitle: "Where Pivot Adds Technical Value",
      subtitle: "Software Engineering for Startups",
      items: [
        {
          title: "Web Applications",
          description: "Modern web products built around product requirements and user experience."
        },
        {
          title: "Mobile Applications",
          description: "Native or cross-platform mobile experiences for products that require mobile access."
        },
        {
          title: "Backend & APIs",
          description: "Application logic, services, APIs, and integrations that form the product foundation."
        },
        {
          title: "Cloud Architecture",
          description: "Cloud-based infrastructure designed to support deployment, accessibility, scalability, and ongoing development."
        },
        {
          title: "Data & Analytics",
          description: "Product data, dashboards, analytics, and data structures that turn application activity into useful information."
        },
        {
          title: "AI-Powered Products",
          description: "AI capabilities integrated where intelligent search, recommendations, automation, content processing, or assistance adds value."
        }
      ]
    },
    foundation: {
      sectionTitle: "Built to Evolve",
      subtitle: "From First Release to Product Growth",
      description: "Pivot develops software with the next stage of the product in mind. The technology can be structured so new features, integrations, users, data, and services can be added without rebuilding the product from the beginning.",
      secondaryFlow: {
        label: "Product Lifecycle Progression",
        type: "linear",
        steps: ["Prototype", "MVP", "Product", "Expansion"]
      },
      tags: [
        "Rapid Prototyping",
        "MVP Launch",
        "Cloud-Native Foundation",
        "Iterative Architecture",
        "Continuous Deployment",
        "Scale Engineering"
      ]
    },
    finalCta: {
      title: "Build the Technology Behind Your Startup",
      description: "From an initial product concept to a scalable web or mobile application, Pivot develops the software, architecture, integrations, data capabilities, and AI technology needed to turn startup ideas into working digital products.",
      buttonText: "Talk to Our Software Team"
    },
    theme: {
      badgeText: "Startup Product Development",
      accentGlow: "from-[#39C8C9]/20 via-[#27A7A2]/10 to-transparent",
      borderAccent: "border-[#39C8C9]/40",
      highlightColor: "#39C8C9"
    }
  },

  "enterprise": {
    slug: "enterprise",
    number: "05",
    name: "Enterprise",
    hero: {
      title: "Enterprise Software Solutions",
      tagline: "Enterprise-grade software, built for what’s next.",
      description: "Enterprise organizations rely on software to connect systems, modernize legacy technology, manage large-scale data, automate processes, and deliver reliable digital experiences across teams and business functions. Pivot develops enterprise software around existing technology environments, integration requirements, operational needs, and long-term digital goals.",
      primaryCta: "Discuss an Enterprise Project",
      secondaryCta: "Explore Our Services"
    },
    overview: {
      sectionTitle: "Software at Enterprise Scale",
      intro: "Enterprise software is rarely a single application. It is a connected technology environment where applications, systems, data, users, APIs, and infrastructure need to work together.",
      cards: [
        {
          title: "Legacy Modernization",
          description: "Modernize existing applications and technology environments while preserving the systems and business capabilities organizations depend on."
        },
        {
          title: "Enterprise System Integration",
          description: "Connect enterprise platforms, applications, APIs, and third-party services so information can move between systems reliably."
        },
        {
          title: "Internal Digital Platforms",
          description: "Build secure web applications and internal platforms that give enterprise teams better ways to access information, collaborate, and work with business systems."
        },
        {
          title: "Enterprise Data",
          description: "Bring data from multiple systems into structured platforms, dashboards, reporting environments, and analytics solutions."
        },
        {
          title: "Workflow Automation",
          description: "Replace repetitive technology-driven tasks with connected software workflows, integrations, and automation."
        },
        {
          title: "Digital Experiences",
          description: "Develop scalable web and mobile experiences for employees, customers, partners, and other enterprise users."
        }
      ]
    },
    approach: {
      sectionTitle: "Working With Existing Enterprise Technology",
      subtitle: "Connect. Modernize. Extend.",
      paragraphs: [
        "Enterprise organizations often cannot replace everything at once.",
        "Pivot works with existing technology—extending applications, connecting systems, modernizing selected components, and introducing new digital capabilities without treating the entire environment as a blank slate."
      ],
      flows: [
        {
          label: "Enterprise Integration & Modernization Flow",
          type: "linear",
          steps: ["Existing Systems", "APIs", "Applications", "Data", "Cloud"]
        }
      ]
    },
    capabilities: {
      sectionTitle: "What Pivot Provides for Enterprise",
      subtitle: "Enterprise Software Engineering",
      items: [
        {
          title: "Custom Enterprise Applications",
          description: "Purpose-built software for specific organizational and technology requirements."
        },
        {
          title: "System Integration",
          description: "API-driven connections between enterprise applications, platforms, data sources, and external services."
        },
        {
          title: "Legacy Application Modernization",
          description: "Modern application architectures and interfaces that extend the useful life of existing technology."
        },
        {
          title: "Data Platforms & Analytics",
          description: "Enterprise data solutions, dashboards, reporting, and analytics built around multiple data sources."
        },
        {
          title: "Cloud & Hybrid Architecture",
          description: "Cloud-based and hybrid application environments designed around existing infrastructure and future requirements."
        },
        {
          title: "Automation & AI",
          description: "Intelligent automation, data processing, search, assistance, and AI capabilities integrated into enterprise software."
        },
        {
          title: "Enterprise Web & Mobile",
          description: "Scalable digital applications designed for enterprise users, customers, partners, and distributed teams."
        },
        {
          title: "Secure Application Architecture",
          description: "Software architecture designed with appropriate access control, data protection, integration boundaries, and security considerations."
        }
      ]
    },
    foundation: {
      sectionTitle: "An Enterprise Technology Foundation",
      subtitle: "Enterprise software needs to remain maintainable as systems, users, integrations, and data grow.",
      description: "Pivot can build around an architecture that supports:",
      tags: [
        "Applications",
        "APIs",
        "Integration",
        "Data",
        "Cloud",
        "Identity",
        "Security",
        "Automation",
        "AI"
      ]
    },
    finalCta: {
      title: "Build Technology That Works Across the Enterprise",
      description: "From modernizing existing applications and connecting enterprise systems to building new digital platforms, data solutions, cloud applications, automation, and AI capabilities, Pivot develops software around the complexity of modern enterprise environments.",
      buttonText: "Talk to Our Software Team"
    },
    theme: {
      badgeText: "Enterprise Software Architecture",
      accentGlow: "from-[#27A7A2]/20 via-[#1F6FA9]/10 to-transparent",
      borderAccent: "border-[#27A7A2]/40",
      highlightColor: "#27A7A2"
    }
  },

  "ai-solutions": {
    slug: "ai-solutions",
    number: "06",
    name: "AI Solutions",
    hero: {
      title: "AI Software Solutions",
      tagline: "Where AI meets real, working software.",
      description: "AI becomes valuable when it connects with real applications, data, workflows, and user experiences. Pivot develops AI-enabled software that brings intelligent capabilities into web applications, mobile products, business systems, and digital platforms.",
      primaryCta: "Discuss an AI Project",
      secondaryCta: "Explore Our Services"
    },
    overview: {
      sectionTitle: "Where AI Becomes Software",
      intro: "AI is not limited to a standalone model. It can become part of an application's functionality—helping software understand information, generate content, search data, automate tasks, and assist users.",
      cards: [
        {
          title: "Intelligent Applications",
          description: "Integrate AI directly into web and mobile applications to create software that can understand, respond, recommend, or assist."
        },
        {
          title: "AI Search & Knowledge",
          description: "Build intelligent search and knowledge experiences that help users find and interact with information through natural language."
        },
        {
          title: "Document & Content Intelligence",
          description: "Use AI to process, classify, extract, summarize, and work with large volumes of documents and digital content."
        },
        {
          title: "AI Automation",
          description: "Connect AI with software workflows to automate tasks involving information processing, classification, generation, or decision support."
        },
        {
          title: "AI-Powered Data",
          description: "Combine AI with organizational data to create intelligent analysis, insights, natural-language interaction, and data-driven software experiences."
        },
        {
          title: "Conversational Experiences",
          description: "Build AI-powered interfaces that let users interact with applications and information through natural language."
        }
      ]
    },
    approach: {
      sectionTitle: "From AI Capability to Working Product",
      subtitle: "AI Needs a Software Layer",
      paragraphs: [
        "An AI model alone is not a complete software solution.",
        "Pivot builds the application layer around AI—connecting models with data, APIs, business logic, user interfaces, workflows, and existing systems.",
        "This turns AI capabilities into usable and maintainable software."
      ],
      flows: [
        {
          label: "End-to-End AI Software Architecture",
          type: "linear",
          steps: ["AI Model", "APIs", "Application", "Data", "User Experience"]
        }
      ]
    },
    capabilities: {
      sectionTitle: "What Pivot Provides for AI Solutions",
      subtitle: "AI Software Engineering",
      items: [
        {
          title: "AI Application Development",
          description: "Build web and mobile applications with AI integrated into the product experience."
        },
        {
          title: "AI & API Integration",
          description: "Connect AI models and services with applications, databases, APIs, and existing software systems."
        },
        {
          title: "AI-Powered Search",
          description: "Develop intelligent search and retrieval experiences for structured and unstructured information."
        },
        {
          title: "Data & AI Solutions",
          description: "Prepare, structure, connect, and use application data to support AI-powered functionality."
        },
        {
          title: "AI Workflow Automation",
          description: "Integrate AI into software workflows for content processing, classification, assistance, and repetitive digital tasks."
        },
        {
          title: "Conversational AI",
          description: "Develop natural-language interfaces for interacting with applications and organizational information."
        },
        {
          title: "AI-Enabled Analytics",
          description: "Add intelligent analysis, summaries, insights, and natural-language interaction to data-driven applications."
        },
        {
          title: "Custom AI Software",
          description: "Design AI capabilities around specific application requirements rather than forcing the project into a fixed AI product."
        }
      ]
    },
    foundation: {
      sectionTitle: "AI Within the Software Architecture",
      subtitle: "AI works best when it is designed as part of the wider application architecture.",
      closingNote: "Pivot can design the software layer around AI so intelligent functionality can evolve as models, data, applications, and requirements change.",
      tags: [
        "Applications",
        "AI Models",
        "APIs",
        "Data",
        "Cloud",
        "Security",
        "Automation"
      ]
    },
    finalCta: {
      title: "Build Software With Intelligence",
      description: "From AI-powered applications and intelligent search to document processing, conversational experiences, automation, data solutions, and AI integrations, Pivot develops software that brings practical AI capabilities into real digital products.",
      buttonText: "Talk to Our Software Team"
    },
    theme: {
      badgeText: "AI Engineering & Applied Intelligence",
      accentGlow: "from-[#39C8C9]/20 via-[#27A7A2]/15 to-transparent",
      borderAccent: "border-[#39C8C9]/40",
      highlightColor: "#39C8C9"
    }
  },

  "cloud-transformation": {
    slug: "cloud-transformation",
    number: "07",
    name: "Cloud Transformation",
    hero: {
      title: "Cloud Transformation Solutions",
      tagline: "Modernize software. Move forward with the cloud.",
      description: "Organizations move to the cloud to modernize applications, improve scalability, connect distributed systems, and create technology environments that can evolve with changing requirements. Pivot develops and modernizes software for cloud environments—helping organizations move existing applications forward and build new cloud-ready technology.",
      primaryCta: "Discuss a Cloud Transformation Project",
      secondaryCta: "Explore Our Services"
    },
    overview: {
      sectionTitle: "Transforming Applications for the Cloud",
      intro: "Cloud transformation is more than moving an application from one server to another. It can involve modernizing application architecture, restructuring services, improving integrations, moving data, and designing software around cloud-native capabilities.",
      cards: [
        {
          title: "Application Modernization",
          description: "Rework existing applications and architectures to make them more suitable for modern cloud environments while preserving important business functionality."
        },
        {
          title: "Cloud-Native Development",
          description: "Build new applications around scalable, modular architectures designed for cloud deployment and continuous evolution."
        },
        {
          title: "Application Migration",
          description: "Move existing applications, services, and workloads toward cloud environments based on the application's architecture and requirements."
        },
        {
          title: "API & Integration",
          description: "Connect cloud applications with enterprise systems, third-party platforms, databases, and services through well-structured APIs and integrations."
        },
        {
          title: "Data Transformation",
          description: "Modernize data environments and develop cloud-based data solutions for storage, processing, reporting, and analytics."
        },
        {
          title: "Scalable Architecture",
          description: "Design applications and services so components can adapt as users, workloads, integrations, and data grow."
        }
      ]
    },
    approach: {
      sectionTitle: "From Existing Systems to Modern Cloud Software",
      subtitle: "Transform Without Starting From Zero",
      paragraphs: [
        "Many organizations have valuable applications and systems that cannot simply be discarded.",
        "Pivot works with existing technology to identify where software can be modernized, migrated, integrated, or rebuilt—creating a practical path toward a more flexible cloud environment."
      ],
      flows: [
        {
          label: "Cloud Modernization Architecture Pipeline",
          type: "linear",
          steps: ["Existing Application", "Modern Architecture", "Cloud", "Connected Services"]
        }
      ]
    },
    capabilities: {
      sectionTitle: "What Pivot Provides for Cloud Transformation",
      subtitle: "Software Engineering for Cloud",
      items: [
        {
          title: "Cloud Application Development",
          description: "Develop applications designed for cloud environments and modern deployment models."
        },
        {
          title: "Application Modernization",
          description: "Refactor or redesign existing software to improve maintainability, scalability, and cloud readiness."
        },
        {
          title: "Cloud Migration Development",
          description: "Adapt applications, services, APIs, and data components as they move toward cloud environments."
        },
        {
          title: "Microservices & APIs",
          description: "Create modular services and APIs that allow applications and systems to communicate effectively."
        },
        {
          title: "Cloud Data Solutions",
          description: "Develop data platforms and processing capabilities suited to cloud-based environments."
        },
        {
          title: "Cloud Integration",
          description: "Connect cloud applications with existing systems, databases, APIs, and external services."
        },
        {
          title: "DevOps & Deployment Automation",
          description: "Support automated build, testing, deployment, and software delivery processes for cloud applications."
        },
        {
          title: "Cloud Security Architecture",
          description: "Build software with appropriate identity, access control, data protection, and security boundaries for cloud environments."
        }
      ]
    },
    foundation: {
      sectionTitle: "A Cloud Architecture Built for Change",
      subtitle: "Cloud transformation should create more than a new hosting environment.",
      description: "Pivot develops software architectures that support continuous development, integration, scaling, and modernization as technology requirements evolve.",
      tags: [
        "Applications",
        "APIs",
        "Services",
        "Data",
        "Cloud",
        "Security",
        "Automation"
      ]
    },
    finalCta: {
      title: "Move Software Forward With the Cloud",
      description: "From modernizing existing applications and migrating workloads to building cloud-native software, APIs, data solutions, integrations, and automated deployment environments, Pivot develops technology around the requirements of modern cloud transformation.",
      buttonText: "Talk to Our Software Team"
    },
    theme: {
      badgeText: "Cloud Architecture & Modernization",
      accentGlow: "from-[#27A7A2]/20 via-[#6FD7B7]/10 to-transparent",
      borderAccent: "border-[#27A7A2]/40",
      highlightColor: "#27A7A2"
    }
  },

  "business-solutions": {
    slug: "business-solutions",
    number: "08",
    name: "Business Solutions",
    hero: {
      title: "Business Software Solutions",
      tagline: "One platform. Every part of your business, connected.",
      description: "Modern businesses rely on software to manage information, connect teams and systems, automate repetitive work, improve visibility, and create more efficient digital operations. Pivot develops custom software solutions around the specific technology requirements of businesses.",
      primaryCta: "Discuss a Business Solution",
      secondaryCta: "Explore Our Services"
    },
    overview: {
      sectionTitle: "Where Software Solves Business Needs",
      intro: "Business software is most valuable when it connects people, information, processes, and systems rather than operating as another isolated tool.",
      cards: [
        {
          title: "Business Applications",
          description: "Custom web applications that bring business-specific processes, information, and functionality into one digital environment."
        },
        {
          title: "Workflow Automation",
          description: "Software workflows that connect tasks, systems, approvals, notifications, and data to reduce repetitive manual work."
        },
        {
          title: "Business Information",
          description: "Centralized software for organizing, accessing, searching, and presenting the information teams need to work effectively."
        },
        {
          title: "Connected Systems",
          description: "APIs and integrations that allow different business applications, platforms, and third-party services to exchange information."
        },
        {
          title: "Reporting & Analytics",
          description: "Dashboards and data solutions that turn information from business systems into clearer operational and management insights."
        },
        {
          title: "Intelligent Automation",
          description: "AI and intelligent software capabilities that assist with information processing, search, document handling, recommendations, and repetitive digital tasks."
        }
      ]
    },
    approach: {
      sectionTitle: "Connecting the Digital Business",
      paragraphs: [
        "Businesses often work across multiple applications and data sources.",
        "Pivot develops software that brings those systems together—creating connected applications, integrations, workflows, and data environments around the way the organization operates."
      ],
      flows: [
        {
          label: "Connected Business Ecosystem Flow",
          type: "linear",
          steps: ["People", "Applications", "APIs", "Data", "Automation"]
        }
      ]
    },
    capabilities: {
      sectionTitle: "What Pivot Provides for Business Solutions",
      subtitle: "Software Built Around the Business",
      items: [
        {
          title: "Custom Business Applications",
          description: "Purpose-built applications designed around specific business processes and technology requirements."
        },
        {
          title: "Workflow & Process Automation",
          description: "Digital workflows that connect business activities, information, users, and systems."
        },
        {
          title: "API & System Integration",
          description: "Integration between existing applications, third-party platforms, databases, and internal systems."
        },
        {
          title: "Business Data Solutions",
          description: "Data platforms, dashboards, reporting, and analytics for information distributed across business systems."
        },
        {
          title: "Web & Mobile Applications",
          description: "Accessible digital applications for employees, customers, partners, and business teams."
        },
        {
          title: "Cloud Software",
          description: "Cloud-based applications and infrastructure designed for accessibility, maintainability, and growth."
        },
        {
          title: "AI-Powered Business Software",
          description: "Practical AI capabilities integrated into applications where intelligent processing or automation can improve the software experience."
        }
      ]
    },
    foundation: {
      sectionTitle: "Software That Evolves With the Business",
      subtitle: "Business requirements change over time.",
      description: "Pivot builds software with an architecture that can accommodate new workflows, integrations, users, data, and functionality as technology requirements evolve.",
      secondaryFlow: {
        label: "Continuous Digital Evolution Lifecycle",
        type: "linear",
        steps: ["Connect", "Automate", "Analyze", "Improve", "Scale"]
      },
      tags: [
        "Connected Applications",
        "Business APIs",
        "Process Automation",
        "Operational Dashboards",
        "Cloud Scalability",
        "Intelligent Workflows"
      ]
    },
    finalCta: {
      title: "Build Software Around the Way Your Business Works",
      description: "From custom business applications and connected systems to workflow automation, data platforms, cloud applications, and AI capabilities, Pivot develops software around the specific technology needs of modern businesses.",
      buttonText: "Talk to Our Software Team"
    },
    theme: {
      badgeText: "Business Operations & Systems Engineering",
      accentGlow: "from-[#39C8C9]/20 via-[#27A7A2]/10 to-transparent",
      borderAccent: "border-[#39C8C9]/40",
      highlightColor: "#39C8C9"
    }
  }
};
