import Head from 'next/head';
import React, { useState } from 'react';
import CheckAuth from './check_auth'
import { MarkDownContent } from '../../client/components/BlogRender';
import { ButtonCustom } from '../../client/components/Buttons';
import FaLoading from '../../client/components/Loader';
import { BannerPost } from '../../client/components/Banner';



const Add_Blog = ({ auth }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        description: "",
        tags: [],
        slug: "",
        img: ""
    });
    const [newTag, setNewTag] = useState("")
    const [clicked, setClicked] = useState(false)
    const [controller, setController] = useState(new AbortController())

    const addBlog = async () => {
        const form_vals = Object.values(formData)

        for (let i = 0; i < form_vals.length; i++) {
            if (form_vals[i].length === 0) return
        }

        setClicked(true)

        let headersList = {
            "Accept": "*/*",
            "auth-token": JSON.parse(localStorage.getItem("user")).authtoken,
            "Content-Type": "application/json"
        }

        let res = await fetch(`/api/blogs/addblog`, {
            method: "POST",
            body: JSON.stringify({ ...formData, user: auth.user.name }),
            headers: headersList
        })

        let data = await res.json();

        if (data.errors) {
            data.errors.forEach(err => {
                alert(`${err.msg}..\nYou Entered ${err.value}`)
            })
        } else {
            alert("Submitted successfully")

            setFormData({
                title: "",
                content: "",
                description: "",
                tags: [],
                slug: "",
                img: ""
            })
        }

        setClicked(false)

        // console.log(data);
    }

    return (
        <>
            <Head>
                <title>Add Blog | Code Grabber</title>
            </Head>

            <CheckAuth />

            <BannerPost
                title="Add Blog"
                img="/Assets/add_blog.jpg"
            />

            <div className='text-center w-full'>
                <div className='inline-block m-2 p-2 border rounded-lg max-w-md'>
                    <span className='font-bebas-neue text-3xl'>Add Blog Details</span>
                    <input
                        className='px-4 py-3 bg-slate-200 outline-none block my-2 w-full'
                        type="text"
                        placeholder='Enter title of Blog'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <input
                        className='px-4 py-3 bg-slate-200 outline-none block my-2 w-full'
                        type="text"
                        placeholder='Enter Description of Blog'
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <input
                        className='px-4 py-3 bg-slate-200 outline-none block my-2 border w-full'
                        type="text"
                        placeholder='Enter a unique slug for the Blog'
                        value={formData.slug}
                        onChange={async (e) => {
                            setFormData({ ...formData, slug: e.target.value })

                            if (e.target.value === "") {
                                e.target.style.borderColor = 'red'
                                return
                            }

                            e.target.style.borderColor = 'yellow'

                            controller.abort()

                            const newController = new AbortController()
                            setController(newController)

                            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blogs/getslugstatus`, {
                                method: "POST",
                                headers: {
                                    "Accept": "*/*",
                                    "Content-Type": "application/json"
                                },
                                signal: newController.signal,
                                body: JSON.stringify({ slug: e.target.value })
                            })


                            if (res.status === 200) {
                                const available = await res.text()

                                if (available === "true") {
                                    e.target.style.borderColor = 'green'
                                    return
                                }
                            }

                            e.target.style.borderColor = 'red'

                        }}
                    />
                    <input
                        className='px-4 py-3 bg-slate-200 outline-none block my-2 w-full'
                        type="text"
                        placeholder='Enter the Image url for the blog'
                        value={formData.img}
                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                    />
                    <div className='m-1 p-1 border flex flex-wrap w-full'>
                        {
                            formData.tags.length === 0 ?
                                <p className='text-cdek-gray'>Enter a new Tag</p>
                                : formData.tags.map((tag, index) =>
                                    <span
                                        key={index}
                                        onClick={e => {
                                            // delete tag
                                            let newTags = formData.tags.filter(t => t !== tag)
                                            setFormData({ ...formData, tags: newTags })
                                        }}
                                        className='w-fit p-1 m-2 rounded-xl cursor-pointer bg-slate-300 text-cdek-gray'
                                    >
                                        #{tag}
                                    </span>)
                        }
                    </div>
                    <input
                        className='px-4 py-3 bg-slate-200 outline-none block my-2'
                        type="text"
                        placeholder='Add a new tag'
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                    />
                    <ButtonCustom
                        color="cdek-blue"
                        onClick={() => {
                            setFormData({ ...formData, tags: [...formData.tags, newTag] })
                            setNewTag("")
                        }}
                    >
                        Add
                    </ButtonCustom>
                    <img
                        height={100}
                        width={100}
                        src={formData.img}
                        alt="Image Url"
                    />
                    <div className='my-4'>
                        <ButtonCustom
                            color="cdek-blue"
                            disabled={clicked}
                            onClick={addBlog}
                        >
                            {clicked ? <FaLoading /> : "Create Blog"}
                        </ButtonCustom>
                    </div>
                </div>
            </div>

            <div className='w-full h-screen pt-12 flex flex-wrap items-start'>
                <div className='w-1/2 inline-block h-full'>
                    <textarea
                        className='px-4 py-3 border block my-2 w-full h-full outline-none resize-none bg-cdek-black text-cdek-aqua'
                        type="text"
                        placeholder='Enter the content of the blog in Markup Language'
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>
                <div className='w-1/2 inline-block'>
                    {
                        formData.content === "" ? <p className='m-3 p-3 w-full text-left text-cdek-gray'>Preview of the witten blog</p>
                            : <MarkDownContent content={formData.content} />
                    }
                </div>
            </div>


        </>
    )
}

export default Add_Blog
