// src/components/SubNavbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Globe,
  Percent,
  Gift,
  CreditCard,
  Sparkles,
  ShoppingBag,
  ChevronDown
} from "lucide-react";

const SubNavbar = ({ lang, onLangChange }) => {
  const navigate = useNavigate();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const promotionalItems = [
    { icon: CreditCard, text: "0% Рассрочка", badge: true, color: "badge-accent", pulse: true },
    { icon: Percent, text: "Скидки", badge: false, special: "До 70%" },
    { icon: Gift, text: "Розыгрыши", badge: false, special: "Новые призы" },
    { icon: Sparkles, text: "Новинки", badge: false, special: "Каждый день" }
  ];

  const handleSellerClick = () => navigate("/login");

  return (
    <div className="bg-gray-100 text-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row items-center justify-between py-3 sm:py-4 gap-3">

          {/* Left Promo Items */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {promotionalItems.map((item, index) => (
              <div key={index} className="relative">
                {item.badge ? (
                  <div className={`badge ${item.color} gap-2 font-bold cursor-pointer ${item.pulse ? "animate-pulse" : ""}`}>
                    <item.icon className="w-4 h-4" />
                    {item.text}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-200 transition cursor-pointer">
                    <item.icon className="w-4 h-4" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.text}</span>
                      {item.special && <span className="text-xs text-gray-500">{item.special}</span>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Menu */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Phone */}
            <a href="tel:+998952100550" className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-200 transition">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Звоните сейчас</span>
                <span className="font-bold text-gray-800">+998 (95) 210 05 50</span>
              </div>
            </a>

            {/* Seller Button */}
            <button
              onClick={handleSellerClick}
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              Продавайте на ecommerce
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1 text-sm hover:bg-gray-200 transition"
              >
                <Globe className="w-4 h-4" /> {lang} 
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                  {["Ўзб", "O'z", "Рус"].map((l) => (
                    <button
                      key={l}
                      onClick={() => { onLangChange(l); setIsLangDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition hover:bg-indigo-50 ${
                        lang === l ? "bg-indigo-600 text-white font-bold" : ""
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
