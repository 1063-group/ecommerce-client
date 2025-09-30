// ColDiscountCard.jsx
import React from "react"
import { Heart, BarChart2, ShoppingCart } from "lucide-react"
import { Link } from "react-router"

export default function ColDiscountCard({
  id = 1,
  title = "Redmi 13C (Бывший в употреблении)",
  price = 1000000,
  discount = 18,
  image = "https://olcha.uz/image/220x220/products/cdn_1/supplier/stores/1/2025-09-18/wI0On5FHgzwkeHByFVL2VODCayL9v1LssoVJB8Uaq1ntjMj502S52AepywLi.jpg",
}) {
  return (
    <Link to={"/products/" + id} className="card flex-1 min-w-[250px] w-full h-110 bg-base-100 border-2 border-primary rounded-2xl overflow-hidden relative shadow-md">
      {/* Discount badge */}
      <div className="absolute top-2 left-2">
        <div className="badge bg-primary text-base-100 font-semibold">-{discount}%</div>
      </div>

      {/* Icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button className="btn btn-ghost btn-xs p-1">
          <Heart className="h-4 w-4 text-base-content" />
        </button>
        <button className="btn btn-ghost btn-xs p-1">
          <BarChart2 className="h-4 w-4 text-base-content" />
        </button>
      </div>

      {/* Product image */}
      <figure className="px-6 pt-8">
        <img src={image} alt="product" className="rounded-xl h-40 object-contain mx-auto" />
      </figure>

      {/* Product info */}
      <div className="card-body px-4 py-4">
        <h2 className="card-title text-sm font-medium line-clamp-2">{title}</h2>
        <p className="text-lg font-bold text-primary">{price}</p>
        <p className="text-sm line-through ">{price}</p>
        <div className="mt-1">
          <div className="badge bg-primary text-netural font-medium whitespace-nowrap">
            {(price/12).toFixed(0)} сум/мес
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="mt-4 flex items-center justify-between">
          <button className="btn btn-ghost btn-sm">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button className="btn btn-outline btn-primary btn-sm rounded-xl">
            В рассрочку
          </button>
        </div>
      </div>
    </Link>
  )
}
