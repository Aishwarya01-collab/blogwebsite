"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";

import type { SessionData } from "@/lib/session";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/topics", label: "Topics" },
  { href: "/write-your-mind", label: "Write Your Mind" },
  { href: "/about", label: "About" },
];

interface NavbarClientProps {
  user?: SessionData["user"];
}

export default function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-base/90 backdrop-blur-md border-b border-border shadow-[0_1px_20px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      )}
    >
      <nav className="container-site h-16 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative w-8 h-8">
            {/* Animated logo mark */}
            <div className="absolute inset-0 rounded-sm bg-green-loki/20 border border-green-loki/50 group-hover:border-green-bright/70 transition-colors duration-300" />
            <div className="absolute inset-1.5 rounded-sm bg-green-bright/80 group-hover:bg-green-bright transition-colors duration-300" />
            <div
              className="absolute inset-0 rounded-sm border border-green-bright/0 group-hover:border-green-bright/40 transition-all duration-300"
              style={{ boxShadow: "0 0 0 0 transparent" }}
            />
          </div>
          <span className="font-display text-sm font-semibold tracking-widest text-text-primary group-hover:text-green-bright transition-colors duration-300 uppercase">
            My<span className="text-green-bright">.</span>World
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "relative px-3 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-300",
                    "hover:text-green-bright",
                    isActive ? "text-green-bright" : "text-text-muted"
                  )}
                >
                  {label}
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-px bg-green-bright rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Auth buttons (desktop) ── */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-gold text-xs font-mono tracking-widest uppercase hover:brightness-110 mr-3">
                  Admin Panel
                </Link>
              )}
              <span className="text-text-muted text-xs mr-2">{user.name}</span>
              <form action={logoutAction}>
                <button type="submit" className="btn-secondary py-2 px-4 text-xs">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary py-2 px-4 text-xs">
                Login
              </Link>
              <Link href="/register" className="btn-primary py-2 px-4 text-xs">
                Register
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 focus-visible:outline-none group"
        >
          <span
            className={cn(
              "w-5 h-px bg-text-primary transition-all duration-300 origin-center",
              menuOpen && "rotate-45 translate-y-[3.5px]"
            )}
          />
          <span
            className={cn(
              "w-5 h-px bg-text-primary transition-all duration-300",
              menuOpen && "opacity-0 scale-x-0"
            )}
          />
          <span
            className={cn(
              "w-5 h-px bg-text-primary transition-all duration-300 origin-center",
              menuOpen && "-rotate-45 -translate-y-[3.5px]"
            )}
          />
        </button>
      </nav>

      {/* ── Mobile menu drawer ── */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-base/95 backdrop-blur-md border-b border-border px-4 py-6 flex flex-col gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-3 text-sm font-medium tracking-widest uppercase border-b border-border/40",
                  "transition-colors duration-200 hover:text-green-bright",
                  isActive ? "text-green-bright" : "text-text-muted"
                )}
              >
                {label}
              </Link>
            );
          })}
          <div className="flex flex-col gap-2 mt-4">
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link href="/admin" className="btn-gold py-2 px-4 text-xs text-center">
                    Admin Panel
                  </Link>
                )}
                <form action={logoutAction} className="flex">
                  <button type="submit" className="btn-secondary py-2 px-4 text-xs flex-1">
                    Logout ({user.name})
                  </button>
                </form>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="btn-secondary py-2 px-4 text-xs flex-1 text-center">
                  Login
                </Link>
                <Link href="/register" className="btn-primary py-2 px-4 text-xs flex-1 text-center">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
