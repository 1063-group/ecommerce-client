import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Phone,
  Globe,
  Percent,
  Gift,
  CreditCard,
  Sparkles,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";

const SubNavbar = ({ lang, onLangChange }) => {
  const navigate = useNavigate();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const handleSellerClick = () => navigate("/login");

  return (
    <div className="bg-base-300 text-base-content shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row items-center justify-between py-3 sm:py-4 gap-3">
          {/* Left Promo Items */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {/* 0% Рассрочка */}
            <Link
              to="/rasrochka"
              className="badge badge-accent gap-2 font-bold cursor-pointer animate-pulse"
            >
              <CreditCard className="w-4 h-4" />
              0% Рассрочка
            </Link>

            {/* Скидки */}
            <Link
              to="/discounts"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-base-200 transition cursor-pointer"
            >
              <Percent className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Скидки</span>
                <span className="text-xs text-neutral-content">До 70%</span>
              </div>
            </Link>

            {/* Розыгрыши */}
            <Link
              to="/lottery"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-base-200 transition cursor-pointer"
            >
              <Gift className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Розыгрыши</span>
                <span className="text-xs text-neutral-content">Новые призы</span>
              </div>
            </Link>

            {/* Новинки */}
            <Link
              to="/news"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-base-200 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Новинки</span>
                <span className="text-xs text-neutral-content">Каждый день</span>
              </div>
            </Link>
          </div>

          {/* Right Menu */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Phone */}
            <a
              href="tel:+998952100550"
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-base-200 transition"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs text-neutral-content">Звоните сейчас</span>
                <span className="font-bold text-base-content">
                  +998 (95) 210 05 50
                </span>
              </div>
            </a>

            {/* Seller Button */}
            <button
              onClick={handleSellerClick}
              className="flex items-center gap-2 bg-primary text-primary-content px-3 py-2 rounded-lg hover:bg-primary/80 transition font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              Продавайте на ecommerce
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 border border-base-300 rounded-lg px-3 py-1 text-sm hover:bg-base-200 transition"
              >
                <Globe className="w-4 h-10" /> {lang}
                <ChevronDown
                  className={`w-3  transition-transform ${
                    isLangDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-base-100 border border-base-200 rounded-lg shadow-lg z-50 py-1">
                  {["Ўзб", "O'z", "Рус"].map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        onLangChange(l);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition hover:bg-primary/10 ${
                        lang === l
                          ? "bg-primary text-primary-content font-bold"
                          : ""
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
