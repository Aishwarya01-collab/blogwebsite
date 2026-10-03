"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

/* Sample minds for visual display (will come from DB in Phase 7) */
const sampleMinds = [
  {
    id: "1",
    content: "Sometimes the things we don't say are the loudest.",
    createdAt: new Date("2026-09-15"),
    rotation: -2,
    delay: "0s",
  },
  {
    id: "2",
    content: "Code is just logic wearing a costume. The hard part is always the logic.",
    createdAt: new Date("2026-09-20"),
    rotation: 1.5,
    delay: "0.15s",
  },
  {
    id: "3",
    content: "We build systems to escape chaos, then wonder why we feel empty without it.",
    createdAt: new Date("2026-09-25"),
    rotation: -1,
    delay: "0.3s",
  },
  {
    id: "4",
    content: "Every debugged program contains at least one more bug.",
    createdAt: new Date("2026-09-28"),
    rotation: 2,
    delay: "0.45s",
  },
  {
    id: "5",
    content: "The best documentation is the code you didn't have to write.",
    createdAt: new Date("2026-10-01"),
    rotation: -1.5,
    delay: "0.6s",
  },
];

export default function WriteYourMind() {
  const [thought, setThought] = useState("");
  const maxLen = 120;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — server action wired in Phase 7
    alert("Login required to submit! (Auth arrives in Phase 5)");
  };

  return (
    <section className="section relative overflow-hidden">
      {/* Background gold glow */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none"
      />

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block justify-center">Signature feature</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-text-primary mb-4">
            Write Your{" "}
            <span className="text-gradient-gold">Mind Off</span>
          </h2>
          <p className="text-text-muted text-lg max-w-md mx-auto">
            Some thoughts don't need a full story.{" "}
            <span className="text-text-primary">Just speak.</span>
          </p>
        </div>

        {/* Floating cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {sampleMinds.map((mind) => (
            <div
              key={mind.id}
              className="glass-card rounded-sm p-5 relative group overflow-hidden"
              style={{
                transform: `rotate(${mind.rotation}deg)`,
                animationDelay: mind.delay,
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 40px rgba(199,169,74,0.15), 0 0 0 1px rgba(199,169,74,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = `rotate(${mind.rotation}deg)`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
              }}
            >
              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/30" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/30" />

              {/* Quote mark */}
              <span
                className="absolute top-3 left-4 text-5xl text-gold/10 font-display leading-none select-none"
                aria-hidden="true"
              >
                "
              </span>

              <p className="relative z-10 text-text-primary text-sm leading-relaxed font-medium italic mt-4">
                "{mind.content}"
              </p>

              <p className="mt-4 text-text-muted/50 text-[10px] font-mono">
                {formatDate(mind.createdAt)}
              </p>
            </div>
          ))}
        </div>

        {/* Submission form */}
        <div className="max-w-lg mx-auto">
          <div className="glass-card rounded-sm p-6 border-gold/20">
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-gold mb-1">
              Share a thought
            </h3>
            <p className="text-text-muted text-xs mb-5">
              Keep it short. Keep it real. Max {maxLen} characters.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <textarea
                  value={thought}
                  onChange={(e) => setThought(e.target.value.slice(0, maxLen))}
                  placeholder="Something you've been thinking about..."
                  rows={3}
                  className="w-full bg-base/60 border border-border rounded-sm px-4 py-3
                    text-text-primary text-sm placeholder:text-text-muted/40 resize-none
                    focus:outline-none focus:border-gold/60 focus:shadow-glow-gold
                    transition-all duration-300 font-sans"
                  aria-label="Your thought"
                />
                <span
                  className={`absolute bottom-3 right-3 text-[10px] font-mono transition-colors duration-200 ${
                    thought.length >= maxLen * 0.9
                      ? "text-gold"
                      : "text-text-muted/40"
                  }`}
                >
                  {thought.length}/{maxLen}
                </span>
              </div>
              <button type="submit" className="btn-gold w-full">
                Submit Thought
              </button>
            </form>
            <p className="text-text-muted/50 text-[10px] text-center mt-3">
              Submissions are reviewed before appearing publicly.{" "}
              <Link href="/login" className="text-green-bright underline underline-offset-2">
                Login
              </Link>{" "}
              to submit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
