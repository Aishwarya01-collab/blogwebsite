export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { createPostAction } from "@/actions/post";
import ImageUpload from "@/components/admin/ImageUpload";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
          New Post
        </h1>
        <p className="text-text-muted">Draft a new article.</p>
      </div>

      <div className="glass-card p-8 rounded-sm">
        <form action={createPostAction} className="flex flex-col gap-6">
          
          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono tracking-widest uppercase text-text-muted">
              Cover Image
            </label>
            <ImageUpload />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-xs font-mono tracking-widest uppercase text-text-muted">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. How I think about software architecture"
              className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                placeholder:text-text-muted/40 focus:outline-none focus:border-green-bright/60 focus:shadow-glow-green"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="categoryId" className="text-xs font-mono tracking-widest uppercase text-text-muted">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                focus:outline-none focus:border-green-bright/60 focus:shadow-glow-green appearance-none"
            >
              <option value="">Select a category...</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="excerpt" className="text-xs font-mono tracking-widest uppercase text-text-muted">
              Excerpt (Short Description)
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              required
              placeholder="A brief summary of the article..."
              className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                placeholder:text-text-muted/40 focus:outline-none focus:border-green-bright/60 focus:shadow-glow-green resize-y"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="content" className="text-xs font-mono tracking-widest uppercase text-text-muted">
              Content (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              rows={15}
              required
              placeholder="Write your thoughts..."
              className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm font-mono
                placeholder:text-text-muted/40 focus:outline-none focus:border-green-bright/60 focus:shadow-glow-green resize-y"
            />
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button type="submit" className="btn-primary py-3 px-8 text-sm">
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
