export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";
import { formatDate } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, author: true },
  });

  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("published") === "true";
    await prisma.post.update({ where: { id }, data: { published: !current } });
    revalidatePath("/admin/posts");
  }

  async function deletePost(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/posts");
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-tva-border/50 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-1 rounded-full bg-tva-amber animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-tva-amber uppercase">Event Archive</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black text-tva-text uppercase tracking-tight">
            Timeline Events
          </h1>
          <p className="font-mono text-[10px] text-tva-muted mt-2 tracking-widest uppercase">
            {posts.length} events recorded across all branches
          </p>
        </div>
        <GlowButton href="/admin/posts/new" variant="emerald">
          + Log New Event
        </GlowButton>
      </div>

      {/* Events Table */}
      <div className="border border-tva-border/40 bg-tva-base overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-tva-emerald/40 to-transparent" />
        
        <table className="w-full text-left font-mono text-xs">
          <thead className="border-b border-tva-border/40 bg-tva-surface/50">
            <tr>
              {["Event ID", "Title", "Status", "Branch", "Logged", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 font-normal text-[9px] tracking-[0.2em] uppercase text-tva-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const eventId = `EVT-${post.id.replace(/\D/g, '').substring(0, 3).padEnd(3, '0')}`;
              return (
                <tr key={post.id} className="border-b border-tva-border/20 hover:bg-tva-surface/30 transition-colors group">
                  <td className="px-5 py-4 text-tva-amber tracking-widest">{eventId}</td>
                  <td className="px-5 py-4 text-tva-text font-medium max-w-[200px] truncate group-hover:text-tva-bright transition-colors">
                    {post.title}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 text-[9px] uppercase tracking-widest border ${
                      post.published
                        ? "bg-tva-emerald/10 text-tva-bright border-tva-emerald/40"
                        : "bg-tva-surface text-tva-muted border-tva-border/40"
                    }`}>
                      {post.published ? "ARCHIVED" : "DRAFT"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-tva-muted">{post.category?.name || "—"}</td>
                  <td className="px-5 py-4 text-tva-muted/70">{formatDate(post.createdAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 text-[9px] tracking-widest uppercase">
                      <Link href={`/admin/posts/${post.id}/edit`} className="text-tva-muted hover:text-tva-bright transition-colors">
                        Edit
                      </Link>
                      <span className="text-tva-border">|</span>
                      <form action={togglePublish} className="inline">
                        <input type="hidden" name="id" value={post.id} />
                        <input type="hidden" name="published" value={post.published.toString()} />
                        <button type="submit" className={`transition-colors ${post.published ? "text-tva-amber hover:text-tva-gold" : "text-tva-emerald hover:text-tva-bright"}`}>
                          {post.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <span className="text-tva-border">|</span>
                      <form action={deletePost} className="inline">
                        <input type="hidden" name="id" value={post.id} />
                        <button type="submit" className="text-red-900 hover:text-red-500 transition-colors">
                          Prune
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-tva-muted/50 font-mono text-[10px] tracking-widest uppercase">
                  No events logged. Begin recording.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
