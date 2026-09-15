import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Satoshi", "General Sans", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        // Heading specifications
        h1: ["72px", { lineHeight: "1.1", fontWeight: "800" }],
        h2: ["56px", { lineHeight: "1.15", fontWeight: "700" }],
        h3: ["42px", { lineHeight: "1.2", fontWeight: "600" }],
        h4: ["32px", { lineHeight: "1.25", fontWeight: "500" }],
        // Body specifications
        body: ["20px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
      },
      colors: {
        background: "var(--background)",
        backgroundSecondary: "var(--background-secondary)",
        darkSection: "var(--dark-section)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        cardBg: "var(--card-bg)",
        cardBorder: "var(--card-border)",
        accent: {
          terracotta: "var(--accent-terracotta)",
          mutedGold: "var(--accent-muted-gold)",
          forestGreen: "var(--accent-forest-green)",
          softPlum: "var(--accent-soft-plum)",
        },
      },
      spacing: {
        sectionGap: "160px",
        headingGap: "48px",
        cardGap: "32px",
        buttonGap: "32px",
      },
      borderRadius: {
        premium: "20px",
      },
      boxShadow: {
        premium: "0 10px 40px -15px rgba(26, 26, 26, 0.05)",
        premiumHover: "0 20px 50px -10px rgba(26, 26, 26, 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-up": "slideUp 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
