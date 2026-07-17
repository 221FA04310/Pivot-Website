"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { Magnetic } from "../ui/Magnetic";
import { 
  Menu, X, ChevronDown, ArrowRight, Globe, Laptop, Smartphone, Settings, Cloud, Zap, 
  RefreshCw, Wrench, Activity, GraduationCap, ShoppingBag, Rocket, Building2, Brain, 
  CloudLightning, Briefcase, History, Target, Building, Heart, UserPlus, Mail, PlayCircle, 
  Calendar, Users, LifeBuoy, HelpCircle, MapPin, Code
} from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MenuData {
  title: string;
  subtitle: string;
  columns: {
    left: DropdownItem[];
    right: DropdownItem[];
  };
}

const menuConfigurations: Record<string, MenuData> = {
  services: {
    title: "Our Services",
    subtitle: "Building intelligent software solutions for modern businesses.",
    columns: {
      left: [
        {
          title: "Website Development",
          description: "Craft websites that become your strongest business asset.",
          href: "/services/web-development",
          icon: Globe
        },
        {
          title: "Web Applications",
          description: "Powerful software that grows with your business.",
          href: "/services/web-applications",
          icon: Laptop
        },
        {
          title: "Mobile Applications",
          description: "Mobile experiences your customers love.",
          href: "/services/mobile-applications",
          icon: Smartphone
        },
        {
          title: "Custom Software Development",
          description: "Software designed exclusively for your business.",
          href: "/services/custom-software-development",
          icon: Settings
        }
      ],
      right: [
        {
          title: "Cloud Applications",
          description: "Secure cloud-native solutions.",
          href: "/services/cloud-applications",
          icon: Cloud
        },
        {
          title: "Application Modernization",
          description: "Transform legacy systems into modern platforms.",
          href: "/services/application-modernization",
          icon: Zap
        },
        {
          title: "Migration Services",
          description: "Move your infrastructure with confidence.",
          href: "/services/migration-services",
          icon: RefreshCw
        },
        {
          title: "Support & Maintenance",
          description: "Keeping your software secure and reliable.",
          href: "/services/support-maintenance",
          icon: Wrench
        }
      ]
    }
  },
  projects: {
    title: "Our Projects",
    subtitle: "Real software built to solve real business challenges.",
    columns: {
      left: [
        {
          title: "Healthcare",
          description: "Intelligent workflows for patient care.",
          href: "/projects/healthcare",
          icon: Activity
        },
        {
          title: "Education",
          description: "Next-generation digital learning systems.",
          href: "/projects/education",
          icon: GraduationCap
        },
        {
          title: "Retail",
          description: "E-commerce and supply chain architectures.",
          href: "/projects/retail",
          icon: ShoppingBag
        },
        {
          title: "Startups",
          description: "Rapid prototyping and scaling solutions.",
          href: "/projects/startups",
          icon: Rocket
        }
      ],
      right: [
        {
          title: "Enterprise",
          description: "Secure systems for global organizations.",
          href: "/projects/enterprise",
          icon: Building2
        },
        {
          title: "AI Solutions",
          description: "Intelligent algorithms and data models.",
          href: "/projects/ai-solutions",
          icon: Brain
        },
        {
          title: "Cloud Transformation",
          description: "Modernizing IT systems for cloud scale.",
          href: "/projects/cloud-transformation",
          icon: CloudLightning
        },
        {
          title: "Business Solutions",
          description: "Tailored productivity and automation tools.",
          href: "/projects/business-solutions",
          icon: Briefcase
        }
      ]
    }
  },
  about: {
    title: "About Pivot",
    subtitle: "Building technology with purpose.",
    columns: {
      left: [
        {
          title: "Our Story",
          description: "How we started and our journey so far.",
          href: "/about/our-story",
          icon: History
        },
        {
          title: "Mission & Vision",
          description: "Our commitment to future technology.",
          href: "/about/mission-vision",
          icon: Target
        },
        {
          title: "Our Process",
          description: "The agile methodology we use to build.",
          href: "/about/our-process",
          icon: Settings
        },
        {
          title: "Technologies",
          description: "Our modern software development stack.",
          href: "/about/technologies",
          icon: Code
        }
      ],
      right: [
        {
          title: "Industries",
          description: "Sectors we serve and transform.",
          href: "/about/industries",
          icon: Building
        },
        {
          title: "Our Values",
          description: "The core beliefs that drive our work.",
          href: "/about/our-values",
          icon: Heart
        },
        {
          title: "Careers",
          description: "Join our team of elite engineers.",
          href: "/about/careers",
          icon: UserPlus
        },
        {
          title: "Contact",
          description: "Get in touch with our global offices.",
          href: "/contact",
          icon: Mail
        }
      ]
    }
  },
  contact: {
    title: "Contact Pivot",
    subtitle: "Let's build something extraordinary together.",
    columns: {
      left: [
        {
          title: "Start Your Project",
          description: "Tell us about your upcoming software initiative.",
          href: "/contact/start-project",
          icon: PlayCircle
        },
        {
          title: "Book a Consultation",
          description: "Schedule a meeting with our engineers.",
          href: "/contact/book-consultation",
          icon: Calendar
        },
        {
          title: "Business Enquiries",
          description: "For enterprise partnerships and inquiries.",
          href: "/contact/business-enquiries",
          icon: Briefcase
        },
        {
          title: "Partnerships",
          description: "Collaborate with Pivot on global products.",
          href: "/contact/partnerships",
          icon: Users
        }
      ],
      right: [
        {
          title: "Technical Support",
          description: "Help desk for existing products and systems.",
          href: "/contact/technical-support",
          icon: LifeBuoy
        },
        {
          title: "General Enquiries",
          description: "Ask us anything about our work.",
          href: "/contact/general-enquiries",
          icon: HelpCircle
        },
        {
          title: "Careers",
          description: "Submit your CV or apply for open roles.",
          href: "/about/careers",
          icon: UserPlus
        },
        {
          title: "Locations",
          description: "Find our physical offices around the world.",
          href: "/contact/locations",
          icon: MapPin
        }
      ]
    }
  }
};

function MegaMenuItem({ item, onClick }: { item: DropdownItem; onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-between py-3 px-5 rounded-2xl menu-item-card group cursor-pointer"
    >
      <div className="flex items-center gap-4 text-left pr-4">
        {/* Icon */}
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
          isHovered ? "bg-[#27A7A2]/20 text-[#27A7A2]" : "bg-white/5 text-white/70"
        )}>
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className={cn(
            "text-[15px] font-bold tracking-wide transition-colors duration-300 font-heading",
            isHovered ? "text-[#27A7A2]" : "text-white"
          )}>
            {item.title}
          </span>
          <span className={cn(
            "text-xs leading-relaxed mt-1 transition-colors duration-300 font-sans max-w-sm",
            isHovered ? "text-white" : "text-white/50"
          )}>
            {item.description}
          </span>
        </div>
      </div>

      {/* Slide-in Arrow */}
      <div className="overflow-hidden w-6 h-6 flex items-center justify-end relative shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-[#27A7A2] drop-shadow-[0_0_6px_rgba(39,167,162,0.6)]"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </Link>
  );
}

export function Navbar({ introComplete = true }: { introComplete?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", key: "services" },
    { label: "Projects", href: "/projects", key: "projects" },
    { label: "About Us", href: "/about", key: "about" },
    { label: "Contact", href: "/contact", key: "contact" },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Track scroll position to toggle fixed solid background state
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  // Grace Period Hover Controls
  const handleMouseEnter = (menuKey: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // 150-200ms grace period
  };

  const handleMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMenuMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // 150-200ms grace period
  };

  // Clean timeouts on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Inject global scroll margins/paddings so scrolled targets align perfectly below the fixed space */}
      <style dangerouslySetInnerHTML={{ __html: `
        html {
          scroll-padding-top: ${isScrolled ? '72px' : '110px'} !important;
          transition: scroll-padding-top 280ms ease-in-out;
        }
        section[id], div[id] {
          scroll-margin-top: ${isScrolled ? '72px' : '110px'} !important;
          transition: scroll-margin-top 280ms ease-in-out;
        }
      `}} />

      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-[280ms] ease-in-out",
          isScrolled 
            ? "py-3 px-6 sm:px-12" 
            : "py-6 px-6 sm:px-12"
        )}
      >
        <div 
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-300 ease-in-out relative z-50 nav-glass",
            isScrolled 
              ? "h-16 max-w-[1300px] rounded-2xl px-6" 
              : "h-20 max-w-[1400px] rounded-premium px-8"
          )}
        >
          {/* Logo */}
          <Magnetic range={40} strength={0.3}>
            <Link 
              href="/" 
              id="navbar-logo"
              className={cn(
                "flex items-center select-none transition-opacity duration-500",
                !introComplete && "opacity-0 pointer-events-none"
              )}
            >
              <img 
                src="/logo.png" 
                alt="PIVOT Logo" 
                className={cn(
                  "w-auto object-contain transition-all duration-300",
                  isScrolled ? "h-9" : "h-11"
                )} 
              />
            </Link>
          </Magnetic>

          {/* Links (Desktop) */}
          <div 
            className={cn(
              "hidden md:flex items-center gap-8 transition-all duration-1000 ease-out",
              introComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            )}
          >
            {navItems.map((item, idx) => {
              const hasDropdown = !!item.key;
              const isActive = activeMenu === item.key;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.key!)}
                  onMouseLeave={() => hasDropdown && handleMouseLeave()}
                  className="relative py-3"
                >
                  <Magnetic range={30} strength={0.2}>
                    {hasDropdown ? (
                      <button
                        className={cn(
                          "flex items-center gap-1 text-[13px] font-bold tracking-wider hover:text-white transition-colors duration-200 uppercase outline-none cursor-pointer",
                          isActive ? "text-[#27A7A2]" : "text-white/70"
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isActive && "rotate-180 text-[#27A7A2]")} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[13px] font-bold tracking-wider text-white/70 hover:text-white transition-colors duration-200 uppercase"
                      >
                        {item.label}
                      </Link>
                    )}
                  </Magnetic>
                </div>
              );
            })}
          </div>

          {/* Action Button & Mobile Toggle */}
          <div 
            className={cn(
              "flex items-center gap-5 transition-all duration-1000 ease-out",
              introComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            )}
          >
            {/* Desktop Button */}
            <div className="hidden md:block">
              <Link href="/contact/start-project">
                <Button variant="primary" magnetic={true} className={cn(
                  "px-6 text-[11px] uppercase tracking-wider font-extrabold transition-all duration-300",
                  isScrolled ? "h-[40px] rounded-lg" : "h-[48px] rounded-xl"
                )}>
                  Initiate Project
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 cursor-pointer shadow-sm outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
        </div>
      </div>

        {/* Subtly dim & blur the background content when a mega menu is active */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-30 bg-[#071A2F]/15 backdrop-blur-[3px] pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Mega Menus Container (Desktop Floating Dropdowns) */}
        <AnimatePresence>
          {activeMenu && menuConfigurations[activeMenu] && (
            <motion.div
              initial={{ opacity: 0, x: "-50%", y: 15 }}
              animate={{ opacity: 1, x: "-50%", y: 0 }}
              exit={{ opacity: 0, x: "-50%", y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
              className={cn(
                "absolute left-1/2 w-[90vw] lg:w-full lg:max-w-[1200px] z-40 mega-menu-glass rounded-3xl py-8 px-10 overflow-hidden select-none transition-all duration-300 ease-in-out",
                isScrolled ? "top-[84px]" : "top-[112px]"
              )}
            >
              {/* Menu Header info */}
              <div className="mb-5 text-center">
                <span className="text-xs uppercase tracking-[0.25em] text-[#27A7A2] font-bold block mb-1.5 font-heading">
                  {menuConfigurations[activeMenu].title}
                </span>
                <p className="text-white/60 text-sm font-sans max-w-lg mx-auto">
                  {menuConfigurations[activeMenu].subtitle}
                </p>
                <div className="w-full h-px bg-white/10 mt-4" />
              </div>

              {/* Symmetrical Columns layout */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                {/* Left Column */}
                <div className="flex flex-col gap-2">
                  {menuConfigurations[activeMenu].columns.left.map((item, idx) => (
                    <MegaMenuItem 
                      key={`left-${idx}`} 
                      item={item} 
                      onClick={() => setActiveMenu(null)} 
                    />
                  ))}
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-2">
                  {menuConfigurations[activeMenu].columns.right.map((item, idx) => (
                    <MegaMenuItem 
                      key={`right-${idx}`} 
                      item={item} 
                      onClick={() => setActiveMenu(null)} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#071A2F]/98 backdrop-blur-2xl flex flex-col justify-start items-stretch pt-28 px-8 pb-10 overflow-y-auto md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item, idx) => {
                const hasDropdown = !!item.key;
                const isExpanded = mobileExpandedMenu === item.key;

                return (
                  <div key={idx} className="border-b border-white/5 pb-4">
                    {hasDropdown ? (
                      <div>
                        {/* Dropdown Header Trigger */}
                        <button
                          onClick={() => setMobileExpandedMenu(isExpanded ? null : item.key!)}
                          className="flex items-center justify-between w-full text-lg font-heading font-bold tracking-widest text-white/80 hover:text-[#27A7A2] transition-colors duration-200 uppercase py-2 outline-none cursor-pointer"
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-300 text-white/40", isExpanded && "rotate-180 text-[#27A7A2]")} />
                        </button>

                        {/* Collapsible Accordion Items */}
                        <motion.div
                          initial={false}
                          animate={isExpanded ? { height: "auto", opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden flex flex-col gap-3 pl-3"
                        >
                          {menuConfigurations[item.key!].columns.left.map((subItem, sIdx) => (
                            <Link
                              key={`mob-l-${sIdx}`}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5"
                            >
                              <span className="text-[#27A7A2] text-sm mt-0.5">▪</span>
                              <div className="flex flex-col text-left">
                                <span className="text-[14px] font-bold text-white/90">{subItem.title}</span>
                                <span className="text-[11px] text-white/40 leading-normal mt-0.5">{subItem.description}</span>
                              </div>
                            </Link>
                          ))}
                          {menuConfigurations[item.key!].columns.right.map((subItem, sIdx) => (
                            <Link
                              key={`mob-r-${sIdx}`}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5"
                            >
                              <span className="text-[#27A7A2] text-sm mt-0.5">▪</span>
                              <div className="flex flex-col text-left">
                                <span className="text-[14px] font-bold text-white/90">{subItem.title}</span>
                                <span className="text-[11px] text-white/40 leading-normal mt-0.5">{subItem.description}</span>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-lg font-heading font-bold tracking-widest text-white/80 hover:text-[#27A7A2] transition-colors duration-200 uppercase py-2 text-left"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}

              <Link href="/contact/start-project" onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
                <Button 
                  variant="primary" 
                  className="h-[54px] w-full rounded-xl text-xs uppercase tracking-widest font-extrabold flex justify-center items-center"
                >
                  Initiate Project
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

