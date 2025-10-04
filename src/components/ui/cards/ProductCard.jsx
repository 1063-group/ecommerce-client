import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart, addToFavorites }) {
  // Рассрочка: 12 oylik misol qilib olamiz
  const installmentMonths = 12;
  const installmentPrice = Math.ceil(product.price / installmentMonths);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition relative overflow-hidden">
      {/* ❤️ Sevimlilarga qo‘shish tugmasi */}
      <button
        onClick={() => addToFavorites(product)}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
      >
        <HeartIcon className="w-5 h-5 text-gray-600" />
      </button>

      {/* Rasm bosilganda single sahifaga olib boradi */}
      <Link to={`/products/${product.id}`}>
        <div className="flex justify-center items-center h-52 p-4 cursor-pointer">
          <img
            src={product?.thumbnail || product?.images?.[0]}
            alt={product?.title}
            className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4 border-t">
        {/* Nomi */}
        <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[36px]">
          {product?.title}
        </h2>

        {/* Narxi */}
        <p className="text-lg font-bold text-black mt-2">
          {product?.price.toLocaleString()} so‘m
        </p>

        {/* Рассрочка */}
        <p className="bg-yellow-300 inline-block px-2 py-1 rounded text-sm font-semibold mt-1">
          {installmentPrice.toLocaleString()} so‘m × {installmentMonths} мес
        </p>

        {/* Tugmalar */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 border border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ShoppingCartIcon className="w-4 h-4 mr-1" />
            <span className="text-sm">В корзину</span>
          </button>

          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-red-500 text-white text-center rounded-lg p-2 hover:bg-red-600 transition text-sm"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}
