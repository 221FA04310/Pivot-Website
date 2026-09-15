import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload Hero Video 1 for seamless instant play */}
        <link
          rel="preload"
          href="https://res.cloudinary.com/rznuvs5r/video/upload/v1782976841/hero-1_jntjwf.mp4"
          as="video"
          type="video/mp4"
        />
        {/* Preconnect to Fontshare CDN for Satoshi font files */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
