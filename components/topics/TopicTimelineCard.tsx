"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface TopicTimelineCardProps {
  number: string;
  title: string;
  slug: string;
  count: number;
}

export function TopicTimelineCard({ number, title, slug, count }: TopicTimelineCardProps) {
  return (
    <Link
      href={`/topics/${slug}`}
      className="group relative flex items-center justify-between py-5 sm:py-6 px-4 sm:px-6 border-b border-tva-border/20 hover:border-tva-emerald/40 hover:bg-tva-surface/30 transition-all duration-500 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />

      {/* Left: number + title */}
      <div className="relative z-10 flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
        <span className="font-mono text-lg sm:text-2xl text-tva-muted group-hover:text-tva-bright group-hover:text-glow-emerald transition-all duration-300 flex-shrink-0">
          {number}
        </span>
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl text-tva-text tracking-wider uppercase group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-500 truncate">
          {title}
        </h2>
      </div>

      {/* Middle: expanding timeline line — only on sm+ */}
      <div className="hidden sm:flex relative z-10 flex-1 items-center justify-center mx-4 md:mx-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative w-full h-[1px] overflow-hidden">
          <div className="absolute inset-0 bg-tva-emerald -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-tva-bright shadow-[0_0_8px_rgba(59,229,139,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500" />
        </div>
      </div>

      {/* Right: count */}
      <div className="relative z-10 font-mono text-[9px] sm:text-[10px] tracking-widest text-tva-muted uppercase flex flex-col items-end gap-0.5 flex-shrink-0">
        <span>BRANCHES</span>
        <span className="text-tva-amber font-bold text-xs sm:text-sm">
          [{count < 10 ? `0${count}` : count}]
        </span>
      </div>

    </Link>
  );
}
