import type { HashnodePost, HashnodePostWithContent } from "./types";

/**
 * Fallback scraper to fetch posts from a user's Hashnode profile
 * using the Next.js App Router RSC payload since the free GraphQL API was disabled.
 */
export async function scrapeRecentPosts(username = "gokmens"): Promise<HashnodePost[]> {
  try {
    const res = await fetch(`https://hashnode.com/@${username}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error(`[Hashnode Scraper] Failed to fetch profile page: ${res.status}`);
      return [];
    }

    const html = await res.text();
    const rscLines = html.split('\n').filter((l: string) => l.includes('initialPosts'));

    for (const line of rscLines) {
      const match = line.match(/initialPosts\\":(\[.*\])/);
      if (match) {
        const s = match[1];
        // Parse the exact bounds of the JSON array within the escaped string
        let depth = 0;
        let endIdx = -1;
        for (let i = 0; i < s.length; i++) {
          if (s[i] === '[') depth++;
          else if (s[i] === ']') {
            depth--;
            if (depth === 0) {
              endIdx = i;
              break;
            }
          }
        }

        if (endIdx !== -1) {
          let arrStr = s.substring(0, endIdx + 1);
          // Unescape quotes
          arrStr = arrStr.replace(/\\"/g, '"');
          // Strip Hashnode's Next.js date prefix, e.g. "$D2026-01-18T17:24:50.723Z" -> "2026-01-18T17:24:50.723Z"
          arrStr = arrStr.replace(/"\$D(.*?)"/g, '"$1"');

          try {
            const rawPosts = JSON.parse(arrStr);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return rawPosts.map((p: any) => ({
              id: p.postId,
              title: p.title,
              slug: p.slug,
              brief: p.brief,
              coverImage: p.coverImage,
              publishedAt: p.publishedAt,
              tags: [] // The feed doesn't include tags directly, but it's enough for lists
            }));
          } catch (e) {
            console.error("[Hashnode Scraper] Error parsing JSON array:", e);
          }
        }
      }
    }
  } catch (err) {
    console.error("[Hashnode Scraper] Unhandled error:", err);
  }

  return [];
}

/**
 * Fallback scraper to fetch a single post by slug by parsing the RSC html.
 */
export async function scrapePostBySlug(username: string, slug: string): Promise<HashnodePostWithContent | null> {
  try {
    const res = await fetch(`https://hashnode.com/@${username}/${slug}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
       console.error(`[Hashnode Scraper] Failed to fetch post page: ${res.status}`);
       // Fallthrough instead of returning null directly to hit the recentPosts extraction
    }

    const html = await res.text();

    // Fallback logic, as the actual full text parsing is complex through RSC chunks,
    // we try to locate "html" content inside the RSC tree if possible.
    const rscLines = html.split('\n').filter((l: string) => l.includes('__next_f.push') && l.includes('content') && l.includes('html'));
    let contentHtml = null;
    if (rscLines.length > 0) {
       const line = rscLines[0];
       const match = line.match(/\\"html\\":\\"(.*?)\\"/);
       if (match) {
           contentHtml = match[1];
       } else {
           const match2 = line.match(/"html":"(.*?)"/);
           if (match2) contentHtml = match2[1];
       }
    }

    // Unescape unicode references if necessary
    if (contentHtml) {
        contentHtml = contentHtml.replace(/\\u([0-9a-fA-F]{4})/g, (m: string, cc: string) => String.fromCharCode(parseInt(cc, 16)));
        contentHtml = contentHtml.replace(/\\n/g, "\n").replace(/\\"/g, '"');
    }

    // We can also extract the raw post data using the recent posts method
    // to populate the shell properties.
    const recentPosts = await scrapeRecentPosts(username);
    const post = recentPosts.find(p => p.slug === slug);

    if (post) {
      return {
        ...post,
        content: { html: contentHtml || "" }
      };
    }
  } catch (e) {
      console.error("[Hashnode Scraper] Error fetching post by slug:", e);
  }

  // If we can't find it in recent posts, fallback to a dummy post to prevent 404
  return {
    id: `fallback-${slug}`,
    title: slug.replace(/-/g, " "),
    slug: slug,
    brief: "",
    publishedAt: new Date().toISOString(),
    tags: [],
    content: { html: "" }
  };
}
