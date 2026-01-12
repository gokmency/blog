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
      id
      posts(first: $first) {
        edges {
          node {
            id
            title
            slug
            brief
            publishedAt
            tags {
              id
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
      id
      post(slug: $slug) {
        id
        title
        slug
        brief
        publishedAt
        tags {
          id
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

export const GET_POST_SLUGS_PAGE = /* GraphQL */ `
  query GetPostSlugsPage($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      id
      posts(first: $first, after: $after) {
        edges {
          node {
            slug
            publishedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;


