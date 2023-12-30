import React, { useEffect, useState } from 'react'
import { BannerPost } from '../../client/components/Banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { Posts } from '../../client/components/Posts';

export default function Page({ recentPosts, popularPosts }) {

    const [likedBlogs, setLikedBlogs] = useState([]);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);


    useEffect(()=> {
        fetch(`/api/blogs/get-user-liked-blogs`, {
            method: 'GET',
            headers: {
                "Accept": "*/*",
                "auth-token": JSON.parse(localStorage.getItem("user")).authtoken,
                "Content-Type": "application/json"
            }
        })
        .then(res=> res.json())
        .then(data=> {
            setLikedBlogs(data);
        })
        .catch(err=> console.log(err))
    }, [])
    

    const handleSearch = ()=> {
        fetch(`/api/blogs/search-blogs?q=${query}`)
        .then(res=> res.json())
        .then(data=> {
            setSearchResults(data);
        })
        .catch(err=> console.log(err))
    }

    return (
        <>
        <Head>
            <title>Blogs | Code Grabber</title>
        </Head>
        <BannerPost 
            title="Blogs Page" 
        />
        <div className='w-full grid place-items-center'>
            {/* Search bar */}
            <div className='w-fit border border-cdek-gray rounded-full flex my-2'>
                <input 
                    className='py-2 px-4 outline-none bg-transparent' 
                    type="text" 
                    placeholder='Search the blogs here' 
                    value={query} 
                    onChange={e=>setQuery(e.target.value)} 
                />
                <button className='px-2 w-8' onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>

        {
            searchResults ? 
                <Posts title="Search Results" posts={searchResults} />
            :
                null
        }

        <Posts title="Recent Posts" posts={recentPosts} />
        <Posts title="Popular Posts" posts={popularPosts} />
        <Posts title="Liked Posts" posts={likedBlogs} />
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
