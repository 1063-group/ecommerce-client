import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiBarChart } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function RowProductCard({ product }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex bg-base-100 min-w-[220px] rounded-xl m-5">
        {/* Rasmga bosilsa single sahifaga olib ketadi */}
        <Link
          to={`/products/${product.id}`}
          className="photo rounded-xl bg-base-300 p-3 flex items-center"
        >
          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl max-w-[244px] object-contain"
          />
        </Link>

        <div className="flex bg-base-100 rounded-xl flex-col justify-between p-4">
          <div className="flex justify-between">
            <div className="main flex flex-col gap-3">
              <div>
                <p className="text-lg text-gray-600">{product.category}</p>
                <p className="text-lg font-semibold">{product.title}</p>
              </div>
              <div className="flex flex-col">
                <p className="price text-lg font-bold max-w-[130px]">
                  {product.price.toLocaleString()} сум
                </p>
                {product.installment && (
                  <p className="bg-warning/60 text-sm rounded max-w-[140px] p-1 font-medium">
                    {product.installment.toLocaleString()} сум x 12 мес
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <label className="btn btn-circle swap swap-rotate border-none bg-base-100">
                <input type="checkbox" />
                <div className="swap-off fill-current text-2xl text-base-200">
                  <FaRegHeart />
                </div>
                <div className="swap-on fill-current text-2xl text-error">
                  <FaHeart />
                </div>
              </label>
              <label className="btn btn-circle swap swap-rotate border-none bg-base-100">
                <input type="checkbox" />
                <div className="swap-off fill-current text-base-200 text-2xl">
                  <BiBarChart />
                </div>
                <div className="swap-on fill-current text-base-neutral text-2xl">
                  <BiBarChart />
                </div>
              </label>
            </div>
          </div>

          <div className="buy flex justify-between items-center">
            <button className="px-3 py-3 border border-3 text-2xl text-primary rounded-xl hover:bg-primary/20 transition">
              <FiShoppingCart />
            </button>

            {/* Bu ham single sahifaga olib ketsin */}
            <Link
              to={`/products/${product.id}`}
              className="text-xl text-secondary border border-3 rounded-xl px-7 py-2 hover:bg-secondary/20 transition"
            >
              В рассрочку
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
