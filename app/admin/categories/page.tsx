export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  async function createCategory(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    await prisma.category.create({
      data: { name, slug },
    });
    revalidatePath("/admin/categories");
  }

  async function deleteCategory(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
  }

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
          Categories
        </h1>
        <p className="text-text-muted">Manage blog topics.</p>
      </div>

      <div className="glass-card p-6 rounded-sm mb-10">
        <form action={createCategory} className="flex gap-4 items-end">
          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-mono tracking-widest uppercase text-text-muted">
              New Category Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Technology"
              className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                placeholder:text-text-muted/40 focus:outline-none focus:border-green-bright/60 focus:shadow-glow-green"
            />
          </div>
          <button type="submit" className="btn-primary py-3 px-6 h-auto">
            Add
          </button>
        </form>
      </div>

      <div className="glass-card rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-text-muted">
          <thead className="bg-surface border-b border-border text-xs uppercase font-mono tracking-widest">
            <tr>
              <th className="px-6 py-4 font-medium text-text-primary">Name</th>
              <th className="px-6 py-4 font-medium text-text-primary">Slug</th>
              <th className="px-6 py-4 font-medium text-text-primary">Posts</th>
              <th className="px-6 py-4 font-medium text-text-primary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4 text-text-primary font-medium">{cat.name}</td>
                <td className="px-6 py-4 font-mono text-xs">{cat.slug}</td>
                <td className="px-6 py-4 font-mono text-xs">{cat._count.posts}</td>
                <td className="px-6 py-4 text-right">
                  <form action={deleteCategory}>
                    <input type="hidden" name="id" value={cat.id} />
                    <button type="submit" className="text-red-400 hover:text-red-300 transition-colors font-mono text-xs tracking-widest uppercase">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-text-muted/60">
                  No categories found. Create one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
