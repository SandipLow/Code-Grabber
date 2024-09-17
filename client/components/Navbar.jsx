import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar({ auth }) {
    const router = useRouter();

    return (
        <nav className='w-full fixed top-0 left-0 bg-cdek-black bg-opacity-80 backdrop-blur-md z-50 shadow-lg'>
            <div className='max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-8'>
                {/* Left side: Links */}
                <ul className='flex space-x-4 font-roboto-flex text-cdek-aqua'>
                    <li>
                        <Link href='/' passHref>
                            <a className='px-4 py-2 transition-all duration-300 ease-in-out rounded-lg hover:bg-slate-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-cdek-aqua'>
                                Home
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/blogs' passHref>
                            <a className='px-4 py-2 transition-all duration-300 ease-in-out rounded-lg hover:bg-slate-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-cdek-aqua'>
                                Blogs
                            </a>
                        </Link>
                    </li>
                    {/* Conditional Auth Links */}
                    <li>
                        <Link href={auth.user ? '/admin' : '/auth'} passHref>
                            <a className='px-4 py-2 transition-all duration-300 ease-in-out rounded-lg bg-cdek-aqua text-black font-semibold hover:bg-cdek-aqua-dark focus:outline-none focus:ring-2 focus:ring-cdek-aqua'>
                                {auth.user ? 'Admin' : 'Log in'}
                            </a>
                        </Link>
                    </li>
                </ul>

                {/* Right side: Search and Logo */}
                <div className='hidden md:flex items-center space-x-4'>
                    {/* Search Bar */}
                    <input
                        type='text'
                        placeholder='Search blogs here...'
                        className='px-4 py-2 rounded-full bg-white text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-cdek-aqua transition-all duration-300 ease-in-out'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                router.push(`/blogs?q=${e.target.value}`);
                            }
                        }}
                    />
                    {/* Logo */}
                    <div className='w-10 h-10 relative'>
                        <Image
                            src="/manifest/code_grabber.svg"
                            alt="Code Grabber Logo"
                            layout='fill'
                            objectFit='contain'
                            objectPosition='center'
                            className='transition-transform duration-300 ease-in-out hover:scale-110'
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
