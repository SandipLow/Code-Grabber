import '../styles/globals.css'
import "prismjs/themes/prism-okaidia.min.css";
import Navbar from '../client/components/Navbar';
import Head from 'next/head';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Spinner from 'react-spinner-material';

function useLoading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return loading;
}

function MyApp({ Component, pageProps }) {

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
      <link rel="icon" href="/icon-256x256.png" type="image/x-icon" />
      <link rel="manifest" href="/manifest.webmanifest" />
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
    </>
  )

}

export default MyApp
