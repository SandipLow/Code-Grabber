// react and components :
import Head from 'next/head'
import BlogRender from '../../client/components/BlogRender'

const Blog = ({ data, auth }) => {
    const { user } = auth

    return (
        <>
        <Head>
            <title>{data ? data.title : "Not Found"} | Code Grabber</title>
            <meta name="title" content={data.title} />
            <meta name="description" content={data.description} />
            <meta name="keywords" content={data.tags.join(", ")} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="12 days" />
            <meta name="author" content="Sandip Low" />

            <meta property="og:title" content={data.title} />
            <meta property="og:description" content={data.description}/>
            <meta property="og:image" content={data.img}/>

            <meta property="telegram:title" content={data.title} />
            <meta property="telegram:description" content={data.description}/>
            <meta property="telegram:image" content={data.img}/>

            <meta property="whatsapp:title" content={data.title} />
            <meta property="whatsapp:description" content={data.description} />
            <meta property="whatsapp:image" content={data.img} />

            <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        
        {data ? <BlogRender data={data} user={user} />
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
