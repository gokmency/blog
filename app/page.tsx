import { PostFeed } from "@/components/PostFeed";
import { getRecentPosts } from "@/lib/hashnode/api";
import { Hero } from "@/components/Hero";
import { AskBar } from "@/components/AskBar";

export default async function Home() {
  const posts = await getRecentPosts(20);

  return (
    <>
      <Hero />
      <AskBar />
      <PostFeed posts={posts} />
    </>
  );
}
