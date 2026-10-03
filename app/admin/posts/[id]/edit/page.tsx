export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePostAction } from "@/actions/post";
import ImageUpload from "@/components/admin/ImageUpload";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const [post, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!post) notFound();

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-text-primary mb-2">Edit Post</h1>
        <p className="text-text-muted font-mono text-xs truncate">{post.slug}</p>
      </div>

      <div className="glass-card p-8 rounded-sm">
        <form action={updatePostAction} className="flex flex-col gap-6">
          <input type="hidden" name="id" value={post.id} />

          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono tracking-widest uppercase text-text-muted">Cover Image</label>
            <ImageUpload defaultValue={post.coverImage} />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-xs font-mono tracking-widest uppercase text-text-muted">Title</label>
            <input
              id="title" name="title" type="text" required
              defaultValue={post.title}
              className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                focus:outline-none focus:border-green-bright/60 focus:shadow-glow-green"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="categoryId" className="text-xs font-mono tracking-widest uppercase text-text-muted">Category</label>
            <select
              id="categoryId" name="categoryId"
              defaultValue={post.categoryId ?? ""}
              className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                focus:outline-none focus:border-green-bright/60 focus:shadow-glow-green appearance-none"
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="excerpt" className="text-xs font-mono tracking-widest uppercase text-text-muted">Excerpt</label>
            <textarea
              id="excerpt" name="excerpt" rows={3}
              defaultValue={post.excerpt}
              className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                focus:outline-none focus:border-green-bright/60 focus:shadow-glow-green resize-y"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="content" className="text-xs font-mono tracking-widest uppercase text-text-muted">Content (Markdown)</label>
            <textarea
              id="content" name="content" rows={18} required
              defaultValue={post.content}
              className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm font-mono
                focus:outline-none focus:border-green-bright/60 focus:shadow-glow-green resize-y"
            />
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-4">
            <a href="/admin/posts" className="btn-secondary py-3 px-6 text-sm">Cancel</a>
            <button type="submit" className="btn-primary py-3 px-8 text-sm">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
