"use client";

import { usePostViews } from "@/hooks/usePostViews";

export function ViewTracker({ slug }: { slug: string }) {
  usePostViews(slug, { increment: true });
  return null;
}
