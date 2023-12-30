import Link from 'next/link'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faSquareWhatsapp, faTelegram } from "@fortawesome/free-brands-svg-icons"



export const Posts = ({ title, posts }) => {

    return (
        <section className='py-6 px-2' >

            <h1 className="font-bebas-neue text-4xl pl-4 mb-2" >{title}</h1><hr className="mb-2" />

            <div id='Games' className="flex overflow-auto snap-x">
                {
                    posts.length === 0 ? 
                        <h1 className='text-2xl text-center w-full text-gray-400' >No posts found</h1>
                    :
                        posts.map((postData, index) => {
                            return <Post key={index} postData={postData} />
                        })
                }
            </div>

        </section>
    )
}

const Post = ({ postData }) => {
    const hoverBg = useRef();

    const displayBg = () => {
        hoverBg.current.classList.remove('h-0')
        hoverBg.current.classList.add('h-80')
    }

    const hideBg = () => {
        hoverBg.current.classList.remove('h-80')
        hoverBg.current.classList.add('h-0')
    }

    return (
        <div style={{ minWidth: '16rem' }} onMouseOver={displayBg} onMouseOut={hideBg} className='cursor-pointer relative w-64 h-80 my-2 mx-4 snap-start'>
            <div 
                ref={hoverBg} 
                className="h-0 w-64 overflow-hidden absolute transition-all duration-300 text-center text-white rounded-md bg-red-800 bg-opacity-60" 
            >
                <Link href={postData.url ? postData.url :`/blogs/${postData.slug}`} passHref >
                    <div className='relative h-full w-full'>
                        <div className='absolute bottom-4 w-full' >
                            <h2 className='text-2xl mb-2 font-semibold' >{postData.title}</h2>
                            <div className='mb-2 w-full bg-cdek-aqua' style={{ height: '1px' }} ></div>
                            <p>{postData.description}</p>
                        </div>
                    </div>
                </Link>
                <PostShareButton slug={postData.slug} />
            </div>
            <img src={postData.img} alt="img" className='w-full h-full rounded-md object-cover' />
        </div>
    )
}

const PostShareButton = (props) => {

    const sharePan = useRef();

    const toogleSharePan = () => {
        if (sharePan.current.classList.contains("w-fit")) {
            sharePan.current.classList.replace("w-fit", "w-0")
            sharePan.current.classList.replace("h-12", "h-0")
        } else {
            sharePan.current.classList.replace("h-0", "h-12")
            sharePan.current.classList.replace("w-0", "w-fit")
        }
    }


    return (
        <>
            <FontAwesomeIcon icon={faShareNodes} className='absolute top-2 right-2 w-10 h-10 rounded-full p-2 bg-white text-cdek-blue cursor-pointer' onClick={toogleSharePan} />
            <div ref={sharePan} className='h-0 w-0 transition-all overflow-hidden p-1 bg-white rounded-md absolute top-10 right-6'>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=https://codegrabber.vercel.app/blogs/${props.slug}`}>
                    <FontAwesomeIcon icon={faFacebookSquare} className='h-full mx-1 inline-block text-blue-700' />
                </a>
                <a href={`https://wa.me/?text=https://codegrabber.vercel.app/blogs/${props.slug}`}>
                    <FontAwesomeIcon icon={faSquareWhatsapp} className='h-full mx-1 inline-block text-green-700' />
                </a>
                <a href={`https://telegram.me/share/url?url=https://codegrabber.vercel.app/blogs/${props.slug}`}>
                    <FontAwesomeIcon icon={faTelegram} className='h-full mx-1 inline-block text-sky-700' />
                </a>
            </div>
        </>
    )
}

