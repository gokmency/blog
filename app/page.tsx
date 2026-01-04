import { PostFeed } from "@/components/PostFeed";
import { getRecentPosts } from "@/lib/hashnode/api";
import { Hero } from "@/components/Hero";

export default async function Home() {
  const posts = await getRecentPosts(20);

  return (
    <>
      <Hero />
      <PostFeed posts={posts} />
    </>
  );
}
