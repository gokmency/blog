import type { HashnodePost } from "@/lib/hashnode/types";
import type { Language } from "@/contexts/LanguageContext";

const TR_TAGS = new Set(["tr", "turkish", "türkçe", "turkce"]);
const EN_TAGS = new Set(["en", "english"]);

function postTagSlugs(post: HashnodePost) {
  return (post.tags ?? []).map((t) => (t.slug || "").toLowerCase());
}

export function isTurkishPost(post: HashnodePost) {
  const slugs = postTagSlugs(post);
  return slugs.some((s) => TR_TAGS.has(s));
}

export function isEnglishPost(post: HashnodePost) {
  const slugs = postTagSlugs(post);
  return slugs.some((s) => EN_TAGS.has(s));
}

export function filterPostsByLanguage(posts: HashnodePost[], language: Language) {
  if (language === "tr") return posts.filter((p) => isTurkishPost(p));
  // EN: explicit EN tags OR no explicit language tags at all
  return posts.filter((p) => {
    const isTR = isTurkishPost(p);
    const isEN = isEnglishPost(p);
    return isEN || (!isTR && !isEN);
  });
}


