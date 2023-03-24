// react and components :
import Head from 'next/head'
import { useEffect } from 'react'

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
            <link rel="stylesheet" href="/styles/blog.module.css" />
            <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        
        {data ? <section dangerouslySetInnerHTML={{__html: data.content}} />
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
