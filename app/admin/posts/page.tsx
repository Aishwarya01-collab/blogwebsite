export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
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
    await prisma.post.update({
      where: { id },
      data: { published: !current },
    });
    revalidatePath("/admin/posts");
  }

  async function deletePost(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/posts");
  }

  return (
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
            Posts
          </h1>
          <p className="text-text-muted">Manage your articles.</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary py-2.5 px-5 text-xs">
          Create Post
        </Link>
      </div>

      <div className="glass-card rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-text-muted">
          <thead className="bg-surface border-b border-border text-xs uppercase font-mono tracking-widest">
            <tr>
              <th className="px-6 py-4 font-medium text-text-primary">Title</th>
              <th className="px-6 py-4 font-medium text-text-primary">Status</th>
              <th className="px-6 py-4 font-medium text-text-primary">Category</th>
              <th className="px-6 py-4 font-medium text-text-primary">Date</th>
              <th className="px-6 py-4 font-medium text-text-primary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4 text-text-primary font-medium max-w-xs truncate">
                  {post.title}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-widest ${
                    post.published ? "bg-green-loki/20 text-green-bright border border-green-loki/50" : "bg-base text-text-muted border border-border"
                  }`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs">{post.category?.name || "None"}</td>
                <td className="px-6 py-4 font-mono text-xs">{formatDate(post.createdAt)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/posts/${post.id}/edit`} className="text-text-muted hover:text-green-bright transition-colors font-mono text-xs tracking-widest uppercase">
                      Edit
                    </Link>
                    <span className="text-border">|</span>
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={post.id} />
                      <input type="hidden" name="published" value={post.published.toString()} />
                      <button type="submit" className="text-text-muted hover:text-green-bright transition-colors font-mono text-xs tracking-widest uppercase">
                        {post.published ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <span className="text-border">|</span>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="text-red-400 hover:text-red-300 transition-colors font-mono text-xs tracking-widest uppercase">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-text-muted/60">
                  No posts found. Start writing.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
