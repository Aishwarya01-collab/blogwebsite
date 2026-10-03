import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TopicsGrid from "@/components/home/TopicsGrid";
import WriteYourMind from "@/components/home/WriteYourMind";
import { FeaturedCard } from "@/components/blog/PostCard";
import PostCard from "@/components/blog/PostCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Digital World — Thoughts, Systems & Chaos",
  description:
    "A personal blog exploring programming, AI, systems, and the beautiful chaos of building things.",
};

/* ============================================================
   SAMPLE DATA — replaced by real DB queries in Phase 4
   ============================================================ */
const featuredPost = {
  title: "How I Think About Software Architecture",
  slug: "how-i-think-about-software-architecture",
  excerpt:
    "Architecture is not about patterns or diagrams. It's about making decisions that let you move fast without breaking things. Here's how I approach it.",
  coverImage: null,
  category: "Systems",
  createdAt: new Date("2026-09-30"),
  content:
    "Architecture is not about patterns or diagrams. It is about making decisions that let you move fast without breaking things. Here is how I approach it when starting a new system...",
};

const latestPosts = [
  {
    title: "Understanding Async JavaScript From the Ground Up",
    slug: "understanding-async-javascript",
    excerpt:
      "Callbacks, promises, async/await — and why understanding the event loop changes everything.",
    coverImage: null,
    category: "Programming",
    createdAt: new Date("2026-10-01"),
    content: "placeholder content for reading time calculation purposes",
  },
  {
    title: "Why I Switched From REST to tRPC",
    slug: "rest-to-trpc",
    excerpt:
      "Type safety end-to-end sounds like marketing speak until you've worked on a real project with it.",
    coverImage: null,
    category: "Technology",
    createdAt: new Date("2026-09-28"),
    content: "placeholder content for reading time calculation purposes",
  },
  {
    title: "The Quiet Power of Writing to Think",
    slug: "writing-to-think",
    excerpt:
      "Before I write code I write prose. It's the most underrated tool in a developer's toolkit.",
    coverImage: null,
    category: "Thoughts",
    createdAt: new Date("2026-09-22"),
    content: "placeholder content for reading time calculation purposes",
  },
  {
    title: "Building a Local LLM Workflow That Actually Saves Time",
    slug: "local-llm-workflow",
    excerpt:
      "Running models locally isn't just for privacy nerds. Here's my actual workflow and what surprised me.",
    coverImage: null,
    category: "AI",
    createdAt: new Date("2026-09-18"),
    content: "placeholder content for reading time calculation purposes",
  },
  {
    title: "Linux for Developers: Where to Actually Start",
    slug: "linux-for-developers",
    excerpt:
      "Not another 'install Ubuntu' guide. This is about building a mental model that makes Linux intuitive.",
    coverImage: null,
    category: "Systems",
    createdAt: new Date("2026-09-12"),
    content: "placeholder content for reading time calculation purposes",
  },
  {
    title: "Lessons From Shipping My First Side Project",
    slug: "first-side-project-lessons",
    excerpt:
      "I spent three months building. Then one week shipping. The second week taught me more than the first three months.",
    coverImage: null,
    category: "Projects",
    createdAt: new Date("2026-09-05"),
    content: "placeholder content for reading time calculation purposes",
  },
];

/* ============================================================
   HOME PAGE
   ============================================================ */
export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <Hero />

        {/* ── Featured Article ── */}
        <section className="section">
          <div className="container-site">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="eyebrow mb-3 block">Don't miss this one</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
                  Featured Article
                </h2>
              </div>
            </div>
            <FeaturedCard {...featuredPost} />
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="container-site">
          <div className="divider" />
        </div>

        {/* ── Latest Articles ── */}
        <section className="section">
          <div className="container-site">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="eyebrow mb-3 block">Fresh from the lab</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
                  Latest Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-semibold tracking-widest uppercase text-green-bright
                  flex items-center gap-2 hover:gap-4 transition-all duration-300 shrink-0"
              >
                View All <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} {...post} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="container-site">
          <div className="divider" />
        </div>

        {/* ── Topics ── */}
        <TopicsGrid />

        {/* ── Divider ── */}
        <div className="container-site">
          <div className="divider" />
        </div>

        {/* ── Write Your Mind Off ── */}
        <WriteYourMind />
      </main>

      <Footer />
    </>
  );
}
