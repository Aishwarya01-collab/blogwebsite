"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import TimelineTreeCanvas from "./TimelineTreeCanvas";
import { useEffect, useState } from "react";

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || prefersReduced) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, prefersReduced]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-tva-base -mt-24">

      {/* ── Background Mechanism ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute inset-0 z-0"
        style={!isMobile ? {
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
        } : {}}
      >
        <TimelineTreeCanvas />

        {/* Temporal Loom Rings — hidden on small mobile */}
        <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none mix-blend-screen opacity-30">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-tva-emerald/30 border-dashed"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border-2 border-tva-gold/15"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-tva-bright/30 border-dotted"
          />
        </div>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-4 max-w-4xl mx-auto pt-32 pb-20">

        {/* Intro flash text */}
        <div className="h-10 mb-6 md:mb-10 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-8 md:w-12 h-px bg-tva-bright mb-3 origin-center"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, delay: 0.8, times: [0, 0.2, 0.8, 1] }}
            className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-tva-bright uppercase"
          >
            TIMELINE DETECTED
          </motion.p>
        </div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="flex items-center gap-2 mb-6 font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-tva-amber border border-tva-amber/20 bg-tva-amber/5 px-3 md:px-4 py-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-tva-amber animate-pulse" />
          TIMELINE STATUS: STABLE
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3.2 }}
          className="font-display font-black tracking-tighter uppercase leading-[0.9] mb-6 md:mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-tva-text">Welcome To</span>
          <br />
          <span className="text-tva-bright text-glow-emerald">My Timeline.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
          className="font-sans text-tva-muted text-base md:text-lg max-w-sm md:max-w-xl mx-auto mb-10 md:mb-14 leading-relaxed"
        >
          I build software, decode systems, and document the chaos in between.
          You have entered another branch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <GlowButton href="/blog" variant="emerald" className="w-full sm:w-auto justify-center">
            Enter The Archives
          </GlowButton>
          <GlowButton href="/write-your-mind" variant="ghost" className="w-full sm:w-auto justify-center">
            Write Your Mind
          </GlowButton>
        </motion.div>
      </div>

      {/* ── Scroll Indicator (hidden on short screens) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-widest text-tva-muted uppercase">Descend</span>
        <div className="w-px h-10 bg-gradient-to-b from-tva-emerald to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-tva-bright"
          />
        </div>
      </motion.div>

      {/* Corner deco */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5, duration: 2 }}
        className="absolute bottom-6 left-4 md:bottom-8 md:left-8 w-8 h-8 md:w-12 md:h-12 border-l border-b border-tva-emerald/30"
      />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5, duration: 2 }}
        className="absolute top-20 right-4 md:top-28 md:right-8 w-8 h-8 md:w-12 md:h-12 border-r border-t border-tva-amber/30"
      />

    </section>
  );
}
