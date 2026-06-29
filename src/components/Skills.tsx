"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/site-data";
import { SectionWrapper } from "./SectionWrapper";
import { useReducedMotion } from "@/hooks/use-media";

function SkillBar({
  label,
  level,
  delay,
  reduced,
}: {
  label: string;
  level: number;
  delay: number;
  reduced: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="font-mono text-accent">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-glow shadow-neon-purple"
          initial={reduced ? { width: `${level}%` } : { width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="skills" subtitle="Skills" title="Tech arsenal">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Expertise chart
          </h3>
          <div className="glass-card glow-border space-y-5 p-6 sm:p-8">
            {skillCategories.map((cat, i) => (
              <SkillBar
                key={cat.title}
                label={cat.title}
                level={cat.level}
                delay={i * 0.12}
                reduced={reduced}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category, i) => (
            <motion.article
              key={category.title}
              className="glass-card glow-border group p-5 sm:p-6"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={reduced ? undefined : { y: -4 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-lg">
                  {category.icon}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted">{category.skills.length} technologies</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-accent/30 group-hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
