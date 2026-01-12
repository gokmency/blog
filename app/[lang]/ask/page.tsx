import type { Metadata } from "next";
import { AskClient } from "@/components/AskClient";
import { copy, type Lang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang } | Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await Promise.resolve(params);
  const t = copy[lang].ask;
  const description = lang === "tr" ? "Burak hakkında soru sor." : "Ask questions about Burak.";

  return {
    title: t.title,
    description,
    alternates: {
      canonical: `/${lang}/ask`,
      languages: {
        en: "/en/ask",
        tr: "/tr/ask",
      },
    },
  };
}

export default async function AskPage({
  params,
}: {
  params: { lang: Lang } | Promise<{ lang: Lang }>;
}) {
  const { lang } = await Promise.resolve(params);
  return <AskClient lang={lang} />;
}

