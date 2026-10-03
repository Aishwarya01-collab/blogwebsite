export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { LikeButton } from "@/components/blog/LikeButton";
import { CommentForm } from "@/components/blog/CommentForm";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { deleteCommentAction } from "@/actions/interactions";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const session = await getSession();
  const currentUser = session.user ?? null;

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      author: true,
      comments: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { id: true, name: true } } },
      },
      likes: { select: { userId: true } },
    },
  });

  if (!post || !post.published) notFound();

  const likeCount = post.likes.length;
  const isLiked   = currentUser ? post.likes.some((l) => l.userId === currentUser.id) : false;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <article className="container-site max-w-3xl">

          {/* ── Breadcrumb ─────────────────────────────── */}
          <div className="flex items-center gap-3 mb-8 font-mono text-xs uppercase tracking-widest text-text-muted">
            <Link href="/blog" className="hover:text-green-bright transition-colors">Blog</Link>
            <span className="text-border-bright">/</span>
            {post.category ? (
              <Link href={`/topics/${post.category.slug}`} className="hover:text-green-bright transition-colors">
                {post.category.name}
              </Link>
            ) : <span>Uncategorized</span>}
          </div>

          {/* ── Header ─────────────────────────────────── */}
          <header className="mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-border py-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-sm bg-surface-raised flex items-center justify-center
                  font-display text-green-bright border border-border shrink-0">
                  {post.author.name[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-text-primary text-sm font-medium">{post.author.name}</div>
                  <div className="text-text-muted text-xs font-mono">
                    {formatDate(post.createdAt)} &nbsp;·&nbsp; {Math.ceil(post.content.split(/\s+/).length / 200)} min read
                  </div>
                </div>
              </div>

              {/* Like button */}
              {currentUser ? (
                <LikeButton postId={post.id} likeCount={likeCount} isLiked={isLiked} />
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-sm border border-border
                    text-text-muted font-mono text-sm hover:border-gold/40 hover:text-gold transition-all"
                >
                  <span>✧</span>
                  <span>{likeCount} likes</span>
                </Link>
              )}
            </div>
          </header>

          {/* ── Cover image ────────────────────────────── */}
          {post.coverImage && (
            <div className="mb-10 rounded-sm overflow-hidden border border-border aspect-[16/9] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* ── Article content ────────────────────────── */}
          <div className="mb-16">
            <MarkdownContent content={post.content} />
          </div>

          <div className="divider mb-12" />

          {/* ── Comments ───────────────────────────────── */}
          <section>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-8">
              Comments{" "}
              <span className="text-text-muted font-mono text-base font-normal">
                ({post.comments.length})
              </span>
            </h2>

            {/* Comment list */}
            {post.comments.length > 0 ? (
              <div className="flex flex-col gap-5 mb-10">
                {post.comments.map((c) => (
                  <div key={c.id} className="glass-card p-5 rounded-sm relative group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-sm bg-surface-raised border border-border flex items-center justify-center
                          font-mono text-xs text-green-bright">
                          {c.user.name[0].toUpperCase()}
                        </div>
                        <span className="text-text-primary text-sm font-medium">{c.user.name}</span>
                        <span className="text-text-muted/50 font-mono text-[10px]">
                          {formatDate(c.createdAt)}
                        </span>
                      </div>
                      {/* Admin delete */}
                      {currentUser?.role === "ADMIN" && (
                        <form action={deleteCommentAction}>
                          <input type="hidden" name="id"   value={c.id} />
                          <input type="hidden" name="slug" value={post.slug} />
                          <button type="submit"
                            className="text-red-400/60 hover:text-red-400 font-mono text-[10px] uppercase tracking-widest transition-colors opacity-0 group-hover:opacity-100">
                            Delete
                          </button>
                        </form>
                      )}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{c.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted italic mb-10">No comments yet. Be the first.</p>
            )}

            {/* Comment form */}
            {currentUser ? (
              <div className="glass-card p-6 rounded-sm">
                <h3 className="text-sm font-mono tracking-widest uppercase text-text-muted mb-4">
                  Leave a comment
                </h3>
                <CommentForm postId={post.id} slug={post.slug} />
              </div>
            ) : (
              <div className="glass-card p-6 rounded-sm text-center">
                <p className="text-text-muted mb-4 text-sm">
                  <Link href="/login" className="text-green-bright hover:underline">Sign in</Link>
                  {" "}to join the conversation.
                </p>
              </div>
            )}
          </section>

        </article>
      </main>
      <Footer />
    </>
  );
}
