export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { GlowButton } from "@/components/ui/GlowButton";

export default async function AdminDashboard() {
  const [
    totalEvents,
    activeBranches,
    totalVariants,
    totalQuantumEvents,
    pendingMinds
  ] = await Promise.all([
    prisma.post.count(),
    prisma.category.count(),
    prisma.user.count(),
    prisma.like.count(),
    prisma.mind.count({ where: { approved: false } })
  ]);

  const stats = [
    { label: "ACTIVE BRANCHES", value: activeBranches, color: "text-tva-bright", border: "border-tva-bright" },
    { label: "TOTAL EVENTS", value: totalEvents, color: "text-tva-text", border: "border-tva-border/50" },
    { label: "REGISTERED VARIANTS", value: totalVariants, color: "text-tva-amber", border: "border-tva-amber" },
    { label: "PENDING MINDS", value: pendingMinds, color: pendingMinds > 0 ? "text-tva-gold text-glow-amber animate-pulse" : "text-tva-muted", border: pendingMinds > 0 ? "border-tva-gold" : "border-tva-border/50" },
    { label: "QUANTUM EVENTS", value: totalQuantumEvents, color: "text-tva-emerald", border: "border-tva-emerald" },
  ];

  return (
    <div className="flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tva-border/50 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 bg-tva-bright rounded-full animate-pulse shadow-[0_0_8px_rgba(59,229,139,0.8)]" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-tva-bright uppercase">
              System Stable
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-tva-text uppercase tracking-tight">
            Timeline <span className="text-tva-bright text-glow-emerald">Control</span>
          </h1>
        </div>
        <div className="font-mono text-[10px] tracking-widest text-tva-muted uppercase text-right">
          <p>Current Time: {new Date().toISOString().split("T")[0]}</p>
          <p>Branch: α-7</p>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((s) => (
          <div 
            key={s.label} 
            className={`bg-tva-surface/30 backdrop-blur-sm p-6 flex flex-col gap-3 border-t-2 ${s.border} hover:bg-tva-surface/50 transition-colors relative overflow-hidden group`}
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tva-emerald/5 to-transparent h-[150%] -translate-y-full group-hover:animate-[scanline_2s_linear_infinite]" />
            
            <span className="font-mono text-[10px] tracking-widest text-tva-muted uppercase relative z-10">
              {s.label}
            </span>
            <span className={`font-display text-5xl md:text-6xl font-bold ${s.color} relative z-10`}>
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* Control Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        
        {/* Quick Actions (Terminal Style) */}
        <div className="border border-tva-border/40 bg-tva-base p-1 relative">
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-tva-emerald/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-tva-emerald/40" />
          
          <div className="bg-tva-surface/50 p-6 h-full flex flex-col gap-6">
            <h2 className="font-mono text-[11px] tracking-widest text-tva-amber uppercase border-b border-tva-border/30 pb-3">
              [ MANUAL OVERRIDE COMMANDS ]
            </h2>
            <div className="flex flex-col gap-4">
              <GlowButton href="/admin/posts/new" variant="emerald" className="w-full justify-between">
                <span>Create Timeline Event</span>
                <span>→</span>
              </GlowButton>
              <GlowButton href="/admin/categories" variant="ghost" className="w-full justify-between border border-tva-border/50">
                <span>Manage Branches</span>
                <span>→</span>
              </GlowButton>
              <GlowButton href="/admin/minds" variant="amber" className="w-full justify-between">
                <span>Moderate Fragments</span>
                <span>→</span>
              </GlowButton>
            </div>
          </div>
        </div>
        
        {/* System Logs */}
        <div className="border border-tva-border/40 bg-tva-base p-1">
           <div className="bg-tva-surface/30 p-6 h-full flex flex-col font-mono">
            <h2 className="text-[11px] tracking-widest text-tva-muted uppercase border-b border-tva-border/30 pb-3 mb-4">
              System Logs
            </h2>
            
            <div className="flex-1 flex flex-col gap-3 text-[10px] text-tva-muted/70 tracking-wider">
              <div className="flex gap-4">
                <span className="text-tva-emerald/50">14:02:41</span>
                <span className="text-tva-text">Scanning timeline for anomalies...</span>
              </div>
              <div className="flex gap-4">
                <span className="text-tva-emerald/50">14:02:45</span>
                <span className="text-tva-amber animate-pulse">Temporal fluctuation detected.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-tva-emerald/50">14:02:46</span>
                <span className="text-tva-text">Auto-correction sequence initiated.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-tva-emerald/50">14:02:50</span>
                <span className="text-tva-bright text-glow-emerald">Branch stabilized.</span>
              </div>
              
              <div className="mt-auto pt-4 flex items-center gap-2 text-tva-emerald animate-pulse">
                <span>_</span>
                <span>Awaiting input</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
