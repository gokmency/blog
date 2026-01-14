import type { HashnodePost } from "@/lib/hashnode/types";
import type { Lang } from "@/lib/i18n";
import { PostRow } from "./PostRow";

export function PostFeed({ posts, lang }: { posts: HashnodePost[]; lang: Lang }) {
  return (
    <section className="py-12">
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} lang={lang} />
        ))}
      </ul>
    </section>
  );
}


