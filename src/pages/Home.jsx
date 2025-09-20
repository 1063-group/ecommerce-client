import React from "react";
import Header from "../components/layouts/Header";
import { Outlet } from "react-router-dom";
import ColProductCard from "../components/ui/cards/ColProductCard";
import RowProductCard from "../components/ui/cards/RowProductCard";

const Home = () => {
  return (
    <>
      <div className="flex justify-between items-center max-w-[90%] m-auto  bg-base-200">
        <ColProductCard />
        <RowProductCard />
      </div>
    </>
  );
};

export default Home;
