export type HashnodeTag = {
  slug: string;
  name: string;
};

export type HashnodePost = {
  title: string;
  slug: string;
  brief?: string | null;
  publishedAt: string;
  tags: HashnodeTag[];
};

export type HashnodePostContent = {
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
    posts: {
      edges: Array<{
        node: HashnodePost;
      }>;
    };
  } | null;
};

export type GetPostBySlugData = {
  publication: {
    post: HashnodePostWithContent | null;
  } | null;
};



