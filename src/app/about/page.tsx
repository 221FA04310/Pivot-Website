"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AboutPivot } from "@/components/sections/AboutPivot";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#071A2F]" />;
  }

  return (
    <>
      <Navbar />
      <main className="relative w-full overflow-hidden bg-[#071A2F]">
        <AboutPivot />
      </main>
      <Footer />
    </>
  );
}
