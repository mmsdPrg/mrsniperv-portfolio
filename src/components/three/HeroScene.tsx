"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media";
import type { Mesh } from "three";

function WireframeSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial color="#9333EA" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function InnerCore() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshBasicMaterial color="#d1d1d1" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

function SceneContent({ simplified }: { simplified: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={0.6} color="#9333EA" />
      <WireframeSphere />
      {!simplified && <InnerCore />}
    </>
  );
}

export function HeroScene() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 sm:opacity-80">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={isMobile ? 1 : [1, 1.5]}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        >
          <SceneContent simplified={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  );
}
