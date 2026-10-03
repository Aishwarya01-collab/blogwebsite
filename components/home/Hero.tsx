"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ============================================================
   Animated floating particles — rendered on canvas for performance
   ============================================================ */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; r: number;
      vx: number; vy: number; alpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn particles
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(72, 213, 151, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
}

/* ============================================================
   Hero Section
   ============================================================ */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Particle field */}
      <ParticleCanvas />

      {/* Radial glow behind text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-green-loki/10 blur-[120px] animate-glow-pulse" />
      </div>

      {/* Decorative grid lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#48D597 1px, transparent 1px), linear-gradient(90deg, #48D597 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 container-site text-center flex flex-col items-center gap-6">
        {/* Eyebrow */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="eyebrow">Welcome to my universe</span>
        </div>

        {/* Stacked headline */}
        <h1
          className="font-display font-black leading-[0.95] tracking-tight animate-fade-in"
          style={{ animationDelay: "0.25s", opacity: 0 }}
        >
          <span className="block text-6xl sm:text-8xl md:text-[9rem] text-text-primary">
            THOUGHTS.
          </span>
          <span className="block text-6xl sm:text-8xl md:text-[9rem] text-gradient-green">
            SYSTEMS.
          </span>
          <span className="block text-6xl sm:text-8xl md:text-[9rem] text-text-muted/60">
            CHAOS.
          </span>
          <span className="block text-6xl sm:text-8xl md:text-[9rem] text-gradient-gold">
            CREATION.
          </span>
        </h1>

        {/* Sub text */}
        <p
          className="text-text-muted text-lg md:text-xl max-w-xl leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.55s", opacity: 0 }}
        >
          A digital space where I write about programming, AI, systems, and
          everything I build along the way.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mt-2 animate-fade-in"
          style={{ animationDelay: "0.75s", opacity: 0 }}
        >
          <Link href="/blog" className="btn-primary px-8 py-3.5">
            Explore Articles
          </Link>
          <Link href="/write-your-mind" className="btn-secondary px-8 py-3.5">
            Write Your Mind Off
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-2 animate-float"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="text-text-muted/50 text-xs font-mono tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-green-bright/60 to-transparent" />
        </div>
      </div>

      {/* Bottom gradient fade into page */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base to-transparent pointer-events-none"
      />
    </section>
  );
}
