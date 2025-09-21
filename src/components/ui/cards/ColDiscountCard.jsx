// ColDiscountCard.jsx
import React from "react"
import { Heart, BarChart2, ShoppingCart } from "lucide-react"

export default function ColDiscountCard({
  title = "Samsung Galaxy A17 Light Blue 8/256 GB",
  oldPrice = "3 431 000 сум",
  newPrice = "2 931 000 сум",
  discount = "-15%",
  installment = "344 000 сум x 12 мес",
  image = "https://i.imgur.com/dRZbJtU.png",
}) {
  return (
    <div className="card w-70 h-110 bg-base-100 border-2 border-primary rounded-2xl overflow-hidden relative shadow-md">
      {/* Discount badge */}
      <div className="absolute top-2 left-2">
        <div className="badge bg-primary text-base-100 font-semibold">{discount}</div>
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
        <p className="text-lg font-bold text-primary">{newPrice}</p>
        <p className="text-sm line-through ">{oldPrice}</p>
        <div className="mt-1">
          <div className="badge bg-primary text-netural font-medium whitespace-nowrap">
            {installment}
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
    </div>
  )
}
