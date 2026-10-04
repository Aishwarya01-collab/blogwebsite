import Hero from "@/components/home/Hero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { ArchiveCard } from "@/components/blog/ArchiveCard";
import { TopicTimelineCard } from "@/components/topics/TopicTimelineCard";
import { GlowButton } from "@/components/ui/GlowButton";


const FEATURED = {
  id: "0047",
  title: "Building Microservices with Go and gRPC",
  excerpt:
    "An exploration into building high-performance, resilient microservices using Go and gRPC. We dive deep into protocol buffers, stream processing, and why this tech stack dominates modern backend engineering.",
  category: "SYSTEMS",
  date: "10.03.2026",
  slug: "building-microservices-go",
  imageUrl:
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
};

const RECENT = [
  {
    id: "0082",
    title: "The Illusion of AGI",
    excerpt:
      "Why the pursuit of Artificial General Intelligence might be chasing a ghost. Analyzing the fundamental limits of statistical language models.",
    category: "AI",
    date: "09.15.2026",
    slug: "illusion-of-agi",
  },
  {
    id: "0104",
    title: "Vim: The Mind-Machine Interface",
    excerpt:
      "Stop using the mouse. How learning Vim motions fundamentally rewrites the way you interface with text editors.",
    category: "PROGRAMMING",
    date: "08.22.2026",
    slug: "vim-mind-machine",
  },
  {
    id: "0117",
    title: "Designing for the Void",
    excerpt:
      "Why modern UI is trending towards extreme minimalism and brutalist darkness.",
    category: "THOUGHTS",
    date: "07.10.2026",
    slug: "designing-for-the-void",
  },
];

const TIMELINES = [
  { number: "01", title: "Technology", slug: "technology", count: 12 },
  { number: "02", title: "Artificial Intelligence", slug: "ai", count: 8 },
  { number: "03", title: "Systems", slug: "systems", count: 15 },
  { number: "04", title: "Programming", slug: "programming", count: 24 },
];

const SAMPLE_FRAGMENTS = [
  { content: "Sometimes the things we don't say are the loudest in the system logs.", variantId: "07" },
  { content: "Every deploy is a branching timeline. Most collapse. Some survive.", variantId: "TVA-9" },
  { content: "Code is just poetry that a machine can read. Or chaos it executes.", variantId: "A-12" },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* ══ HERO ══ */}
      <Hero />

      {/* ══ SECTION SPACING ══ */}
      <div className="container-site max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-32 md:gap-40 py-24 md:py-32">

        {/* ══ TIMELINE 01 — THE ARCHIVES (Featured) ══ */}
        <section>
          <ScrollReveal>
            <SectionLabel index="01" title="The Archives" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <FeaturedArticle {...FEATURED} />
          </ScrollReveal>
        </section>

        {/* ══ TIMELINE 02 — RECENT EVENTS ══ */}
        <section>
          <ScrollReveal>
            <SectionLabel index="02" title="Recent Events" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {RECENT.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.1}>
                <ArchiveCard {...post} className="h-full" />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex justify-center">
              <GlowButton href="/blog" variant="ghost">
                View All Archives →
              </GlowButton>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ TIMELINE 03 — KNOWN TIMELINES (Topics) ══ */}
        <section>
          <ScrollReveal>
            <SectionLabel index="03" title="Known Timelines" />
          </ScrollReveal>
          <div className="border-t border-tva-border/30">
            {TIMELINES.map((t, i) => (
              <ScrollReveal key={t.slug} delay={i * 0.08} direction="left">
                <TopicTimelineCard {...t} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.35}>
            <div className="mt-10 flex justify-center">
              <GlowButton href="/topics" variant="ghost">
                All Timelines →
              </GlowButton>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ TIMELINE 04 — THE MIND ══ */}
        <section>
          <ScrollReveal>
            <SectionLabel index="04" title="The Mind" />
          </ScrollReveal>

          {/* Signature teaser */}
          <ScrollReveal delay={0.1}>
            <div className="border border-tva-border/30 bg-tva-surface/20 p-8 md:p-14 relative overflow-hidden rounded-sm group hover:border-tva-emerald/30 transition-colors duration-700">
              {/* Background glow */}
              <div className="absolute inset-0 bg-radial-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-tva-emerald/10 group-hover:border-tva-emerald/30 transition-colors" />

              <div className="relative z-10 max-w-3xl">
                <p className="font-mono text-[10px] tracking-[0.3em] text-tva-amber uppercase mb-6">
                  Temporal Input Zone
                </p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-tva-text font-black uppercase tracking-tight mb-4">
                  Write Your{" "}
                  <span className="text-tva-bright text-glow-emerald">Mind</span> Off
                </h2>
                <p className="font-mono text-tva-muted text-xs tracking-widest mb-10">
                  &ldquo;Some thoughts deserve their own timeline.&rdquo;
                </p>

                {/* Fragment previews */}
                <div className="flex flex-col gap-3 mb-10">
                  {SAMPLE_FRAGMENTS.map((f, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-tva-emerald/30 pl-4 py-1 group-hover:border-tva-emerald/60 transition-colors duration-500"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <p className="font-sans text-tva-muted text-sm italic">{f.content}</p>
                      <span className="font-mono text-[9px] tracking-widest text-tva-amber/60 uppercase">
                        — VARIANT {f.variantId}
                      </span>
                    </div>
                  ))}
                </div>

                <GlowButton href="/write-your-mind" variant="emerald">
                  Enter The Mind →
                </GlowButton>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ TIMELINE 05 — THE PERSON ══ */}
        <section>
          <ScrollReveal>
            <SectionLabel index="05" title="The Person Behind The Timeline" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-tva-border/30 bg-tva-surface/20 rounded-sm overflow-hidden group hover:border-tva-emerald/20 transition-colors duration-700">
              {/* Left: Identity data */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-tva-border/30">
                <p className="font-mono text-[9px] tracking-[0.3em] text-tva-amber uppercase mb-8">
                  Identity File · #AW-2026
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "VARIANT", value: "AISHWARYA" },
                    { label: "ROLE", value: "CS STUDENT · BUILDER · WRITER" },
                    { label: "STATUS", value: "ACTIVE" },
                    { label: "BRANCH", value: "α-7" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <span className="font-mono text-[9px] tracking-widest text-tva-muted uppercase">{label}</span>
                      <span className="font-display text-lg text-tva-text tracking-wider">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Short bio */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <p className="font-sans text-tva-muted leading-loose text-base">
                  I am a computer science student who found herself fascinated not just by how
                  software works, but by{" "}
                  <span className="text-tva-text">why systems behave the way they do</span>{" "}
                  under pressure, at scale, and at the edge of their design.
                </p>
                <div className="mt-8">
                  <GlowButton href="/about" variant="amber">
                    View Identity File →
                  </GlowButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </main>
  );
}
