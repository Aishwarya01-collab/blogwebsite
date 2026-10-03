"use client";

import { motion } from "framer-motion";
import { TopicTimelineCard } from "@/components/topics/TopicTimelineCard";

const TIMELINES = [
  { number: "01", title: "Technology", slug: "technology", count: 12 },
  { number: "02", title: "Artificial Intelligence", slug: "ai", count: 8 },
  { number: "03", title: "Systems", slug: "systems", count: 15 },
  { number: "04", title: "Programming", slug: "programming", count: 24 },
  { number: "05", title: "Learning", slug: "learning", count: 6 },
  { number: "06", title: "Thoughts", slug: "thoughts", count: 19 },
];

export default function TopicsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative">
      <div className="container-site max-w-5xl mx-auto relative z-10">
        
        {/* Header Sequence */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tva-border/50 pb-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-tva-amber animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-tva-amber uppercase">
                System Scan Complete
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-tva-text font-black tracking-tight uppercase drop-shadow-md">
              Known Timelines
            </h1>
          </div>

          <div className="font-mono text-[10px] tracking-[0.2em] text-tva-muted uppercase text-left md:text-right">
            <p>TOTAL BRANCHES IDENTIFIED: <span className="text-tva-bright">84</span></p>
            <p>STATUS: <span className="text-tva-emerald">EXPANDING</span></p>
          </div>
        </motion.div>

        {/* Timelines List */}
        <div className="flex flex-col border-t border-tva-border/30">
          {TIMELINES.map((timeline, index) => (
            <motion.div
              key={timeline.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <TopicTimelineCard {...timeline} />
            </motion.div>
          ))}
        </div>

      </div>
      
      {/* Background Decorative Geometry */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] rounded-full border border-tva-emerald/5 opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] rounded-full border border-tva-amber/5 opacity-50 pointer-events-none" />
      
    </main>
  );
}
