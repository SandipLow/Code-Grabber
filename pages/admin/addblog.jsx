import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import CheckAuth from './check_auth'

const Add_Blog = () => {
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

    const addBlog = async (e)=> {
        e.preventDefault();

        let headersList = {
            "Accept": "*/*",
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json"
        }

        let res = await fetch("http://localhost:5000/api/blogs/addblog", { 
            method: "POST",
            body: JSON.stringify(formData),
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
        </Head>

        <CheckAuth/>

        <form onSubmit={addBlog} action="submit">
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
        </>
    )
}

export default Add_Blog
