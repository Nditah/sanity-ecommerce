import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

type PropType = {
  children: React.ReactElement
}

const Layout = ({ children }: PropType) => {
  return (
    <div className='layout'>
      <Head>
        <title>Telixia Ecommerce</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
      { children } 
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout