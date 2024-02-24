import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-cdek-black w-full p-6 text-white'>
        <div>
            <div className='flex justify-between items-center'>
                <div className='bg-cdek-gray h-px flex-grow'></div>
                <div className='px-6 py-4'>
                    <h1 className='text-2xl font-bebas-neue'>Code Grabber</h1>
                    <p className='text-sm text-center'>© 2021-2024</p>
                </div>
                <div className='bg-cdek-gray h-px flex-grow'></div>
            </div>
            <p className='text-sm text-center'>Code snippets for the coders from the coders. Share Code snippets, Blogs.</p>
        </div>
    </footer>
  )
}
