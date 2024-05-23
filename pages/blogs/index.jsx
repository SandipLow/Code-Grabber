import React, { useEffect, useState } from 'react'
import { BannerPost } from '../../client/components/Banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { Posts } from '../../client/components/Posts';
import useInitialLoad from '../../client/hooks/initialLoad'

export default function Page({ recentPosts, popularPosts, auth }) {

    const [searchResults, setSearchResults] = useState(null);

    const initialLoad = useInitialLoad();


    useEffect(()=> {
        // fetch search results based on req query
        const url = new URL(window.location.href);
        const query = url.searchParams.get('q');
        if(query) {
            handleSearch(query);
        }    
    }, [])
    

    const handleSearch = (query)=> {
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
            <meta name="description" content="Welcome to CodeGrabber, the ultimate blogging platform for coders and developers! CodeGrabber is designed to be a haven for coding enthusiasts where they can share their knowledge, insights, and experiences with the programming community." />
            <meta name="keywords" content="JavaScript, Python, Java, C++, Ruby, PHP, Swift, Go, Rust, Kotlin, HTML, CSS, Responsive web design, Front-end development, Back-end development, UX/UI design, React, Angular, Vue.js, iOS development, Android development, Swift programming, Kotlin programming, Data visualization, Machine learning, Artificial intelligence, Python libraries, Agile development, Scrum, Test-driven development, Continuous integration, Continuous deployment, Version control, Node.js, Django, Laravel, Ruby on Rails, Flask, Docker, Kubernetes, OOP, Functional programming, Algorithms, Data structures, Design patterns, API development"/>
            <meta name="author" content="Sandip Low" />
            <link rel="author" href="https://sandiplow.github.io" />
            <link rel="canonical" href="https://codegrabber.vercel.app/blogs" />
        </Head>
        <BannerPost 
            title="Blogs Page" 
        />
        {/* Search bar */}
        {/* <div className='w-full grid place-items-center'>
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
        </div> */}

        {
            searchResults ? 
                <Posts title={`Search Results for "${new URL(window.location.href).searchParams.get("q")}"`} posts={searchResults} />
            :
                null
        }

        <Posts title="Recent Posts" posts={recentPosts} />
        <Posts title="Popular Posts" posts={popularPosts} />

        {
            !initialLoad && auth.user ? 
                <LikedBlogs />
            :
                null
        }
        </>
    )
}

const LikedBlogs = ()=> {
    const [likedBlogs, setLikedBlogs] = useState([]);

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


    return <Posts title="Liked Posts" posts={likedBlogs} />
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
