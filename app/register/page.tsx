import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { registerAction } from "@/actions/auth";
import { SubmitButton } from "@/components/ui/SubmitButton";

export const metadata = { title: "Create Account" };

const errorMessages: Record<string, string> = {
  missing_fields: "Please fill in all required fields.",
  password_mismatch: "Passwords do not match.",
  email_taken: "This email is already registered.",
};

const fields = [
  { id: "name",     label: "Full name",        type: "text",     autoComplete: "name",         placeholder: "Your name" },
  { id: "email",    label: "Email address",    type: "email",    autoComplete: "email",        placeholder: "you@example.com" },
  { id: "password", label: "Password",         type: "password", autoComplete: "new-password", placeholder: "Min. 8 characters" },
  { id: "confirm",  label: "Confirm password", type: "password", autoComplete: "new-password", placeholder: "Repeat your password" },
];

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorMsg = searchParams.error ? errorMessages[searchParams.error] : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-16 py-24">
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
            <span className="eyebrow mb-3 block">Join the universe</span>
            <h1 className="font-display text-3xl font-bold text-text-primary">Create Account</h1>
          </div>

          <div className="glass-card rounded-sm p-8 relative">
            {errorMsg && (
              <div className="mb-5 px-4 py-3 rounded-sm bg-red-900/20 border border-red-500/30 text-red-400 text-sm font-mono">
                {errorMsg}
              </div>
            )}

            <form action={registerAction} className="flex flex-col gap-4">
              {fields.map(({ id, label, type, autoComplete, placeholder }) => (
                <div key={id} className="flex flex-col gap-1.5">
                  <label htmlFor={id} className="text-xs font-mono tracking-widest uppercase text-text-muted">
                    {label}
                  </label>
                  <input
                    id={id} name={id} type={type} autoComplete={autoComplete} required
                    placeholder={placeholder}
                    className="bg-base/60 border border-border rounded-sm px-4 py-3 text-text-primary text-sm
                      placeholder:text-text-muted/40 focus:outline-none focus:border-green-bright/60
                      focus:shadow-glow-green transition-all duration-300"
                  />
                </div>
              ))}

              <SubmitButton label="Create Account" loadingLabel="Creating account…" />
            </form>

            <div className="divider my-6" />

            <p className="text-center text-text-muted text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-green-bright hover:underline underline-offset-2">
                Sign in
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
