import React from 'react';
import Head from 'next/head';

import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="layout">
      <Head>
        <title>UCC Youth Store</title>
      </Head>
      <header>
        <NavBar />
      </header>
    </div>
  )
}

export default Layout