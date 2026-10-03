export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { TimelineLink } from "@/components/ui/TimelineLink";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { LikeButton } from "@/components/blog/LikeButton";
import { CommentForm } from "@/components/blog/CommentForm";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { deleteCommentAction } from "@/actions/interactions";
import { GlowButton } from "@/components/ui/GlowButton";

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

  // Generate an EVT number based on post ID (first 3 chars of uuid as a number)
  const eventId = `EVT-${post.id.replace(/\D/g, '').substring(0, 3).padEnd(3, '0')}`;
  const timelineId = `T-${post.categoryId?.substring(0, 2).toUpperCase() || 'XX'}`;

  return (
    <main className="pb-24 min-h-screen relative z-10">
      <article className="container-site max-w-4xl mx-auto px-4 md:px-8">

        {/* ── Top Navigation / Breadcrumb ─────────────────────────────── */}
        <div className="flex items-center gap-4 mb-10 md:mb-16 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-tva-muted border-b border-tva-border/30 pb-4">
          <TimelineLink href="/blog" className="hover:text-tva-text transition-colors flex items-center gap-2">
            <span className="text-tva-emerald">←</span> RETURN TO TIMELINE
          </TimelineLink>
          <span className="text-tva-border">|</span>
          <span className="text-tva-amber">{timelineId}</span>
          <span className="text-tva-border">|</span>
          {post.category ? (
            <TimelineLink href={`/topics/${post.category.slug}`} className="hover:text-tva-bright transition-colors text-glow-emerald">
              {post.category.name}
            </TimelineLink>
          ) : <span>UNCLASSIFIED</span>}
          <span className="text-tva-border">|</span>
          <span className="text-tva-bright animate-pulse">{eventId}</span>
        </div>

        {/* ── Header ─────────────────────────────────── */}
        <header className="mb-12 md:mb-20">
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-tva-text uppercase tracking-tight mb-8 leading-[0.9]">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-y border-tva-border/30 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-tva-emerald/40 bg-tva-surface/50 flex items-center justify-center font-display text-xl text-tva-emerald shrink-0">
                {post.author.name[0].toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest font-mono text-tva-amber uppercase">
                  Logged By: VARIANT {post.author.id.substring(0, 6).toUpperCase()}
                </span>
                <span className="text-tva-text font-bold uppercase">{post.author.name}</span>
                <span className="text-tva-muted/60 text-[10px] font-mono tracking-widest uppercase mt-1">
                  {formatDate(post.createdAt)} · {Math.ceil(post.content.split(/\s+/).length / 200)} min scan
                </span>
              </div>
            </div>

            {/* Like button (Quantum Connection) */}
            {currentUser ? (
              <LikeButton postId={post.id} likeCount={likeCount} isLiked={isLiked} />
            ) : (
              <GlowButton href="/login" variant="ghost" className="border border-tva-border/30">
                <span className="w-1.5 h-1.5 rounded-full bg-tva-amber/40 animate-pulse" />
                <span>{likeCount} Quantum Links</span>
              </GlowButton>
            )}
          </div>
        </header>

        {/* ── Cover image ────────────────────────────── */}
        {post.coverImage && (
          <div className="mb-16 rounded-sm overflow-hidden border border-tva-border/30 aspect-video md:aspect-[21/9] relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-tva-base via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* ── Article content ────────────────────────── */}
        <div className="mb-24 prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:text-tva-text prose-p:text-tva-muted prose-p:leading-loose prose-a:text-tva-emerald prose-a:no-underline hover:prose-a:text-tva-bright prose-strong:text-tva-bright">
          <MarkdownContent content={post.content} />
        </div>

        {/* ── Bottom Navigation ──────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between border-y border-tva-border/30 py-8 mb-24 gap-4">
           <span className="font-mono text-[9px] tracking-[0.3em] text-tva-muted uppercase">
             END OF EVENT LOG {eventId}
           </span>
           <TimelineLink href="/blog" className="font-mono text-[10px] tracking-widest text-tva-bright uppercase flex items-center gap-2 hover:text-glow-emerald transition-all">
             Return to Main Timeline →
           </TimelineLink>
        </div>

        {/* ── Comments (Cross-Variant Communications) ── */}
        <section className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-tva-amber animate-pulse" />
            <h2 className="font-mono text-[11px] tracking-[0.3em] uppercase text-tva-amber">
              Cross-Variant Communications ({post.comments.length})
            </h2>
          </div>

          {/* Comment list */}
          {post.comments.length > 0 ? (
            <div className="flex flex-col gap-6 mb-16 relative">
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-tva-border/50 to-transparent pointer-events-none" />
              
              {post.comments.map((c) => (
                <div key={c.id} className="relative pl-16">
                  <div className="absolute left-[21px] top-4 w-2 h-2 rounded-full bg-tva-base border border-tva-border" />
                  
                  <div className="border border-tva-border/30 bg-tva-surface/30 p-6 rounded-sm relative group hover:border-tva-emerald/30 transition-colors">
                    <div className="flex items-center justify-between mb-4 border-b border-tva-border/20 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-tva-text font-bold text-sm uppercase">{c.user.name}</span>
                        <span className="text-tva-muted/50 font-mono text-[9px] tracking-widest">
                          {formatDate(c.createdAt)}
                        </span>
                      </div>
                      
                      {/* Admin delete */}
                      {currentUser?.role === "ADMIN" && (
                        <form action={deleteCommentAction}>
                          <input type="hidden" name="id"   value={c.id} />
                          <input type="hidden" name="slug" value={post.slug} />
                          <button type="submit"
                            className="text-red-900/60 hover:text-red-500 font-mono text-[9px] uppercase tracking-widest transition-colors opacity-0 group-hover:opacity-100">
                            PRUNE
                          </button>
                        </form>
                      )}
                    </div>
                    <p className="text-tva-muted text-sm leading-relaxed">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-tva-muted/50 font-mono text-[10px] tracking-widest uppercase italic mb-16 pl-4 border-l border-tva-border/30">
              No variant communications detected on this frequency.
            </p>
          )}

          {/* Comment form */}
          {currentUser ? (
            <div className="border border-tva-border/30 bg-tva-surface/20 p-8 rounded-sm">
              <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-tva-muted mb-6">
                Transmit Communication
              </h3>
              <CommentForm postId={post.id} slug={post.slug} />
            </div>
          ) : (
            <div className="border border-tva-border/30 bg-tva-surface/20 p-10 rounded-sm text-center flex flex-col items-center gap-4">
              <p className="text-tva-muted font-mono text-[10px] tracking-[0.2em] uppercase">
                Temporal Identity Required to Transmit
              </p>
              <GlowButton href="/login" variant="emerald">Authenticate Variant</GlowButton>
            </div>
          )}
        </section>

      </article>
    </main>
  );
}
