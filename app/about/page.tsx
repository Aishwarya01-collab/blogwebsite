import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, what I build, and why I write.",
};

const stack = [
  "TypeScript", "Next.js", "React", "Node.js",
  "PostgreSQL", "Prisma", "Tailwind CSS",
  "Linux", "Docker", "Git",
];

const interests = [
  { icon: "◎", label: "Artificial Intelligence & LLMs" },
  { icon: "⬡", label: "Systems & Operating Systems" },
  { icon: "⌬", label: "Software Architecture" },
  { icon: "◇", label: "Learning & Mental Models" },
  { icon: "◉", label: "Writing & Communication" },
  { icon: "◫", label: "Side Projects & Shipping" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container-site max-w-4xl">

          {/* ── Identity ── */}
          <div className="mb-20">
            <span className="eyebrow mb-4 block">The person behind the keyboard</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-text-primary mb-6 leading-tight">
              Hey, I'm{" "}
              <span className="text-gradient-green">Admin</span>.
            </h1>
            <div className="flex flex-col md:flex-row gap-12">
              {/* Avatar placeholder */}
              <div className="shrink-0">
                <div className="w-44 h-44 rounded-sm border border-border bg-gradient-to-br from-surface-raised to-surface
                  flex items-center justify-center relative overflow-hidden">
                  <span className="text-green-bright/30 font-display text-7xl">✦</span>
                  <div className="absolute inset-0 bg-radial-green opacity-60" />
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-bright/40" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green-bright/40" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-text-muted text-lg leading-relaxed">
                  I'm a developer who thinks deeply about systems, writes to understand, and builds things because I can't stop.
                </p>
                <p className="text-text-muted leading-relaxed">
                  This blog is my digital universe — a place where code meets thought, where technical depth meets personal voice.
                  I write about what I learn, what I build, and how I think about building better software.
                </p>
                <p className="text-text-muted leading-relaxed">
                  I believe the best developers are also good communicators, good thinkers, and perpetually curious.
                  That's the person I'm trying to become.
                </p>
              </div>
            </div>
          </div>

          <div className="divider mb-16" />

          {/* ── What I do ── */}
          <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <span className="eyebrow mb-4 block">What I build</span>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                Full-stack systems, tools, and experiments
              </h2>
              <p className="text-text-muted leading-relaxed">
                I build full-stack web applications, developer tools, and personal experiments. I care about the whole stack — from database schema to UI animation.
                Good software feels good to use, and I obsess over both the experience and the underlying system.
              </p>
            </div>
            <div>
              <span className="eyebrow mb-4 block">What I write about</span>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                Programming, AI, systems, and thought
              </h2>
              <p className="text-text-muted leading-relaxed">
                I write deeply about the technical things I encounter — and sometimes shallowly about the things I'm still figuring out.
                I try to be honest about uncertainty. The best articles I've ever read admitted what the author didn't know.
              </p>
            </div>
          </div>

          <div className="divider mb-16" />

          {/* ── Stack ── */}
          <div className="mb-20">
            <span className="eyebrow mb-4 block">Technologies</span>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-8">
              My Current Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 border border-border rounded-sm text-sm font-mono text-text-muted
                    hover:border-green-bright hover:text-green-bright hover:shadow-glow-green
                    transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="divider mb-16" />

          {/* ── Interests ── */}
          <div className="mb-20">
            <span className="eyebrow mb-4 block">What excites me</span>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-8">
              Interests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interests.map(({ icon, label }) => (
                <div
                  key={label}
                  className="glass-card rounded-sm px-5 py-4 flex items-center gap-4
                    hover:border-border-bright transition-colors duration-300"
                >
                  <span className="text-green-bright text-lg shrink-0">{icon}</span>
                  <span className="text-text-muted text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="divider mb-16" />

          {/* ── Contact ── */}
          <div>
            <span className="eyebrow mb-4 block">Get in touch</span>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
              Say Hello
            </h2>
            <p className="text-text-muted leading-relaxed mb-8 max-w-lg">
              I'm always happy to talk — about code, ideas, collaborations, or nothing in particular.
              Find me on the internet or just send an email.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "GitHub", icon: "GH", href: "#" },
                { label: "Twitter / X", icon: "TW", href: "#" },
                { label: "LinkedIn", icon: "LI", href: "#" },
                { label: "Email", icon: "✉", href: "mailto:hello@example.com" },
              ].map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="glass-card glow-border rounded-sm px-5 py-3 flex items-center gap-3
                    text-sm text-text-muted hover:text-green-bright
                    transition-all duration-300"
                >
                  <span className="font-mono text-xs text-green-bright">{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
