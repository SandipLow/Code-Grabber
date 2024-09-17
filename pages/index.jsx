import Head from 'next/head';
import { BannerHome } from '../client/components/Banner';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Code Grabber</title>
        <meta name="title" content="Code Grabber" />
        <meta name="description" content="Welcome to CodeGrabber, the ultimate blogging platform for coders and developers! CodeGrabber is designed to be a haven for coding enthusiasts where they can share their knowledge, insights, and experiences with the programming community." />
        <meta name="keywords" content="JavaScript, Python, Java, C++, Ruby, PHP, Swift, Go, Rust, Kotlin, HTML, CSS, Responsive web design, Front-end development, Back-end development, UX/UI design, React, Angular, Vue.js, iOS development, Android development, Swift programming, Kotlin programming, Data visualization, Machine learning, Artificial intelligence, Python libraries, Agile development, Scrum, Test-driven development, Continuous integration, Continuous deployment, Version control, Node.js, Django, Laravel, Ruby on Rails, Flask, Docker, Kubernetes, OOP, Functional programming, Algorithms, Data structures, Design patterns, API development"/>
        <meta name="author" content="Sandip Low" />
        <link rel="author" href="https://sandiplow.github.io" />
        <link rel="canonical" href="https://codegrabber.vercel.app" />
      </Head>

      {/* Main Banner */}
      <BannerHome />

      {/* Core Features Section */}
      <section className="max-w-7xl mx-auto text-center mt-12 px-4">
        <h1 className="font-bebas-neue text-5xl text-cdek-aqua mb-6">Core Features</h1>
        <hr className="border-cdek-aqua mb-8" />

        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className='rounded-lg overflow-hidden shadow-lg bg-gray-100'>
            <Image
              src="/Assets/upload.webp"
              alt="upload"
              width={400}
              height={500}
              className='object-cover h-full w-full'
            />
          </div>
          <div className='text-left'>
            <h2 className='font-roboto-flex font-bold text-3xl text-gray-800 mb-4'>Built-in Online Asset Manager</h2>
            <p className='text-lg text-gray-700'>
              Manage assets and images for your blog with our built-in asset manager. Get free storage up to 1GB, making it easier to keep your blog organized.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className='text-left order-2 md:order-1'>
            <h2 className='font-roboto-flex font-bold text-3xl text-gray-800 mb-4'>Markdown Support for Writing Blogs</h2>
            <p className='text-lg text-gray-700'>
              Write blogs in markdown and get them converted to HTML on the fly. No need to worry about learning HTML, just focus on your content.
            </p>
          </div>
          <div className='rounded-lg overflow-hidden shadow-lg bg-gray-100 order-1 md:order-2'>
            <Image
              src="/Assets/markdown_support.png"
              alt="Markdown Support"
              width={500}
              height={400}
              className='object-cover h-full w-full'
            />
          </div>
        </div>
      </section>
    </>
  );
}
