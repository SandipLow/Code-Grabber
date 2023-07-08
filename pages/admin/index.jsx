import Head from 'next/head'
import Link from 'next/link';
import CheckAuth from './check_auth';
import { useRouter } from 'next/router';
import { useUser } from '../../client/hooks/auth';
import Spinner from 'react-spinner-material';
import { BannerPost } from '../../client/components/Banner';
import { ButtonCustom } from '../../client/components/Buttons';
import { Posts } from '../../client/components/Posts';

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

        <BannerPost 
            title={
                user ? <div className='flex flex-wrap items-center h-12'>
                    Welcome <span className='mx-2 text-cdek-aqua'>{user.displayName}</span>
                    <img src={user.profilePic} className='h-12 w-12 mx-2 rounded-full object-cover inline-block' />
                    <div className='ml-2 text-base'>
                        <ButtonCustom
                            color='cdek-aqua'
                            onClick={logout}
                        >
                            Log Out
                        </ButtonCustom>
                    </div>
                </div>
                : <Spinner className='mx-2 bg-cdek-aqua' radius={40} stroke={5} visible />
            }
        />

        <Posts 
            title='Admin Panel'
            posts={[
                {
                    title: 'Create Post',
                    description: 'Create a new post',
                    img: '/Assets/add_blog.jpg',
                    url: '/admin/addblog'
                },
                {
                    title: 'Manage Posts',
                    description: 'Manage your posts',
                    img: '/Assets/code_bg_02.jpg',
                    url: '/admin/manage_blogs'
                },
                {
                    title: 'Manage Assets',
                    description: 'Manage Files in your system',
                    img: '/Assets/upload.webp',
                    url: '/admin/manage_assets'
                },
            ]}

        />
        </>
    )
}