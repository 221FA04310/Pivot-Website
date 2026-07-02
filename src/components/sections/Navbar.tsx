"use client";

import Link from "next/link";
import { Button } from "../ui/Button";
import { Magnetic } from "../ui/Magnetic";
import { ThemeToggle } from "../ui/ThemeToggle";

import { cn } from "@/utils/cn";

export function Navbar({ introComplete = false }: { introComplete?: boolean }) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 sm:px-12 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20 px-8 rounded-premium glassmorphism border border-border/40 shadow-premium">
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

        {/* Links */}
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

        {/* Buttons & Toggles */}
        <div 
          className={cn(
            "flex items-center gap-5 transition-all duration-1000 ease-out",
            introComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          )}
        >
          <ThemeToggle />
          <Button variant="primary" magnetic={true} className="h-[48px] px-6 text-xs uppercase tracking-wider">
            Initiate Project
          </Button>
        </div>
      </div>
    </nav>
  );
}
