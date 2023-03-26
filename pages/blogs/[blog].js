// react and components :
import Head from 'next/head'
import { useEffect } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import mdStyle from "../../styles/mdstyles.module.css"

// prismjs :
import Prism from 'prismjs'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/toolbar/prism-toolbar.min.js'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min'
import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php';

const Blog = ({ data }) => {
    useEffect(()=> {
        if (typeof window !== "undefined") {
            Prism.highlightAll()
        }

    }, [])

    return (
        <>
        <Head>
            <title>{data ? data.title : "Not Found"} | Code Grabber</title>
            <meta name="description" content={data && data.metadesc} />
            <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        
        {data ? <div className={mdStyle.md}>
            <section>
                <h1>{data.title}</h1>
                <img className='w-full p-4' src={data.img}
                    alt="cover"/>
                <h2>About the blog</h2>
                <p>{data.description}</p>
                <div className='mt-4'>
                    {
                        data.tags.map((tag, ind)=><span key={ind} className='inline-block bg-blue-800 bg-opacity-40 text-blue-400 px-2 rounded-xl mx-2'>#{tag}</span>)
                    }
                </div>
            </section>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} >{data.content}</ReactMarkdown>
        </div>
         : <div className="text-center my-10">
            <h1 className='text-3xl'>Sorry, No Such Blog Found...!</h1>
            <div className='w-full flex justify-center mt-10'>
                <img src="/Assets/Not Found.svg" className='h-96' />
            </div>
        </div>}
        
        </>
    )
}

export default Blog

export async function getServerSideProps(context) {
    let fet = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blogs/getblog/${context.query.blog}`);

    let data;

    if(fet.status === 404) {
        data = null;
    }else {
        data = await fet.json();
    }
    
    return {
        props : {data}
    }
}
