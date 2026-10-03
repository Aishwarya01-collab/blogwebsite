"use client";

import { TimelineLink } from "@/components/ui/TimelineLink";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/ui/GlowButton";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/blog", label: "ARCHIVES" },
  { href: "/topics", label: "TIMELINES" },
  { href: "/write-your-mind", label: "MIND" },
  { href: "/about", label: "ABOUT" },
];

export default function NavbarClient() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 font-mono",
          scrolled
            ? "bg-tva-base/85 backdrop-blur-md border-b border-tva-border/50 shadow-[0_0_20px_rgba(29,107,69,0.08)] py-3"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <nav className="container-site max-w-6xl mx-auto px-4 flex items-center justify-between">

          {/* ── Logo ── */}
          <TimelineLink href="/" className="group flex items-center gap-2.5 z-10">
            <div className="relative w-7 h-7 md:w-8 md:h-8 flex items-center justify-center border border-tva-border group-hover:border-tva-emerald transition-colors duration-500 rounded-sm overflow-hidden">
              <span className="text-tva-emerald font-display text-base md:text-lg z-10">◈</span>
              <div className="absolute inset-0 bg-tva-emerald/0 group-hover:bg-tva-emerald/10 transition-colors duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] tracking-widest text-tva-muted uppercase leading-none">
                Identity File
              </span>
              <span className="text-[11px] font-bold tracking-[0.15em] text-tva-text group-hover:text-tva-bright transition-colors duration-300 uppercase">
                Aishwarya
              </span>
            </div>
          </TimelineLink>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href} className="relative group">
                  <TimelineLink
                    href={href}
                    className={cn(
                      "text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 flex flex-col items-center gap-1",
                      isActive ? "text-tva-bright" : "text-tva-muted hover:text-tva-text"
                    )}
                  >
                    <span>{label}</span>
                    <div className="h-[1px] bg-tva-border w-full relative overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-0 left-0 h-full w-full bg-tva-bright -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </div>
                    {isActive && (
                      <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-tva-bright shadow-[0_0_8px_rgba(59,229,139,0.8)]" />
                    )}
                  </TimelineLink>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop Action ── */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-tva-bright animate-pulse shadow-[0_0_5px_rgba(59,229,139,0.6)]" />
              <span className="text-[9px] text-tva-muted tracking-widest">STABLE</span>
            </div>
            <GlowButton href="/login" variant="amber">[ENTER]</GlowButton>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden relative z-10 flex flex-col items-center justify-center w-9 h-9 gap-1.5"
          >
            <span className={cn(
              "w-5 h-[1px] bg-tva-text transition-all duration-300 origin-center",
              menuOpen && "rotate-45 translate-y-[7px]"
            )} />
            <span className={cn(
              "w-5 h-[1px] bg-tva-text transition-all duration-300",
              menuOpen && "opacity-0 scale-x-0"
            )} />
            <span className={cn(
              "w-5 h-[1px] bg-tva-text transition-all duration-300 origin-center",
              menuOpen && "-rotate-45 -translate-y-[7px]"
            )} />
          </button>

        </nav>
      </header>

      {/* ── Mobile Full-Screen Drawer ── */}
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-in-out flex flex-col",
        "bg-tva-base/95 backdrop-blur-xl border-r border-tva-border/30",
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Decorative top line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-tva-emerald/40 to-transparent" />

        <div className="flex flex-col justify-center flex-1 px-8 py-24">
          {/* Status badge */}
          <div className="flex items-center gap-2 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-tva-bright animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-tva-muted uppercase">
              Navigation Panel
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map(({ href, label }, i) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <TimelineLink
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "group flex items-center gap-4 py-5 border-b border-tva-border/20 transition-colors duration-300",
                    isActive ? "text-tva-bright" : "text-tva-muted hover:text-tva-text"
                  )}
                  style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
                >
                  <span className="font-mono text-[10px] text-tva-muted/50">0{i + 1}</span>
                  <span className="font-display text-2xl tracking-wider uppercase">{label}</span>
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-tva-bright" />}
                </TimelineLink>
              );
            })}
          </nav>

          <div className="mt-12 flex gap-4">
            <GlowButton href="/login" variant="amber">[ENTER]</GlowButton>
          </div>
        </div>

        {/* Footer inside drawer */}
        <div className="px-8 pb-8 font-mono text-[9px] tracking-widest text-tva-muted/40 uppercase">
          Branch α-7 · All Timelines Stable
        </div>
      </div>
    </>
  );
}
