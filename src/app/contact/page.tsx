import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact PIVOT | Start a Software & Technology Consultation",
  description:
    "Tell PIVOT about your business challenge, software needs, cloud plans, modernization goals or new idea. Start with a conversation and find the right next step.",
  openGraph: {
    title: "Contact PIVOT | Start a Software & Technology Consultation",
    description:
      "Tell PIVOT about your business challenge, software needs, cloud plans, modernization goals or new idea. Start with a conversation and find the right next step.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
