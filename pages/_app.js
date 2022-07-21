import '../styles/globals.css'
import "prismjs/themes/prism-okaidia.min.css";
import Navbar from '../components/Navbar';
import Head from 'next/head';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {store} from '../state/store'

function MyApp({ Component, pageProps }) {


  return (
    <>
    <Provider store={store} >
    <Head>
      <link rel="icon" href="/icon-256x256.png" type="image/x-icon" />
      <link rel="manifest" href="/manifest.webmanifest" />
    </Head>
    <Navbar/>
    <Component {...pageProps} />
    </Provider>
    </>
  )
  
}

export default MyApp
