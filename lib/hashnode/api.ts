import { hashnodeRequest } from "./client";
import { GET_POST_BY_SLUG, GET_POSTS, GET_PUBLICATION_ID, SUBSCRIBE_TO_NEWSLETTER } from "./queries";
import type {
  GetPostBySlugData,
  GetPostsData,
  GetPublicationIdData,
  HashnodePost,
  HashnodePostWithContent,
  NewsletterSubscribeStatus,
  SubscribeToNewsletterData,
} from "./types";

export async function getRecentPosts(first = 20): Promise<HashnodePost[]> {
  const data = await hashnodeRequest<GetPostsData, { first: number }>(GET_POSTS, { first }, { revalidate: 60 });
  const edges = data.publication?.posts.edges ?? [];
  return edges.map((e) => e.node);
}

export async function getPostBySlug(slug: string): Promise<HashnodePostWithContent | null> {
  const data = await hashnodeRequest<GetPostBySlugData, { slug: string }>(
    GET_POST_BY_SLUG,
    { slug },
    { revalidate: 60 },
  );
  return data.publication?.post ?? null;
}

export async function getPublicationId(): Promise<string> {
  const data = await hashnodeRequest<GetPublicationIdData, undefined>(GET_PUBLICATION_ID, undefined, { revalidate: 3600 });
  const id = data.publication?.id;
  if (!id) throw new Error("Hashnode publication not found for host");
  return id;
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscribeStatus> {
  const publicationId = await getPublicationId();
  const data = await hashnodeRequest<SubscribeToNewsletterData, { input: { publicationId: string; email: string } }>(
    SUBSCRIBE_TO_NEWSLETTER,
    { input: { publicationId, email } },
    { revalidate: 0 },
  );
  return data.subscribeToNewsletter.status;
}


