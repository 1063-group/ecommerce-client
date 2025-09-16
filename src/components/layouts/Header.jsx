import React from 'react'
import InfoBar from '../shared/Infobar'
import SubNavbar from '../shared/SubNavbar'
import Navbar from '../shared/Navbar'

const Header = () => {
  return (
    <header>
      <InfoBar />
      <Navbar/>
      <SubNavbar />
    </header>
  )
}

export default Header