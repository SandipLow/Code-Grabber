import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import PostCard from '../components/PostCard'

const ManageBlogs = () => {

    const [blogs, setBlogs] = useState([])

    const delete_blog = (id) => {

        let headersList = {
            "Accept": "*/*",
            "auth-token": localStorage.getItem("auth-token")
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blogs/deleteblog/${id}`, {
            method: "DELETE",
            headers: headersList
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            document.getElementById("delete_op_result").innerText = data;
            // console.log(data);
        })
    }

    const Blogs = blogs.map((blog, ind)=>{
        return(
            <div className='flex items-center flex-wrap justify-center' style={{'width': 'fit-content'}} key={ind} >
                <PostCard img={blog.img} slug={blog.slug?blog.slug:undefined} title={blog.title} dark={false} shortDesc={blog.description}/>
                <div style={{'width': 'fit-content'}} >
                    <button onClick={() => delete_blog(blog._id)} className='bg-white rounded-full text-lg mx-4 px-3 py-2 transition hover:bg-gray-500'>🗑️</button>
                    <Link href={`blogs/${blog.slug}`}><button className='bg-white rounded-full text-lg mx-4 px-3 py-2 transition hover:bg-gray-500'>✍🏼</button></Link>
                </div>
                <span className='text-sm text-green-400 mx-7' id='delete_op_result' ></span>
            </div>
        ) 
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
        <center>
            {Blogs}
        </center>
        </>
    )
}


export default ManageBlogs
