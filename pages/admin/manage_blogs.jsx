import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import Spinner from 'react-spinner-material'
import { Posts } from '../../client/components/Posts'
import { BannerPost } from '../../client/components/Banner'

const ManageBlogs = ({ auth }) => {

    const [blogs, setBlogs] = useState(null)

    const delete_blog = (id) => {

        let headersList = {
            "Accept": "*/*",
            "auth-token": JSON.parse(localStorage.getItem("user")).authtoken
        }

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blogs/deleteblog/${id}`, {
            method: "DELETE",
            headers: headersList
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            document.getElementById(`delete_op_result_${id}`).innerText = data;
            // console.log(data);
        })
    }

    useEffect(()=>{

        let headersList = {
            "Accept": "*/*",
            "auth-token": JSON.parse(localStorage.getItem("user")).authtoken
        }
           
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blogs/getuserblogs`, {
            method: "GET",
            headers: headersList
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            // console.log(data);
            setBlogs(data);
        }).catch((err)=>console.log(err))

    }, [auth.user])

    return (
        <>
        <Head>
            <title>Manage Blogs | Code Grabber</title>
        </Head>

        <BannerPost 
            title='Manage Your Blogs'
            img="/Assets/code_bg_02.jpg"
        />

        {
            !blogs ? <Spinner className='my-2 mx-2' radius={40} color={"#5b21b6"} stroke={5} visible />
            : <Posts 
                title='Manage Your Blogs'
                posts={blogs.map(blog=>{
                    return {...blog, url: `/admin/blogs/${blog.slug}`}
                })}
            />
        }
        </>
    )
}


export default ManageBlogs
