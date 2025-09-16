import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import InfoBar from './components/shared/Infobar'
import SubNavbar from './components/shared/SubNavbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
