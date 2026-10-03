import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[400px] h-[400px] rounded-full bg-green-loki/8 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <span className="eyebrow">Lost in the void</span>

          <h1 className="font-display text-[8rem] md:text-[12rem] font-black leading-none text-gradient-green opacity-20 select-none">
            404
          </h1>

          <div className="-mt-16">
            <h2 className="font-display text-3xl font-bold text-text-primary mb-3">
              Page Not Found
            </h2>
            <p className="text-text-muted max-w-sm">
              This page doesn't exist in my universe. It may have been moved, deleted, or never created.
            </p>
          </div>

          <Link href="/" className="btn-primary mt-4">
            Return Home
          </Link>
        </div>
      </main>
    </>
  );
}
