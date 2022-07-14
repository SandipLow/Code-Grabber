import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import PostCard from '../components/PostCard'

const ManageBlogs = () => {

    const [blogs, setBlogs] = useState([])

    const Blogs = blogs.map((blog, ind)=>{
        return(<>
            <div className='flex items-center'>
                <PostCard img={blog.img} slug={blog.slug?blog.slug:undefined} title={blog.title} dark={false} shortDesc={blog.description} key={ind} />
                <button className='bg-white rounded-full text-lg px-3 py-2 transition hover:bg-gray-500'>🗑️</button>
                {/* <button onClick={delete(blog._id)} className='bg-white rounded-full text-lg px-3 py-2 transition hover:bg-gray-500'>🗑️</button> */}
            </div>
        </>) 
    })

    useEffect(()=>{

        let headersList = {
            "Accept": "*/*",
            "auth-token": localStorage.getItem("auth-token")
        }
           
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blogs/getallblogs`, {
            method: "GET",
            headers: headersList
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            // console.log(data);
            setBlogs(data);
        }).catch((err)=>console.log(err))

    }, [])

    return (
        <>
        <Head>
            <title>Manage Blogs | Code Grabber</title>
        </Head>
        <div>
            {Blogs}
        </div>
        </>
    )
}


export default ManageBlogs
