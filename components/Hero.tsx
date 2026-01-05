"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { language } = useLanguage();

  return (
    <section className="py-16">
      <h1 className="font-serif text-[32px] leading-tight tracking-tight text-[var(--foreground)]">
        {language === "tr" ? "Düşünür. Kurar. Geliştirir." : "Thinker. Builds. Ships."}
      </h1>
    </section>
  );
}


