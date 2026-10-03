"use client";

import { useEffect, useState } from "react";

export default function GlobalAtmosphere() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-tva-base">
      
      {/* LAYER 1: Deep Green-Black Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-tva-base via-tva-surface to-[#020503]" />

      {/* LAYER 2: Radial Emerald Glow */}
      <div className="absolute top-1/4 left-1/4 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tva-emerald opacity-[0.03] blur-[100px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-tva-amber opacity-[0.02] blur-[120px] animate-glow-pulse" style={{ animationDelay: "2s" }} />

      {/* LAYER 3: Subtle Timeline Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="timeline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#1D6B45" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Branching paths */}
        <path d="M -100,50 Q 300,200 500,-100 T 1200,300" fill="none" stroke="url(#timeline-grad)" strokeWidth="1" className="animate-scanline" style={{ animationDuration: "15s" }} />
        <path d="M 0,800 Q 400,600 800,900 T 1500,400" fill="none" stroke="url(#timeline-grad)" strokeWidth="0.5" className="animate-scanline" style={{ animationDuration: "25s", animationDelay: "5s" }} />
      </svg>

      {/* LAYER 5: Ambient Particles (CSS dots) */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 10 + 10;
          
          return (
            <div
              key={i}
              className="absolute rounded-full bg-tva-bright opacity-30 shadow-[0_0_8px_rgba(59,229,139,0.5)]"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
                animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
              }}
            />
          );
        })}
      </div>

    </div>
  );
}
