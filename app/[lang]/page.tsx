import { Hero } from "@/components/Hero";
import { AskBar } from "@/components/AskBar";
import type { Lang } from "@/lib/i18n";
import { copy } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: { lang: Lang } | Promise<{ lang: Lang }>;
}) {
  const { lang } = await Promise.resolve(params);
  const t = copy[lang];

  const baseUrl = "https://gokmens.com";
  const pageUrl = `${baseUrl}/${lang}`;
  const description =
    lang === "tr"
      ? "Burak Gökmen Çelik’in kişisel sitesi: indie developer, product builder, Web3 ve growth odaklı notlar ve yazılar."
      : "Personal site of Burak Gökmen Çelik: indie developer, product builder. Notes on Web3, growth, and shipping products.";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Burak Gökmen Çelik",
      url: pageUrl,
      description,
      jobTitle: "Indie Developer & Product Builder",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Burak Gökmen Çelik",
      url: pageUrl,
      inLanguage: lang,
      description,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero lang={lang} />
      <AskBar lang={lang} />
    </>
  );
}

