"use client";

import { Logo } from "./Logo";

export function Footer() {
  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-surface/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={scrollToHero}
          className="rounded-lg p-2 transition-colors hover:bg-white/5"
          aria-label="Scroll to top"
        >
          <Logo variant="monochrome" size="footer" />
        </button>
        <p className="text-center text-sm text-muted sm:text-right">
          © 2026 MrSniperV. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
