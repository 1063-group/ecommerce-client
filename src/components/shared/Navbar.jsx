import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="bg-red-500 text-white flex items-center justify-between px-4 py-5 text-sm">
        <div className="flex gap-4">
          <button className="px-5 py-2 bg-white text-red-600 rounded-[5px] font-semibold hover:bg-red-600 hover:text-white transition-all border-2 border-white"> 
            0% Рассрочка
          </button>
          <button className="px-5 py-2 bg-transparent border-2 border-white rounded-[5px] font-semibold hover:bg-white transition-all hover:text-red-600">
            Скидки
          </button>
          <button className="px-5 py-2 bg-white text-red-600 rounded-[5px] font-semibold hover:bg-red-600 hover:text-white transition-all border-2 border-white">
            Розыгрыши
          </button>
          <button className="px-3 py-1 hover:underline">Карта сайта</button>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold">+998 (99) 007-08-09</span>
          <button className="border border-white rounded-[5px] px-5 py-3 hover:bg-white hover:text-red-600 transition-all font-semibold">
            Продавайте на olcha
          </button>
          <div className="flex gap-2 font-semibold">
            <span className="cursor-pointer">Ўзб</span>
            <span className="cursor-pointer">O'z</span>
            <span className="cursor-pointer">Рус</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
