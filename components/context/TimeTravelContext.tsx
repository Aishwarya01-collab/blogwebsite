"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface TimeTravelContextType {
  navigateWithTransition: (href: string) => void;
}

const TimeTravelContext = createContext<TimeTravelContextType | undefined>(undefined);

export function TimeTravelProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const navigateWithTransition = useCallback((href: string) => {
    setIsTransitioning(true);
    
    // Play time travel sound effect
    try {
      const audio = new Audio("/sounds/time-travel.mp3");
      audio.volume = 0.5;
      audio.play().catch(console.log);
    } catch {
      // Ignore audio errors
    }
    
    // Halfway through the animation, change the route
    setTimeout(() => {
      router.push(href);
    }, 600); // 600ms corresponds to when the portal is fully covering the screen

    // End the transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  }, [router]);

  return (
    <TimeTravelContext.Provider value={{ navigateWithTransition }}>
      {children}

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden bg-tva-base"
          >
            {/* Warping lines / branches accelerating */}
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 3, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[2px] h-screen bg-tva-emerald/40 origin-center"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    boxShadow: "0 0 20px rgba(59,229,139,0.5)",
                  }}
                />
              ))}
            </motion.div>

            {/* Central Portal expanding */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 5], opacity: [0, 1, 1] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute w-64 h-64 rounded-full bg-tva-bright mix-blend-screen blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeIn" }}
              className="absolute w-32 h-32 rounded-full bg-tva-base"
            />

            {/* Status Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 1, 0], y: 0 }}
              transition={{ duration: 0.8, times: [0, 0.2, 0.8, 1] }}
              className="absolute z-10 font-mono text-sm tracking-[0.4em] text-tva-bright uppercase drop-shadow-[0_0_10px_rgba(59,229,139,1)]"
            >
              Shifting Timeline
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TimeTravelContext.Provider>
  );
}

export function useTimeTravel() {
  const context = useContext(TimeTravelContext);
  if (context === undefined) {
    throw new Error("useTimeTravel must be used within a TimeTravelProvider");
  }
  return context;
}
