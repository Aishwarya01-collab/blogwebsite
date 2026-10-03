import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { loginAction } from "@/actions/auth";
import { SubmitButton } from "@/components/ui/SubmitButton";

export const metadata = { title: "Sign In" };

const errorMessages: Record<string, string> = {
  missing_fields: "Please fill in all fields.",
  invalid_credentials: "Invalid email or password.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorMsg = searchParams.error ? errorMessages[searchParams.error] : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-loki/8 blur-[150px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-lg font-semibold tracking-widest text-text-primary uppercase">
                My<span className="text-green-bright">.</span>World
              </span>
            </Link>
            <span className="eyebrow mb-3 block">Welcome back</span>
            <h1 className="font-display text-3xl font-bold text-text-primary">Sign In</h1>
          </div>

          <div className="glass-card rounded-sm p-8 relative">
            {errorMsg && (
              <div className="mb-5 px-4 py-3 rounded-sm bg-red-900/20 border border-red-500/30 text-red-400 text-sm font-mono">
                {errorMsg}
              </div>
            )}

            <form action={loginAction} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-mono tracking-widest uppercase text-text-muted">
                  Email address
                </label>
                <input
                  id="email" name="email" type="email" autoComplete="email" required
                  placeholder="you@example.com"
                  className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                    placeholder:text-text-muted/40 focus:outline-none focus:border-green-bright/60
                    focus:shadow-glow-green transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-mono tracking-widest uppercase text-text-muted">
                  Password
                </label>
                <input
                  id="password" name="password" type="password" autoComplete="current-password" required
                  placeholder="••••••••"
                  className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                    placeholder:text-text-muted/40 focus:outline-none focus:border-green-bright/60
                    focus:shadow-glow-green transition-all duration-300"
                />
              </div>

              <SubmitButton label="Sign In" loadingLabel="Signing in…" />
            </form>

            <div className="divider my-6" />

            <p className="text-center text-text-muted text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-green-bright hover:underline underline-offset-2 transition-colors">
                Register
              </Link>
            </p>

            <div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-green-bright/30 rounded-tl-sm pointer-events-none" />
            <div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-green-bright/30 rounded-br-sm pointer-events-none" />
          </div>
        </div>
      </main>
    </>
  );
}
