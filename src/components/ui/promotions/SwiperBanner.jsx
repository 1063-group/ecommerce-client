import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import DiscountCard from "../cards/DiscountCard";

export default function BannerSection() {
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=5");
        const data = await res.json();
        const imgs = data.products.map((p) => p.thumbnail || p.images?.[0]);
        setBannerImages(imgs);
      } catch (err) {
        console.error("Banner images fetch error:", err);
      }
    })();
  }, []);

  return (
    <div className="flex gap-4 w-full p-10">
      <div className="w-3/4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="rounded-xl overflow-hidden"
        >
          {bannerImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Banner ${idx + 1}`}
                className="w-full aspect-[16/9] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <DiscountCard />
    </div>
  );
}
