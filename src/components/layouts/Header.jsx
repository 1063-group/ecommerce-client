import React from 'react'
import InfoBar from '../shared/Infobar'
import SubNavbar from '../shared/SubNavbar'
import Navbar from '../shared/Navbar'

const Header = () => {
  return (
    <div>
      <InfoBar />
      <Navbar />
      <SubNavbar />
    </div>
  )
}

export default Header