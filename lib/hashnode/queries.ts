export const HASHNODE_PUBLICATION_HOST = "gokmens.hashnode.dev" as const;

export const GET_PUBLICATION_ID = /* GraphQL */ `
  query GetPublicationId {
    publication(host: "gokmens.hashnode.dev") {
      id
    }
  }
`;

export const GET_POSTS = /* GraphQL */ `
  query GetPosts($first: Int!) {
    publication(host: "gokmens.hashnode.dev") {
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
  query GetPostBySlug($slug: String!) {
    publication(host: "gokmens.hashnode.dev") {
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

export const SUBSCRIBE_TO_NEWSLETTER = /* GraphQL */ `
  mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
    subscribeToNewsletter(input: $input) {
      status
    }
  }
`;


