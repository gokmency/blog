"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();

  const copy =
    language === "tr"
      ? {
          title: "Hakkımda",
          p1: "Düşünme, inşa etme ve öğrenme üzerine yazıyorum. Bu site bilinçli olarak minimal.",
          p2: "Bana ulaşmak istersen bir yazının altına yorum bırakabilir veya Hashnode profilimden bağlantı kurabilirsin.",
        }
      : {
          title: "About",
          p1: "I write about building, thinking, and learning. This site is intentionally minimal.",
          p2: "If you want to reach me, reply on a post or connect via my Hashnode profile.",
        };

  return (
    <section className="py-16">
      <h1 className="mb-8 font-serif text-[28px] leading-tight tracking-tight text-[var(--foreground)]">
        {copy.title}
      </h1>
      <div className="max-w-none font-serif text-[18px] leading-[1.85] text-[var(--foreground)]">
        <p className="mb-5">{copy.p1}</p>
        <p className="mb-5">{copy.p2}</p>
      </div>
    </section>
  );
}


