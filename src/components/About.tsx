"use client";

import { motion } from "framer-motion";
import { aboutPoints } from "@/lib/site-data";
import { SectionWrapper } from "./SectionWrapper";
import { useReducedMotion } from "@/hooks/use-media";

export function About() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="about" subtitle="About" title="Engineering with precision">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          className="glass-card glow-border p-8"
          initial={reduced ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-lg leading-relaxed text-muted">
            I am <span className="text-foreground font-medium">MrSniperV</span>, a
            software developer with over eight years of professional experience
            building production systems that scale. From backend architecture to
            polished frontends, I focus on delivering reliable software that
            solves real business problems.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            My work spans enterprise platforms, real-time systems, and
            cloud-native deployments — always with an emphasis on performance,
            security, and maintainable code.
          </p>
        </motion.div>

        <ul className="space-y-4">
          {aboutPoints.map((point, i) => (
            <motion.li
              key={point}
              className="glass-card flex items-start gap-4 p-5"
              initial={reduced ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                {i + 1}
              </span>
              <span className="text-muted">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
