export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { deleteCommentAction } from "@/actions/interactions";
import { formatDate } from "@/lib/utils";

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } },
      post: { select: { title: true, slug: true } },
    },
  });

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-text-primary mb-2">Comments</h1>
        <p className="text-text-muted">Moderate all comments across the blog.</p>
      </div>

      <div className="glass-card rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-text-muted">
          <thead className="bg-surface border-b border-border text-xs uppercase font-mono tracking-widest">
            <tr>
              <th className="px-6 py-4 font-medium text-text-primary">Comment</th>
              <th className="px-6 py-4 font-medium text-text-primary">Author</th>
              <th className="px-6 py-4 font-medium text-text-primary">Post</th>
              <th className="px-6 py-4 font-medium text-text-primary">Date</th>
              <th className="px-6 py-4 font-medium text-text-primary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {comments.map((c) => (
              <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4 text-text-primary max-w-xs">
                  <span className="line-clamp-2 text-sm">{c.content}</span>
                </td>
                <td className="px-6 py-4 font-mono text-xs">{c.user.name}</td>
                <td className="px-6 py-4 font-mono text-xs max-w-[160px] truncate">{c.post.title}</td>
                <td className="px-6 py-4 font-mono text-xs">{formatDate(c.createdAt)}</td>
                <td className="px-6 py-4 text-right">
                  <form action={deleteCommentAction}>
                    <input type="hidden" name="id"   value={c.id} />
                    <input type="hidden" name="slug" value={c.post.slug} />
                    <button type="submit"
                      className="text-red-400 hover:text-red-300 font-mono text-xs tracking-widest uppercase transition-colors">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-text-muted/60">
                  No comments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
