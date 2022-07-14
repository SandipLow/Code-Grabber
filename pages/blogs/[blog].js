// react and components :
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';

// prismjs :
import Prism from 'prismjs'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/toolbar/prism-toolbar.min.js'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min'
import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php';

const Blog = (props) => {
    let main = useRef()
    const [data, setData] = useState(props.data)

    useEffect(()=>{
        if (data) {
            main.current.innerHTML = data.content;
            Prism.highlightAll();
        }
        else {main.current.innerHTML = `<h1>No such blog found....😐</h1>`;}
    },[data])

    return (
        <>
            <Head>
                <title>{data && data.title} | Code Grabber</title>
                <meta name="description" content={data && data.metadesc} />
                <link rel="stylesheet" href="/styles/blog.module.css" />
                <link rel="manifest" href="/manifest.webmanifest" />
            </Head>

            {/* <Navbar /> */}

            {/* body */}
            <div ref={main} className="bg-gray-700 text-gray-100">
                {/* content */}
            </div>
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
