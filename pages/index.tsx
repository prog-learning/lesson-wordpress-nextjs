import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import { getAllPostsWithSlug } from '../src/libs/wordpress';
import styles from '../styles/Home.module.css';

export const getStaticProps = async () => {
  const res = await getAllPostsWithSlug();
  return {
    props: {
      posts: res.edges,
    },
  };
};

type Props = {
  posts: any[];
};

const Home: NextPage<Props> = ({ posts }) => {
  console.log(posts);

  const POSTS = gql`
    query getPosts {
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
  `;

  const { loading, error, data } = useQuery(POSTS);
  console.log(data);

  return (
    <div className={styles.container}>
      <h1>ぶろぐだね</h1>
    </div>
  );
};

export default Home;
