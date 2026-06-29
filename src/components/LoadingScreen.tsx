"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { useReducedMotion } from "@/hooks/use-media";

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="noise-overlay absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.12),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, rotate: reduced ? 0 : -6, scale: 0.85 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo size="loader" animateOnLoad />
      </motion.div>

      <motion.h1
        className="mt-8 font-display text-3xl font-bold tracking-wider text-foreground sm:text-4xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        MrSniperV
      </motion.h1>

      <motion.div
        className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-accent"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: reduced ? 0.5 : 2.2, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      />
    </motion.div>
  );
}
