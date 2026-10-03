"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringArticle, setIsHoveringArticle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = !!target.closest("a, button, [role='button']");
      const isArticle = !!target.closest("[data-article]");
      setIsHoveringLink(isLink);
      setIsHoveringArticle(isArticle);
    };

    window.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  return (
    <>
      {/* Hide default cursor on desktop */}
      <style>{`@media (pointer: fine) { *, *::before, *::after { cursor: none !important; } }`}</style>

      <AnimatePresence>
        {isVisible && (
          <>
            {/* Dot core */}
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
              animate={{
                x: pos.x - (isHoveringLink ? 16 : 4),
                y: pos.y - (isHoveringLink ? 16 : 4),
                width: isHoveringLink ? 32 : 8,
                height: isHoveringLink ? 32 : 8,
              }}
              transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.3 }}
            >
              <div className={`w-full h-full rounded-full ${
                isHoveringLink
                  ? "border border-tva-bright bg-transparent"
                  : "bg-tva-bright shadow-[0_0_8px_rgba(59,229,139,0.9)]"
              }`} />
            </motion.div>

            {/* Trailing ring */}
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9998]"
              animate={{
                x: pos.x - 20,
                y: pos.y - 20,
                opacity: isHoveringLink ? 0.6 : 0.2,
                scale: isHoveringLink ? 1.5 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.8 }}
            >
              <div className="w-10 h-10 rounded-full border border-tva-emerald/50" />
            </motion.div>

            {/* Article label */}
            <AnimatePresence>
              {isHoveringArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 4, x: 12 }}
                  animate={{ opacity: 1, y: 0, x: 16 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="fixed pointer-events-none z-[9999] font-mono text-[9px] tracking-[0.2em] text-tva-bright uppercase whitespace-nowrap bg-tva-base/80 px-2 py-1 border border-tva-emerald/30"
                  style={{ left: pos.x, top: pos.y + 16 }}
                >
                  OPEN TIMELINE →
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
