"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArchiveCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  variant?: "vertical" | "compact";
  className?: string;
}

export function ArchiveCard({ id, title, excerpt, date, category, slug, variant = "vertical", className }: ArchiveCardProps) {
  return (
    <Link 
      href={`/blog/${slug}`} 
      data-article="true"
      className={cn(
        "group relative flex flex-col border border-tva-border/40 bg-tva-surface/50 hover:bg-tva-surface p-6 rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-tva-emerald/30",
        variant === "compact" && "p-4",
        className
      )}
    >
      
      {/* Background Hover Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Top File Tab (TVA aesthetic) */}
      <div className="flex items-center justify-between mb-8 border-b border-tva-border/30 pb-3 group-hover:border-tva-emerald/30 transition-colors">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-tva-muted group-hover:bg-tva-bright transition-colors" />
          <span className="font-mono text-[9px] text-tva-muted tracking-[0.2em] uppercase">
            ARCHIVE ID: {id}
          </span>
        </div>
        <span className="font-mono text-[9px] text-tva-amber tracking-widest uppercase">
          {category}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <h3 className={cn(
          "font-display text-tva-text font-semibold leading-snug mb-3 group-hover:text-tva-bright transition-colors duration-300",
          variant === "compact" ? "text-lg" : "text-xl md:text-2xl"
        )}>
          {title}
        </h3>
        
        {variant !== "compact" && (
          <p className="font-sans text-tva-muted text-sm line-clamp-3 leading-relaxed mb-6">
            {excerpt}
          </p>
        )}
      </div>

      {/* Bottom Metadata & CTA */}
      <div className="mt-auto pt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] text-tva-muted tracking-widest uppercase">
          {date}
        </span>
        <div className="font-mono text-[10px] text-tva-text tracking-widest uppercase flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          OPEN <span className="text-tva-emerald">→</span>
        </div>
      </div>
      
      {/* Corner Bracket (Bottom Right) */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-tva-border group-hover:border-tva-emerald/50 transition-colors duration-300" />
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-tva-border group-hover:border-tva-amber/30 transition-colors duration-300" />
    </Link>
  );
}
