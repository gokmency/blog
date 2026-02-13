import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { PostFeed } from "@/components/PostFeed";
import { getRecentPosts } from "@/lib/hashnode/api";
import { copy, type Lang } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang } | Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await Promise.resolve(params);
  const t = copy[lang];
  const title = t.blog.title;
  const description =
    lang === "tr"
      ? "Burak Gökmen Çelik’ten yazılar: ürün geliştirme, Web3, growth ve notlar."
      : "Posts by Burak Gökmen Çelik: product building, Web3, growth, and notes.";

  const baseUrl = "https://gokmens.com";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        tr: `${baseUrl}/tr/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: { lang: Lang } | Promise<{ lang: Lang }>;
}) {
  noStore();
  const { lang } = await Promise.resolve(params);
  const t = copy[lang];
  const posts = await getRecentPosts(20);

  const baseUrl = "https://gokmens.com";
  const pageUrl = `${baseUrl}/${lang}/blog`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t.blog.title,
    url: pageUrl,
    description: lang === "tr"
      ? "Burak Gökmen Çelik’ten yazılar: ürün geliştirme, Web3, growth ve notlar."
      : "Posts by Burak Gökmen Çelik: product building, Web3, growth, and notes.",
    publisher: {
      "@type": "Person",
      name: "Burak Gökmen Çelik",
      url: `${baseUrl}/${lang}`,
    },
  };

  return (
    <section className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="mb-8 font-serif text-[28px] leading-tight tracking-tight text-[var(--foreground)]">{t.blog.title}</h1>
      <PostFeed posts={posts} lang={lang} />
    </section>
  );
}

