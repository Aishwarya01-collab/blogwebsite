"use client";

import { cn } from "@/lib/utils";
import { TimelineLink } from "./TimelineLink";

interface GlowButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "emerald" | "amber" | "ghost";
  className?: string;
}

export function GlowButton({ href, onClick, children, variant = "emerald", className }: GlowButtonProps) {
  const baseClasses = "group relative inline-flex items-center justify-center font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 px-6 py-3";
  
  const variants = {
    emerald: "text-tva-base bg-tva-emerald hover:text-tva-bright",
    amber: "text-tva-amber border border-tva-amber/30 bg-tva-amber/5 hover:border-tva-amber/80",
    ghost: "text-tva-muted hover:text-tva-text hover:bg-tva-surface"
  };

  const Content = () => (
    <>
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-0.5">
        {children}
      </span>
      
      {/* Animated glow / background fill */}
      {variant === "emerald" && (
        <div className="absolute inset-0 bg-tva-deep translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
      )}
      {variant === "amber" && (
        <div className="absolute inset-0 bg-tva-amber/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 shadow-[0_0_15px_rgba(196,154,69,0.3)_inset]" />
      )}

      {/* Moving line effect */}
      {(variant === "emerald" || variant === "amber") && (
        <span className={cn(
          "absolute bottom-0 left-0 w-full h-[2px] -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-700 ease-out z-10",
          variant === "emerald" ? "bg-tva-bright" : "bg-tva-gold"
        )} />
      )}
    </>
  );

  if (href) {
    return (
      <TimelineLink href={href} className={cn(baseClasses, variants[variant], className)}>
        <Content />
      </TimelineLink>
    );
  }

  return (
    <button onClick={onClick} className={cn(baseClasses, variants[variant], className)}>
      <Content />
    </button>
  );
}
