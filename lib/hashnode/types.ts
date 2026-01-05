export type HashnodeTag = {
  id: string;
  slug: string;
  name: string;
};

export type HashnodePost = {
  id: string;
  title: string;
  slug: string;
  brief?: string | null;
  publishedAt: string;
  tags: HashnodeTag[];
};

export type HashnodePostContent = {
  id?: string;
  markdown?: string | null;
  html?: string | null;
};

export type HashnodePostWithContent = HashnodePost & {
  content?: HashnodePostContent | null;
};

export type GetPublicationIdData = {
  publication: { id: string } | null;
};

export type GetPostsData = {
  publication: {
    id: string;
    posts: {
      edges: Array<{
        node: HashnodePost;
      }>;
    };
  } | null;
};

export type GetPostBySlugData = {
  publication: {
    id: string;
    post: HashnodePostWithContent | null;
  } | null;
};



