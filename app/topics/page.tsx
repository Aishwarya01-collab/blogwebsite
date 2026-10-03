export const dynamic = "force-dynamic";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Topics",
  description: "Explore thoughts by category.",
};

export default async function TopicsPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { posts: { where: { published: true } } },
      },
    },
  });

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container-site">
          
          <div className="mb-16 md:mb-24 text-center">
            <h1 className="font-display text-5xl md:text-7xl font-black text-text-primary mb-6 uppercase tracking-tight">
              Explore <span className="text-gradient-green">Topics</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Navigate the digital universe by subject. Select a node to view its connected thoughts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((topic) => (
              <Link 
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="group relative overflow-hidden glass-card rounded-sm p-8 border-border hover:border-green-bright/50 transition-all duration-500 hover:-translate-y-1 flex flex-col items-center text-center hover:shadow-glow-green/20"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-radial-green opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Category Icon Placeholder */}
                <div className="w-16 h-16 rounded-sm border border-border bg-surface-raised flex items-center justify-center mb-6 group-hover:border-green-bright/40 transition-colors duration-500 relative z-10">
                  <span className="text-green-bright/60 group-hover:text-green-bright font-display text-2xl transition-colors duration-500">
                    ◈
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-text-primary mb-3 relative z-10">
                  {topic.name}
                </h2>
                
                <p className="text-text-muted text-sm mb-6 relative z-10 group-hover:text-text-secondary transition-colors duration-300">
                  {topic._count.posts} {topic._count.posts === 1 ? 'article' : 'articles'} published.
                </p>

                <div className="mt-auto relative z-10 w-full pt-4 border-t border-border group-hover:border-green-bright/20 transition-colors duration-500">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-text-muted/60 group-hover:text-green-bright transition-colors duration-300">
                    Enter Sector <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center text-text-muted italic">
              No topics created yet.
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
