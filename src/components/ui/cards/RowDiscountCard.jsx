// bilol
import React from "react";
import { Heart, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * DiscountProductCard.jsx
 * 
 * A product discount card similar to e-commerce style (like your screenshot).
 * Built with Tailwind CSS + DaisyUI.
 */
export default function DiscountProductCard({
  id = 1, // product id (navigatsiya uchun)
  title = "Redmi 13C (Бывший в употреблении)",
  price = 1000000,
  discount = 18,
  image = "https://olcha.uz/image/220x220/products/cdn_1/supplier/stores/1/2025-09-18/wI0On5FHgzwkeHByFVL2VODCayL9v1LssoVJB8Uaq1ntjMj502S52AepywLi.jpg",
}) {
  return (
    <Link
      to={`/product/${id}`}
      className="card w-full min-w-[320px] flex-1 max-w-sm bg-base-100 border-2 border-primary rounded-2xl overflow-hidden relative shadow-md cursor-pointer hover:shadow-lg transition"
    >
      {/* Discount badge */}
      <div className="absolute top-2 left-2">
        <div className="badge badge-primary text-base-100 font-semibold">
          -{discount}%
        </div>
      </div>

      {/* Icons */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          type="button"
          className="btn btn-ghost btn-xs p-1"
          onClick={(e) => e.preventDefault()} // linkni to'xtatadi
        >
          <Heart className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-xs p-1"
          onClick={(e) => e.preventDefault()}
        >
          <BarChart className="h-4 w-4" />
        </button>
      </div>

      {/* Content row */}
      <div className="flex gap-4 p-4 items-center justify-center h-full">
        {/* Product image */}
        <div className="flex-1 flex-shrink-0">
          <img
            src={image}
            alt="product"
            className="w-full h-full object-contain rounded-lg flex-1"
          />
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-md font-medium line-clamp-2">{title}</h2>
          <div className="text-base font-bold text-primary">
            {Number(price - (price / 100) * discount).toLocaleString("ru-RU")}{" "}
            <span className="text-xs">UZS</span>
          </div>
          <div className="text-xs line-through text-base-content/70">
            {Number(price).toLocaleString("ru-RU")} UZS
          </div>
          <div className="mt-4">
            <div className="badge badge-primary text-[11px] text-natural font-medium whitespace-nowrap">
              {(price / 12).toFixed(2)} UZS x 12 месяц
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
