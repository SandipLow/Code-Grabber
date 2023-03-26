import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import CheckAuth from './check_auth'
import mdStyle from "../../styles/mdstyles.module.css"

// prismjs :
import Prism from 'prismjs'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/toolbar/prism-toolbar.min.js'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min'
import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';

const Add_Blog = ({ auth }) => {
    const [formData, setFormData] = useState({
        title : "",
        content : "",
        description : "",
        tags : [],
        slug : "",
        img : "" 
    });

    const [tags, setTags] = useState([]);
    
    useEffect(() => {
        // console.log("Component rebuild !")

        if (typeof(formData.tags)=='object') {

            let tags = formData.tags.map((tag, ind) => {
                return <input className=' bg-gray-800 p-2 mx-2 rounded w-32' key={ind} value={tag} onChange={(e)=>{
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

    const addBlog = async (e)=> {
        e.preventDefault();

        let headersList = {
            "Accept": "*/*",
            "auth-token": JSON.parse(localStorage.getItem("user")).authtoken,
            "Content-Type": "application/json"
        }

        let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blogs/addblog`, { 
            method: "POST",
            body: JSON.stringify({...formData, user: auth.user.name}),
            headers: headersList
        })

        let data = await res.json();

        if(data.errors) {
            data.errors.forEach(err=>{
                alert(`${err.msg}..\nYou Entered ${err.value}`)
            })
        } else {
            alert("Submitted successfully")

            setFormData({
                title : "",
                content : "",
                description : "",
                tags : [],
                slug : "",
                img : "" 
            })
        }
        
        // console.log(data);
    }

    return (
        <>
        <Head>
            <title>Add Blog | Code Grabber</title>
            <link rel="stylesheet" href="/styles/blog.module.css" />
        </Head>

        <CheckAuth/>

        <form className='p-4' onSubmit={addBlog} action="submit">
            <div className=' my-4'>
                <label className=' font-semibold text-lg' htmlFor="title" >Title : </label>
                <input className=' bg-gray-800 h-8 p-2 mx-6 w-64 rounded' id='title' type="text" value={formData.title} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        title : e.target.value
                    })
                }} />
            </div>
            
            <div className="my-4">
                <label className=' font-semibold text-lg' htmlFor="content">Content : </label><br />
                <textarea className='bg-gray-800 h-96 w-full p-4 mt-4 rounded' id='content' value={formData.content} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        content : e.target.value
                    })
                    Prism.highlightAll()
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
                <input className=' bg-gray-800 p-2 rounded' id='slug' type="text" value={formData.slug} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        slug : e.target.value
                    })
                }} />
            </div>

            <div className="my-4">
                <label className=' font-semibold text-lg' htmlFor='img' >Image icon : </label><br />
                <input className=' bg-gray-800 my-4 h-10 rounded w-full max-w-xl' id='img' type="text" value={formData.img} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        img : e.target.value
                    })
                }} />

                <img src={formData.img} className="h-32" alt="preview-image" />
            </div>

            <button className="bg-purple-800 text-yellow-100 p-2 mt-4 rounded" type="submit">Submit</button>
        </form>
        <hr />
        <div className={mdStyle.md}>
            <section>
                <h1>{formData.title}</h1>
                <img className='w-full p-4' src={formData.img}
                    alt="cover"/>
                <h2>About the blog</h2>
                <p>{formData.description}</p>
                <div className='mt-4'>
                    {
                        formData.tags.map((tag, ind)=><span key={ind} className='inline-block bg-blue-800 bg-opacity-40 text-blue-400 px-2 rounded-xl mx-2'>#{tag}</span>)
                    }
                </div>
            </section>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} >{formData.content}</ReactMarkdown>
        </div>
        </>
    )
}

export default Add_Blog
