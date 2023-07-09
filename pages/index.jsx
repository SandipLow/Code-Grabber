import Head from 'next/head'
import { BannerHome } from '../client/components/Banner';
import { Posts } from '../client/components/Posts';

export default function Home({ recentPosts, popularPosts }) {

  return (
    <>
      <Head>
        <title>Code Grabber</title>
        <meta name="title" content="Code Grabber" />
        <meta name="description" content="Code snipptes for the coders from the coders" />
        <meta name="keywords" content="JavaScript, Python, Java, C++, Ruby, PHP, Swift, Go, Rust, Kotlin, HTML, CSS, Responsive web design, Front-end development, Back-end development, UX/UI design, React, Angular, Vue.js, iOS development, Android development, Swift programming, Kotlin programming, Data visualization, Machine learning, Artificial intelligence, Python libraries, Agile development, Scrum, Test-driven development, Continuous integration, Continuous deployment, Version control, Node.js, Django, Laravel, Ruby on Rails, Flask, Docker, Kubernetes, OOP, Functional programming, Algorithms, Data structures, Design patterns, API development"/>
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="12 days" />
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
