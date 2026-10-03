"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/blog", label: "ARCHIVES" },
  { href: "/topics", label: "TIMELINES" },
  { href: "/write-your-mind", label: "MIND" },
  { href: "/about", label: "ABOUT" },
];

const externalLinks = [
  { href: "https://github.com", label: "GITHUB" },
  { href: "https://linkedin.com", label: "LINKEDIN" },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-tva-border/30">

      {/* Convergence line — timelines collapsing into one */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-tva-emerald/50 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-radial-emerald opacity-30 blur-2xl pointer-events-none" />

      <div className="container-site max-w-6xl mx-auto px-4 py-20 relative z-10">

        {/* ── Top: End of Timeline Statement ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-tva-emerald/50" />
            <span className="w-2 h-2 rounded-full bg-tva-bright shadow-[0_0_10px_rgba(59,229,139,0.8)] animate-pulse" />
            <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-tva-emerald/50" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl text-tva-text font-black tracking-tight uppercase mb-3">
            Timeline Stable.
          </h2>
          <p className="font-sans text-tva-muted text-base md:text-lg">
            Thank you for visiting this branch.
          </p>
        </motion.div>

        {/* ── Middle: Navigation + External ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16 border-y border-tva-border/20 py-10"
        >

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group relative font-mono text-[10px] tracking-[0.2em] text-tva-muted hover:text-tva-text transition-colors duration-300 uppercase"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-tva-bright group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="hidden md:block h-10 w-[1px] bg-tva-border/40" />

          {/* External links */}
          <div className="flex items-center gap-6">
            {externalLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-tva-amber/60 hover:text-tva-amber transition-colors duration-300 uppercase"
              >
                <span className="w-1 h-1 rounded-full bg-tva-amber/40 group-hover:bg-tva-amber group-hover:shadow-[0_0_5px_rgba(196,154,69,0.8)] transition-all" />
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom: System Status Bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >

          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-tva-emerald/40 flex items-center justify-center rounded-sm">
              <span className="text-tva-emerald font-display text-xs">◈</span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-tva-muted uppercase">
              Aishwarya — Branch α-7
            </span>
          </div>

          {/* Center: System Status */}
          <div className="flex items-center gap-3 font-mono text-[9px] tracking-widest text-tva-muted uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-tva-bright animate-pulse shadow-[0_0_4px_rgba(59,229,139,0.8)]" />
            <span>All Systems Operational</span>
            <span className="text-tva-border">|</span>
            <span className="text-tva-emerald/60">FOR ALL TIME.</span>
          </div>

          {/* Right: Built with */}
          <span className="font-mono text-[9px] tracking-widest text-tva-muted/50 uppercase">
            Built on Next.js × Tailwind
          </span>

        </motion.div>

      </div>

      {/* Timeline end line — thin final stroke */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-tva-emerald/20 via-transparent to-tva-amber/10" />

    </footer>
  );
}
