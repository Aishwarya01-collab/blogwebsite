"use client";

import { motion } from "framer-motion";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { ArchiveCard } from "@/components/blog/ArchiveCard";

const DUMMY_POSTS = [
  {
    id: "0047",
    title: "Building Microservices with Go and gRPC",
    excerpt: "An exploration into building high-performance, resilient microservices architectures using Go and gRPC. We dive deep into protocol buffers, stream processing, and why this tech stack dominates modern backend engineering.",
    category: "SYSTEMS",
    date: "10.03.2026",
    slug: "building-microservices-go",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", // Abstract tech placeholder
  },
  {
    id: "0082",
    title: "The Illusion of AGI",
    excerpt: "Why the pursuit of Artificial General Intelligence might be chasing a ghost. Analyzing the fundamental limits of statistical language models.",
    category: "AI",
    date: "09.15.2026",
    slug: "illusion-of-agi",
  },
  {
    id: "0104",
    title: "Vim: The Mind-Machine Interface",
    excerpt: "Stop using the mouse. How learning Vim motions fundamentally rewrites the way you interface with text editors.",
    category: "PROGRAMMING",
    date: "08.22.2026",
    slug: "vim-mind-machine",
  },
  {
    id: "0117",
    title: "Designing for the Void",
    excerpt: "Why modern UI is trending towards extreme minimalism and brutalist darkness. The psychology behind dark mode.",
    category: "THOUGHTS",
    date: "07.10.2026",
    slug: "designing-for-the-void",
  },
  {
    id: "0121",
    title: "Docker from Scratch",
    excerpt: "Building a lightweight container runtime using pure Linux namespaces and cgroups.",
    category: "SYSTEMS",
    date: "06.05.2026",
    slug: "docker-from-scratch",
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6">
      <div className="container-site max-w-6xl mx-auto">
        
        {/* Header Sequence */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-tva-border/50 pb-8 relative"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-tva-amber" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-tva-amber uppercase">
              Directory Access
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-tva-text font-black tracking-tight uppercase">
            The Archives
          </h1>
          <p className="font-sans text-tva-muted mt-4 max-w-xl">
            A chronological record of systems decoded, software built, and thoughts documented across timelines.
          </p>
          
          {/* Decorative scanner line */}
          <div className="absolute bottom-0 left-0 h-[1px] bg-tva-bright w-0 animate-[scanWidth_3s_ease-in-out_infinite]" />
        </motion.div>

        {/* Featured Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <FeaturedArticle {...DUMMY_POSTS[0]} />
        </motion.section>

        {/* Recent Archives Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs tracking-widest text-tva-text uppercase">
              Recent Files
            </span>
            <span className="h-[1px] bg-tva-border/50 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <ArchiveCard {...DUMMY_POSTS[1]} />
            </div>
            <div>
              <ArchiveCard {...DUMMY_POSTS[2]} variant="compact" />
            </div>
            <div>
              <ArchiveCard {...DUMMY_POSTS[3]} />
            </div>
            <div className="md:col-span-2">
              <ArchiveCard {...DUMMY_POSTS[4]} />
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
