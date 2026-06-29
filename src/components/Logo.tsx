"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useRef } from "react";
import { useIsMobile, useReducedMotion, useScrollY } from "@/hooks/use-media";

type LogoProps = {
  variant?: "default" | "monochrome";
  size?: "nav" | "hero" | "footer" | "loader";
  className?: string;
  animateOnLoad?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  scrollGlow?: boolean;
};

const sizeClassMap = {
  nav: "h-10 w-auto sm:h-[42px] sm:w-auto",
  hero: "h-24 w-auto sm:h-32 sm:w-auto",
  footer: "h-14 w-auto sm:h-16 sm:w-auto",
  loader: "h-28 w-auto sm:h-36 sm:w-auto",
};

const PURPLE_GLOW = "147, 51, 234";

export function Logo({
  variant = "default",
  size = "nav",
  className = "",
  animateOnLoad = false,
  interactive = false,
  onClick,
  scrollGlow = false,
}: LogoProps) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const scrollY = useScrollY();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!interactive || reduced || isMobile || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [interactive, reduced, isMobile, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const isMono = variant === "monochrome";
  const useMobileAsset = isMobile && size !== "loader" && !isMono;

  const src = isMono
    ? "/images/logo-monochrome.png"
    : useMobileAsset
      ? "/images/logo-mobile.png"
      : "/images/logo-transparent.png";

  const scrollIntensity = scrollGlow
    ? Math.min(scrollY / 400, 1) * 0.4 + 0.1
    : 0;

  const dimensions = sizeClassMap[size];
  const eager = size === "loader" || size === "nav";

  return (
    <motion.div
      ref={ref}
      className={`relative inline-flex shrink-0 items-center justify-center ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={
        interactive && !reduced && !isMobile
          ? { rotateX, rotateY, transformPerspective: 600 }
          : undefined
      }
      initial={animateOnLoad ? { opacity: 0, scale: 0.9 } : false}
      animate={animateOnLoad ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      whileHover={
        interactive && !reduced && !isMobile
          ? { scale: 1.06, transition: { duration: 0.25 } }
          : undefined
      }
    >
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-xl"
          style={{
            background: isMono
              ? "rgba(255,255,255,0.12)"
              : `rgba(${PURPLE_GLOW}, ${0.2 + scrollIntensity})`,
          }}
          animate={
            !reduced
              ? { opacity: [0.35, 0.65, 0.35], scale: [1, 1.12, 1] }
              : undefined
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className={`relative ${dimensions}`}>
        <Image
          src={src}
          alt="MrSniperV Logo"
          width={512}
          height={508}
          className="h-full w-auto max-w-none object-contain transition-[filter] duration-300"
          style={{
            filter:
              scrollGlow && scrollY > 50 && !isMobile
                ? `drop-shadow(0 0 ${8 + scrollIntensity * 16}px rgba(${PURPLE_GLOW}, ${0.3 + scrollIntensity}))`
                : undefined,
          }}
          priority={eager}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
