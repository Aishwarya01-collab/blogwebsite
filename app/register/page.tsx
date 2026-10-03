"use client";

import { registerAction } from "@/actions/auth";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { TimelineLink } from "@/components/ui/TimelineLink";
import { useState } from "react";
import { motion } from "framer-motion";

const fields = [
  { id: "name",     label: "Identity Name",     type: "text",     autoComplete: "name",         placeholder: "Your name" },
  { id: "email",    label: "Temporal Address",   type: "email",    autoComplete: "email",        placeholder: "you@example.com" },
  { id: "password", label: "Access Code",        type: "password", autoComplete: "new-password", placeholder: "Min. 8 characters" },
  { id: "confirm",  label: "Confirm Code",       type: "password", autoComplete: "new-password", placeholder: "Repeat your code" },
];

const errorMessages: Record<string, string> = {
  missing_fields: "All identity fields are required.",
  password_mismatch: "Access codes do not match.",
  email_taken: "This temporal address is already registered.",
};

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
  const errorMsg = searchParams.error ? errorMessages[searchParams.error] : null;
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-16 py-24 relative">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-tva-emerald/5 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* System header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <TimelineLink href="/" className="inline-flex flex-col items-center gap-2 group mb-8">
            <div className="w-10 h-10 border border-tva-emerald/40 bg-tva-emerald/10 flex items-center justify-center group-hover:border-tva-bright group-hover:bg-tva-emerald/20 transition-all">
              <span className="text-tva-emerald font-display text-lg">◈</span>
            </div>
          </TimelineLink>

          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1 h-1 rounded-full bg-tva-amber animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-tva-amber uppercase">Variant Registration</span>
          </div>
          <h1 className="font-display text-3xl font-black text-tva-text uppercase tracking-tight">
            Enter The <span className="text-tva-bright text-glow-emerald">Multiverse</span>
          </h1>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative border border-tva-border/50 bg-tva-surface/40 backdrop-blur-md p-8"
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-tva-emerald/50" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-tva-emerald/50" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-tva-border/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-tva-border/30" />

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mb-6 px-4 py-3 border border-red-900/50 bg-red-900/10 text-red-400 text-xs font-mono tracking-widest uppercase"
            >
              ⚠ {errorMsg}
            </motion.div>
          )}

          <form action={registerAction} className="flex flex-col gap-5">
            {fields.map(({ id, label, type, autoComplete, placeholder }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex flex-col gap-2"
              >
                <label htmlFor={id} className="text-[9px] font-mono tracking-[0.3em] uppercase text-tva-muted">
                  {label}
                </label>
                <input
                  id={id} name={id} type={type} autoComplete={autoComplete} required
                  placeholder={placeholder}
                  onFocus={() => setFocused(id)}
                  onBlur={() => setFocused(null)}
                  className={`bg-tva-base/60 border px-4 py-3 text-tva-text text-sm font-mono placeholder:text-tva-muted/30 focus:outline-none transition-all duration-300 ${
                    focused === id ? "border-tva-emerald/60 shadow-[0_0_10px_rgba(59,229,139,0.1)]" : "border-tva-border/50"
                  }`}
                />
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-2">
              <SubmitButton label="Register Variant" loadingLabel="Identifying..." />
            </motion.div>
          </form>

          <div className="mt-6 pt-6 border-t border-tva-border/30 text-center">
            <p className="font-mono text-[10px] tracking-widest uppercase text-tva-muted">
              Already registered?{" "}
              <TimelineLink href="/login" className="text-tva-emerald hover:text-tva-bright transition-colors">
                Authenticate Here
              </TimelineLink>
            </p>
          </div>
        </motion.div>

        <p className="text-center font-mono text-[9px] tracking-widest text-tva-muted/40 uppercase mt-8">
          For All Time. Always.
        </p>
      </div>
    </main>
  );
}
