"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Magnetic } from "../ui/Magnetic";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";

export function Navbar({ introComplete = true }: { introComplete?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 sm:px-12 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20 px-8 rounded-premium glassmorphism border border-border/40 shadow-premium relative z-50">
          {/* Editorial Logo */}
          <Magnetic range={40} strength={0.3}>
            <Link 
              href="/" 
              id="navbar-logo"
              className={cn(
                "text-2xl font-heading font-extrabold tracking-widest text-foreground select-none transition-opacity duration-500",
                !introComplete && "opacity-0 pointer-events-none"
              )}
            >
              PIVOT<span className="text-accent-terracotta">.</span>
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
                  className="text-sm font-semibold tracking-wider text-foreground/70 hover:text-foreground transition-colors duration-200 uppercase"
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
              className="md:hidden flex items-center justify-center w-12 h-12 rounded-full border border-border/40 bg-cardBg/20 hover:bg-cardBg/55 backdrop-blur-md transition-all duration-200 text-foreground cursor-pointer shadow-sm outline-none"
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
