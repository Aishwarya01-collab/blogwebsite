"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MindFragmentCardProps {
  content: string;
  variantId: string;
  xOffset: number;
  yOffset: number;
  delay: number;
  scale?: number;
}

export function MindFragmentCard({ content, variantId, xOffset, yOffset, delay, scale = 1 }: MindFragmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.7, 1, 0.7],
        y: [0, -20, 0],
        rotate: [0, Math.random() * 4 - 2, 0]
      }}
      transition={{ 
        opacity: { duration: 8, repeat: Infinity, delay },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay }
      }}
      style={{
        left: `${xOffset}%`,
        top: `${yOffset}%`,
        scale,
      }}
      className={cn(
        "absolute group w-64 md:w-80 cursor-default z-10 hover:z-50 transition-all duration-500",
        "backdrop-blur-md bg-tva-surface/30 border border-tva-emerald/20 p-6 rounded-sm",
        "hover:border-tva-emerald/70 hover:bg-tva-surface/60 hover:shadow-[0_0_30px_rgba(59,229,139,0.15)]"
      )}
    >
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      {/* Decorative Corner / Line */}
      <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-tva-bright/50 group-hover:border-tva-bright transition-colors" />
      <div className="absolute -bottom-4 left-1/2 w-[1px] h-4 bg-tva-emerald/30 group-hover:h-8 group-hover:-bottom-8 transition-all duration-500" />

      <div className="relative z-10">
        {/* Quote Mark */}
        <span className="absolute -top-4 -left-2 text-4xl text-tva-emerald/20 font-display leading-none group-hover:text-tva-emerald/40 transition-colors">
          "
        </span>
        
        {/* Content */}
        <p className="font-sans text-tva-text/90 text-sm md:text-base leading-relaxed mb-6 relative z-10">
          {content}
        </p>

        {/* Identity / Variant Tag */}
        <div className="flex items-center justify-between border-t border-tva-border/40 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-tva-amber animate-pulse" />
            <span className="font-mono text-[9px] tracking-widest text-tva-amber uppercase">
              VARIANT
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-tva-muted uppercase">
            {variantId}
          </span>
        </div>
      </div>

    </motion.div>
  );
}
