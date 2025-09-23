
import React from "react";
import { ShoppingBag, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "lucide-react";

const InfoBar = ({ onStartShopping }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onStartShopping) onStartShopping();
    navigate("/login"); 
  };

  
  const colors = ["text-primary", "text-secondary", "text-accent", "text-info"];

  return (
    <div className="relative bg-primary text-primary-content overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 sm:py-4 gap-3 sm:gap-4">
          {/* Left Info */}
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            <div className="text-sm sm:text-lg font-semibold">
              Предложение от <span className="font-bold">Ecommerce</span> – Всё дешевле
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={handleClick}
            className="flex items-center gap-2 btn bg-base-content text-primary hover:bg-base-200 px-4 py-2 rounded-lg font-medium shadow-md transition"
          >
            <ShoppingBag className="w-4 h-4" />
            Начать покупку
          </button>
        </div>
      </div>

      {/* Animated Background Percent Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className="absolute opacity-30 animate-pulse"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <Percent className={`w-4 h-4 ${randomColor}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoBar;
