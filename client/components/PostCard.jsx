import Link from 'next/link';
import React from 'react'

const PostCard = (props) => {

    const {title, shortDesc, img, dark, slug} = props;

    return (
        <Link href={`/blogs/${slug}`} passHref >
            <div className={`w-72 h-96 m-4 cursor-pointer rounded-md transition-transform transform hover:scale-105 ${dark?'bg-gray-700': 'bg-gray-800'}`}>
                <img className="w-full h-52 object-cover bg-purple-200 rounded-t-md" src={img} alt="logo"/>
                <div>
                    <h2 className='text-lg font-bold h-20 p-3'>{title}</h2>
                    <p className='p-3 overflow-hidden h-full'>{shortDesc}</p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
