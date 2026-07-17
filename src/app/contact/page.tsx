"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import Link from "next/link";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/>
  </svg>
);

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit project inquiry.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        budget: "",
        message: "",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden select-none bg-[#071A2F]">
        
        {/* 1. Viewport-Fixed Continuous Background Video (Constrained by clip-path to this page container) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden [clip-path:inset(0_0_0_0)]">
          <div className="fixed inset-0 w-full h-full pointer-events-none">
            <video
              src="https://res.cloudinary.com/rznuvs5r/video/upload/v1784097942/contact_background_apssey.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 2. Premium uniform dark navy overlay above background video (70% opacity) */}
        <div className="absolute inset-0 bg-[#071A2F]/70 z-10 pointer-events-none" />

        {/* Bottom seamless transition fade into Footer background (#04111F) */}
        <div className="absolute bottom-0 left-0 w-full h-[180px] bg-gradient-to-t from-[#04111F] to-transparent z-15 pointer-events-none" />

        {/* Fine-grain noise texture */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.025] bg-noise" />

        {/* 3. Centered Content Grid */}
        <div className="max-w-[1400px] w-full mx-auto relative z-20 flex flex-col items-center">
          
          {/* Back Navigation */}
          <div className="mb-10 text-left w-full max-w-[680px]">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27A7A2] hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          {/* Centered Content Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[680px] flex flex-col items-center space-y-10"
          >
            {/* Header elements */}
            <div className="text-center space-y-4">
              <span className="text-xs uppercase tracking-[8px] text-[#27A7A2] font-extrabold block">
                CONTACT US
              </span>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-[1.15]">
                Let&apos;s Build Something Extraordinary Together.
              </h1>
              <p className="text-[#D9E8F4]/80 text-base sm:text-lg leading-relaxed font-sans max-w-xl mx-auto">
                Tell us about your vision, and we&apos;ll help transform it into a powerful digital solution tailored to your business.
              </p>
            </div>

            {/* Form container card (Refined glassmorphism, centered) */}
            <div className="w-full rounded-premium border border-[#1F6FA9]/30 bg-[#071A2F]/65 backdrop-blur-[28px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(31,111,169,0.18)] shadow-[#071A2F]/70 relative">
              
              {/* Submit state dialogs */}
              <AnimatePresence mode="wait">
                {success && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-5 rounded-xl bg-[#27A7A2]/15 border border-[#27A7A2]/30 flex items-start gap-4 text-[#6FD7B7]"
                  >
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h4 className="font-bold text-sm font-heading mb-1 text-white">✅ Thank you for contacting Pivot.</h4>
                      <p className="text-xs leading-relaxed text-[#D9E8F4]/80 font-sans">
                        Your project inquiry has been submitted successfully. Our team will review your request and contact you soon.
                      </p>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-4 text-red-300"
                  >
                    <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                    <div className="text-left text-xs leading-relaxed">
                      <h4 className="font-bold font-heading mb-1 text-white text-sm">Something went wrong.</h4>
                      <p className="font-sans text-[#D9E8F4]/80 mb-2">
                        Please try again later or contact us directly at:
                      </p>
                      <a 
                        href="mailto:pivotsc123@gmail.com" 
                        className="font-mono text-[#27A7A2] hover:underline"
                      >
                        pivotsc123@gmail.com
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#D9E8F4]/60 font-bold mb-2 font-heading">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                      className="bg-[#071A2F]/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] focus:shadow-[0_0_15px_rgba(39,167,162,0.22)] hover:border-[#1F6FA9]/50 hover:shadow-[0_0_12px_rgba(31,111,169,0.12)] transition-all duration-[250ms] placeholder-[#D9E8F4]/20 font-sans"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="company" className="text-xs uppercase tracking-widest text-[#D9E8F4]/60 font-bold mb-2 font-heading">
                      Company Name <span className="opacity-50">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter company"
                      className="bg-[#071A2F]/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] focus:shadow-[0_0_15px_rgba(39,167,162,0.22)] hover:border-[#1F6FA9]/50 hover:shadow-[0_0_12px_rgba(31,111,169,0.12)] transition-all duration-[250ms] placeholder-[#D9E8F4]/20 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#D9E8F4]/60 font-bold mb-2 font-heading">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      className="bg-[#071A2F]/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] focus:shadow-[0_0_15px_rgba(39,167,162,0.22)] hover:border-[#1F6FA9]/50 hover:shadow-[0_0_12px_rgba(31,111,169,0.12)] transition-all duration-[250ms] placeholder-[#D9E8F4]/20 font-sans"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="phone" className="text-xs uppercase tracking-widest text-[#D9E8F4]/60 font-bold mb-2 font-heading">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="bg-[#071A2F]/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] focus:shadow-[0_0_15px_rgba(39,167,162,0.22)] hover:border-[#1F6FA9]/50 hover:shadow-[0_0_12px_rgba(31,111,169,0.12)] transition-all duration-[250ms] placeholder-[#D9E8F4]/20 font-sans"
                    />
                  </div>
                </div>

                {/* Budget Selector */}
                <div className="flex flex-col text-left">
                  <label htmlFor="budget" className="text-xs uppercase tracking-widest text-[#D9E8F4]/60 font-bold mb-2 font-heading">
                    Project Budget <span className="opacity-50">(Optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-[#071A2F]/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] hover:border-[#1F6FA9]/50 transition-all duration-[250ms] font-sans cursor-pointer appearance-none"
                    >
                      <option value="" className="bg-[#071A2F] text-white/50">Select Budget Range</option>
                      <option value="Under $10k" className="bg-[#071A2F]">Under $10,000</option>
                      <option value="$10k - $25k" className="bg-[#071A2F]">$10,000 – $25,000</option>
                      <option value="$25k - $50k" className="bg-[#071A2F]">$25,000 – $50,000</option>
                      <option value="$50k - $100k" className="bg-[#071A2F]">$50,000 – $100,000</option>
                      <option value="Over $100k" className="bg-[#071A2F]">Over $100,000</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/40">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="flex flex-col text-left">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#D9E8F4]/60 font-bold mb-2 font-heading">
                    Project Description
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, business goals, required features, preferred technologies, timeline, and any additional details that will help us understand your vision."
                    className="bg-[#071A2F]/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] focus:shadow-[0_0_15px_rgba(39,167,162,0.22)] hover:border-[#1F6FA9]/50 hover:shadow-[0_0_12px_rgba(31,111,169,0.12)] transition-all duration-[250ms] placeholder-[#D9E8F4]/20 resize-none font-sans"
                  />
                </div>

                {/* Centered Submit Button */}
                <div className="pt-2 flex justify-center">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isSending}
                    className="w-full sm:w-[280px] flex items-center justify-center gap-2 uppercase tracking-widest text-xs h-[58px] rounded-xl font-bold cursor-pointer bg-gradient-to-br from-[#12446A] via-[#1B7898] to-[#27A7A2] hover:brightness-110"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Start Your Project</span>
                    )}
                  </Button>
                </div>
              </form>

              {/* Centered social and email links row */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-8 pt-6 border-t border-white/10 text-xs font-semibold text-[#D9E8F4]/70 w-full text-center">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-[#27A7A2] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <LinkedinIcon className="w-4 h-4 text-white/80" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-[#27A7A2] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <XIcon className="w-3.5 h-3.5 text-white/80" />
                  <span>Twitter / X</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-[#27A7A2] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <InstagramIcon className="w-4 h-4 text-white/80" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-[#27A7A2] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4 text-white/80" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="mailto:pivotsc123@gmail.com" 
                  className="flex items-center gap-2 hover:text-[#27A7A2] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-[#D9E8F4]/70 hover:text-[#27A7A2]"
                >
                  <Mail className="w-4 h-4 text-white/80" />
                  <span>pivotsc123@gmail.com</span>
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
