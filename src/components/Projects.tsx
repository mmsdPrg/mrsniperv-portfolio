"use client";

import { motion } from "framer-motion";
import { liveProjects } from "@/lib/site-data";
import { SectionWrapper } from "./SectionWrapper";
import { useReducedMotion } from "@/hooks/use-media";

function ExternalIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

export function Projects() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="projects" subtitle="Projects" title="Live projects">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {liveProjects.map((project, i) => (
          <motion.a
            key={project.domain}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card glow-border group relative block overflow-hidden p-5 sm:p-6"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={reduced ? undefined : { y: -5 }}
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl opacity-50 transition-opacity group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                  {project.name}
                </h3>
                <p className="mt-1 font-mono text-sm text-accent">{project.domain}</p>
              </div>
              <ExternalIcon />
            </div>

            <p className="relative mt-3 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            <div className="relative mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
