"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { Github, Globe, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { copy, getLangFromPathname } from "@/lib/i18n";

function TurkeyFlagIcon({ className }: { className?: string }) {
  // Minimal TR flag (for UI only). Uses currentColor for the red fill via Tailwind.
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" />
      {/* Crescent */}
      <circle cx="10.2" cy="12" r="4.2" fill="#ffffff" opacity="0.95" />
      <circle cx="11.5" cy="12" r="3.4" fill="currentColor" />
      {/* Star (simple) */}
      <path
        d="M15.8 10.4l.6 1.5 1.6.1-1.2 1 .4 1.6-1.4-.8-1.4.8.4-1.6-1.2-1 1.6-.1.6-1.5z"
        fill="#ffffff"
        opacity="0.95"
      />
    </svg>
  );
}

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const lang = getLangFromPathname(pathname);
  const t = copy[lang];

  const switchLanguage = () => {
    const nextLang = lang === "en" ? "tr" : "en";
    const parts = pathname.split("/");
    // parts[0] is "", parts[1] is lang when localized.
    if (parts.length > 1) parts[1] = nextLang;
    const nextPath = parts.join("/") || `/${nextLang}`;
    router.push(nextPath);
  };

  return (
    <header className="flex items-baseline justify-between py-12">
      <Link
        href={`/${lang}`}
        className="font-serif text-[20px] tracking-tight text-[var(--foreground)] hover:opacity-80"
      >
        Burak Gökmen Çelik
      </Link>

      <nav className="flex items-center gap-6 font-sans text-[14px] text-[var(--foreground)]">
        <Link
          href={`/${lang}/blog`}
          className="hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4"
        >
          {t.nav.blog}
        </Link>
        <Link
          href={`/${lang}/about`}
          className="hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4"
        >
          {t.nav.about}
        </Link>
        <button
          type="button"
          onClick={switchLanguage}
          className="flex items-center"
          aria-label={t.nav.languageToggleAria}
        >
          <span
            className={[
              "grid h-6 w-6 place-items-center rounded-full border border-[var(--line)]",
              "border-[var(--accent)]",
            ].join(" ")}
            title={lang === "tr" ? "TR" : "EN"}
          >
            {lang === "tr" ? (
              <TurkeyFlagIcon className="text-[var(--accent)]" />
            ) : (
              <Globe size={14} className="text-[var(--accent)]" />
            )}
          </span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/gokmencelik/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn: gokmencelik"
            className="text-[var(--foreground)] opacity-80 hover:text-[var(--accent)] hover:opacity-100"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://github.com/gokmency"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub: gokmency"
            className="text-[var(--foreground)] opacity-80 hover:text-[var(--accent)] hover:opacity-100"
          >
            <Github size={16} />
          </a>
          <a
            href="https://x.com/gokmeneth"
            target="_blank"
            rel="noreferrer"
            aria-label="X: gokmeneth"
            className="text-[var(--foreground)] opacity-80 hover:text-[var(--accent)] hover:opacity-100"
          >
            <Twitter size={16} />
          </a>
          <a
            href="https://t.me/gokmenceliks"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram: gokmenceliks"
            className="text-[var(--foreground)] opacity-80 hover:text-[var(--accent)] hover:opacity-100"
          >
            <Send size={16} />
          </a>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line)] hover:border-[var(--accent)]"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <Moon size={14} className="text-[var(--accent)]" />
          ) : (
            <Sun size={14} className="text-[var(--accent)]" />
          )}
        </button>
      </nav>
    </header>
  );
}


