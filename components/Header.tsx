"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-baseline justify-between py-12">
      <Link
        href="/"
        className="font-serif text-[20px] tracking-tight text-[var(--foreground)] hover:opacity-80"
      >
        Burak Gökmen Çelik
      </Link>

      <nav className="flex items-center gap-6 font-sans text-[14px] text-[var(--foreground)]">
        <Link href="/" className="hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4">
          Blog
        </Link>
        <Link href="/about" className="hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4">
          About
        </Link>
        <button
          type="button"
          onClick={toggleLanguage}
          className="hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4"
          aria-label="Toggle language"
        >
          <span className={language === "en" ? "font-semibold" : ""}>EN</span> /{" "}
          <span className={language === "tr" ? "font-semibold" : ""}>TR</span>
        </button>

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


