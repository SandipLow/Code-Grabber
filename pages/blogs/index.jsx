import React from 'react'
import { BannerPost } from '../../client/components/Banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'

export default function Page() {

    const handleSearch = ()=> {
        
    }

    return (
        <>
        <Head>
            <title>Blogs | Code Grabber</title>
        </Head>
        <BannerPost 
            title="Blogs Page" 
        />
        <div className='w-full grid place-items-center'>
            {/* Search bar */}
            <div className='w-fit border border-cdek-gray rounded-full flex my-2'>
                <input className='py-2 px-4 outline-none bg-transparent' type="text" placeholder='Search the blogs here' />
                <button className='px-2 w-8'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
        </>
    )
}
