import { useState } from 'react'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
)}