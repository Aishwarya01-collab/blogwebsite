"use client";

import { motion } from "framer-motion";

interface IdentityRowProps {
  label: string;
  values: string[];
  delay?: number;
  amber?: boolean;
}

function IdentityRow({ label, values, delay = 0, amber = false }: IdentityRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 py-5 border-b border-tva-border/30 group"
    >
      <span className="font-mono text-[9px] tracking-[0.25em] text-tva-muted uppercase w-28 flex-shrink-0 pt-0.5">
        {label}
      </span>
      <div className="flex flex-col gap-1">
        {values.map((v, i) => (
          <span
            key={i}
            className={`font-display text-lg tracking-wider uppercase transition-colors duration-300 ${
              amber ? "text-tva-amber group-hover:text-tva-gold" : "text-tva-text group-hover:text-tva-bright"
            }`}
          >
            {v}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">

      {/* Background — large faint circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-tva-emerald/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-tva-amber/5 pointer-events-none" />

      <div className="container-site max-w-5xl mx-auto relative z-10">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 border-b border-tva-border/50 pb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-tva-amber animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-tva-amber uppercase">
              TVA — Identity File
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-tva-text font-black tracking-tight uppercase">
            Variant File
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── LEFT: Identity Record ── */}
          <div>
            {/* File stamp art */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full aspect-square max-w-xs mx-auto lg:mx-0 mb-12 flex items-center justify-center"
            >
              {/* Abstract ID photo placeholder */}
              <div className="absolute inset-0 border border-tva-emerald/20 rounded-sm overflow-hidden bg-tva-surface/50 backdrop-blur-sm">
                {/* Rotating rings inside the "photo" */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-48 h-48 rounded-full border border-tva-emerald/20 border-dashed"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-32 h-32 rounded-full border border-tva-amber/20"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute w-16 h-16 rounded-full border border-tva-bright/30"
                  />
                  {/* Central Glyph */}
                  <span className="font-display text-4xl text-tva-bright text-glow-emerald animate-glow-pulse">◈</span>
                </div>
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,229,139,0.02) 2px, rgba(59,229,139,0.02) 4px)"
                  }}
                />
              </div>

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-tva-bright/60" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-tva-amber/60" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-tva-amber/60" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-tva-bright/60" />

              {/* CLASSIFIED stamp */}
              <div className="absolute -top-4 left-6 bg-tva-base border border-tva-border/50 px-3 py-1">
                <span className="font-mono text-[9px] tracking-[0.3em] text-tva-muted uppercase">
                  File #AW-2026
                </span>
              </div>
            </motion.div>

            {/* Identity rows */}
            <div className="border-t border-tva-border/50">
              <IdentityRow label="Variant" values={["Aishwarya"]} delay={0.3} amber />
              <IdentityRow label="Role" values={["Computer Science Student", "Builder", "Writer"]} delay={0.4} />
              <IdentityRow label="Interests" values={["AI", "Systems", "Software", "Experimentation"]} delay={0.5} />
              <IdentityRow label="Status" values={["Active"]} delay={0.6} amber />
              <IdentityRow label="Timeline" values={["Branch α-7"]} delay={0.7} />
            </div>
          </div>

          {/* ── RIGHT: Personal Narrative ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[9px] tracking-[0.25em] text-tva-amber uppercase">
                Personal Statement
              </span>
              <span className="h-[1px] flex-1 bg-tva-border/50" />
            </div>

            <div className="space-y-5 font-sans text-tva-muted leading-loose text-base md:text-lg">
              <p>
                I am a computer science student who found herself fascinated not just by how
                software works, but by <span className="text-tva-text">why systems behave the way they do</span> under pressure,
                at scale, and at the edge of their design.
              </p>
              <p>
                This website is my archive. A place where I document the things I am learning,
                the systems I am decoding, and the thoughts that I would otherwise keep locked
                inside a terminal window.
              </p>
              <p>
                I build things. I break things. I <span className="text-tva-bright">write about both.</span>
              </p>
            </div>

            {/* Subtle Loki Easter Egg */}
            <div className="mt-12 border border-tva-border/30 bg-tva-surface/30 p-5 rounded-sm group cursor-default hover:border-tva-emerald/40 transition-colors duration-500">
              <p className="font-mono text-[9px] tracking-[0.2em] text-tva-muted uppercase mb-1">
                Temporal Advisory
              </p>
              <p className="font-mono text-xs text-tva-amber/70 group-hover:text-tva-amber transition-colors duration-300">
                "For all time. Always."
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </main>
  );
}
