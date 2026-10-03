"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";

const FRAGMENTS = [
  {
    content: "Sometimes the things we don't say are the loudest in the system logs.",
    variantId: "07",
  },
  {
    content: "Code is just poetry that a machine can read. Or chaos that a machine executes.",
    variantId: "A-12",
  },
  {
    content: "If you stare long enough into the terminal, the terminal stares back.",
    variantId: "VOID",
  },
  {
    content: "We build systems to escape the chaos, only to realize the systems themselves breed new variants of it.",
    variantId: "42",
  },
  {
    content: "Every deploy is a branching timeline. Most collapse. Some survive.",
    variantId: "TVA-9",
  },
];

export default function WriteYourMindPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 bg-tva-base">

      {/* Background lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-grad-m" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#1D6B45" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="M 0,300 Q 400,150 800,300 T 1600,200" fill="none" stroke="url(#line-grad-m)" strokeWidth="1" />
        <path d="M 0,600 Q 400,750 800,600 T 1600,700" fill="none" stroke="url(#line-grad-m)" strokeWidth="0.5" />
      </svg>

      <div className="container-site max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-tva-amber animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-tva-amber uppercase">
              Temporal Input Enabled
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-tva-text font-black tracking-tight uppercase mb-4 drop-shadow-lg">
            Write Your{" "}
            <span className="text-tva-bright text-glow-emerald">Mind</span> Off
          </h1>

          <p className="font-mono text-tva-muted text-xs md:text-sm tracking-widest uppercase mb-10 max-w-xs mx-auto">
            &ldquo;Some thoughts deserve their own timeline.&rdquo;
          </p>

          <GlowButton variant="emerald">
            Submit a Fragment
          </GlowButton>
        </motion.div>

        {/* ── Fragments Grid (mobile: cards, desktop: scattered) ── */}
        {/* Mobile: clean vertical list with timeline connector */}
        <div className="flex flex-col gap-0 md:hidden relative">
          {/* Vertical timeline spine */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-tva-emerald/50 via-tva-emerald/20 to-transparent pointer-events-none" />

          {FRAGMENTS.map((frag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              className="relative pl-12 pb-8"
            >
              {/* Node on the timeline spine */}
              <div className="absolute left-[11px] top-5 w-2.5 h-2.5 rounded-full bg-tva-base border border-tva-bright/60 shadow-[0_0_8px_rgba(59,229,139,0.5)]" />

              <div className="bg-tva-surface/60 border border-tva-emerald/15 p-5 rounded-sm backdrop-blur-sm hover:border-tva-emerald/40 transition-colors duration-300">
                {/* Quote mark */}
                <span className="text-2xl text-tva-emerald/20 font-display leading-none">&ldquo;</span>
                <p className="font-sans text-tva-text/90 text-sm leading-relaxed mb-4">
                  {frag.content}
                </p>
                <div className="flex items-center justify-between border-t border-tva-border/30 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-tva-amber animate-pulse" />
                    <span className="font-mono text-[9px] tracking-widest text-tva-amber uppercase">Variant</span>
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-tva-muted uppercase">{frag.variantId}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: editorial scattered grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {FRAGMENTS.map((frag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`group bg-tva-surface/40 border border-tva-emerald/15 p-6 rounded-sm backdrop-blur-sm hover:border-tva-emerald/50 hover:bg-tva-surface/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,229,139,0.08)] relative overflow-hidden ${
                i === 4 ? "lg:col-start-2" : ""
              }`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-radial-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Corner bracket */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-tva-bright/20 group-hover:border-tva-bright/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-tva-border/30 group-hover:border-tva-emerald/30 transition-colors" />

              <span className="text-3xl text-tva-emerald/15 font-display leading-none">&ldquo;</span>
              <p className="font-sans text-tva-text/85 text-sm md:text-base leading-relaxed mb-6">
                {frag.content}
              </p>
              <div className="flex items-center justify-between border-t border-tva-border/30 pt-3">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-tva-amber animate-pulse" />
                  <span className="font-mono text-[9px] tracking-widest text-tva-amber uppercase">Variant</span>
                </div>
                <span className="font-mono text-[9px] tracking-widest text-tva-muted uppercase">{frag.variantId}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
