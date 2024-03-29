import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'

export default function Redirect({ auth }) {
    const router = useRouter()

    useEffect(()=>{
        if (router.query.token) {
            auth.logIn({authtoken: router.query.token, name: router.query.name})
        }

        router.push("/")
    }, [router.query])

    return (
        <>
        <h1>Logged In Successfully...You Can go to homepage</h1>
        <Link href="/" className=' underline text-cdek-blue'>Go to Home</Link>
        </>
    )
}