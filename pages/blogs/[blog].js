// react and components :
import Head from 'next/head'
import BlogRender from '../../client/components/BlogRender'

const Blog = ({ data }) => {

    return (
        <>
        <Head>
            <title>{data ? data.title : "Not Found"} | Code Grabber</title>
            <meta name="description" content={data && data.description} />
            <link rel="canonical" href={`https://codegrabber.vercel.app/blogs/${data && data.slug}`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={data && data.title} />
            <meta property="og:description" content={data && data.description} />
            <meta property="og:url" content={`https://codegrabber.vercel.app/blogs/${data && data.slug}`} />
            <meta property="og:site_name" content="Code Grabber" />
            <meta property="og:image" content={data && data.img} />
            <meta property="og:image:width" content="720" />
            <meta property="og:image:height" content="640" />
            <meta property="og:image:type" content="image/png" />
            <meta name="author" content="Sandip Low" />
            <meta property="ya:ovs:adult" content="false" />
            <meta property="ya:ovs:upload_date" content="2018-05-14T08:52:29+00:00" />
            <meta property="ya:ovs:allow_embed" content="true" />
            <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        
        {data ? <BlogRender data={data} />
        :   <div className="text-center my-10">
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
