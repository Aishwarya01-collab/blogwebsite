export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { TopicTimelineCard } from "@/components/topics/TopicTimelineCard";
import { TimelineMap } from "@/components/topics/TimelineMap";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default async function TopicsPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { posts: { where: { published: true } } } } },
    orderBy: { name: "asc" },
  }).catch(() => []);

  const totalEvents = categories.reduce((acc, c) => acc + c._count.posts, 0);

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 relative">
      <div className="container-site max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tva-border/50 pb-8">
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
              <p>BRANCHES IDENTIFIED: <span className="text-tva-bright">{categories.length}</span></p>
              <p>TOTAL EVENTS: <span className="text-tva-emerald">{totalEvents}</span></p>
              <p>STATUS: <span className="text-tva-bright animate-pulse">EXPANDING</span></p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Timeline Map Visualization ── */}
        {categories.length > 0 && (
          <ScrollReveal delay={0.1}>
            <div className="mb-16">
              <SectionLabel index="MAP" title="Multiverse Branch Visualization" />
              <div className="border border-tva-border/30 bg-tva-surface/20 p-4 md:p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-emerald opacity-10 pointer-events-none" />
                <TimelineMap timelines={categories} />
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ── Timeline List ── */}
        <ScrollReveal delay={0.15}>
          <SectionLabel index="INDEX" title="All Known Timelines" />
        </ScrollReveal>

        <div className="flex flex-col border-t border-tva-border/30">
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <ScrollReveal key={cat.slug} delay={0.1 + index * 0.07} direction="left">
                <TopicTimelineCard
                  number={String(index + 1).padStart(2, "0")}
                  title={cat.name}
                  slug={cat.slug}
                  count={cat._count.posts}
                />
              </ScrollReveal>
            ))
          ) : (
            // Fallback static data for frontend preview
            [
              { number: "01", title: "Technology", slug: "technology", count: 12 },
              { number: "02", title: "Artificial Intelligence", slug: "ai", count: 8 },
              { number: "03", title: "Systems", slug: "systems", count: 15 },
              { number: "04", title: "Programming", slug: "programming", count: 24 },
              { number: "05", title: "Learning", slug: "learning", count: 6 },
              { number: "06", title: "Thoughts", slug: "thoughts", count: 19 },
            ].map((t, index) => (
              <ScrollReveal key={t.slug} delay={0.1 + index * 0.07} direction="left">
                <TopicTimelineCard {...t} />
              </ScrollReveal>
            ))
          )}
        </div>

      </div>

      {/* Background rings */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] rounded-full border border-tva-emerald/5 opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] rounded-full border border-tva-amber/5 opacity-50 pointer-events-none" />
    </main>
  );
}
