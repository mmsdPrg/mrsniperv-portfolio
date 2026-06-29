"use client";

import { motion } from "framer-motion";
import { experienceItems } from "@/lib/site-data";
import { SectionWrapper } from "./SectionWrapper";
import { useReducedMotion } from "@/hooks/use-media";

export function Experience() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper
      id="experience"
      subtitle="Experience"
      title="8+ Years of Experience"
    >
      <div className="relative">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent md:left-1/2 md:-translate-x-px" />

        <div className="space-y-8">
          {experienceItems.map((item, i) => (
            <motion.div
              key={item.title}
              className={`relative flex flex-col md:w-1/2 ${
                i % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
              }`}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className={`absolute top-6 h-3 w-3 rounded-full border-2 border-accent bg-background shadow-neon-purple md:top-8 ${
                  i % 2 === 0
                    ? "left-4 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-1/2"
                    : "left-4 -translate-x-1/2 md:left-0 md:-translate-x-1/2"
                }`}
              />
              <div className="glass-card glow-border ml-10 p-6 md:ml-0">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
