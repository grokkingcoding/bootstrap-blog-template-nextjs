import React, { useReducer, useEffect, useState } from 'react';
import Head from 'next/head';
// add bootstrap and custom css 
import 'bootstrap/dist/css/bootstrap.css'
import '../public/styles.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('my app');
  }, []);
  return <>
    <Head>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
    </Head>
    <Component {...pageProps} />
  </>
};

export default MyApp;
