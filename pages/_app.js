import '../styles/globals.css'
import "prismjs/themes/prism-okaidia.min.css";
import Navbar from '../components/Navbar';
import Head from 'next/head';
import { useState, useEffect } from 'react'

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

  return (
    <>
    <Head>
      <link rel="icon" href="/icon-256x256.png" type="image/x-icon" />
      <link rel="manifest" href="/manifest.webmanifest" />
    </Head>
    <Navbar auth={{user, logIn, logOut}} />
    <Component auth={{user, logIn, logOut}} {...pageProps} />
    </>
  )

}

export default MyApp
