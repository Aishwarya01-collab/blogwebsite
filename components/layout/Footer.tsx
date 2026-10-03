import Link from "next/link";

const footerLinks = {
  Navigate: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/topics", label: "Topics" },
    { href: "/about", label: "About" },
  ],
  Connect: [
    { href: "/write-your-mind", label: "Write Your Mind Off" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border mt-20">
      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-green-loki/60 to-transparent"
      />

      <div className="container-site py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-lg font-semibold tracking-widest text-text-primary uppercase">
                My<span className="text-green-bright">.</span>World
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              A personal digital space exploring code, systems, AI, and the beautiful chaos of building things.
            </p>
            {/* Social icons (placeholder structure) */}
            <div className="flex gap-3 mt-5">
              {[
                { label: "GitHub", icon: "GH" },
                { label: "Twitter", icon: "TW" },
                { label: "LinkedIn", icon: "LI" },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-sm border border-border flex items-center justify-center text-xs font-mono text-text-muted
                    hover:border-green-bright hover:text-green-bright hover:shadow-glow-green
                    transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-text-primary mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-text-muted hover:text-green-bright transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="divider mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-text-muted text-xs font-mono">
          <span>© {year} My Digital World. All rights reserved.</span>
          <span className="text-green-bright/60 tracking-widest">
            BUILT WITH NEXT.JS + TAILWIND
          </span>
        </div>
      </div>
    </footer>
  );
}
