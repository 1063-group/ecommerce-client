import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiBarChart } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";


const ColProductCard = ({ card }) => {
  return (
    <div className="flex flex-col bg-base-100  min-w-[220px] rounded-xl">
      <div className="photo  rounded-xl bg-base-300 relative">
        <div className="flex flex-col gap-2  items-end absolute z-10 top-2 right-4">
          <div className="border-none">
            <label className="btn btn-circle swap swap-rotate border-none bg-base-100">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              {/* hamburger icon */}
              <div className="swap-off fill-current text-xl text-base-content ">
                <FaRegHeart />
              </div>

              {/* close icon */}
              <div className="swap-on fill-current text-xl text-base-content">
                <FaHeart />
              </div>
            </label>
          </div>
          <div>
            <label className="btn btn-circle swap swap-rotate border-none bg-base-100 ">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              {/* hamburger icon */}
              <div className="swap-off fill-current text-white text-2xl">
                <BiBarChart />
              </div>

              {/* close icon */}
              <div className="swap-on fill-current text-white text-2xl">
                <BiBarChart />
              </div>
            </label>
          </div>
        </div>
        <div className=" ">
          <img
            src={card?.images[0] || "Нет картинки"}
            alt={card?.title || "Нет Названия"}
            className="rounded-xl w-full"
          />
        </div>
      </div>
      <div className="flex bg-base-100 rounded-xl flex-col gap-[20px] p-2">
        <div className="main flex flex-col gap-3">
          <div className="info flex flex-col gap-1 h-[86px]">
            <p className="text-lg">{card?.category || "Нет Категории"}</p>
            <p className="text-lg ">{card?.title || "Нет Названия"}</p>
          </div>
          <div className="flex flex-col ">
            <p className="price text-lg font-bold max-w-[130px]">{(card.price).toLocaleString("ru-RU", { style: "currency", currency: "UZS" }) || "Нет Цены"}</p>

            <p className="bg-warning/60 text-sm rounded max-w-[140px] p-1 font-medium">
              {card?.price
                ? (Math.floor(card.price / 12)).toLocaleString("ru-RU") + " UZS x12 мес"
                : "Нет Цены"}
            </p>

          </div>

        </div>
        <div className="buy flex justify-between items-center gap-2">
          <button className="btn btn-outline btn-primary rounded-xl "><FiShoppingCart /></button>
          <button className="btn btn-outline btn-secondary rounded-xl flex-1">В рассрочку</button>
        </div>
      </div>
    </div>
  );
};

export default ColProductCard;
