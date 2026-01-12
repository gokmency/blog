import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "@/lib/hashnode/api";
import type { Lang } from "@/lib/i18n";

const BASE_URL = "https://gokmens.com";

function normalizeHashnodeMarkdown(md: string) {
  // Hashnode markdown sometimes includes non-standard attrs inside image URLs:
  // ![](https://...png align="center")
  // react-markdown treats that as part of the URL, so the image fails to load.
  return md.replace(/\((https?:\/\/[^)\s]+)\s+align="[^"]*"\)/g, "($1)");
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang; slug: string } | Promise<{ lang: Lang; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await Promise.resolve(params);
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.title;
  const description =
    (typeof post.brief === "string" && post.brief.trim()) ||
    (lang === "tr" ? "Blog yazısı." : "Blog post.");

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        tr: `/tr/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${BASE_URL}/${lang}/blog/${slug}`,
      publishedTime: post.publishedAt,
      tags: (post.tags || []).map((t) => t.name),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { lang: Lang; slug: string } | Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await Promise.resolve(params);
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const markdown = normalizeHashnodeMarkdown(post.content?.markdown ?? "");
  const pageUrl = `${BASE_URL}/${lang}/blog/${slug}`;
  const description =
    (typeof post.brief === "string" && post.brief.trim()) ||
    (lang === "tr" ? "Blog yazısı." : "Blog post.");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Person",
      name: "Burak Gökmen Çelik",
      url: `${BASE_URL}/${lang}`,
    },
  };

  return (
    <article className="py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mb-12">
        <h1 className="font-serif text-[32px] leading-tight tracking-tight text-[var(--foreground)]">{post.title}</h1>
      </header>

      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </article>
  );
}

