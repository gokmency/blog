import { hashnodeRequest, type HashnodeRequestOptions } from "./client";
import {
  GET_POST_BY_SLUG,
  GET_POST_SLUGS_PAGE,
  GET_POSTS,
  GET_PUBLICATION_ID,
  HASHNODE_PUBLICATION_HOST,
} from "./queries";
import type {
  GetPostBySlugData,
  GetPostSlugsPageData,
  GetPostsData,
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
): Promise<{ host: string; data: TData }> {
  let lastData: TData | null = null;
  for (const host of hosts) {
    const data = await hashnodeRequest<TData, TVariables>(query, makeVars(host), options);
    lastData = data;
    if (!hasPublication || hasPublication(data)) return { host, data };
  }
  // If none matched, return the last response so caller can decide what to do.
  return { host: hosts[hosts.length - 1] || "", data: lastData as TData };
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

export async function getRecentPosts(first = 20): Promise<HashnodePost[]> {
  const hosts = getHostsToTry();
  const { data } = await tryHosts<GetPostsData, { host: string; first: number }>(
    hosts,
    (host) => ({ host, first }),
    GET_POSTS,
    // Always fetch fresh for the blog list so newly published posts show up immediately on platforms
    // where ISR may behave like a build-time snapshot.
    { cache: "no-store" },
    (d) => Boolean(d.publication),
  );
  const edges = data.publication?.posts.edges ?? [];
  return edges.map((e) => e.node);
}

export async function getPostBySlug(slug: string): Promise<HashnodePostWithContent | null> {
  const hosts = getHostsToTry();
  const { data } = await tryHosts<GetPostBySlugData, { host: string; slug: string }>(
    hosts,
    (host) => ({ host, slug }),
    GET_POST_BY_SLUG,
    { revalidate: 60 },
    (d) => Boolean(d.publication),
  );
  return data.publication?.post ?? null;
}

export async function getPublicationId(): Promise<string> {
  const hosts = getHostsToTry();
  const { data, host } = await tryHosts<GetPublicationIdData, { host: string }>(
    hosts,
    (h) => ({ host: h }),
    GET_PUBLICATION_ID,
    { revalidate: 3600 },
    (d) => Boolean(d.publication?.id),
  );
  const id = data.publication?.id;
  if (!id) throw new Error(`Hashnode publication not found for host (tried: ${hosts.join(", ")}; last: ${host})`);
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
    data = await hashnodeRequest<GetPostSlugsPageData, { host: string; first: number; after: string }>(
      GET_POST_SLUGS_PAGE,
      { host: hostToUse, first: pageSize, after: pageInfo.endCursor },
      options,
    );
    pushEdges(data);
    pageInfo = data.publication?.posts.pageInfo;
  }

  return out;
}


