// react and components :
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import CheckAuth from '../check_auth';
import BlogRender, { MarkDownContent } from '../../../client/components/BlogRender';

const Blog = (props) => {

    const [formData, setFormData] = useState(props.formData);

    const [tags, setTags] = useState([]);
    
    useEffect(() => {

        if (typeof(formData.tags)=='object') {

            let tags = formData.tags.map((tag, ind) => {
                return <input className=' bg-gray-800 p-2 mx-2 mb-2 rounded' key={ind} value={tag} onChange={(e)=>{
                    let temp = formData.tags;
                    temp[ind] = e.target.value;
                    setFormData({
                        ...formData,
                        tags : temp
                    })
                }} />
            })

            setTags(tags)
        }


    }, [formData]);

    const updateBlog = (e) => {
        e.preventDefault();

        let headersList = {
            "Accept": "*/*",
            "auth-token": JSON.parse(localStorage.getItem("user")).authtoken,
            "Content-Type": "application/json"
        }
        
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blogs/editblog/${formData._id}`, { 
            method: "PUT",
            body: JSON.stringify(formData),
            headers: headersList
        }).then(function(response) {
            if (response.status != 200) return;

            return response.text();
        }).then(function(data) {
            document.getElementById("result").innerText = data? "success" : "failed, some error occured";
            // console.log(data);
        })
    }

    return (
        <>
        <Head>
            <title>Edit Blog | Code Grabber</title>
            <link rel="stylesheet" href="/styles/blog.module.css" />
        </Head>

        <CheckAuth/>

        <form className='p-4' onSubmit={updateBlog} action="submit">
            <div className='my-4'>
                <label className=' font-semibold text-lg' htmlFor="title" >Title : </label>
                <input className=' bg-gray-800 h-8 p-2 mx-6 w-64 rounded' id='title' type="text" value={formData.title} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        title : e.target.value
                    })
                }} />
            </div>

            <div className="my-4">
                <label className=' font-semibold text-lg' htmlFor="description">Description : </label><br />
                <textarea className=' bg-gray-800 w-full p-4 mt-4 rounded' id='description' value={formData.description} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        description : e.target.value
                    })
                }} />
            </div>

            <div className="my-4">
                <label className=' font-semibold text-lg' htmlFor="tags">Tags : </label>
                { tags }
                <button onClick={(e)=>{
                    e.preventDefault()
                    let temp = [...formData.tags];
                    temp = [...temp, "Add Tag"]

                    setFormData({
                        ...formData,
                        tags : temp
                    })
                    
                }}>+</button>
                <button onClick={(e)=>{
                    e.preventDefault()
                    let temp = [...formData.tags];
                    temp.pop()

                    setFormData({
                        ...formData,
                        tags : temp
                    })
                    
                }}>-</button>
            </div>

            <div className="my-4">
                <label className=' font-semibold text-lg' htmlFor='slug' >Slug : </label>
                <input className=' bg-gray-800 p-2 mx-2 rounded' id='slug' type="text" value={formData.slug} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        slug : e.target.value
                    })
                }} />
            </div>

            <div className="my-4">
                <label className=' font-semibold text-lg' htmlFor='img' >Image icon : </label><br />
                <input className=' bg-gray-800 my-4 px-2 h-10 rounded w-full max-w-xl' id='img' type="text" value={formData.img} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        img : e.target.value
                    })
                }} />

                <img src={formData.img} className="h-32" alt="preview-image" />
            </div>

            <button className="bg-purple-800 text-yellow-100 p-2 my-4 rounded" type="submit">Submit</button>
        </form>

        <span className='font-sm text-green-500 m-6' id='result'></span>
        <hr className='my-6' />
        <label className=' font-semibold text-lg' htmlFor="content">Content : </label><br />
        <div className='w-full flex flex-wrap'>
            <div className="w-1/2">
                <textarea className='bg-gray-800 h-full w-full p-4 mt-4 rounded' id='content' value={formData.content} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        content : e.target.value
                    })
                }} />
            </div>
            <div className='w-1/2'>
                <MarkDownContent content={formData.content} />
            </div>
        </div>
        </>
    )
}

export default Blog

export async function getServerSideProps(context) {
    let fet = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blogs/getblog/${context.query.blog}`);

    let formData;

    if(fet.status === 404) {
        formData = null;
    }else {
        formData = await fet.json();
    }
    
    return {
        props : {formData}
    }
}