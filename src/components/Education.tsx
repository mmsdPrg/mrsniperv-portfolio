"use client";

import { motion } from "framer-motion";
import { educationItems } from "@/lib/site-data";
import { SectionWrapper } from "./SectionWrapper";
import { useReducedMotion } from "@/hooks/use-media";

export function Education() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="education" subtitle="Education" title="Academic foundation">
      <div className="grid gap-6 sm:grid-cols-2">
        {educationItems.map((item, i) => (
          <motion.article
            key={item.school}
            className="glass-card glow-border group p-8"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -4 }}
          >
            <div className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-accent">
              Degree
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground">
              {item.degree}
            </h3>
            <p className="mt-2 text-lg text-muted">{item.school}</p>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
