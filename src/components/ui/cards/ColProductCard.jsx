import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiBarChart } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
const ColProductCard = () => {
  return (
    <div className="flex  items-center justify-center">
      <div className="flex flex-col bg-base-100  min-w-[220px] rounded-xl m-5">
        <div className="photo  rounded-xl bg-base-300 p-3 ">
          <div className="flex flex-col gap-2  items-end ">
            <div className="border-none">
              <label className="btn btn-circle swap swap-rotate border-none bg-base-100">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                {/* hamburger icon */}
                <div className="swap-off fill-current text-2xl text-base-200 ">
                  <FaRegHeart />
                </div>

                {/* close icon */}
                <div className="swap-on fill-current text-2xl text-error">
                  <FaHeart />
                </div>
              </label>
            </div>
            <div>
              <label className="btn btn-circle swap swap-rotate border-none bg-base-100 ">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                {/* hamburger icon */}
                <div className="swap-off fill-current text-base-200 text-2xl">
                  <BiBarChart />
                </div>

                {/* close icon */}
                <div className="swap-on fill-current text-base-neutral text-2xl">
                  <BiBarChart />
                </div>
              </label>
            </div>
          </div>
          <div className=" ">
            <img
              src="/AirPodsPro.png"
              alt=""
              className="rounded-xl max-w-[244px]"
            />
          </div>
        </div>
        <div className="flex bg-base-100 rounded-xl flex-col gap-[20px] p-4">
          <div className="main flex flex-col gap-3">
            <div>
              <p className="text-lg">Беспроводные наушники</p>
              <p className="text-lg ">AirPods 3 Pro</p>
            </div>
           <div className="flex flex-col "> 
             <p className="price text-lg font-bold max-w-[130px]">2 150 000 сум</p>
             <p className=" bg-warning/60 text-sm rounded max-w-[140px] p-1 font-medium"> 259 000 сум x12мес</p>
           </div>

          </div>
          <div className="buy flex justify-between items-center">
            <button className="px-3 py-3 border border-3 text-2xl text-primary rounded-xl "><FiShoppingCart /></button>
            <button className="text-xl text-secondary border border-3 rounded-xl px-7 py-2 ">В рассрочку</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColProductCard;
