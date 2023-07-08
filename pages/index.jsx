import Head from 'next/head'
import { BannerHome } from '../client/components/Banner';
import { Posts } from '../client/components/Posts';

export default function Home({ recentPosts, popularPosts }) {

  return (
    <>
      <Head>
        <title>Code Grabber</title>
        <meta name="description" content="Code snipptes for the coders from a coder" />
      </Head>

      <BannerHome />

      <Posts title="Recent Posts" posts={recentPosts} />
      <Posts title="Popular Posts" posts={popularPosts} />
    </>
  )
}

export async function getServerSideProps(context) {
  let fet = await fetch(`${process.env.BACKEND_HOST}/api/blogs/recents`);
  let recentPosts = await fet.json();

  let fet2 = await fetch(`${process.env.BACKEND_HOST}/api/blogs/populars`);
  let popularPosts = await fet2.json();

  return {
    props: { recentPosts, popularPosts }
  }
}
