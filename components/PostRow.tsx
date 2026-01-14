"use client";

import Link from "next/link";
import { formatNavDate } from "@/lib/ui/date";
import { usePostViews } from "@/hooks/usePostViews";
import type { HashnodePost } from "@/lib/hashnode/types";
import type { Lang } from "@/lib/i18n";

export function PostRow({ post, lang }: { post: HashnodePost; lang: Lang }) {
  const views = usePostViews(post.slug, { increment: false });

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
      {views !== null && (
        <div className="shrink-0 font-mono text-[12px] text-[var(--muted)]">
          ({views.toLocaleString()} views)
        </div>
      )}
    </li>
  );
}
