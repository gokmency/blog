"use client";

import type { HashnodePost } from "@/lib/hashnode/types";
import type { Lang } from "@/lib/i18n";
import { PostRow } from "./PostRow";
import { useBatchedPostViews } from "@/hooks/usePostViews";

export function PostFeed({ posts, lang }: { posts: HashnodePost[]; lang: Lang }) {
  const slugs = posts.map(p => p.slug);
  const viewsMap = useBatchedPostViews(slugs);

  return (
    <section className="py-12">
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <PostRow
            key={post.slug}
            post={post}
            lang={lang}
            views={viewsMap[post.slug] ?? null}
          />
        ))}
      </ul>
    </section>
  );
}
