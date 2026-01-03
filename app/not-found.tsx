import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16">
      <h1 className="mb-4 font-serif text-[28px] leading-tight tracking-tight text-[var(--foreground)]">
        Not Found
      </h1>
      <p className="mb-8 font-sans text-[14px] text-[var(--muted)]">
        The page you’re looking for doesn’t exist.
      </p>
      <Link href="/" className="font-sans text-[14px] text-[var(--foreground)] hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4">
        Go home
      </Link>
    </section>
  );
}


