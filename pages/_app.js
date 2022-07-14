import '../styles/globals.css'
import "prismjs/themes/prism-okaidia.min.css";
import Navbar from './components/Navbar';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <link rel="icon" href="/icon-256x256.png" type="image/x-icon" />
      <link rel="manifest" href="/manifest.webmanifest" />
    </Head>
    <Navbar/>
    <Component {...pageProps} />
    </>
  )
  
}

export default MyApp
