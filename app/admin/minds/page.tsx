export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { approveMindAction, deleteMindAction } from "@/actions/interactions";
import { formatDate } from "@/lib/utils";

export default async function AdminMindsPage() {
  const [pending, approved] = await Promise.all([
    prisma.mind.findMany({
      where: { approved: false },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.mind.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    }),
  ]);

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-text-primary mb-2">Mind Submissions</h1>
        <p className="text-text-muted">Review and moderate user thoughts.</p>
      </div>

      {/* Pending */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display text-xl font-bold text-text-primary">Pending Review</h2>
          {pending.length > 0 && (
            <span className="px-2.5 py-1 bg-gold/20 border border-gold/40 text-gold text-xs font-mono rounded-sm">
              {pending.length}
            </span>
          )}
        </div>

        {pending.length === 0 ? (
          <p className="text-text-muted italic text-sm">No pending submissions.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pending.map((mind) => (
              <div key={mind.id} className="glass-card p-5 rounded-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-text-primary text-sm leading-relaxed mb-2 italic">
                      &ldquo;{mind.content}&rdquo;
                    </p>
                    <div className="text-text-muted/60 font-mono text-xs">
                      by {mind.user.name} &nbsp;·&nbsp; {formatDate(mind.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <form action={approveMindAction}>
                      <input type="hidden" name="id" value={mind.id} />
                      <button type="submit"
                        className="text-green-bright hover:text-green-bright/80 font-mono text-xs tracking-widest uppercase transition-colors">
                        Approve
                      </button>
                    </form>
                    <span className="text-border">|</span>
                    <form action={deleteMindAction}>
                      <input type="hidden" name="id" value={mind.id} />
                      <button type="submit"
                        className="text-red-400 hover:text-red-300 font-mono text-xs tracking-widest uppercase transition-colors">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved */}
      <div>
        <h2 className="font-display text-xl font-bold text-text-primary mb-6">Published</h2>
        {approved.length === 0 ? (
          <p className="text-text-muted italic text-sm">No published thoughts yet.</p>
        ) : (
          <div className="glass-card rounded-sm overflow-hidden">
            <table className="w-full text-left text-sm text-text-muted">
              <thead className="bg-surface border-b border-border text-xs uppercase font-mono tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-medium text-text-primary">Thought</th>
                  <th className="px-6 py-4 font-medium text-text-primary">By</th>
                  <th className="px-6 py-4 font-medium text-text-primary">Date</th>
                  <th className="px-6 py-4 font-medium text-text-primary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {approved.map((mind) => (
                  <tr key={mind.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4 text-text-primary max-w-sm">
                      <span className="italic line-clamp-2">&ldquo;{mind.content}&rdquo;</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{mind.user.name}</td>
                    <td className="px-6 py-4 font-mono text-xs">{formatDate(mind.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <form action={deleteMindAction}>
                        <input type="hidden" name="id" value={mind.id} />
                        <button type="submit"
                          className="text-red-400 hover:text-red-300 font-mono text-xs tracking-widest uppercase transition-colors">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
