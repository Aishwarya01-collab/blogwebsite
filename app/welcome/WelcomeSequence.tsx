"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTimeTravel } from "@/components/context/TimeTravelContext";
import { GlowButton } from "@/components/ui/GlowButton";

export default function WelcomeSequence({ name, variantId }: { name: string, variantId: string }) {
  const [step, setStep] = useState(0);
  const { navigateWithTransition } = useTimeTravel();

  useEffect(() => {
    // Cinematic timings
    const timers = [
      setTimeout(() => setStep(1), 2000), // Show IDENTIFYING VARIANT...
      setTimeout(() => setStep(2), 4500), // Show VARIANT CONFIRMED
      setTimeout(() => setStep(3), 6000), // Show DATA
      setTimeout(() => setStep(4), 8000), // Show BUTTON
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    navigateWithTransition("/");
  };

  return (
    <main className="fixed inset-0 z-[100] bg-tva-base flex flex-col items-center justify-center font-mono overflow-hidden">
      
      {/* Background ambient noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-radial-emerald opacity-20 mix-blend-screen pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6">
        
        {/* Step 0 & 1: Scanning */}
        {step < 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 border border-tva-emerald/30 rounded-full flex items-center justify-center relative">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 border-tva-bright rounded-full"
              />
              <span className="text-tva-bright text-xs">◈</span>
            </div>
            
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-tva-muted tracking-[0.3em] uppercase text-xs"
            >
              {step === 0 ? "INITIALIZING SCAN..." : "IDENTIFYING VARIANT..."}
            </motion.p>
          </motion.div>
        )}

        {/* Step 2+: Confirmed & Data */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full border border-tva-emerald/40 bg-tva-surface/40 backdrop-blur-md p-8 md:p-12 shadow-[0_0_50px_rgba(29,107,69,0.2)]"
          >
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-tva-border/50">
              <span className="w-2 h-2 bg-tva-bright rounded-full shadow-[0_0_10px_rgba(59,229,139,1)] animate-pulse" />
              <h2 className="text-tva-bright tracking-[0.3em] uppercase text-sm font-bold">
                VARIANT CONFIRMED
              </h2>
            </div>

            {step >= 3 && (
              <div className="flex flex-col gap-6 text-sm tracking-widest uppercase">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-tva-muted inline-block w-32">IDENTITY:</span>
                  <span className="text-tva-text font-bold">{name}</span>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <span className="text-tva-muted inline-block w-32">VARIANT ID:</span>
                  <span className="text-tva-amber font-bold">{variantId}</span>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                  <span className="text-tva-muted inline-block w-32">ORIGIN TIMELINE:</span>
                  <span className="text-tva-text font-bold">T-01</span>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                  <span className="text-tva-muted inline-block w-32">STATUS:</span>
                  <span className="text-tva-bright font-bold">STABLE</span>
                </motion.div>
              </div>
            )}

            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 flex justify-center pt-8 border-t border-tva-border/50"
              >
                <GlowButton onClick={handleEnter} variant="emerald" className="w-full">
                  [ ENTER THE MULTIVERSE ]
                </GlowButton>
              </motion.div>
            )}

          </motion.div>
        )}

      </div>
    </main>
  );
}
