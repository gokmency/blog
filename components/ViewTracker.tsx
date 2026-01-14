"use client";

import { usePostViews } from "@/hooks/usePostViews";

export function ViewTracker({ slug }: { slug: string }) {
  const views = usePostViews(slug, { increment: true });

  if (views === null) return null;

  return (
    <div className="mt-2 font-mono text-sm text-[var(--muted)]">
      {views.toLocaleString()} views
    </div>
  );
}
