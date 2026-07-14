"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { Magnetic } from "../ui/Magnetic";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";

export function Navbar({ introComplete = true }: { introComplete?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
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
    // If not on the homepage, immediately lock to the solid docked navbar state
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

  return (
    <>
      {/* Inject global scroll margins/paddings so scrolled targets align perfectly below the fixed space */}
      <style dangerouslySetInnerHTML={{ __html: `
        html {
          scroll-padding-top: ${isScrolled ? '80px' : '128px'} !important;
          transition: scroll-padding-top 280ms ease-in-out;
        }
        section[id], div[id] {
          scroll-margin-top: ${isScrolled ? '80px' : '128px'} !important;
          transition: scroll-margin-top 280ms ease-in-out;
        }
      `}} />

      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-[280ms] ease-in-out",
          isScrolled 
            ? "py-0 px-0" 
            : "py-6 px-6 sm:px-12"
        )}
      >
        <div 
          className={cn(
            "mx-auto flex items-center justify-between h-20 transition-all duration-[280ms] ease-in-out relative z-50 border bg-[#182234] border-white/10 shadow-lg",
            isScrolled 
              ? "w-full max-w-[100%] rounded-none border-t-transparent border-x-transparent px-6 sm:px-12 md:px-16" 
              : "max-w-[1400px] w-full rounded-premium px-8"
          )}
        >
          {/* Editorial Logo */}
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
                className="h-11 w-auto object-contain" 
              />
            </Link>
          </Magnetic>

          {/* Links (Desktop) */}
          <div 
            className={cn(
              "hidden md:flex items-center gap-10 transition-all duration-1000 ease-out",
              introComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            )}
          >
            {navItems.map((item, idx) => (
              <Magnetic key={idx} range={30} strength={0.2}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold tracking-wider text-white/70 hover:text-white transition-colors duration-200 uppercase"
                >
                  {item.label}
                </Link>
              </Magnetic>
            ))}
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
              <Button variant="primary" magnetic={true} className="h-[48px] px-6 text-xs uppercase tracking-wider">
                Initiate Project
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 cursor-pointer shadow-sm outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#F4F0EA]/98 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-heading font-extrabold tracking-widest text-[#1B2430] hover:text-[#A96A4D] transition-colors duration-200 uppercase"
            >
              {item.label}
            </Link>
          ))}
          <Button 
            variant="primary" 
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.location.href = "/contact";
            }}
            className="h-[54px] px-8 rounded-xl text-xs uppercase tracking-wider mt-4"
          >
            Initiate Project
          </Button>
        </div>
      </div>
    </>
  );
}
