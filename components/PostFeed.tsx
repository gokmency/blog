"use client";

import Link from "next/link";
import type { HashnodePost } from "@/lib/hashnode/types";
import { formatNavDate } from "@/lib/ui/date";

export function PostFeed({ posts }: { posts: HashnodePost[] }) {
  return (
    <section className="py-12">
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <li key={post.slug} className="flex items-baseline gap-4">
            <div className="w-[72px] shrink-0 font-mono text-[12px] text-[var(--muted)]">
              [{formatNavDate(post.publishedAt)}]
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="font-serif text-[18px] leading-snug text-[var(--foreground)] hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}


