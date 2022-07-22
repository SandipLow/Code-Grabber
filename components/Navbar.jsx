import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import { store } from '../state/store';

function Navbar() {
    const [authState, setAuthState] = useState(null)

    useEffect(()=>{
        // let authtoken = localStorage.getItem("auth-token")

        // if (authtoken != undefined) {
        //     setAuthState(authtoken);
        // }

        if (typeof window !== undefined) {
            setAuthState(store.getState().auth)
        }

        const unsub = store.subscribe(()=> {
            let data = store.getState().auth
            console.log(data)

            setAuthState(data);
        })

        return ()=> {
            unsub();
        }

    }, [])

    return (
        <>
        <div className="bg-purple-800 py-2 flex justify-between text-yellow-100">
            <span className="font-bold px-2">Code Grabber</span>
            <nav>
                <ul className="flex mx-4">
                    <Link href='/' passHref><li className="mx-2 cursor-pointer">Home</li></Link>
                    <Link href='#' passHref><li className="mx-2 cursor-pointer">About</li></Link>
                    <Link href='#' passHref><li className="mx-2 cursor-pointer">Contact</li></Link>
                    {
                        !authState ? <Link href='/login' passHref><li className="mx-2 cursor-pointer">Log in</li></Link>
                        : <Link href='/admin' passHref><li className="mx-2 cursor-pointer">Admin</li></Link>
                    }
                    
                </ul>
            </nav>
        </div>
        </>
    );
}

export default Navbar;