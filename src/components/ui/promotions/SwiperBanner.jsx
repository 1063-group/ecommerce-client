import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import DiscountCard from "../cards/DiscountCard";

export default function BannerSection() {
  return (
    <div className="flex gap-4 w-full">
      <div className="w-3/4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          className="rounded-xl overflow-hidden"
        >
          <SwiperSlide>
            <img
              src="https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg"
              alt="Banner 1"
              className="w-full h-[350px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://www.naturemade.com/cdn/shop/articles/healthy-foods-to-eat_960x.jpg?v=1611988563"
              alt="Banner 2"
              className="w-full h-[350px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D"
              alt="Banner 3"
              className="w-full h-[350px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <DiscountCard />
    </div>
  );
}
