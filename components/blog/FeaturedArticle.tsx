"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface FeaturedArticleProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  imageUrl?: string;
}

export function FeaturedArticle({ id, title, excerpt, date, category, slug, imageUrl }: FeaturedArticleProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      data-article="true"
      className="group block relative w-full overflow-hidden border border-tva-border/50 bg-tva-surface hover:border-tva-emerald/50 transition-colors duration-700 rounded-sm"
    >
      {/* Image area */}
      <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-50 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-75"
          />
        ) : (
          <div className="w-full h-full bg-tva-deep flex items-center justify-center">
            <div className="absolute w-40 h-40 border border-tva-emerald/10 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
            <span className="text-tva-emerald/20 font-display text-5xl">◈</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-tva-surface via-tva-surface/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-tva-surface/60 via-transparent to-transparent hidden md:block" />
      </div>

      {/* Animated border accents */}
      <div className="absolute top-0 left-6 md:left-8 w-[1px] h-0 bg-tva-emerald group-hover:h-full transition-all duration-1000 ease-out opacity-40" />
      <div className="absolute bottom-6 md:bottom-8 left-0 h-[1px] w-0 bg-tva-amber group-hover:w-full transition-all duration-1000 ease-out opacity-25" />

      {/* Content — overlaid on image bottom */}
      <div className="relative md:absolute md:inset-0 md:flex md:flex-col md:justify-end p-5 md:p-10 lg:p-14 md:w-3/4 lg:w-2/3">

        {/* System ID row */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-5 font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-tva-muted uppercase">
          <span className="text-tva-amber">TIMELINE {id}</span>
          <span className="w-1 h-1 rounded-full bg-tva-border group-hover:bg-tva-emerald transition-colors" />
          <span>{category}</span>
          <span className="w-1 h-1 rounded-full bg-tva-border group-hover:bg-tva-emerald transition-colors" />
          <span>{date}</span>
        </div>

        <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl text-tva-text font-bold leading-[1.1] mb-3 md:mb-5 group-hover:text-tva-bright transition-colors duration-500">
          {title}
        </h2>

        <p className="font-sans text-tva-muted text-sm md:text-base mb-5 md:mb-8 line-clamp-2 md:line-clamp-3 leading-relaxed group-hover:translate-x-1 transition-transform duration-500 max-w-2xl">
          {excerpt}
        </p>

        <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs tracking-widest text-tva-text uppercase">
          <span className="relative overflow-hidden">
            READ ARCHIVE
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-tva-bright -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </span>
          <span className="text-tva-emerald group-hover:translate-x-2 transition-transform duration-300">→</span>
        </div>
      </div>

    </Link>
  );
}
