"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Particles } from "@/components/Particles";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <CustomCursor />
      <Particles />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
