import Image from "next/image";

export function MarkdownImage(props: any) {
  // Hashnode/Markdown might pass different props, usually `src` and `alt`.
  const { src, alt, title } = props;

  if (!src) return null;

  return (
    <span className="my-8 block overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
      <Image
        src={src}
        alt={alt || "Blog content image"}
        title={title}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 680px"
        className="h-auto w-full object-cover"
        style={{ width: '100%', height: 'auto' }}
        loading="lazy"
      />
    </span>
  );
}
