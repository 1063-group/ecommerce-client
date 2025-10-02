// ColDiscountCard.jsx
import React from "react"
import { Heart, BarChart2, ShoppingCart } from "lucide-react"
import { Link } from "react-router"

export default function ColDiscountCard({
  title = "Samsung Galaxy A17 Light Blue 8/256 GB",
  price = 1000000,
  discount = 18,
  image = "https://olcha.uz/image/220x220/products/cdn_1/supplier/stores/1/2025-09-18/OfWVPPBnP7fpHYV2K6Ju4Idxs5CWKKWbqbGMOkbuLWtE4hzXDwxKKAXj1T1s.jpg",
}) {
  return (
    <Link to={"/products/"} className="card w-full h-110 bg-base-100 border-2 border-primary rounded-2xl overflow-hidden relative shadow-md">
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
        <img src={image} alt="product" className="rounded-xl h-50 object-contain mx-auto" />
      </figure>

      {/* Product info */}
      <div className="card-body px-4 py-4">
        <h2 className="card-title text-sm font-medium line-clamp-2">{title}</h2>
        <p className="text-lg font-bold text-primary">{Number(price - (price / 100 * discount)).toLocaleString('Ru-ru')} <span className="text-xs">UZS</span></p>
        <p className="text-sm line-through ">{Number(price).toLocaleString('Ru-ru')} UZS</p>
        <div className="mt-1">
          <div className="badge bg-primary text-netural font-medium whitespace-nowrap">
            {(price / 12).toFixed(2)} UZS x 12 месяц
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
