import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import mdStyle from "../../styles/mdstyles.module.css"
import useInitialLoad from "../hooks/initialLoad"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { BannerPost } from "./Banner";

export default function BlogRender({ data }) {
    
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
        </>

    )
}

export const MarkDownContent = ({ content }) => {
    const initialLoad = useInitialLoad()

    return (
        <article className={mdStyle.md + " container"} >
            <section>
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
            </section>
        </article>
    )
}