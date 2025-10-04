import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import DiscountCard from "../cards/DiscountCard";
import Container from "../../shared/Container";
export default function BannerSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=5");
        const data = await res.json();
        setProducts(data.products); // to‘liq productlarni saqlaymiz
      } catch (err) {
        console.error("Banner fetch error:", err);
      }
    })();
  }, []);

  return (
    <Container>
      <div className="flex gap-4 w-full p-10">
        <div className="w-3/4 relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="rounded-xl overflow-hidden"
          >
            {products.map((p, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full aspect-[16/7]">
                  <img
                    src={p.thumbnail || p.images?.[0]}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay matn */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                    <h2 className="text-2xl font-bold">{p.title}</h2>
                    <p className="text-sm mt-2 line-clamp-2">{p.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <DiscountCard />
      </div>
    </Container>
  );
}
