import React from "react";
import { Search, Heart, User, BarChart2, ShoppingCart } from "lucide-react";

const SubNavbar = () => {
  return (
    <div className="bg-white text-black">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        {/* Logo & catalog */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-red-600">olcha</h1>
          <button className="flex items-center gap-2 border rounded-lg px-8 py-2 hover:border-red-600 hover:text-red-600">
            <span className="text-xl">☰</span> <span>Каталог</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center w-1/2">
          <input
            type="text"
            placeholder="Поиск по каталогу"
            className="flex-1 input bg-gray-100 rounded-l-lg px-4 py-2 outline-none"
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg">
            <Search size={26} />
          </button>
        </div>

        <div className="flex items-center gap-6 text-gray-700">
          <div className="flex flex-col items-center cursor-pointer hover:border-red-600 hover:text-red-600">
            <BarChart2 size={20} />
            <span className="text-xs">Сравнение</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:border-red-600 hover:text-red-600">
            <Heart size={20} />
            <span className="text-xs">Избранные</span>
          </div>
          <div className="relative flex flex-col items-center cursor-pointer hover:border-red-600 hover:text-red-600">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs">
              0
            </span>
            <span className="text-xs">Корзина</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:border-red-600 hover:text-red-600">
            <User size={20} />
            <span className="text-xs">Кабинет</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
