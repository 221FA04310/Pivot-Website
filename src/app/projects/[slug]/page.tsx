import { redirect } from "next/navigation";

export default function ProjectSlugRedirectPage({ params }: { params: { slug: string } }) {
  redirect(`/industries/${params.slug}`);
}

export function generateStaticParams() {
  return [
    { slug: "healthcare" },
    { slug: "education" },
    { slug: "retail" },
    { slug: "startups" },
    { slug: "enterprise" },
    { slug: "ai-solutions" },
    { slug: "cloud-transformation" },
    { slug: "business-solutions" }
  ];
}
