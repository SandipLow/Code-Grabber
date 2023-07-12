import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import mdStyle from "../../styles/mdstyles.module.css"
import useInitialLoad from "../hooks/initialLoad"

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable as syntax_style } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { BannerPost } from "./Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function BlogRender({ data, user }) {

    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(data.likes)

    useEffect(() => {
        const checkLike = async () => {
            const res = await fetch(`/api/blogs/get-user-liked-blogs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": JSON.parse(localStorage.getItem("user")).authtoken
                }
            })

            if (res.status === 200) {
                const resJson = await res.json()
                const liked = resJson.find(blog => blog.slug === data.slug)
                setLiked(liked ? true : false)
            }
        }

        if (user) checkLike()

    }, [data, user])


    const handleLike = async (e) => {
        const res = await fetch(`/api/blogs/likeblog/${data.slug}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": JSON.parse(localStorage.getItem("user")).authtoken
            }
        })

        if (res.status === 200) {
            const resJson = await res.json()
            setLiked(resJson.message === "liked")
            setLikes(resJson.likes)
        }

            
    }
    
    return (
        <>
        <BannerPost 
            title={data.title} 
            img={data.img} 
            description={data.description} 
            tags={data.tags} 
        />
        <div className="flex justify-center items-center mt-4">
            <span className="text-gray-500 mx-4">Author</span>
            <div className="flex items-center border border-cdek-blue w-fit rounded-full">
                <span className="inline-block ml-4 mr-2 text-cdek-blue">{data.user?.displayName}</span>
                <img src={data.user?.profilePic} alt="profile" className="h-10 w-10 m-1 object-cover rounded-full" />
            </div>
        </div>
        <div className="grid place-content-center">
            <MarkDownContent content={data.content} />
        </div>
        {
            user ? (
                <div className="flex justify-center items-center mb-2">
                    <div className="flex items-center w-fit border rounded-full">
                        <button 
                            onClick={handleLike} 
                            className="border hover:border-cdek-blue rounded-full m-1 p-2"
                            style={{
                                color: liked ? "var(--cdek-blue)" : "var(--cdek-black)"
                            }}
                        >
                            <FontAwesomeIcon icon={faHeart} className="h-6 w-6" />
                        </button>
                        <span className="px-4">{likes}</span>
                    </div>
                </div>
            ) : null
        }
        </>

    )
}

export const MarkDownContent = ({ content }) => {
    const initialLoad = useInitialLoad()

    return (
        <article className={mdStyle.md} >
            <ReactMarkdown
                components={{
                    code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={syntax_style}
                                language={match[1]}
                                {...props}
                            >
                                { String(children).replace(/\n$/, '') }
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            >
                { content }
            </ReactMarkdown>
        </article>
    )
}