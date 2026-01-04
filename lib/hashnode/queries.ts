export const HASHNODE_PUBLICATION_HOST = "gokmens.hashnode.dev" as const;

export const GET_PUBLICATION_ID = /* GraphQL */ `
  query GetPublicationId($host: String!) {
    publication(host: $host) {
      id
    }
  }
`;

export const GET_POSTS = /* GraphQL */ `
  query GetPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            title
            slug
            brief
            publishedAt
            tags {
              slug
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = /* GraphQL */ `
  query GetPostBySlug($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        title
        slug
        brief
        publishedAt
        tags {
          slug
          name
        }
        content {
          markdown
          html
        }
      }
    }
  }
`;


