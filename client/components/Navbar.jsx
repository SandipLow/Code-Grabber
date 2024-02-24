import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

function Navbar({ auth }) {

    return (
        <>
        <nav className='w-full fixed flex justify-center md:justify-between px-2 bg-cdek-black bg-opacity-70 z-50'>
            <ul className='flex w-fit font-roboto-flex text-cdek-aqua' >
                <Link href='/' passHref><li className='cursor-pointer px-4 transition p-2 hover:bg-slate-300 hover:text-black '>Home</li></Link>
                <Link href='/blogs' passHref><li className='cursor-pointer px-4 transition p-2 hover:bg-slate-300 hover:text-black '>Blogs</li></Link>
                {/* <Link href='#' passHref><li className='cursor-pointer px-4 transition p-2 hover:bg-slate-300 hover:text-black '>About</li></Link>
                <Link href='#' passHref><li className='cursor-pointer px-4 transition p-2 hover:bg-slate-300 hover:text-black '>Contact</li></Link> */}
                {
                    !auth.user ? <Link href='/auth' passHref><li className='cursor-pointer px-4 transition p-2 hover:bg-slate-300 hover:text-black '>Log in</li></Link>
                    : <Link href='/admin' passHref><li className='cursor-pointer px-4 transition p-2 hover:bg-slate-300 hover:text-black '>Admin</li></Link>
                }
            </ul>
            <div className='hidden md:block md:h-10 md:p-1 w-12 relative'>
                <Image src="/manifest/code_grabber.svg" alt="logo" layout="fill" objectFit="contain" objectPosition="center" />
            </div>
        </nav>
        </>
    );
}

export default Navbar;