import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
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

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.container}>
        <Header />

        <ul>
          <li className={styles.post}>
            <Link href="/">
              <a>
                <strong>Como utilizar Hooks</strong>
              </a>
            </Link>
            <p>Pensando em sincronização ao invés de ciclos de vida.</p>

            <section>
              <div>
                <FiCalendar />
                <span>15 Mar 2021</span>
              </div>
              <div>
                <FiUser />
                <span>Joseph Oliveira</span>
              </div>
            </section>
          </li>

          <li className={styles.post}>
            <Link href="/">
              <a>
                <strong>Como utilizar Hooks</strong>
              </a>
            </Link>
            <p>Pensando em sincronização ao invés de ciclos de vida.</p>

            <section>
              <div>
                <FiCalendar />
                <span>15 Mar 2021</span>
              </div>
              <div>
                <FiUser />
                <span>Joseph Oliveira</span>
              </div>
            </section>
          </li>

          <li className={styles.post}>
            <Link href="/">
              <a>
                <strong>Como utilizar Hooks</strong>
              </a>
            </Link>
            <p>Pensando em sincronização ao invés de ciclos de vida.</p>

            <section>
              <div>
                <FiCalendar />
                <span>15 Mar 2021</span>
              </div>
              <div>
                <FiUser />
                <span>Joseph Oliveira</span>
              </div>
            </section>
          </li>
        </ul>

        <button type="button">Carregar mais posts</button>
      </div>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
