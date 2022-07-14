// react and components :
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react';
import CheckAuth from '../check_auth';

const Blog = (props) => {

    const [formData, setFormData] = useState(props.formData);

    const [tags, setTags] = useState([]);
    
    useEffect(() => {
        // console.log("Component rebuild !")

        if (typeof(formData.tags)=='object') {

            let tags = formData.tags.map((tag, ind) => {
                return <input className=' text-gray-800' key={ind} value={tag} onChange={(e)=>{
                    let temp = formData.tags;
                    temp[ind] = e.target.value;
                    setFormData({
                        title : formData.title,
                        content : formData.content,
                        description : formData.description,
                        tags : temp,
                        slug : formData.slug,
                        img : formData.img 
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
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json"
        }
        
        fetch("http://localhost:5000/api/blogs/editblog/62a883161e04047c93796e7f", { 
            method: "PUT",
            body: JSON.stringify(formData),
            headers: headersList
        }).then(function(response) {
            return response.text();
        }).then(function(data) {
            document.getElementById("result").innerText = data;
            // console.log(data);
        })
    }

    return (
        <>
        <Head>
            <title>Add Blog | Code Grabber</title>
        </Head>

        <CheckAuth/>

        <form onSubmit={updateBlog} action="submit">
            <label htmlFor="title">Title : </label>
            <input className=' text-gray-800' id='title' type="text" value={formData.title} onChange={(e)=>{
                setFormData({
                    ...formData,
                    title : e.target.value
                })
            }} /><br />

            <label htmlFor="content">Content : </label><br />
            <textarea className=' text-gray-800 w-full' id='content' value={formData.content} onChange={(e)=>{
                setFormData({
                    ...formData,
                    content : e.target.value
                })
            }} /><br />

            <label htmlFor="description">Description : </label><br />
            <textarea className=' text-gray-800 w-full' id='description' value={formData.description} onChange={(e)=>{
                setFormData({
                    ...formData,
                    description : e.target.value
                })
            }} /><br />

            <label htmlFor="tags">Tags : </label>
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
                
            }}>-</button><br />
            
            <label htmlFor='slug' >Slug : </label>
            <input className=' text-gray-800' id='slug' type="text" value={formData.slug} onChange={(e)=>{
                setFormData({
                    ...formData,
                    slug : e.target.value
                })
            }} /><br />
            
            <label htmlFor='img' >Image icon : </label>
            <input className=' text-gray-800 mt-1' id='img' type="text" value={formData.img} onChange={(e)=>{
                setFormData({
                    ...formData,
                    img : e.target.value
                })
            }} /><br />
            <button className="bg-purple-800 text-yellow-100 p-2 mt-4 rounded" type="submit">Submit</button>
        </form>

        <span className='font-sm text-green-500' id='result'></span>
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