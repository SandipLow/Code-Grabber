import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar({ auth }) {
    const router = useRouter();

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
            <div className='hidden md:flex relative'>
                <input 
                    type="text" 
                    placeholder='Search blogs here' 
                    className='px-4 mx-4 outline-none' 
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter') {
                            router.push(`/blogs?q=${e.target.value}`)
                        }
                    }} 
                />
                <Image src="/manifest/code_grabber.svg" alt="logo" height={40} width={40} objectFit="contain" objectPosition="center" />
            </div>
        </nav>
        </>
    );
}

export default Navbar;