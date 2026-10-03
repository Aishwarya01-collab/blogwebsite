"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!name || !email || !password) {
    redirect("/register?error=missing_fields");
  }

  if (password !== confirm) {
    redirect("/register?error=password_mismatch");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    redirect("/register?error=email_taken");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // First registered user becomes ADMIN automatically
  const userCount = await prisma.user.count();
  const role = userCount === 0 ? "ADMIN" : "USER";

  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
  });

  const session = await getSession();
  session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  await session.save();

  redirect("/");
}

export async function loginAction(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=missing_fields");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    redirect("/login?error=invalid_credentials");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    redirect("/login?error=invalid_credentials");
  }

  const session = await getSession();
  session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  await session.save();

  redirect("/");
}

export async function logoutAction(): Promise<void> {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
