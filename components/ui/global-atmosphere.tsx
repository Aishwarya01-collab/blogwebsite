"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GlobalAtmosphere() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-tva-base perspective-[1000px]">
      {/* Layer 1: Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tva-emerald/10 via-tva-base to-tva-base opacity-60" />
      
      {/* Layer 2: Travelling Perspective Grid (Temporal Stream) */}
      <div className="absolute inset-0 flex items-end justify-center perspective-[1000px] opacity-[0.15]">
        <motion.div 
          className="w-[200vw] h-[100vh] border-t border-tva-emerald/30 origin-bottom"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(29,107,69,0.3) 1px, transparent 1px),
              linear-gradient(to top, rgba(29,107,69,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: 'rotateX(75deg) translateZ(-200px) translateY(200px)',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px 100px']
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
        />
      </div>

      {/* Interactive Cursor Glow */}
      {isMounted && (
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),_rgba(29,107,69,0.08)_0%,_transparent_40%)] mix-blend-screen"
          style={{
            //@ts-expect-error -- CSS custom properties not in CSSProperties type
            "--mouse-x": `${mousePosition.x}px`,
            "--mouse-y": `${mousePosition.y}px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />
      )}

      {/* Layer 3: Travelling Temporal Dust (Particles flying past) */}
      <div className="absolute inset-0 perspective-[800px]">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-tva-bright opacity-40 blur-[1px]"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 20 + 5 + "px", // Stretched to simulate speed
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{
              y: ["-10%", "120%"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Layer 4: Subtle Noise Grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
    </div>
  );
}
