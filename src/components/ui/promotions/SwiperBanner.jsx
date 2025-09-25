import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import DiscountCard from "../cards/DiscountCard";

export default function BannerSection({ images = [] }) {
  return (
    <div className="flex gap-4 w-full p-10">
      <div className="w-3/4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="rounded-xl overflow-hidden"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-[350px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <DiscountCard />
    </div>
  );
}
