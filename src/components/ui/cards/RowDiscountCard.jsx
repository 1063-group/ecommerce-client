// bilol
import React from "react";
import { Heart, BarChart } from "lucide-react";

/**
 * DiscountProductCard.jsx
 * 
 * A product discount card similar to e-commerce style (like your screenshot).
 * Built with Tailwind CSS + DaisyUI.
 */
// Product
export default function DiscountProductCard({
  title = "Redmi 13C (Бывший в употреблении)",
  oldPrice = "1 742 000 сум",
  newPrice = "1 428 440 сум",
  discount = "-18%",
  installment = "168 000 сум x 12 мес",
  image = "https://olcha.uz/image/220x220/products/cdn_1/supplier/stores/1/2025-09-18/wI0On5FHgzwkeHByFVL2VODCayL9v1LssoVJB8Uaq1ntjMj502S52AepywLi.jpg",
})

// return
{
  return (
    <div className="card w-full min-w-[320px] flex-1 max-w-sm bg-base-100 border-2 border-primary rounded-2xl overflow-hidden relative shadow-md">
      {/* Discount badge */}
      <div className="absolute top-2 left-2">
        <div className="badge badge-primary text-base-100 font-semibold">{discount}</div>
      </div>

      {/* Icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button className="btn btn-ghost btn-xs p-1">
          <Heart className="h-4 w-4" />
        </button>
        <button className="btn btn-ghost btn-xs p-1">
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
          <div className="text-sm line-through text-base-">{oldPrice}</div>
          <div className="text-lg font-bold text-primary">{newPrice}</div>
          <div className="mt-1">
            <div className="badge badge-primary text-xs text-natural font-medium whitespace-nowrap">
              {installment}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
