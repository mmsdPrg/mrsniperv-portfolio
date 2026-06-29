"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-media";

type SectionWrapperProps = {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
};

export function SectionWrapper({
  id,
  children,
  className = "",
  title,
  subtitle,
}: SectionWrapperProps) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className={`section-padding relative ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(title || subtitle) && (
          <motion.div
            className="mb-12 md:mb-16"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle && (
              <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-accent">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
