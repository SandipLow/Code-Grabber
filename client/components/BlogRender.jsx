import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import mdStyle from "../../styles/mdstyles.module.css"
import useInitialLoad from "../hooks/initialLoad"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { BannerPost } from "./Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function BlogRender({ data, user }) {

    const [like, setLike] = useState(false)

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
                setLike(liked ? true : false)
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
            setLike(resJson.message === "liked")
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
        <div className="grid place-content-center">
            <MarkDownContent content={data.content} />
        </div>
        {
            user ? (
                <div className="w-full text-center">
                    <button 
                        onClick={handleLike} 
                        className="border rounded-full m-4 p-4"
                        style={{
                            color: like ? "var(--cdek-blue)" : "var(--cdek-black)"
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} className="h-8 w-8" />
                    </button>
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
            {
                !initialLoad ? 
                    <ReactMarkdown
                        components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={okaidia}
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

                : content
            }
        </article>
    )
}