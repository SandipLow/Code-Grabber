import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import mdStyle from "../../styles/mdstyles.module.css" 
import useInitialLoad from "../hooks/initialLoad"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function BlogRender({ data }) {
    const initialLoad = useInitialLoad()

    return (
        <div className="flex">
            <article className={mdStyle.md}>
                <section>
                    <h1>{data.title}</h1>
                    <img className='w-full my-4 max-w-xl' src={data.img}
                        alt="cover"/>
                    <h2>About the blog</h2>
                    <p>{data.description}</p>
                    <div className='mt-2'>
                        {
                            data.tags.map((tag, ind)=><span key={ind} className='inline-block bg-blue-800 bg-opacity-40 text-blue-400 px-2 rounded-xl m-2'>#{tag}</span>)
                        }
                    </div>
                </section>
                <MarkDownContent content={data.content} />
                
            </article>
        </div>

    )
}

export const MarkDownContent = ({ content })=> {
    const initialLoad = useInitialLoad()
    
    return (
        <article className={mdStyle.md + " container"} >
            <section>
                {
                    !initialLoad ? <ReactMarkdown 
                        children={content}

                        components={{
                            code: ({node, inline, className, children, ...props}) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={okaidia}
                                    language={match[1]}
                                    {...props}
                                  />
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                )
                              }
                        }}
                    />

                    : content
                }
            </section>
        </article>
    )
}