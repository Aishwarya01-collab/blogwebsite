export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import { prisma } from "@/lib/prisma";

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      posts: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
        include: { category: true },
      },
    },
  });

  if (!category) {
    notFound();
  }

  const posts = category.posts;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container-site">
          
          <div className="mb-8">
            <Link href="/topics" className="inline-flex items-center gap-2 text-text-muted hover:text-green-bright transition-colors font-mono text-xs uppercase tracking-widest mb-6">
              <span aria-hidden="true">←</span> Back to Topics
            </Link>
          </div>

          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-10">
            <div>
              <span className="eyebrow mb-4 block">Sector Data</span>
              <h1 className="font-display text-5xl md:text-7xl font-black text-text-primary uppercase tracking-tight">
                {category.name}
              </h1>
            </div>
            <div className="glass-card px-6 py-4 rounded-sm border-t-2 border-green-bright/40">
              <div className="text-[10px] font-mono tracking-widest uppercase text-text-muted mb-1">
                Total Entries
              </div>
              <div className="font-display text-3xl font-bold text-text-primary">
                {posts.length}
              </div>
            </div>
          </div>

          <div>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    createdAt={post.createdAt}
                    slug={post.slug}
                    category={post.category?.name || "Uncategorized"}
                    coverImage={post.coverImage}
                    content={post.content}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center rounded-sm">
                <span className="text-green-bright/40 text-4xl block mb-4">◈</span>
                <p className="text-text-muted italic">No entries logged in this sector yet.</p>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
