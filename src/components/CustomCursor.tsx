"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-media";

export function CustomCursor() {
  const isMobile = useIsMobile(1024);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (isMobile) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${pos.current.x}px`;
        ringRef.current.style.top = `${pos.current.y}px`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button']")) {
        ringRef.current?.classList.add("hovering");
      } else {
        ringRef.current?.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
