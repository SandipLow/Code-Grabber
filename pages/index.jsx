import { useState } from 'react';

import Head from 'next/head'
import PostCard from '../components/PostCard';

export default function Home({ recentPosts, popularPosts }) {

  return (
    <>
      <Head>
        <title>Code Grabber</title>
        <meta name="description" content="Code snipptes for the coders from a coder" />
      </Head>

      <div className="flex justify-between m-10 rounded bg-purple-200">
        <div className="p-8 pt-16 pb-16 text-center w-full md:w-1/2">
          <h1 className="text-3xl text-yellow-800 font-bold mb-7">Welcome to Code Grabber</h1>
          <p className="text-gray-800 mb-6">Grab Code snippets for popular languages and frameworks that will Rock your Developer Experience...😉.</p>
          <div className='mt-10'>
            <button className="rounded border-gray-600 border font-bold text-gray-200 px-3 py-2 bg-gray-600 mx-2">Explore</button>
            <button className="rounded border-gray-600 border font-bold text-gray-600 px-3 py-2 bg-gray-200 mx-2">Get Started</button>
          </div>
        </div>
        <div className="hidden w-1/2 lg:block text-center" style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}>
          <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)' }} className="h-full"></div>
        </div>
      </div>

      <div className="m-10">
        <h1 className="text-3xl font-bold m-4 text-center">Recent Posts :</h1>
        <div className="flex flex-wrap justify-evenly">

          { recentPosts.map((post, ind) => 
              <PostCard 
                key={ind} 
                img={post.img} 
                slug={post.slug ? post.slug : undefined} 
                title={post.title} 
                shortDesc={post.description} 
              />
          )}

        </div>
      </div>

      <div className="p-10 bg-gray-800">
        <h1 className="text-3xl font-bold m-4 text-center">Popular Posts :</h1>
        <div className="flex flex-wrap justify-evenly">

        { popularPosts.map((post, ind) => 
              <PostCard 
                key={ind} 
                dark
                img={post.img} 
                slug={post.slug ? post.slug : undefined} 
                title={post.title} 
                shortDesc={post.description} 
              />
          )}

          <div className="m-4 p-4 rounded-md bg-gray-700 flex text-center w-96">
            <h2 className="font-bold text-purple-200 w-full">More...</h2>
          </div>

        </div>
      </div>
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
