import { useState } from 'react'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Navbar from './components/shared/Navbar'
import CategorySwiper from './components/ui/promotions/CategorySwiper'

export default function App() {
  return (
    <>
      <Header />
      <div className='sticky top-0 z-50'>
          <Navbar/>
      </div>
    
      <main>
        <Outlet />
       
      </main>
      {/* <Footer /> */}
    </>
  );
}
