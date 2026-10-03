"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEMPORAL_EVENTS = [
  "Temporal fluctuation detected.",
  "A branch has diverged.",
  "Another timeline has been observed.",
  "Variant activity increased.",
  "Timeline synchronization complete.",
  "Quantum connection established.",
  "Anomaly resolved. Branch stable.",
  "Multiverse scan in progress...",
];

export function TemporalEventNotification() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Show a random notification at a random interval between 45–120 seconds
    const scheduleNext = () => {
      const delay = 45000 + Math.random() * 75000; // 45s–120s
      return setTimeout(() => {
        setMessage(TEMPORAL_EVENTS[Math.floor(Math.random() * TEMPORAL_EVENTS.length)]);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          scheduleNext();
        }, 5000); // show for 5s
      }, delay);
    };

    const timer = scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-[9990] pointer-events-none"
        >
          <div className="relative border border-tva-emerald/40 bg-tva-base/90 backdrop-blur-md px-5 py-4 shadow-[0_0_20px_rgba(29,107,69,0.2)] max-w-[260px]">
            {/* Top border glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-tva-emerald/60 to-transparent" />

            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-tva-bright animate-pulse mt-1 shrink-0 shadow-[0_0_6px_rgba(59,229,139,0.8)]" />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-[0.3em] text-tva-amber uppercase">
                  Temporal Signal
                </span>
                <p className="font-mono text-[10px] tracking-wider text-tva-muted leading-relaxed">
                  {message}
                </p>
              </div>
            </div>

            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-tva-emerald/20 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
