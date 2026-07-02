import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PIVOT | Premium Software & Product Engineering",
    template: "%s | PIVOT",
  },
  description: "PIVOT designs and builds next-generation digital products, high-performance software systems, and immersive visual experiences for global brands.",
  keywords: [
    "software engineering",
    "product design",
    "creative frontend",
    "WebGL architectures",
    "GSAP animations",
    "React design systems",
    "digital transformation",
    "Awwwards portfolio",
  ],
  authors: [{ name: "PIVOT Studio" }],
  creator: "PIVOT Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pivot.studio",
    title: "PIVOT | Premium Software & Product Engineering",
    description: "PIVOT designs and builds next-generation digital products, high-performance software systems, and immersive visual experiences for global brands.",
    siteName: "PIVOT",
  },
  twitter: {
    card: "summary_large_image",
    title: "PIVOT | Premium Software & Product Engineering",
    description: "PIVOT designs and builds next-generation digital products, high-performance software systems, and immersive visual experiences for global brands.",
    creator: "@pivot_studio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
