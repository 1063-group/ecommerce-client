import { useState } from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import BannerSection from "./components/ui/promotions/SwiperBanner";

export default function App() {
  return (
    <>
      <Header />
      <div>
        <BannerSection
          images={[
            "https://www.fdli.org/wp-content/uploads/2020/05/The-Regulation-of-Cosmetics-scaled.jpeg",
            "https://media1.popsugar-assets.com/files/thumbor/Oh75nKn1VsIoIKTr7AyLl_x9fP0=/fit-in/792x529/top/filters:format_auto():upscale()/2023/02/17/038/n/1922153/tmp_1girMz_9800731501475e8c_GettyImages-642659348.jpg",
            "https://professionals.beauty/media/images/685871428e6d42a0ad5b863a86d64664.webp",
          ]}
        />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
