"use client";

import Link from "next/link";
import { formatNavDate } from "@/lib/ui/date";
import { usePostViews } from "@/hooks/usePostViews";
import type { HashnodePost } from "@/lib/hashnode/types";
import type { Lang } from "@/lib/i18n";

export function PostRow({ post, lang, views }: { post: HashnodePost; lang: Lang; views?: number | null }) {
  // If views prop is passed, use it. Otherwise, fetch it.
  // We can't conditionally call hooks, so we always call usePostViews.
  // However, we can optimize: if views is passed, we might ignore the hook result?
  // But hooks must run.
  // To avoid double fetching if views is provided, we can pass a 'skip' option to usePostViews?
  // Or we can just use usePostViews internally only if views is undefined?
  // We can't conditionally render the hook.

  // Alternative: Refactor usePostViews to accept an `initialData` or `skip` option.
  // But complicating usePostViews might affect other consumers.

  // Since we know PostRow is currently only used in PostFeed (where we batch),
  // and we want to support potential future individual usage:

  // If we want to be safe, we can use a custom hook call that does nothing if we have data?
  // Or simply:

  const fetchedViews = usePostViews(views === undefined ? post.slug : "", { increment: false });

  // If views is provided, use it. If not, use fetchedViews.
  // If views is provided, we passed "" as slug to usePostViews, so it returns null/0 immediately and does nothing.

  const displayViews = views !== undefined ? views : fetchedViews;

  return (
    <li className="flex items-baseline gap-4">
      <div className="w-[72px] shrink-0 font-mono text-[12px] text-[var(--muted)]">
        [{formatNavDate(post.publishedAt)}]
      </div>
      <Link
        href={`/${lang}/blog/${post.slug}`}
        className="font-serif text-[18px] leading-snug text-[var(--foreground)] hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4"
      >
        {post.title}
      </Link>
      {displayViews !== undefined && displayViews !== null && (
        <div className="shrink-0 font-mono text-[12px] text-[var(--muted)]">
          ({displayViews.toLocaleString()} views)
        </div>
      )}
    </li>
  );
}
