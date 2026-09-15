"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Lock,
} from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const optionsWhatBringsYouHere = [
  "I want to build something new",
  "Our current software isn’t working well",
  "Too much of our work is still manual",
  "Our systems don’t communicate",
  "We need a website or web application",
  "We need a mobile application",
  "We need to move to the cloud",
  "We need ongoing support",
  "We’re exploring modernization",
  "I’m not sure yet",
];

const problemSolutionPathways = [
  {
    challenge: "Customers can’t find us online",
    direction: "Website Development",
    targetService: "/services/web-development",
    formOption: "We need a website or web application",
  },
  {
    challenge: "Too much time on manual processes",
    direction: "Web Applications / Custom Software",
    targetService: "/services/web-applications",
    formOption: "Too much of our work is still manual",
  },
  {
    challenge: "Systems don’t talk to each other",
    direction: "Integration / Modernization",
    targetService: "/services/application-modernization",
    formOption: "Our systems don’t communicate",
  },
  {
    challenge: "Old software is holding us back",
    direction: "Application Modernization",
    targetService: "/services/application-modernization",
    formOption: "Our current software isn’t working well",
  },
  {
    challenge: "Need to work from anywhere",
    direction: "Mobile Applications",
    targetService: "/services/mobile-applications",
    formOption: "We need a mobile application",
  },
  {
    challenge: "Infrastructure is expensive",
    direction: "Cloud Migration / Hosting",
    targetService: "/services/cloud-applications",
    formOption: "We need to move to the cloud",
  },
  {
    challenge: "Need ongoing support",
    direction: "Support & Maintenance",
    targetService: "/services/support-maintenance",
    formOption: "We need ongoing support",
  },
  {
    challenge: "I’m not sure yet",
    direction: "Let’s discuss your situation",
    targetService: "#enquiry-form",
    formOption: "I’m not sure yet",
  },
];

const faqs = [
  {
    question: "Do I need to know which service I need?",
    answer: "No. Start with the business problem and PIVOT can help identify the right direction.",
  },
  {
    question: "Can you work with our existing software?",
    answer: "PIVOT’s service portfolio includes modernization, migration, custom software and integration-oriented work for existing systems.",
  },
  {
    question: "Can you provide support after launch?",
    answer: "Yes. Support & Maintenance is part of PIVOT’s service portfolio.",
  },
  {
    question: "Can we start with a smaller project?",
    answer: "The service guidance recommends starting with one service and expanding gradually.",
  },
  {
    question: "What if we’re not sure what we need?",
    answer: "That’s okay. Bring the problem or idea and start the conversation.",
  },
];

const conversationSteps = [
  {
    number: "01",
    title: "You reach out",
    description: "Share your goals, challenges or ideas.",
  },
  {
    number: "02",
    title: "We listen",
    description: "We take the time to understand your business and needs.",
  },
  {
    number: "03",
    title: "We explore",
    description: "We look at the options and the best approach.",
  },
  {
    number: "04",
    title: "We recommend",
    description: "We suggest a practical way forward.",
  },
  {
    number: "05",
    title: "We move together",
    description: "If it’s a good fit, we define the next step and get started.",
  },
];

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    serviceInterest: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToForm = (preselectOption?: string) => {
    if (preselectOption) {
      setFormData((prev) => ({ ...prev, serviceInterest: preselectOption }));
    }
    const formElement = document.getElementById("enquiry-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          serviceInterest: formData.serviceInterest,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enquiry.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        serviceInterest: "",
        message: "",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#071A2F] text-white pt-28 sm:pt-32 pb-16 relative overflow-hidden select-none">
        
        {/* Ambient Background & Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025] bg-noise" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0 pointer-events-none" />

        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#1F6FA9]/10 blur-[130px] pointer-events-none" />
        <div className="absolute top-[35%] right-[15%] w-[600px] h-[600px] rounded-full bg-[#27A7A2]/8 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[25%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#1B5E8A]/10 blur-[140px] pointer-events-none" />

        {/* SECTION 1: HERO */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 pt-8 pb-16">
          
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#27A7A2] hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs uppercase tracking-[8px] text-[#27A7A2] font-extrabold block mb-4">
                CONTACT PIVOT
              </span>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.12] mb-6">
                Every great solution starts with a conversation.
              </h1>
              
              <p className="text-[#D9E8F4]/85 text-base sm:text-lg md:text-xl leading-relaxed font-sans max-w-2xl mb-10">
                You don’t need to know the technical solution. Tell us what you’re trying to achieve, what isn’t working, or what’s getting in the way. We’re here to listen, understand and help you find the right next step.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto">
                <Button
                  variant="primary"
                  magnetic={true}
                  onClick={() => scrollToForm("I want to build something new")}
                  className="h-[56px] px-8 rounded-xl text-sm uppercase tracking-widest font-bold bg-gradient-to-r from-[#12446A] via-[#1B7898] to-[#27A7A2] hover:brightness-110 shadow-[0_10px_30px_rgba(39,167,162,0.25)]"
                >
                  Book a 30-Minute Consultation
                </Button>

                <Button
                  variant="secondary"
                  magnetic={true}
                  onClick={() => scrollToForm()}
                  className="h-[56px] px-8 rounded-xl text-sm uppercase tracking-widest font-bold border-white/20 hover:border-[#27A7A2] text-white w-full sm:w-auto"
                >
                  Send an Enquiry
                </Button>
              </div>
            </div>

            {/* Right Trust Messages */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#0B2238]/80 border border-white/10 text-left backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#27A7A2]/15 flex items-center justify-center text-[#27A7A2]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white">A team that listens</h3>
                </div>
                <p className="text-sm text-[#D9E8F4]/75 font-sans pl-12">
                  Real people, real conversations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B2238]/80 border border-white/10 text-left backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#27A7A2]/15 flex items-center justify-center text-[#27A7A2]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white">Practical advice</h3>
                </div>
                <p className="text-sm text-[#D9E8F4]/75 font-sans pl-12">
                  Honest, experience-led guidance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B2238]/80 border border-white/10 text-left backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#27A7A2]/15 flex items-center justify-center text-[#27A7A2]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white">Your information is safe with us</h3>
                </div>
                <p className="text-sm text-[#D9E8F4]/75 font-sans pl-12">
                  Confidential and secure.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: CONTACT INFORMATION & ENQUIRY FORM */}
        <section id="enquiry-form" className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-16 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Contact Info Panel */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-3">
                  CONTACT DETAILS
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-4">
                  We’re here to help you move forward.
                </h2>
                <p className="text-sm sm:text-base text-[#D9E8F4]/80 font-sans leading-relaxed">
                  Reach out directly via email, connect with our consulting leads, or submit an inquiry using the form.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-4">
                
                {/* Email */}
                <div className="p-5 rounded-xl bg-[#091F35] border border-white/10 flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#27A7A2] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-[#6FD7B7] block uppercase">Email Us</span>
                    <a href="mailto:pivotsc123@gmail.com" className="text-sm sm:text-base font-semibold text-white hover:text-[#27A7A2] transition-colors">
                      pivotsc123@gmail.com
                    </a>
                    <span className="text-xs text-[#D9E8F4]/60 block mt-1">Response expectation: Within 24 business hours</span>
                  </div>
                </div>

                {/* Call Us */}
                <div className="p-5 rounded-xl bg-[#091F35] border border-white/10 flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#27A7A2] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-[#6FD7B7] block uppercase">Call Us</span>
                    <span className="text-sm font-medium text-white/80">[REPLACE WITH REAL PIVOT INFORMATION]</span>
                    <span className="text-xs text-[#D9E8F4]/60 block mt-1">Business hours: Monday – Friday, 9:00 AM – 6:00 PM EST</span>
                  </div>
                </div>

                {/* Office Visit */}
                <div className="p-5 rounded-xl bg-[#091F35] border border-white/10 flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#27A7A2] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-[#6FD7B7] block uppercase">Visit Our Office</span>
                    <span className="text-sm font-medium text-white/80 block">[REPLACE WITH REAL PIVOT INFORMATION]</span>
                    <span className="text-xs text-[#27A7A2] hover:underline cursor-pointer block mt-1">Directions: [REPLACE WITH REAL PIVOT INFORMATION]</span>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="p-5 rounded-xl bg-[#091F35] border border-white/10 flex items-start gap-4">
                  <LinkedinIcon className="w-5 h-5 text-[#27A7A2] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-mono text-[#6FD7B7] block uppercase">Follow Us on LinkedIn</span>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-semibold text-[#27A7A2] hover:underline"
                    >
                      Connect on LinkedIn &rarr;
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#1F6FA9]/30 bg-[#0A223B]/80 backdrop-blur-xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(7,26,47,0.7)] text-left">
                
                <div className="mb-8">
                  <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-2">
                    START A CONVERSATION
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                    Tell us about your goals.
                  </h3>
                  <p className="text-sm text-[#D9E8F4]/80 font-sans leading-relaxed">
                    Give us as much or as little detail as you have. You don’t need a technical specification — just tell us what you’re trying to do.
                  </p>
                </div>

                {/* Feedback Alerts */}
                <AnimatePresence mode="wait">
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-5 rounded-xl bg-[#27A7A2]/15 border border-[#27A7A2]/40 flex items-start gap-4 text-[#6FD7B7]"
                    >
                      <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm font-heading mb-1 text-white">Thank you for reaching out.</h4>
                        <p className="text-xs leading-relaxed text-[#D9E8F4]/90 font-sans">
                          Your enquiry has been received. Our team will review your business challenge and be in touch promptly.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-5 rounded-xl bg-red-500/15 border border-red-500/30 flex items-start gap-4 text-red-200"
                    >
                      <AlertCircle className="w-6 h-6 shrink-0 mt-0.5 text-red-400" />
                      <div className="text-xs leading-relaxed">
                        <h4 className="font-bold font-heading mb-1 text-white text-sm">Submission Notice</h4>
                        <p className="font-sans text-[#D9E8F4]/85">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name & Business Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-xs uppercase tracking-wider text-[#D9E8F4]/70 font-bold mb-2 font-heading">
                        Full Name <span className="text-[#27A7A2]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className="bg-[#071A2F]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] transition-all font-sans placeholder-[#D9E8F4]/30"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-xs uppercase tracking-wider text-[#D9E8F4]/70 font-bold mb-2 font-heading">
                        Business Email <span className="text-[#27A7A2]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@company.com"
                        className="bg-[#071A2F]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] transition-all font-sans placeholder-[#D9E8F4]/30"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="company" className="text-xs uppercase tracking-wider text-[#D9E8F4]/70 font-bold mb-2 font-heading">
                        Company / Organization <span className="text-[#27A7A2]">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Organization name"
                        className="bg-[#071A2F]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] transition-all font-sans placeholder-[#D9E8F4]/30"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="phone" className="text-xs uppercase tracking-wider text-[#D9E8F4]/70 font-bold mb-2 font-heading">
                        Phone Number <span className="opacity-50 text-[10px] lowercase font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="bg-[#071A2F]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] transition-all font-sans placeholder-[#D9E8F4]/30"
                      />
                    </div>
                  </div>

                  {/* Row 3: What brings you here? (Required selection) */}
                  <div className="flex flex-col">
                    <label htmlFor="serviceInterest" className="text-xs uppercase tracking-wider text-[#D9E8F4]/70 font-bold mb-2 font-heading">
                      What brings you here? <span className="text-[#27A7A2]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        required
                        value={formData.serviceInterest}
                        onChange={handleInputChange}
                        className="w-full bg-[#071A2F]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] transition-all font-sans appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#071A2F] text-white/50">
                          Select an option
                        </option>
                        {optionsWhatBringsYouHere.map((opt, idx) => (
                          <option key={idx} value={opt} className="bg-[#071A2F] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/40">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Tell us about the challenge */}
                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-xs uppercase tracking-wider text-[#D9E8F4]/70 font-bold mb-2 font-heading">
                      Tell us about the challenge <span className="text-[#27A7A2]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="What are you trying to achieve, and what’s getting in the way today?"
                      className="bg-[#071A2F]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#27A7A2] focus:ring-1 focus:ring-[#27A7A2] transition-all font-sans placeholder-[#D9E8F4]/30 resize-none"
                    />
                  </div>

                  {/* Submit Button & Privacy Reassurance */}
                  <div className="space-y-4 pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSending}
                      className="w-full h-[56px] rounded-xl font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-[#12446A] via-[#1B7898] to-[#27A7A2] hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#D9E8F4]/60 text-center">
                      <Lock className="w-3.5 h-3.5 text-[#27A7A2] shrink-0" />
                      <span>
                        Your information is treated with care and used only to respond to your enquiry.
                      </span>
                    </div>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: NOT SURE WHAT YOU NEED? PROBLEM → SOLUTION PATHWAYS */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-3">
              EXPLORE BY NEED
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Start with your business challenge. We’ll help you find the right solution.
            </h2>
            <p className="text-[#D9E8F4]/80 text-base sm:text-lg font-sans">
              Click any challenge below to connect directly with our recommended direction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemSolutionPathways.map((pathway, idx) => (
              <div
                key={idx}
                onClick={() => scrollToForm(pathway.formOption)}
                className="p-6 rounded-2xl bg-[#092037]/70 border border-white/10 hover:border-[#27A7A2] hover:bg-[#0D2845] transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer shadow-md hover:-translate-y-1"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#27A7A2] block mb-2">
                    BUSINESS CHALLENGE
                  </span>
                  <h3 className="text-base font-heading font-bold text-white mb-4 group-hover:text-[#6FD7B7] transition-colors">
                    {pathway.challenge}
                  </h3>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono text-[#D9E8F4]/50 block mb-1">PIVOT DIRECTION</span>
                  <div className="flex items-center justify-between text-xs font-bold text-[#6FD7B7]">
                    <span>{pathway.direction}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: HOW THE CONVERSATION WORKS */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-3">
              COLLABORATIVE PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              From your first message to the right next step.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {conversationSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#081F35]/70 border border-white/10 text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-mono font-extrabold text-[#27A7A2] block mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#D9E8F4]/80 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Principle Notice */}
          <div className="mt-12 p-6 rounded-2xl bg-[#091F35]/80 border border-[#27A7A2]/25 max-w-2xl mx-auto text-center">
            <span className="text-xs font-mono text-[#6FD7B7] uppercase block mb-1">OUR CONSULTANCY PRINCIPLE</span>
            <p className="text-sm text-white font-medium">
              If PIVOT is not the right fit for a particular problem, we’ll say so.
            </p>
          </div>
        </section>

        {/* SECTION 5: OFFICE / FACE-TO-FACE */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="rounded-3xl border border-[#1F6FA9]/30 bg-[#081F35] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block">
                MEET IN PERSON OR VIRTUALLY
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
                Sometimes a good conversation is better face-to-face.
              </h3>
              <p className="text-sm sm:text-base text-[#D9E8F4]/80 font-sans leading-relaxed">
                Whether you prefer a video conference or an in-person meeting at our office, we are always ready to sit down, understand your goals, and map out practical solutions.
              </p>
            </div>

            <Button
              variant="secondary"
              magnetic={true}
              onClick={() => scrollToForm("I want to build something new")}
              className="h-[54px] px-8 rounded-xl text-xs uppercase tracking-widest font-bold shrink-0 w-full md:w-auto"
            >
              Schedule a Meeting
            </Button>
          </div>
        </section>

        {/* SECTION 6: FAQ ACCORDION */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-20 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[6px] text-[#27A7A2] font-extrabold block mb-3">
              CLARITY & QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#081F35]/70 overflow-hidden text-left transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 flex items-center justify-between gap-4 text-left font-heading font-bold text-base sm:text-lg text-white hover:text-[#6FD7B7] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#27A7A2] shrink-0 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 text-sm text-[#D9E8F4]/80 font-sans leading-relaxed border-t border-white/5 pt-4"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: TRUST STRIP */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 py-12 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-xl bg-[#091F35]/50 border border-white/5 text-center">
              <span className="text-xs font-mono font-bold text-[#6FD7B7] block mb-1">Confidential</span>
              <p className="text-xs text-[#D9E8F4]/70">Your information is safe with us.</p>
            </div>

            <div className="p-5 rounded-xl bg-[#091F35]/50 border border-white/5 text-center">
              <span className="text-xs font-mono font-bold text-[#6FD7B7] block mb-1">No Obligation</span>
              <p className="text-xs text-[#D9E8F4]/70">Start a conversation, not a contract.</p>
            </div>

            <div className="p-5 rounded-xl bg-[#091F35]/50 border border-white/5 text-center">
              <span className="text-xs font-mono font-bold text-[#6FD7B7] block mb-1">Quick Response</span>
              <p className="text-xs text-[#D9E8F4]/70">Prompt guidance from lead engineers.</p>
            </div>

            <div className="p-5 rounded-xl bg-[#091F35]/50 border border-white/5 text-center">
              <span className="text-xs font-mono font-bold text-[#6FD7B7] block mb-1">A People-First Approach</span>
              <p className="text-xs text-[#D9E8F4]/70">We care about your business outcome.</p>
            </div>

          </div>
        </section>

        {/* SECTION 8: FINAL CONTACT CTA */}
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 pt-16 pb-24 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[8px] text-[#27A7A2] font-mono font-bold block">
              YOUR NEXT CHAPTER STARTS HERE.
            </span>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Book a free 30-minute consultation.
            </h2>
            
            <p className="text-[#D9E8F4]/80 text-base sm:text-xl font-sans leading-relaxed max-w-xl mx-auto">
              Share your challenge, ask your questions, and get practical guidance from our team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6">
              <Button
                variant="primary"
                magnetic={true}
                onClick={() => scrollToForm("I want to build something new")}
                className="h-[58px] px-9 rounded-xl text-sm uppercase tracking-widest font-bold bg-[#27A7A2] hover:bg-[#208b87] text-white shadow-[0_10px_35px_rgba(39,167,162,0.3)] w-full sm:w-auto justify-center"
              >
                Book a Consultation
              </Button>

              <Button
                variant="secondary"
                magnetic={true}
                onClick={() => scrollToForm()}
                className="h-[58px] px-8 rounded-xl text-sm uppercase tracking-widest font-bold border-white/20 hover:border-[#27A7A2] text-white w-full sm:w-auto justify-center"
              >
                Send an Enquiry
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer hideCTA={true} />
    </>
  );
}
