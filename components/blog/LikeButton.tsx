"use client";

import { useFormStatus } from "react-dom";
import { toggleLikeAction } from "@/actions/interactions";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  postId: string;
  likeCount: number;
  isLiked: boolean;
}

function LikeInner({ likeCount, isLiked }: { likeCount: number; isLiked: boolean }) {
  const { pending } = useFormStatus();
  const [showNotification, setShowNotification] = useState(false);

  // When successfully transitioning from unliked to liked
  useEffect(() => {
    if (isLiked && !pending) {
      setShowNotification(true);
      const t = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(t);
    }
  }, [isLiked, pending]);

  return (
    <div className="relative">
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "group relative flex items-center gap-3 px-6 py-3 border transition-all duration-500 font-mono text-[10px] md:text-xs tracking-widest uppercase overflow-hidden",
          isLiked
            ? "border-tva-emerald/60 bg-tva-emerald/10 text-tva-bright"
            : "border-tva-border/50 text-tva-muted hover:border-tva-emerald/40 hover:text-tva-text hover:bg-tva-surface"
        )}
      >
        {/* Hover scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tva-emerald/10 to-transparent h-full -translate-y-full group-hover:animate-[scanline_2s_linear_infinite] pointer-events-none" />
        
        <span className="relative z-10 flex items-center gap-2">
          <span className={cn("w-1.5 h-1.5 rounded-full transition-all duration-300", pending ? "animate-spin" : (isLiked ? "bg-tva-bright shadow-[0_0_8px_rgba(59,229,139,0.8)]" : "bg-tva-border group-hover:bg-tva-emerald"))} />
          {likeCount} {isLiked ? "Quantum Links" : "Establish Link"}
        </span>
      </button>

      {/* Quantum Entanglement Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-4 w-64 border border-tva-emerald/40 bg-tva-surface/90 backdrop-blur-md p-4 shadow-[0_0_20px_rgba(29,107,69,0.2)] z-50 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 border-b border-tva-border/30 pb-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tva-bright animate-pulse" />
              <span className="font-mono text-[9px] tracking-widest text-tva-bright uppercase">Quantum Event Detected</span>
            </div>
            <p className="font-sans text-xs text-tva-muted leading-relaxed">
              Your reaction has propagated through the connected timeline.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LikeButton({ postId, likeCount, isLiked }: LikeButtonProps) {
  return (
    <form action={toggleLikeAction}>
      <input type="hidden" name="postId" value={postId} />
      <LikeInner likeCount={likeCount} isLiked={isLiked} />
    </form>
  );
}
