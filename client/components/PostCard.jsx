import Link from 'next/link';
import React from 'react'

const PostCard = (props) => {

    const {title, shortDesc, img, dark, slug} = props;

    return (
        <Link href={`/blogs/${slug}`} >
        <div className={`cursor-pointer m-4 p-4 rounded-md ${dark?"bg-gray-700":"bg-gray-800"} text-slate-100 flex text-center h-40 w-80`}>
            <img src={img} alt="logo" className="h-full p-3 bg-purple-200 rounded"/>
            <div className="pl-4 py-2 w-full">
                <h2 className="font-bold text-purple-200 mb-1">{title}</h2>
                <p>{shortDesc}</p>
            </div>
        </div>
        </Link>
    )
}

export default PostCard
