import Image from "next/image"



export const BannerHome = (props)=> {
    return (
        <section id='Home' className='bg-cdek-black h-screen'>

            <div className='w-full h-full' >
                <div className='h-full w-full absolute bg-cdek-black bg-opacity-70 z-10'></div>
                
                {/* Here will be sliders divs...*/}
                <div className='h-full' >
                    {/* <img src="/Assets/code_bg_01.bmp" loading="lazy" alt="" className='w-full h-full object-cover'/> */}
                    <Image src="/Assets/code_bg_01.bmp" loading="lazy" alt="" layout="fill" className="object-cover" />
                    <div className='text-white w-full absolute top-1/3 bottom-8 md:top-4/10 z-10' >
                        <h1 className='text-5xl w-full text-center' >
                            <span className='font-bebas-neue p-2'>Welcome to</span>
                            <span className='font-bebas-neue bg-cdek-aqua text-cdek-black text-6xl'>Code</span>
                            <span className='font-bebas-neue bg-cdek-black text-cdek-aqua text-6xl'>Grabber</span>
                        </h1>
                        <div className='w-full mt-4 flex justify-center text-center' style={{maxHeight: 'calc(66% - 2rem)'}}>
                        <p className='mx-20 max-w-md bg-red-400 bg-opacity-60 p-2 rounded overflow-y-auto'>
                            Code snippets for the coders from the coders. Share Code snippets, Blogs.
                        </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export const BannerPost = ({ title, img, description, tags })=> {
    
    return (
        <section id="Banner" className='w-screen h-96 relative bg-cdek-black text-white'>
            {img && <img src={img} loading="lazy" alt="" className="h-full w-full object-cover" />}
            <div className="absolute h-full w-full top-0 bg-cdek-black bg-opacity-70"></div>
            <div className="absolute h-full w-full top-0 grid place-content-center">
                <div className='text-center'>
                    <div className='border-2 border-solid text-4xl px-2 py-1 grid place-content-center'>
                        <div>
                            {title}
                        </div>
                    </div>
                    {description && <p className="mt-8 bg-red-400 bg-opacity-60 p-2 rounded overflow-y-auto">{description}</p>}
                    {tags && <div className="mt-4">
                        {
                            tags.map((tag, ind)=> <span key={ind} className='inline-block bg-blue-800 bg-opacity-40 text-blue-400 px-2 rounded-xl m-2'>#{tag}</span>)
                        }
                    </div>}
                </div>
            </div>
        </section>
    )
}