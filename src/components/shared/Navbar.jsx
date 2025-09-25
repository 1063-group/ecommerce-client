import { useState } from "react";
import {
  ShoppingCart,
  User,
  Heart,
  Search,
  BarChart2,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { id: 1, path: "/compare" , label: "Сравнение", icon: BarChart2 },
  { id: 2, path: "/wishlist", label: "Избранные", icon: Heart },
  { id: 3, path: "/kozrina", label: "Корзина", icon: ShoppingCart, badge: true },
  { id: 4, path: "/login", label: "Войти", icon: User },
];

const catalogItems = [
  "Телефоны",
  "Ноутбуки",
  "Бытовая техника",
  "Одежда",
  "Аксессуары",
];

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const handleOutsideClick = () => {
    setIsCatalogOpen(false);
    setIsMobileMenu(false);
  };


  return (
    <div onClick={handleOutsideClick} className="bg-gray-800">
      <nav className="bg-base-200 shadow-md px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/"><span className="text-2xl font-bold text-primary">MarsShop</span></Link>

            <div className="relative hidden sm:block">
              <button
                className="px-4 py-2 border border-base-300 rounded-lg text-sm hover:bg-base-100 transition-colors flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCatalogOpen(!isCatalogOpen);
                }}
              >
                <Menu size={18} />
                <span>Каталог</span>
              </button>

              {isCatalogOpen && (
                <div
                  className="absolute top-full mt-2 border rounded-xl shadow-lg w-52 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul className="py-2 bg-base-100 rounded-xl">
                    {catalogItems.map((item, idx) => (
                      <li key={idx}>
                        <a className="block px-4 py-2 text-sm hover:bg-primary transition-colors cursor-pointer">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>


          <div className="hidden md:flex flex-1 mx-6">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Поиск по каталогу"
                className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none shadow-sm"
              />
              <button className="px-4 py-2 bg-primary hover:bg-primary/60  rounded-r-lg transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>


          <div className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link to={item.path}
                  key={item.id}
                  className="relative flex flex-col items-center text-sm hover:text-primary transition-colors p-2"
                  onClick={() => {
                    if (item.label === "Корзина") setCartCount(cartCount + 1);
                  }}
                >
                  <Icon size={20} />
                  <span className="mt-1">{item.label}</span>

                  {item.badge && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary  text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>


        
      </nav>
    </div>
  );
}