import Link from 'next/link';
import React from 'react';

function Navbar() {
    return (
        <>
        <div className="bg-purple-800 py-2 flex justify-between text-yellow-100">
            <span className="font-bold px-2">Code Grabber</span>
            <nav>
                <ul className="flex mx-4">
                    <Link href='/' passHref><li className="mx-2 cursor-pointer">Home</li></Link>
                    <Link href='#' passHref><li className="mx-2 cursor-pointer">About</li></Link>
                    <Link href='#' passHref><li className="mx-2 cursor-pointer">Contact</li></Link>
                </ul>
            </nav>
        </div>
        </>
    );
}

export default Navbar;