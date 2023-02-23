import Link from 'next/link';
import { useRef } from 'react';

function Navbar({ auth }) {

    const navref = useRef()

    const viewNav = ()=> {
        navref.current.classList.toggle('hidden')
    }

    return (
        <>
        <div className="bg-purple-800 w-full flex flex-wrap justify-between py-2 px-4">

            <div className='flex items-center'>
                <button onClick={viewNav} className='text-white md:hidden'>
                    <svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" className="fill-current octicon-three-bars">
                        <path fill-rule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"></path>
                    </svg>
                </button>
                <span className="font-bold px-4">Code Grabber</span>
            </div>


            <nav ref={navref} className='mt-4 w-full hidden md:m-0 md:inline-block md:w-fit'>
                <ul className="flex flex-wrap items-center">
                    <Link href='/' passHref><li className="mx-2 cursor-pointer">Home</li></Link>
                    <Link href='#' passHref><li className="mx-2 cursor-pointer">About</li></Link>
                    <Link href='#' passHref><li className="mx-2 cursor-pointer">Contact</li></Link>
                    {
                        !auth.user ? <Link href='/auth' passHref><li className="mx-2 cursor-pointer">Log in</li></Link>
                        : <Link href='/admin' passHref><li className="mx-2 cursor-pointer">Admin</li></Link>
                    }
                    
                </ul>
            </nav>
        </div>
        </>
    );
}

export default Navbar;