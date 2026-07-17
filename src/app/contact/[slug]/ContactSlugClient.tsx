"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ContactConfig {
  title: string;
  subtitle: string;
  formType: string;
  placeholderMessage: string;
  showBudget: boolean;
}

interface ContactSlugClientProps {
  config: ContactConfig;
}

export function ContactSlugClient({ config }: ContactSlugClientProps) {
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
          subject: `${config.title} Submission`,
          formType: config.formType,
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
        
        {/* Continuous Background Video (Constrained by clip-path to this page container) */}
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

        {/* Premium uniform dark navy overlay above background video */}
        <div className="absolute inset-0 bg-[#071A2F]/80 z-10 pointer-events-none" />

        {/* Bottom transition fade into Footer background */}
        <div className="absolute bottom-0 left-0 w-full h-[180px] bg-gradient-to-t from-[#04111F] to-transparent z-15 pointer-events-none" />

        {/* Fine-grain noise texture */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.025] bg-noise" />

        {/* Centered Content Grid */}
        <div className="max-w-[1400px] w-full mx-auto relative z-20 flex flex-col items-center">
          
          {/* Back Navigation */}
          <div className="mb-10 text-left w-full max-w-[680px]">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27A7A2] hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Contact
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
                {config.title.toUpperCase()}
              </span>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-[1.15]">
                {config.title}
              </h1>
              <p className="text-[#D9E8F4]/80 text-base sm:text-lg leading-relaxed font-sans max-w-xl mx-auto">
                {config.subtitle}
              </p>
            </div>

            {/* Form container card */}
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
                        Your inquiry has been submitted successfully. Our team will review your request and get back to you shortly.
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
                      <p className="font-sans text-[#D9E8F4]/80">
                        Please try again later or contact us directly at: <a href="mailto:pivotsc123@gmail.com" className="text-[#27A7A2] hover:underline">pivotsc123@gmail.com</a>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Input Layout */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Dual Inputs Line 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2 text-left">
                    <label htmlFor="name" className="text-xs font-bold text-[#D9E8F4]/90 uppercase tracking-widest">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-[54px] rounded-xl border border-[#1F6FA9]/20 bg-[#071A2F]/50 px-5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#27A7A2] focus:bg-[#071A2F]/80"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 text-left">
                    <label htmlFor="company" className="text-xs font-bold text-[#D9E8F4]/90 uppercase tracking-widest">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="e.g. Pivot Inc."
                      value={formData.company}
                      onChange={handleInputChange}
                      className="h-[54px] rounded-xl border border-[#1F6FA9]/20 bg-[#071A2F]/50 px-5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#27A7A2] focus:bg-[#071A2F]/80"
                    />
                  </div>
                </div>

                {/* Dual Inputs Line 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2 text-left">
                    <label htmlFor="email" className="text-xs font-bold text-[#D9E8F4]/90 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-[54px] rounded-xl border border-[#1F6FA9]/20 bg-[#071A2F]/50 px-5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#27A7A2] focus:bg-[#071A2F]/80"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 text-left">
                    <label htmlFor="phone" className="text-xs font-bold text-[#D9E8F4]/90 uppercase tracking-widest">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="e.g. +1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-[54px] rounded-xl border border-[#1F6FA9]/20 bg-[#071A2F]/50 px-5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#27A7A2] focus:bg-[#071A2F]/80"
                    />
                  </div>
                </div>

                {/* Conditional Budget Dropdown */}
                {config.showBudget && (
                  <div className="flex flex-col space-y-2 text-left">
                    <label htmlFor="budget" className="text-xs font-bold text-[#D9E8F4]/90 uppercase tracking-widest">
                      Estimated Project Budget
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="h-[54px] rounded-xl border border-[#1F6FA9]/20 bg-[#071A2F]/50 px-5 text-sm text-white/80 outline-none transition-all duration-300 focus:border-[#27A7A2] focus:bg-[#071A2F]/80 appearance-none relative cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#071A2F] text-white/50">Select your budget range...</option>
                      <option value="10k-25k" className="bg-[#071A2F] text-white">$10,000 – $25,000</option>
                      <option value="25k-50k" className="bg-[#071A2F] text-white">$25,000 – $50,000</option>
                      <option value="50k-100k" className="bg-[#071A2F] text-white">$50,000 – $100,000</option>
                      <option value="100k+" className="bg-[#071A2F] text-white">$100,000+</option>
                    </select>
                  </div>
                )}

                {/* Message Textarea */}
                <div className="flex flex-col space-y-2 text-left">
                  <label htmlFor="message" className="text-xs font-bold text-[#D9E8F4]/90 uppercase tracking-widest">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder={config.placeholderMessage}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="rounded-xl border border-[#1F6FA9]/20 bg-[#071A2F]/50 p-5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-[#27A7A2] focus:bg-[#071A2F]/80 resize-none"
                  />
                </div>

                {/* Action Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSending}
                    className="w-full h-[58px] rounded-xl font-heading font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Submit {config.title}</span>
                    )}
                  </Button>
                </div>

              </form>

            </div>

          </motion.div>

        </div>
      </main>
    </>
  );
}
