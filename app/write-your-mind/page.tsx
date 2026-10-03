export const dynamic = "force-dynamic";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { submitMindAction } from "@/actions/interactions";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { formatDate } from "@/lib/utils";

const rotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0", "-rotate-1", "rotate-1"];

export default async function WriteYourMindPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  const session = await getSession();
  const currentUser = session.user ?? null;

  const minds = await prisma.mind.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  const errorMap: Record<string, string> = {
    too_short: "Your thought is too short — say a little more.",
    too_long:  "Keep it under 200 characters — make it sharp.",
  };
  const errorMsg   = searchParams.error   ? errorMap[searchParams.error]   : null;
  const successMsg = searchParams.success ? "Your thought was submitted for review." : null;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container-site">

          {/* ── Header ─────────────────────────────────── */}
          <div className="text-center mb-16 md:mb-24">
            <span className="eyebrow mb-4 block">Collective Consciousness</span>
            <h1 className="font-display text-5xl md:text-7xl font-black text-text-primary uppercase tracking-tight mb-4">
              Write Your<br />
              <span className="text-gradient-green">Mind Off</span>
            </h1>
            <p className="text-text-muted max-w-lg mx-auto text-lg">
              Some thoughts don&apos;t need a full story.
            </p>
          </div>

          {/* ── Submit form ────────────────────────────── */}
          <div className="max-w-xl mx-auto mb-20">
            {currentUser ? (
              <div className="glass-card p-8 rounded-sm relative">
                {errorMsg && (
                  <div className="mb-5 px-4 py-3 rounded-sm bg-red-900/20 border border-red-500/30 text-red-400 text-sm font-mono">
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="mb-5 px-4 py-3 rounded-sm bg-green-loki/20 border border-green-loki/40 text-green-bright text-sm font-mono">
                    {successMsg}
                  </div>
                )}
                <form action={submitMindAction} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="content" className="text-xs font-mono tracking-widest uppercase text-text-muted">
                      Your thought (max 200 characters)
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows={3}
                      required
                      maxLength={200}
                      placeholder="Sometimes the things we don't say are the loudest…"
                      className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                        placeholder:text-text-muted/40 focus:outline-none focus:border-green-bright/60
                        focus:shadow-glow-green resize-none transition-all duration-300"
                    />
                  </div>
                  <SubmitButton label="Submit Thought" loadingLabel="Submitting…" />
                </form>
                {/* Corner accents */}
                <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-green-bright/30 rounded-tl-sm pointer-events-none" />
                <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-green-bright/30 rounded-br-sm pointer-events-none" />
              </div>
            ) : (
              <div className="glass-card p-8 rounded-sm text-center">
                <p className="text-text-muted mb-4">
                  <a href="/login" className="text-green-bright hover:underline">Sign in</a> to share your thought.
                </p>
              </div>
            )}
          </div>

          {/* ── Floating thought cards ─────────────────── */}
          {minds.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {minds.map((mind, i) => (
                <div
                  key={mind.id}
                  className={`break-inside-avoid glass-card p-6 rounded-sm border border-border
                    hover:border-green-loki/50 hover:shadow-glow-green/20 transition-all duration-500
                    ${rotations[i % rotations.length]}`}
                >
                  {/* Quote mark */}
                  <div className="text-green-bright/20 font-display text-5xl leading-none mb-2 select-none">&ldquo;</div>
                  <p className="text-text-secondary text-sm leading-relaxed italic mb-4">
                    {mind.content}
                  </p>
                  <div className="text-text-muted/40 font-mono text-[10px] text-right tracking-widest">
                    {formatDate(mind.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-text-muted italic">
              No thoughts yet. Be the first to leave one.
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
