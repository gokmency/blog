import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "@/lib/hashnode/api";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const markdown = post.content?.markdown ?? "";

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


