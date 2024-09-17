import Image from "next/image"

export const BannerHome = (props) => {
    return (
        <section id='Home' className='bg-cdek-black h-screen relative'>
            <div className='w-full h-full relative'>
                {/* Overlay with modern backdrop-blur effect */}
                <div className='absolute inset-0 bg-cdek-black bg-opacity-50 backdrop-blur-lg z-10'></div>
                
                {/* Background Image */}
                <Image src="/Assets/code_bg_01.bmp" loading="lazy" alt="" layout="fill" className="object-cover" />
                
                {/* Content Section */}
                <div className='text-white w-full absolute top-1/3 bottom-8 z-20 flex flex-col items-center'>
                    <h1 className='text-4xl sm:text-6xl text-center'>
                        <span className='font-bebas-neue p-2'>Welcome to</span>
                        <span className='font-bebas-neue bg-cdek-aqua text-cdek-black px-4 py-2 rounded-md shadow-lg mx-1 text-5xl sm:text-7xl'>Code</span>
                        <span className='font-bebas-neue text-cdek-aqua px-4 py-2 rounded-md shadow-lg mx-1 text-5xl sm:text-7xl'>Grabber</span>
                    </h1>
                    <div className='mt-6 flex justify-center max-w-lg px-4'>
                        <p className='bg-cdek-aqua bg-opacity-50 text-black p-4 rounded-md shadow-md'>
                            Code snippets for the coders from the coders. Share code snippets, blogs, and much more.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const BannerPost = ({ title, img, description, tags }) => {
    return (
        <section id="Banner" className='w-screen h-[40vh] sm:h-[60vh] relative bg-cdek-black text-white'>
            {/* Background Image */}
            {img && <Image src={img} alt="" layout="fill" objectFit="cover" className="object-cover" />}
            
            {/* Overlay with subtle blur */}
            <div className="absolute inset-0 bg-cdek-black bg-opacity-60 backdrop-blur-md"></div>

            {/* Centered Content */}
            <div className="absolute inset-0 grid place-content-center z-20">
                <div className='text-center max-w-3xl p-4'>
                    <h2 className='text-3xl sm:text-5xl font-semibold px-4 py-2 rounded-md bg-opacity-60 bg-cdek-aqua shadow-lg'>
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-6 bg-cdek-aqua bg-opacity-40 text-black p-4 rounded-md shadow-md">
                            {description}
                        </p>
                    )}
                    {tags && (
                        <div className="mt-6 flex flex-wrap justify-center">
                            {tags.map((tag, ind) => (
                                <span key={ind} className='inline-block bg-blue-500 bg-opacity-30 text-blue-200 px-3 py-1 rounded-full shadow-sm m-2 text-sm sm:text-base'>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
