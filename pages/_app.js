import '../styles/globals.css'
import Navbar from '../client/components/Navbar';
import Head from 'next/head';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Spinner from 'react-spinner-material';
import Footer from '../client/components/Footer';

function useLoading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleStart = (url) => setLoading(true);
  const handleComplete = (url) => setLoading(false);
  
  useEffect(() => {

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return loading;
}

export default function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const logOut = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  const logIn = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

  const loading = useLoading()

  return (
    <>
    <Head>
    
      <link rel="icon" type="image/x-icon" href="/manifest/icon-256x256.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/manifest/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/manifest/favicon-16x16.png"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/manifest/apple-touch-icon.png"/>
      <link rel="manifest" href="/manifest/site.webmanifest"/>
      <link rel="mask-icon" href="/manifest/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#ffffff"/>
      <meta name="color-scheme" content="light" />
      <meta name="application-name" content="Code Grabber" />
      <meta name="generator" content="Code Grabber" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="google-site-verification" content="BTcyYqfgbgf6Jn765uP8EzKXB4-2I4AD0_QcJgfXOHc" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="creator" content="Sandip Low" />
      <meta name="publisher" content="CDEK c/o" />
      <meta name="format-detection" content="telephone=no, address=no, email=no" />
    
    </Head>
    
    <Navbar auth={{ user, logIn, logOut }} />
    
    <div>
      {
        loading ? <div className='w-full text-center'>
            <Spinner className='inline-block mt-2 mx-2' radius={40} color={"#5b21b6"} stroke={5} visible />
          </div>
        : <Component auth={{logIn, logOut, user}} {...pageProps} />
      }    
    </div>
    
    <Footer/>
    </>
  )

}
