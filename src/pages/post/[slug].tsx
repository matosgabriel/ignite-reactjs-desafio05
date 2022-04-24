import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import PrismicDOM from 'prismic-dom';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const readTime = Math.round(
    post.data.content.reduce((acumulator, currentValue) => {
      const wordCount =
        acumulator +
        PrismicDOM.RichText.asText(currentValue.body).split(' ').length;

      return wordCount;
    }, 0) / 200
  );

  return (
    <>
      <Head>
        <title>Post | {post.data.title}</title>
      </Head>

      <div className={commonStyles.container}>
        <Header />

        <img src={post.data.banner.url} alt="" className={styles.banner} />

        <main className={styles.content}>
          <h1>{post.data.title}</h1>

          <section className={commonStyles.postInfo}>
            <div>
              <FiCalendar />
              <span>
                {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </span>
            </div>
            <div>
              <FiUser />
              <span>{post.data.author}</span>
            </div>
            <div>
              <FiClock />
              <span>{readTime} min</span>
            </div>
          </section>

          {post.data.content.map(content => {
            return (
              <section key={content.heading} className={styles.postContent}>
                <h2>{content.heading}</h2>

                {content.body.map(paragraph => {
                  return <p key={paragraph.text}>{paragraph.text}</p>;
                })}
              </section>
            );
          })}
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.getByType(TODO);

  // TODO
  return {
    paths: [{ params: { slug: 'como-utilizar-hooks' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: response,
    },
  };
};
