import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client'; // prismic
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.container}>
        <Header />

        <ul>
          {postsPagination.results.map(post => {
            return (
              <li className={styles.post} key={post.uid}>
                <Link href="/">
                  <a>
                    <strong>{post.data.title}</strong>
                  </a>
                </Link>
                <p>{post.data.subtitle}</p>

                <section>
                  <div>
                    <FiCalendar />
                    <span>
                      {format(
                        new Date(post.first_publication_date),
                        'dd MMM yyyy',
                        {
                          locale: ptBR,
                        }
                      )}
                    </span>
                  </div>
                  <div>
                    <FiUser />
                    <span>{post.data.author}</span>
                  </div>
                </section>
              </li>
            );
          })}
        </ul>

        <button type="button">Carregar mais posts</button>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    Prismic.Predicates.at('document.type', 'posts'),
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    }
  );

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: postsResponse.results,
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
