import React from 'react';

export default function Footer() {
  return (
    <footer className='bg-cdek-black text-white py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Divider with Title */}
        <div className='flex justify-between items-center mb-4'>
          <div className='bg-cdek-gray h-px flex-grow'></div>
          <div className='px-6 py-2 text-center'>
            <h1 className='text-3xl font-bebas-neue text-cdek-aqua'>Code Grabber</h1>
            <p className='text-sm text-gray-400 mt-1'>© 2021-2024</p>
          </div>
          <div className='bg-cdek-gray h-px flex-grow'></div>
        </div>

        {/* Slogan or Description */}
        <p className='text-center text-gray-300 mb-4 font-roboto-flex'>
          Code snippets for the coders, from the coders. Share Code snippets and blogs.
        </p>

        {/* Links Section (Optional for future) */}
        <div className='flex justify-center space-x-6 mt-6'>
          <a href="#" className='text-cdek-aqua hover:text-white transition duration-300'>Privacy Policy</a>
          <a href="#" className='text-cdek-aqua hover:text-white transition duration-300'>Terms of Service</a>
          <a href="#" className='text-cdek-aqua hover:text-white transition duration-300'>Contact</a>
        </div>

        {/* Social Media Icons Section (Optional for future) */}
        <div className='flex justify-center space-x-4 mt-4'>
          {/* Add social media icons here */}
        </div>
      </div>
    </footer>
  );
}
