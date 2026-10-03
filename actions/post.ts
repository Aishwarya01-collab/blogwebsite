"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function createPostAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const coverImage = formData.get("coverImage") as string;

  if (!title || !content) {
    // For now just redirect back — we'll add error state later
    redirect("/admin/posts/new");
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt: excerpt || "",
      content,
      coverImage: coverImage || null,
      categoryId: categoryId || null,
      authorId: session.user.id,
      published: false,
    },
  });

  redirect("/admin/posts");
}

export async function updatePostAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const coverImage = formData.get("coverImage") as string;

  if (!id || !title || !content) {
    redirect(`/admin/posts/${id}/edit`);
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: excerpt || "",
      content,
      coverImage: coverImage || null,
      categoryId: categoryId || null,
    },
  });

  redirect("/admin/posts");
}
