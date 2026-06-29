"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteConfig, floatingSnippets } from "@/lib/site-data";
import { Logo } from "./Logo";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media";

const HeroScene = dynamic(
  () => import("./three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

function FloatingSnippet({
  text,
  style,
}: {
  text: string;
  style: React.CSSProperties;
}) {
  return (
    <motion.span
      className="pointer-events-none absolute hidden font-mono text-xs text-white/20 lg:block"
      style={style}
      animate={{ y: [0, -10, 0], opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => setMounted(true), []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || isMobile) return;
    const { innerWidth, innerHeight } = window;
    mouseX.set(e.clientX / innerWidth - 0.5);
    mouseY.set(e.clientY / innerHeight - 0.5);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
      onMouseMove={handleMouseMove}
    >
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.08),transparent_55%)]" />

      {mounted && <HeroScene />}

      {!isMobile &&
        floatingSnippets.map((snippet, i) => (
          <FloatingSnippet
            key={snippet}
            text={snippet}
            style={{
              left: `${10 + i * 14}%`,
              top: `${18 + (i % 3) * 22}%`,
            }}
          />
        ))}

      <div className="section-padding relative z-10 w-full">
        <motion.div
          className="mx-auto max-w-6xl"
          style={reduced ? undefined : { x: parallaxX, y: parallaxY }}
        >
          <motion.div
            className="mb-6 flex items-center gap-4 sm:gap-5"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Logo size="hero" interactive={!isMobile} />
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">MrSniperV</span>
            </h1>
          </motion.div>

          <motion.p
            className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-accent sm:text-base"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Backend &amp; Full-Stack Developer
          </motion.p>

          <motion.p
            className="mb-10 max-w-2xl text-lg text-muted sm:text-xl"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 py-3 font-medium text-foreground transition-all hover:border-accent hover:bg-accent/20 hover:shadow-neon-purple"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View GitHub
            </a>
          </motion.div>

          <motion.div
            className="mt-20 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="h-10 w-6 rounded-full border border-white/20 p-1"
              animate={reduced ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <div className="mx-auto h-2 w-1 rounded-full bg-accent/80" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
