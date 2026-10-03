import Link from "next/link";
import Image from "next/image";
import { formatDate, readingTime } from "@/lib/utils";

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  category?: string | null;
  createdAt: Date | string;
  content?: string;
  variant?: "featured" | "default";
}

/* ============================================================
   FEATURED CARD — large premium game card
   ============================================================ */
export function FeaturedCard({
  title,
  slug,
  excerpt,
  coverImage,
  category,
  createdAt,
  content = "",
}: PostCardProps) {
  const time = readingTime(content || excerpt);
  const date = formatDate(createdAt);

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block relative overflow-hidden rounded-sm border border-border
        bg-card-gradient transition-all duration-500
        hover:border-border-bright hover:shadow-card-hover hover:-translate-y-1"
      aria-label={`Read featured article: ${title}`}
    >
      {/* Glow overlay on hover */}
      <div className="absolute inset-0 bg-radial-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      <div className="flex flex-col lg:flex-row">
        {/* Cover image */}
        <div className="relative lg:w-[55%] aspect-[16/9] lg:aspect-auto overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          ) : (
            /* Placeholder gradient when no image */
            <div className="w-full h-full min-h-[240px] bg-gradient-to-br from-surface-raised to-surface flex items-center justify-center">
              <div className="w-16 h-16 rounded-sm bg-green-loki/20 border border-green-loki/30 flex items-center justify-center">
                <span className="text-green-bright/60 font-display text-2xl">✦</span>
              </div>
            </div>
          )}
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/60 hidden lg:block" />

          {/* FEATURED badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/90 text-base text-xs font-semibold tracking-widest uppercase rounded-sm">
              ✦ Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center p-6 lg:p-10 lg:w-[45%]">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            {category && (
              <span className="eyebrow">{category}</span>
            )}
            <span className="text-text-muted/40 text-xs">·</span>
            <span className="text-text-muted text-xs font-mono">{time}</span>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight
            group-hover:text-green-bright transition-colors duration-300">
            {title}
          </h2>

          <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-text-muted/60 text-xs font-mono">{date}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-green-bright
              flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
              Read Article <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   DEFAULT CARD — game UI panel style
   ============================================================ */
export default function PostCard({
  title,
  slug,
  excerpt,
  coverImage,
  category,
  createdAt,
  content = "",
}: PostCardProps) {
  const time = readingTime(content || excerpt);
  const date = formatDate(createdAt);

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border
        bg-card-gradient transition-all duration-400 hover:border-border-bright
        hover:shadow-card-hover hover:-translate-y-1.5 h-full"
      aria-label={`Read article: ${title}`}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface flex items-center justify-center">
            <span className="text-green-bright/30 font-display text-4xl">✦</span>
          </div>
        )}
        {/* Top gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />

        {/* Hover glow overlay */}
        <div className="absolute inset-0 bg-green-loki/0 group-hover:bg-green-loki/10 transition-colors duration-400" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3">
          {category && (
            <span className="text-green-bright text-[10px] font-mono tracking-widest uppercase">
              {category}
            </span>
          )}
          <span className="text-border text-xs">|</span>
          <span className="text-text-muted text-[10px] font-mono">{time}</span>
        </div>

        <h3 className="font-display text-base font-semibold text-text-primary mb-2.5 leading-snug
          group-hover:text-green-bright transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
          <span className="text-text-muted/60 text-[10px] font-mono">{date}</span>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-green-bright
            flex items-center gap-1 group-hover:gap-2.5 transition-all duration-300">
            Read <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
