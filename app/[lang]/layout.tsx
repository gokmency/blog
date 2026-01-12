import type { Metadata } from "next";
import { copy, isLang, type Lang } from "@/lib/i18n";

export const dynamicParams = false;
const BASE_URL = "https://gokmens.com";

export function generateStaticParams(): Array<{ lang: Lang }> {
  return [{ lang: "en" }, { lang: "tr" }];
}

function getLang(params: { lang?: string }): Lang {
  return params.lang && isLang(params.lang) ? params.lang : "en";
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string } | Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await Promise.resolve(params);
  const lang = getLang({ lang: raw });
  const t = copy[lang];

  const titleDefault =
    lang === "tr"
      ? "Burak Gökmen Çelik — Indie Developer & Product Builder"
      : "Burak Gökmen Çelik — Indie Developer & Product Builder";
  const description =
    lang === "tr"
      ? "Burak Gökmen Çelik’in kişisel sitesi: indie developer, product builder, Web3 ve growth odaklı notlar ve yazılar."
      : "Personal site of Burak Gökmen Çelik: indie developer, product builder. Notes on Web3, growth, and shipping products.";

  return {
    title: {
      default: titleDefault,
      template: `%s — Burak Gökmen Çelik`,
    },
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        tr: "/tr",
      },
    },
    openGraph: {
      type: "website",
      title: titleDefault,
      description,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      siteName: "Burak Gökmen Çelik",
      url: `${BASE_URL}/${lang}`,
    },
    twitter: {
      card: "summary",
      title: titleDefault,
      description,
    },
    other: {
      "content-language": lang,
    },
  };
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

