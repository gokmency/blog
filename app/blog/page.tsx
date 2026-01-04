import { PostFeed } from "@/components/PostFeed";
import { getRecentPosts } from "@/lib/hashnode/api";

export default async function BlogPage() {
  const posts = await getRecentPosts(20);

  return (
    <section className="py-16">
      <h1 className="mb-8 font-serif text-[28px] leading-tight tracking-tight text-[var(--foreground)]">
        Blog
      </h1>
      <PostFeed posts={posts} />
    </section>
  );
}


