import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { TimelineLink } from "@/components/ui/TimelineLink";


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  if (!session.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-tva-base text-tva-text relative font-mono selection:bg-tva-emerald/30">
      
      {/* Optional: we can keep a subtle version of the atmosphere here */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-tva-emerald/5 to-transparent" />
      </div>

      {/* ── TVA Sidebar ── */}
      <aside className="w-full md:w-72 border-r border-tva-border/40 bg-tva-surface/80 backdrop-blur-md shrink-0 flex flex-col h-auto md:min-h-screen relative z-10">
        
        {/* Top Logo / Identity */}
        <div className="p-6 border-b border-tva-border/40 bg-tva-base/50">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center border border-tva-emerald/40 bg-tva-emerald/10 group-hover:bg-tva-emerald/20 transition-colors">
              <span className="text-tva-bright">◈</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] tracking-widest text-tva-amber uppercase">
                Temporal Authority
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-tva-text group-hover:text-tva-bright transition-colors uppercase">
                Control Room
              </span>
            </div>
          </Link>
          
          <div className="mt-6 flex items-center gap-2 px-3 py-2 border border-tva-border/50 bg-tva-surface">
            <span className="w-1.5 h-1.5 rounded-full bg-tva-bright animate-pulse" />
            <span className="text-[9px] tracking-widest text-tva-muted uppercase truncate">
              ADMIN: {session.user.name}
            </span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          <div className="text-[9px] tracking-widest text-tva-muted uppercase mb-2 pl-3">
            System Modules
          </div>

          {[
            { label: "Timeline Control", href: "/admin", icon: "⬡" },
            { label: "Archive Events", href: "/admin/posts", icon: "⌬" },
            { label: "Log New Event", href: "/admin/posts/new", icon: "◈" },
            { label: "Branch Categories", href: "/admin/categories", icon: "◇" },
            { label: "Variant Comm", href: "/admin/comments", icon: "◉" },
            { label: "Mind Fragments", href: "/admin/minds", icon: "◎" },
          ].map((item) => (
            <TimelineLink
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 px-3 py-3 border border-transparent hover:border-tva-emerald/20 hover:bg-tva-emerald/5 transition-colors relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 w-0 h-full bg-tva-emerald/10 group-hover:w-full transition-all duration-500 ease-out z-0" />
              <div className="absolute left-0 top-0 w-[2px] h-full bg-tva-bright scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              
              <span className="text-tva-emerald/60 group-hover:text-tva-bright transition-colors text-lg leading-none relative z-10 w-5 text-center">
                {item.icon}
              </span>
              <span className="text-[11px] tracking-widest text-tva-muted group-hover:text-tva-text uppercase relative z-10">
                {item.label}
              </span>
            </TimelineLink>
          ))}
        </nav>
        
        {/* Bottom Status / Logout */}
        <div className="p-4 border-t border-tva-border/40 mt-auto bg-tva-base/50">
          <form action={logoutAction}>
            <button type="submit" className="w-full flex items-center justify-between px-4 py-3 border border-tva-border/50 hover:border-tva-amber/40 hover:bg-tva-amber/10 transition-colors text-tva-muted hover:text-tva-amber text-[10px] tracking-widest uppercase">
              <span>Disconnect</span>
              <span>⏻</span>
            </button>
          </form>
          <div className="mt-4 text-center">
             <span className="text-[8px] tracking-[0.3em] text-tva-muted/40 uppercase">
                All branches monitored.
             </span>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-auto relative z-10 bg-tva-base/80">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
