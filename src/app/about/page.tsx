import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About PIVOT | Software & Technology Consultancy",
  description:
    "Learn how PIVOT helps businesses solve technology challenges, modernize systems, build practical software, and move forward with confidence.",
  openGraph: {
    title: "About PIVOT | Software & Technology Consultancy",
    description:
      "Learn how PIVOT helps businesses solve technology challenges, modernize systems, build practical software, and move forward with confidence.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
