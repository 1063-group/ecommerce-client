import React from 'react'
import Container from '../../shared/Container'

const PromotionBanner = ({ img }) => {
  return (
    <Container>
      <div className="my-5 overflow-hidden">
        <img
          src={img || "https://via.placeholder.com/1200x300?text=Promotion+Banner+3"}
          alt="Banner 3"
          className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
        />
      </div>
    </Container>
  )
}

export default PromotionBanner
