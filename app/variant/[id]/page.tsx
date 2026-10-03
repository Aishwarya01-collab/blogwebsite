import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TimelineLink } from "@/components/ui/TimelineLink";
import { formatDate } from "@/lib/utils";

export default async function VariantProfilePage({ params }: { params: { id: string } }) {
  // Extract uuid from VX-XXXXXX format
  const variantIdPrefix = params.id.replace("VX-", "");
  
  // Find user by starting string of UUID (since we derived it)
  // Prisma doesn't have a simple "startsWith" for UUID if it's strict, but we can fetch users and find it, or use raw query.
  // For simplicity, let's just find the first user whose ID starts with the prefix (case insensitive).
  const users = await prisma.user.findMany({
    include: {
      comments: true,
      likes: true,
      minds: true,
    }
  });
  
  const user = users.find(u => u.id.toUpperCase().startsWith(variantIdPrefix));

  if (!user) notFound();

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="container-site max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 bg-tva-amber rounded-full animate-pulse shadow-[0_0_10px_rgba(196,154,69,0.8)]" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-tva-amber uppercase">
            Variant Identity Record
          </span>
        </div>

        {/* TVA Profile Card */}
        <div className="border border-tva-emerald/40 bg-tva-surface/30 backdrop-blur-md p-8 md:p-12 shadow-[0_0_50px_rgba(29,107,69,0.1)] relative overflow-hidden group">
          
          <div className="absolute inset-0 bg-radial-emerald opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 relative z-10">
            
            {/* Left: Identity Info */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-tva-border/30 pb-10 md:pb-0 md:pr-10">
              <h1 className="font-display text-4xl md:text-5xl font-black text-tva-text uppercase tracking-tight mb-2">
                {user.name}
              </h1>
              <p className="font-mono text-lg text-tva-bright tracking-widest uppercase mb-10 text-glow-emerald">
                VX-{variantIdPrefix}
              </p>

              <div className="flex flex-col gap-6 font-mono text-[10px] tracking-widest uppercase">
                <div>
                  <span className="text-tva-muted block mb-1">ORIGIN TIMELINE</span>
                  <span className="text-tva-text font-bold">T-01 (ROOT)</span>
                </div>
                <div>
                  <span className="text-tva-muted block mb-1">TEMPORAL ROLE</span>
                  <span className="text-tva-amber font-bold">{user.role}</span>
                </div>
                <div>
                  <span className="text-tva-muted block mb-1">DATE OF DIVERGENCE</span>
                  <span className="text-tva-text font-bold">{formatDate(user.createdAt)}</span>
                </div>
                <div>
                  <span className="text-tva-muted block mb-1">CURRENT STATUS</span>
                  <span className="text-tva-bright font-bold">STABLE</span>
                </div>
              </div>
            </div>

            {/* Right: Quantum Connections */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="font-mono text-[11px] tracking-widest text-tva-muted uppercase mb-8 border-b border-tva-border/30 pb-3">
                Temporal Activity
              </h2>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="font-display text-4xl text-tva-text font-bold">{user.likes.length}</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-tva-emerald uppercase">Quantum Links</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-display text-4xl text-tva-text font-bold">{user.comments.length}</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-tva-amber uppercase">Cross-Variant Comms</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-display text-4xl text-tva-text font-bold">{user.minds.length}</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-tva-muted uppercase">Minds Shared</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-display text-4xl text-tva-text font-bold">0</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-tva-muted uppercase">Anomalies</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative scanner line */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-tva-bright w-0 group-hover:w-full transition-all duration-[2s] ease-in-out opacity-50" />
        </div>

        {/* Back navigation */}
        <div className="mt-12">
          <TimelineLink href="/" className="font-mono text-[10px] tracking-widest text-tva-muted hover:text-tva-bright uppercase transition-colors">
            ← Return to Main Timeline
          </TimelineLink>
        </div>

      </div>
    </main>
  );
}
