"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ── LIKE ──────────────────────────────────────────────────────────────────────

export async function toggleLikeAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.user) redirect("/login");

  const postId = formData.get("postId") as string;
  const userId = session.user.id;

  const existing = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existing) {
    await prisma.like.delete({ where: { userId_postId: { userId, postId } } });
  } else {
    await prisma.like.create({ data: { userId, postId } });
  }

  revalidatePath(`/blog`);
  // revalidate post slug — we need the slug for this
  const post = await prisma.post.findUnique({ where: { id: postId }, select: { slug: true } });
  if (post) revalidatePath(`/blog/${post.slug}`);
}

// ── COMMENT ───────────────────────────────────────────────────────────────────

export async function addCommentAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.user) redirect("/login");

  const postId = formData.get("postId") as string;
  const content = (formData.get("content") as string)?.trim();
  const slug    = formData.get("slug") as string;

  if (!content || content.length < 2) redirect(`/blog/${slug}`);
  if (content.length > 1000) redirect(`/blog/${slug}?error=comment_too_long`);

  await prisma.comment.create({
    data: {
      content,
      postId,
      userId: session.user.id,
    },
  });

  revalidatePath(`/blog/${slug}`);
}

export async function deleteCommentAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.user || session.user.role !== "ADMIN") redirect("/");

  const id   = formData.get("id") as string;
  const slug = formData.get("slug") as string;

  await prisma.comment.delete({ where: { id } });
  revalidatePath(`/blog/${slug}`);
}

// ── MINDS ─────────────────────────────────────────────────────────────────────

export async function submitMindAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.user) redirect("/login");

  const content = (formData.get("content") as string)?.trim();
  if (!content || content.length < 5) redirect("/write-your-mind?error=too_short");
  if (content.length > 200)           redirect("/write-your-mind?error=too_long");

  await prisma.mind.create({
    data: { content, userId: session.user.id },
  });

  revalidatePath("/write-your-mind");
  redirect("/write-your-mind?success=1");
}

export async function approveMindAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.user || session.user.role !== "ADMIN") redirect("/");

  const id = formData.get("id") as string;
  await prisma.mind.update({ where: { id }, data: { approved: true } });
  revalidatePath("/admin/minds");
  revalidatePath("/write-your-mind");
}

export async function deleteMindAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session.user || session.user.role !== "ADMIN") redirect("/");

  const id = formData.get("id") as string;
  await prisma.mind.delete({ where: { id } });
  revalidatePath("/admin/minds");
  revalidatePath("/write-your-mind");
}
