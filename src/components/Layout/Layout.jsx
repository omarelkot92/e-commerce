import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return <>
  
    <Navbar />

    <div className="container pt-20 pb-8 p-5"><Outlet/></div>
    
    <Footer/>

  </>
    
  
}
