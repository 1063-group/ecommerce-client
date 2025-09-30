import React from 'react'
import InfoBar from '../shared/Infobar'
import SubNavbar from '../shared/SubNavbar'
import Navbar from '../shared/Navbar'

import BannerSection from '../ui/promotions/SwiperBanner'

const Header = () => {
  return (
    <div>
      <InfoBar />
      <Navbar />
      <SubNavbar />
      <BannerSection />
    </div>
  )
}

export default Header