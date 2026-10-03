export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [
    totalPosts,
    publishedPosts,
    totalUsers,
    totalComments,
    pendingMinds
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.user.count(),
    prisma.comment.count(),
    prisma.mind.count({ where: { approved: false } })
  ]);

  const stats = [
    { label: "Total Posts", value: totalPosts, color: "text-text-primary" },
    { label: "Published", value: publishedPosts, color: "text-green-bright" },
    { label: "Drafts", value: totalPosts - publishedPosts, color: "text-text-muted" },
    { label: "Users", value: totalUsers, color: "text-gold" },
    { label: "Comments", value: totalComments, color: "text-text-primary" },
    { label: "Pending Minds", value: pendingMinds, color: pendingMinds > 0 ? "text-gold" : "text-text-muted" },
  ];

  return (
    <div className="p-8 md:p-12 max-w-5xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
          System Overview
        </h1>
        <p className="text-text-muted">Welcome to the control panel.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-6 rounded-sm flex flex-col gap-2 border-t-2 border-border-bright">
            <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
              {s.label}
            </span>
            <span className={`text-4xl font-display font-bold ${s.color}`}>
              {s.value}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-sm">
          <h2 className="font-display text-xl font-bold text-text-primary mb-4 border-b border-border pb-4">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            <Link href="/admin/posts/new" className="btn-primary py-2.5 px-4 text-xs justify-center">
              Create New Post
            </Link>
            <Link href="/admin/categories" className="btn-secondary py-2.5 px-4 text-xs justify-center">
              Manage Categories
            </Link>
            <Link href="/admin/minds" className="btn-secondary py-2.5 px-4 text-xs justify-center">
              Review Mind Submissions
            </Link>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-sm">
           <h2 className="font-display text-xl font-bold text-text-primary mb-4 border-b border-border pb-4">
            Recent Activity
          </h2>
          <p className="text-text-muted text-sm italic">
            Activity stream will appear here...
          </p>
        </div>
      </div>
    </div>
  );
}
