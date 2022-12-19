import Head from 'next/head'
import Link from 'next/link';
import CheckAuth from './check_auth';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/auth';

export default function Admin({ auth }) {

    const { logOut } = auth
    const user = useUser()
    const router = useRouter()

    const logout = ()=> {
        logOut();
        router.push("/auth")
    }

    return (
        <>
        <CheckAuth/>
        <Head>
            <title>Admin Page | Code Grabber</title>
        </Head>

        <div className='flex'>
            <h1 className='text-2xl my-5 mx-2 font-bold'>Welcome <span className=' mx-3 text-green-300' >{ user && user.displayName }</span></h1>
            <img src={user && user.profilePic} alt="profile picture" className='h-14 w-14 bg-cover my-2 rounded-full' />
            <button onClick={logout} className="bg-purple-800 text-yellow-100 p-2 my-4 mx-12 rounded transition hover:bg-purple-900">Log out</button>
        </div><hr />

        <center className="flex flex-wrap justify-evenly p-10">
            <Card title="Manage Blogs 📚" href="/admin/manage_blogs" img="/Assets/code_bg_02.jpg"/>
            <Card title="Add Blog ✍🏼" href="/admin/addblog" img="/Assets/add_blog.jpg"/>
            <Card title="Upload Asset ⬆" href="/admin/addasset" img="/Assets/upload.webp"/>
        </center>
        </>
    )
}

const Card = (props) => {

    return (
        <Link href={props.href} passHref>
            <div className='cursor-pointer bg-gray-800 text-white m-4 p-6 rounded transition hover:bg-gray-900' style={{"width": "fit-content"}} >
                <h2 className=' text-xl mb-4'>{props.title}</h2>
                <div className=' bg-white'>
                    <img className=' w-96' src={props.img} />
                </div>
            </div>
        </Link>
    )
}
