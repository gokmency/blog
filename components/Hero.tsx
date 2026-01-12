import Link from "next/link";
import { copy, type Lang } from "@/lib/i18n";

const GRAINZ_URL = process.env.NEXT_PUBLIC_GRAINZ_URL || "https://grainz.site";

export function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section className="py-16">
      <h1 className="font-serif text-[32px] leading-tight tracking-tight text-[var(--foreground)]">
        {t.home.headline}
      </h1>

      <div className="mt-8 max-w-none font-serif text-[18px] leading-[1.85] text-[var(--foreground)]">
        <p className="mb-5 font-sans text-[12px] uppercase tracking-wide text-[var(--muted)]">
          {t.home.summaryTitle}
        </p>
        <p className="mb-5">{t.home.summaryP1}</p>
        <p className="mb-5">{t.home.summaryP2}</p>
        {t.home.summaryP3 ? <p className="mb-5">{t.home.summaryP3}</p> : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={GRAINZ_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center rounded-none bg-[var(--accent)] px-4 font-sans text-[14px] text-white hover:bg-[var(--accent-dark)]"
        >
          {t.home.ctaGrainz}
        </a>
        <Link
          href={`/${lang}/about`}
          className="inline-flex h-10 items-center rounded-none border border-[var(--line)] px-4 font-sans text-[14px] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {t.home.ctaAbout}
        </Link>
        <Link
          href={`/${lang}/blog`}
          className="inline-flex h-10 items-center rounded-none border border-[var(--line)] px-4 font-sans text-[14px] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          {t.home.ctaBlog}
        </Link>
      </div>
    </section>
  );
}


