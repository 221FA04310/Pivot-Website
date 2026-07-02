"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-grid-pattern">
        <div className="absolute inset-0 bg-radial-gradient z-0 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-indigo hover:text-foreground transition-colors duration-200 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-7xl font-heading font-extrabold text-foreground tracking-tight mb-4">
              Begin a Pivot
            </h1>
            <p className="text-base md:text-xl text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Connect with our product studio to design user interfaces and scale your digital capabilities.
            </p>
          </div>

          {/* Form Card */}
          <Card spotlight={true} className="p-8 md:p-12">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-foreground/65 font-bold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    className="bg-cardBg border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-indigo transition-colors duration-200"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-foreground/65 font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    className="bg-cardBg border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-indigo transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-foreground/65 font-bold mb-2">
                  Project Description
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Outline your systems requirements..."
                  className="bg-cardBg border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-indigo transition-colors duration-200 resize-none"
                />
              </div>

              <div className="pt-4">
                <Button variant="primary" className="w-full flex items-center justify-center gap-2 py-3">
                  Transmit Request <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Card>

        </div>
      </main>
      <Footer />
    </>
  );
}
