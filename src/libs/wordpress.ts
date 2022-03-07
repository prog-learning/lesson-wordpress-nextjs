const API_URL = process.env.WORDPRESS_API_URL || '';

async function fetchAPI(query: string, { variables }: any = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export const getAllPostsWithSlug = async () => {
  const data = await fetchAPI(`
    {
      posts(first: 100) {
        edges {
          node {
            content
            slug
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `);
  return data?.posts;
};
