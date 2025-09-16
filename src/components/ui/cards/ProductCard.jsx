import { Link } from "react-router-dom";
// import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition relative overflow-hidden">
      <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
        <HeartIcon className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex justify-center items-center h-52 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>
      <div className="p-4 border-t">
        <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[36px]">
          {product.title}
        </h2>

        <p className="text-lg font-bold text-black mt-2">
          {product.price.toLocaleString()} so‘m
        </p>

        {product.installment && (
          <p className="bg-yellow-300 inline-block px-2 py-1 rounded text-sm font-semibold mt-1">
            {product.installment.toLocaleString()} so‘m x 12 мес
          </p>
        )}

        <div className="flex gap-2 mt-4">
          <button className="flex-1 border border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-gray-100 transition">
            <ShoppingCartIcon className="w-4 h-4 mr-1" />
            <span className="text-sm">В корзину</span>
          </button>
          <Link
            to="/installment"
            className="flex-1 bg-red-500 text-white text-center rounded-lg p-2 hover:bg-red-600 transition text-sm"
          >
            В рассрочку
          </Link>
        </div>
      </div>
    </div>
  );
}
