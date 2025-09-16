import { useState } from 'react'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
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
