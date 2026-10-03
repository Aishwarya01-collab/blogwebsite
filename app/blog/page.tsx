import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FeaturedCard } from "@/components/blog/PostCard";
import PostCard from "@/components/blog/PostCard";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and deep dives.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="container-site">
          
          <div className="mb-16 md:mb-24">
            <h1 className="font-display text-5xl md:text-7xl font-black text-text-primary mb-6 uppercase tracking-tight">
              The <span className="text-gradient-green">Archive</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Chronicles of systems, code, and thought. A complete index of everything I've written.
            </p>
          </div>

          {featuredPost && (
            <div className="mb-20">
              <span className="eyebrow mb-6 block">Latest Transmission</span>
              <FeaturedCard
                title={featuredPost.title}
                excerpt={featuredPost.excerpt}
                createdAt={featuredPost.createdAt}
                slug={featuredPost.slug}
                category={featuredPost.category?.name || "Uncategorized"}
                coverImage={featuredPost.coverImage}
                content={featuredPost.content}
              />
            </div>
          )}

          <div className="divider mb-20" />

          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="eyebrow">All Entries</span>
              <span className="text-text-muted font-mono text-xs">{posts.length} entries</span>
            </div>

            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
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
              <p className="text-text-muted italic">More entries coming soon...</p>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
