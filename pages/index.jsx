import Head from 'next/head'
import { BannerHome } from '../client/components/Banner';
import { Posts } from '../client/components/Posts';

export default function Home({ recentPosts, popularPosts }) {

  return (
    <>
      <Head>
        <title>Code Grabber</title>
        <meta name="title" content="Code Grabber" />
        <meta name="description" content="Welcome to CodeGrabber, the ultimate blogging platform for coders and developers! CodeGrabber is designed to be a haven for coding enthusiasts where they can share their knowledge, insights, and experiences with the programming community." />
        <meta name="keywords" content="JavaScript, Python, Java, C++, Ruby, PHP, Swift, Go, Rust, Kotlin, HTML, CSS, Responsive web design, Front-end development, Back-end development, UX/UI design, React, Angular, Vue.js, iOS development, Android development, Swift programming, Kotlin programming, Data visualization, Machine learning, Artificial intelligence, Python libraries, Agile development, Scrum, Test-driven development, Continuous integration, Continuous deployment, Version control, Node.js, Django, Laravel, Ruby on Rails, Flask, Docker, Kubernetes, OOP, Functional programming, Algorithms, Data structures, Design patterns, API development"/>
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="12 days" />
      </Head>

      <BannerHome />

      <h1 className="font-bebas-neue text-4xl pl-4 mt-12" >Core Features</h1><hr className="mb-2" />

      <section className="grid justify-items-center w-full p-4 mt-12">
        <div className='max-w-7xl text-left w-full flex flex-wrap justify-evenly items-center'>
          <div className='p-4 mx-2 flex-grow text-center rounded-lg bg-slate-200'>
            <img className='h-96 w-72 object-cover inline-block' src="/Assets/upload.webp" alt="upload" />
          </div>
          <div className='p-4 mx-2 flex-grow'>
            <h2 className=' font-bold text-2xl mb-4'>
              Built in online Asset manager
            </h2>
            <p>
              Manage assets and images for your blog with our built in asset manager. Get free storage upto 1GB.
            </p>
          </div>
        </div>
      </section>

      <section className="grid justify-items-center w-full p-4 mt-12">
        <div className='max-w-7xl text-left w-full flex flex-wrap justify-evenly items-center'>
          <div className='p-4 mx-2 flex-grow'>
            <h2 className=' font-bold text-2xl mb-4'>
              Markdown support for writing blogs
            </h2>
            <p>
              Write blogs in markdown and get it converted to HTML on the fly. No need to learn HTML.
            </p>
          </div>
          <div className='p-4 mx-2 flex-grow text-center rounded-lg bg-slate-200'>
            <img className='w-96 h-72 object-cover inline-block' src="https://miro.medium.com/v2/resize:fit:1200/0*lzRmzAy5OICef7rK.png" alt="md" />
          </div>
        </div>
      </section>

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
