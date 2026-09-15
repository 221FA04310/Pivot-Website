import { notFound } from "next/navigation";
import { ContactSlugClient } from "./ContactSlugClient";
import { Footer } from "@/components/sections/Footer";

interface ContactConfig {
  title: string;
  subtitle: string;
  formType: string;
  placeholderMessage: string;
  showBudget: boolean;
}

const contactMap: Record<string, ContactConfig> = {
  "start-project": {
    title: "Start Your Project",
    subtitle: "Tell us about your digital product goals, and we'll help bring your vision to life.",
    formType: "project",
    placeholderMessage: "Describe your project, timeline requirements, and core features...",
    showBudget: true
  },
  "book-consultation": {
    title: "Book a Consultation",
    subtitle: "Schedule a high-impact technical architecture or design layout session with our lead engineers.",
    formType: "consultation",
    placeholderMessage: "What would you like to focus on? (e.g. system design audit, cloud scaling, UI strategy)...",
    showBudget: false
  },
  "business-enquiries": {
    title: "Business Enquiries",
    subtitle: "Discuss corporate solutions, procurement procedures, and long-term retainer configurations.",
    formType: "business",
    placeholderMessage: "Detail your corporate requirements or operational needs...",
    showBudget: true
  },
  "partnerships": {
    title: "Partnerships",
    subtitle: "Collaborate with Pivot on research, product co-development, or integration networks.",
    formType: "partnership",
    placeholderMessage: "How do you envision our organizations working together?...",
    showBudget: false
  },
  "technical-support": {
    title: "Technical Support",
    subtitle: "Report issues, request hotfixes, or coordinate server audit credentials.",
    formType: "support",
    placeholderMessage: "Please provide system details, error logs, and severity level...",
    showBudget: false
  },
  "general-enquiries": {
    title: "General Enquiries",
    subtitle: "Have general questions about our workflows, case studies, or operational structures?",
    formType: "general",
    placeholderMessage: "What would you like to know about Pivot?...",
    showBudget: false
  },
  "locations": {
    title: "Locations & Global Presence",
    subtitle: "Pivot operates on a remote-first hub model with physical connections across major technology centers.",
    formType: "location",
    placeholderMessage: "Send a message to our regional coordinates (e.g. US West, UK Hub, EU East)...",
    showBudget: false
  },
  "careers": {
    title: "Careers Inquiry",
    subtitle: "Apply to join our team of elite developers and designers.",
    formType: "careers",
    placeholderMessage: "Introduce yourself, share links to your portfolio/GitHub, and paste your CV details...",
    showBudget: false
  }
};

export default function ContactSlugPage({ params }: { params: { slug: string } }) {
  const config = contactMap[params.slug];

  if (!config) {
    notFound();
  }

  return (
    <>
      <ContactSlugClient config={config} />
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return [
    { slug: "start-project" },
    { slug: "book-consultation" },
    { slug: "business-enquiries" },
    { slug: "partnerships" },
    { slug: "technical-support" },
    { slug: "general-enquiries" },
    { slug: "locations" },
    { slug: "careers" }
  ];
}

