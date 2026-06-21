import { cache } from "react";
import { hashnodeRequest, type HashnodeRequestOptions } from "./client";
import { scrapeRecentPosts, scrapePostBySlug } from "./scraper";
import {
  GET_POST_BY_SLUG,
  GET_POST_SLUGS_PAGE,
  GET_POSTS_PAGE,
  GET_PUBLICATION_ID,
  HASHNODE_PUBLICATION_HOST,
} from "./queries";
import type {
  GetPostBySlugData,
  GetPostSlugsPageData,
  GetPostsPageData,
  GetPublicationIdData,
  HashnodePost,
  HashnodePostForSitemap,
  HashnodePostWithContent,
} from "./types";

function uniqueNonEmpty(values: Array<string | undefined | null>) {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const v of values) {
    const s = typeof v === "string" ? v.trim() : "";
    if (!s) continue;
    if (seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

async function tryHosts<TData, TVariables extends Record<string, unknown>>(
  hosts: string[],
  makeVars: (host: string) => TVariables,
  query: string,
  options?: HashnodeRequestOptions,
  hasPublication?: (data: TData) => boolean,
): Promise<{ host: string; data: TData } | null> {
  let lastData: TData | null = null;
  let lastHost = "";
  for (const host of hosts) {
    try {
      const data = await hashnodeRequest<TData, TVariables>(query, makeVars(host), options);
      lastData = data;
      lastHost = host;
      if (!hasPublication || hasPublication(data)) return { host, data };
    } catch (err) {
      console.error(`[Hashnode] Error querying host ${host}:`, err instanceof Error ? err.message : String(err));
      // Continue trying other hosts
    }
  }

  if (lastData) {
    // If none matched the validation but we had a response, return the last one
    return { host: lastHost, data: lastData };
  }

  // All hosts failed completely
  return null;
}

function getHostsToTry() {
  // If you ever map Hashnode to a custom domain, the publication host might become that domain.
  // We keep the default hardcoded host but also try `gokmens.com` as a fallback.
  return uniqueNonEmpty([
    process.env.HASHNODE_PUBLICATION_HOST,
    HASHNODE_PUBLICATION_HOST,
    "gokmens.com",
  ]);
}

const POSTS_PAGE_SIZE = 10;

export async function getRecentPosts(wanted = 20): Promise<HashnodePost[]> {
  const hosts = getHostsToTry();
  const opts = { cache: "no-store" as RequestCache };
  const firstPage = await tryHosts<
    GetPostsPageData,
    { host: string; first: number; after?: string | null }
  >(
    hosts,
    (host) => ({ host, first: POSTS_PAGE_SIZE, after: null }),
    GET_POSTS_PAGE,
    opts,
    (d) => Boolean(d.publication),
  );

  if (!firstPage) {
    console.log("[Hashnode] GraphQL API failed, falling back to scraper...");
    return scrapeRecentPosts("gokmens");
  }

  const hostToUse = firstPage.host;
  let data = firstPage.data;
  const out: HashnodePost[] = [];
  const seen = new Set<string>();

  const pushEdges = () => {
    const edges = data.publication?.posts.edges ?? [];
    for (const e of edges) {
      const node = e.node;
      if (node?.slug && !seen.has(node.slug)) {
        seen.add(node.slug);
        out.push(node);
      }
    }
  };

  pushEdges();

  let pageInfo = data.publication?.posts.pageInfo;
  let guard = 0;
  while (out.length < wanted && pageInfo?.hasNextPage && pageInfo.endCursor && guard < 20) {
    guard += 1;
    try {
      data = await hashnodeRequest<GetPostsPageData, { host: string; first: number; after: string }>(
        GET_POSTS_PAGE,
        { host: hostToUse, first: POSTS_PAGE_SIZE, after: pageInfo.endCursor },
        opts,
      );
      pushEdges();
      pageInfo = data.publication?.posts.pageInfo;
    } catch (err) {
      console.error(`[Hashnode] Error fetching paginated posts:`, err instanceof Error ? err.message : String(err));
      break;
    }
  }

  return out.slice(0, wanted);
}

export const getPostBySlug = cache(async (slug: string): Promise<HashnodePostWithContent | null> => {
  const hosts = getHostsToTry();
  const result = await tryHosts<GetPostBySlugData, { host: string; slug: string }>(
    hosts,
    (host) => ({ host, slug }),
    GET_POST_BY_SLUG,
    { revalidate: 60 },
    (d) => Boolean(d.publication),
  );
  if (!result) {
    console.log("[Hashnode] GraphQL API failed, falling back to scraper for post slug:", slug);
    return scrapePostBySlug("gokmens", slug);
  }
  return result.data.publication?.post ?? null;
});

export async function getPublicationId(): Promise<string> {
  const hosts = getHostsToTry();
  const result = await tryHosts<GetPublicationIdData, { host: string }>(
    hosts,
    (h) => ({ host: h }),
    GET_PUBLICATION_ID,
    { revalidate: 3600 },
    (d) => Boolean(d.publication?.id),
  );
  if (!result) throw new Error(`Hashnode publication not found for host (tried: ${hosts.join(", ")}) and no response could be retrieved`);
  const id = result.data.publication?.id;
  if (!id) throw new Error(`Hashnode publication not found for host (tried: ${hosts.join(", ")}; last: ${result.host})`);
  return id;
}

export async function getAllPostsForSitemap(
  pageSize = 50,
  options: HashnodeRequestOptions = { revalidate: 3600 },
): Promise<HashnodePostForSitemap[]> {
  const hosts = getHostsToTry();
  const out: HashnodePostForSitemap[] = [];

  // First page: find a valid host (supports custom domain in the future).
  const firstPage = await tryHosts<
    GetPostSlugsPageData,
    { host: string; first: number; after?: string | null }
  >(
    hosts,
    (host) => ({ host, first: pageSize, after: null }),
    GET_POST_SLUGS_PAGE,
    options,
    (d) => Boolean(d.publication),
  );

  if (!firstPage) {
    const posts = await scrapeRecentPosts("gokmens");
    return posts.map(p => ({ slug: p.slug, publishedAt: p.publishedAt }));
  }

  const hostToUse = firstPage.host;
  let data = firstPage.data;

  const seen = new Set<string>();
  const pushEdges = (d: GetPostSlugsPageData) => {
    const edges = d.publication?.posts.edges ?? [];
    for (const e of edges) {
      const slug = e.node.slug?.trim();
      if (!slug) continue;
      if (seen.has(slug)) continue;
      seen.add(slug);
      out.push({ slug, publishedAt: e.node.publishedAt });
    }
  };

  pushEdges(data);

  // Follow cursor pagination.
  let pageInfo = data.publication?.posts.pageInfo;
  let guard = 0;
  while (pageInfo?.hasNextPage && pageInfo.endCursor && guard < 100) {
    guard += 1;
    try {
      data = await hashnodeRequest<GetPostSlugsPageData, { host: string; first: number; after: string }>(
        GET_POST_SLUGS_PAGE,
        { host: hostToUse, first: pageSize, after: pageInfo.endCursor },
        options,
      );
      pushEdges(data);
      pageInfo = data.publication?.posts.pageInfo;
    } catch (err) {
      console.error(`[Hashnode] Error fetching paginated sitemap slugs:`, err instanceof Error ? err.message : String(err));
      break;
    }
  }

  return out;
}


