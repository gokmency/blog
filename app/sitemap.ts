import type { MetadataRoute } from "next";
import { getRecentPosts } from "@/lib/hashnode/api";

function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.URL ??
    "https://gokmens.com";
  return raw.replace(/\/+$/, "");
}

export default async function (): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  let posts: Array<{ slug: string; publishedAt?: string }> = [];
  try {
    posts = (await getRecentPosts(50)).map((p) => ({ slug: p.slug, publishedAt: p.publishedAt }));
  } catch {
    // If Hashnode is temporarily unavailable, still return static routes.
    posts = [];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/en`, lastModified: now },
    { url: `${siteUrl}/tr`, lastModified: now },
    { url: `${siteUrl}/en/about`, lastModified: now },
    { url: `${siteUrl}/tr/about`, lastModified: now },
    { url: `${siteUrl}/en/blog`, lastModified: now },
    { url: `${siteUrl}/tr/blog`, lastModified: now },
    { url: `${siteUrl}/en/ask`, lastModified: now },
    { url: `${siteUrl}/tr/ask`, lastModified: now },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.flatMap((p) => {
    const last = p.publishedAt ? new Date(p.publishedAt) : now;
    return [
      { url: `${siteUrl}/en/blog/${p.slug}`, lastModified: last },
      { url: `${siteUrl}/tr/blog/${p.slug}`, lastModified: last },
    ];
  });

  return [...staticRoutes, ...postRoutes];
}
