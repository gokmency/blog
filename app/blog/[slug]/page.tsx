import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "@/lib/hashnode/api";

function normalizeHashnodeMarkdown(md: string) {
  // Hashnode markdown sometimes includes non-standard attrs inside image URLs:
  // ![](https://...png align="center")
  // react-markdown treats that as part of the URL, so the image fails to load.
  return md.replace(/\((https?:\/\/[^)\s]+)\s+align="[^"]*"\)/g, "($1)");
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await Promise.resolve(params);
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const markdown = normalizeHashnodeMarkdown(post.content?.markdown ?? "");

  return (
    <article className="py-16">
      <header className="mb-12">
        <h1 className="font-serif text-[32px] leading-tight tracking-tight text-[var(--foreground)]">
          {post.title}
        </h1>
      </header>

      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </article>
  );
}


