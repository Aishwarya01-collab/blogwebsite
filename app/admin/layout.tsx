import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  if (!session.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-surface shrink-0 flex flex-col h-auto md:min-h-screen">
        <div className="p-6 border-b border-border">
          <Link href="/" className="font-display text-lg font-semibold tracking-widest text-text-primary uppercase flex flex-col">
            <span>My<span className="text-green-bright">.</span>World</span>
            <span className="text-gold text-[10px] tracking-widest mt-1">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {[
            { label: "Dashboard", href: "/admin", icon: "⬡" },
            { label: "Posts", href: "/admin/posts", icon: "⌬" },
            { label: "Create Post", href: "/admin/posts/new", icon: "◈" },
            { label: "Categories", href: "/admin/categories", icon: "◇" },
            { label: "Comments", href: "/admin/comments", icon: "◉" },
            { label: "Mind Submissions", href: "/admin/minds", icon: "◎" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-text-muted hover:text-green-bright hover:bg-green-loki/10 transition-colors"
            >
              <span className="text-green-bright text-lg leading-none">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
          <form action={logoutAction}>
            <button type="submit" className="w-full btn-secondary text-xs py-2">
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
