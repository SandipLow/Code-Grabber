// react and components :
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import CheckAuth from '../check_auth';

const Blog = (props) => {

    return (
        <>
        <Head>
            <title>Add Blog | Code Grabber</title>
        </Head>

        <CheckAuth/>

        <h1>Will be available soon...!</h1>
        </>
    )
}

export default Blog
