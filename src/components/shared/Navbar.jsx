import { useState } from "react";
import {
  ShoppingCart,
  User,
  Heart,
  Search,
  BarChart2,
  Menu,
  ClosedCaption,
  SquareXIcon,
} from "lucide-react";
import Container from "./Container";
import { useEffect } from "react";
import ProductCard from "../ui/cards/ProductCard";
import ColProductCard from "../ui/cards/ColProductCard";

import { useNavigate } from "react-router-dom"; // ✅ qo‘shing

export default function Navbar() {
  const navigate = useNavigate(); // ✅ navigate ni ishga tushiramiz
  const [cartCount, setCartCount] = useState(0);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [popularProducts, setPopularProducts] = useState([]);

  const navItems = [
    { id: 1, label: "Сравнение", icon: BarChart2 },
    { id: 2, label: "Избранные", icon: Heart, path: "/favorites" },
    { id: 3, label: "Корзина", icon: ShoppingCart, badge: true, path: "/korzinka" },
    { id: 4, label: "Войти", icon: User },
  ];

  const catalogItems = [
    "Телефоны",
    "Ноутбуки",
    "Бытовая техника",
    "Одежда",
    "Аксессуары",
  ];

  const handleOutsideClick = () => {
    setIsCatalogOpen(false);
    setIsMobileMenu(false);
  };

  const getPopularProducts = async () => {
    try {
      const request = await fetch('https://dummyjson.com/products?limit=5')
      const response = await request.json()
      setPopularProducts(response.products)
      console.log("popular products", response)
    } catch (e) {
      console.log("server error:", e)
    } finally {

    }
  }

  useEffect(() => {
    getPopularProducts()
  }, [])

  return (
    <div onClick={handleOutsideClick} className="bg-base-300">
      <nav className="bg-base-300 shadow-md py-4">
        <Container>
          <div className="flex  items-center justify-between">
            {/* Logo and Catalog */}
            <div className="flex items-center gap-4">
              <span
                className="text-2xl font-bold text-primary cursor-pointer"
                onClick={() => navigate("/")}
              >
                MarsShop
              </span>

              <div className="relative hidden sm:block">
                <button
                  className="px-4 py-2 border border-base-content/20 rounded-lg text-sm text-base-content hover:bg-base-200 transition-colors flex items-center gap-2"
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
                    className="absolute top-full mt-2 bg-base-100 border border-base-300 rounded-xl shadow-lg w-52 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul className="py-2 bg-base-200 rounded-xl">
                      {catalogItems.map((item, idx) => (
                        <li key={idx}>
                          <a className="block px-4 py-2 text-sm text-base-content hover:bg-primary hover:text-primary-content transition-colors cursor-pointer">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-6">
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Поиск по каталогу"
                  onFocus={() => setIsSearchOpen(true)}
                  className="flex-1 px-4 py-2 rounded-l-lg bg-base-100 text-base-content placeholder:text-base-content/60 focus:outline-none shadow-sm border border-base-300"
                />
                <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-content rounded-r-lg transition-colors border border-primary border-l-0">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden sm:flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className="relative flex flex-col items-center text-sm text-base-content hover:text-primary transition-colors p-2"
                    onClick={() => {
                      if (item.path) navigate(item.path);

                    }}
                  >
                    <Icon size={20} />
                    <span className="mt-1">{item.label}</span>


                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2 text-base-content hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenu(!isMobileMenu);
              }}
            >
              <Menu size={24} />
            </button>
          </div>
        </Container>

        {/* Mobile Menu */}
        {isMobileMenu && (
          <div className="sm:hidden mt-4 border-t border-base-content/20 pt-4">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Поиск по каталогу"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-base-100 text-base-content placeholder:text-base-content/60 focus:outline-none shadow-sm border border-base-300"
                />
                <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-content rounded-r-lg transition-colors border border-primary border-l-0">
                  <Search size={18} />
                </button>
              </div>

              {/* Mobile Catalog */}
              <div>
                <button
                  className="w-full text-left px-4 py-2 text-base-content hover:bg-base-200 rounded-lg transition-colors"
                  onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                >
                  <div className="flex items-center gap-2">
                    <Menu size={18} />
                    <span>Каталог</span>
                  </div>
                </button>

                {isCatalogOpen && (
                  <div className="mt-2 pl-4">
                    {catalogItems.map((item, idx) => (
                      <a
                        key={idx}
                        className="block px-4 py-2 text-sm text-base-content hover:bg-primary hover:text-primary-content transition-colors cursor-pointer rounded-lg"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Nav Items */}
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="relative flex items-center justify-center gap-2 p-3 text-sm text-base-content hover:text-primary hover:bg-base-200 transition-colors rounded-lg"
                      onClick={() => {
                        if (item.path) navigate(item.path);
                        // if (item.label === "Корзина") setCartCount(cartCount + 1);
                      }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                      {item.badge && cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {
          isSearchOpen && (
            <div className="fixed inset-0 bg-base-300/95 z-[9999] h-screen w-full">
              <div className="container mx-auto border-b max-w-7xl py-10 flex">
                <input
                  type="text"
                  placeholder="Поиск по каталогу"
                  autoFocus={isSearchOpen && true}
                  className="flex-1 px-4 py-2 w-full min-h-[55px] rounded-l-lg bg-base-200 text-base-content placeholder:text-base-content/60 focus:outline-none shadow-sm border border-base-300"
                />
                <button className="px-4 py-2  min-h-[55px] bg-primary hover:bg-primary/80 text-primary-content rounded-r-lg transition-colors border border-primary border-l-0">
                  <Search size={18} />
                </button>
              </div>

              <div className="max-w-7xl mx-auto container py-6">
                <p className="font-bold text-3xl text-accent">Популярные товары</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                  {
                    popularProducts.map((product, index) => (
                      <ColProductCard key={index} card={product} />
                    ))
                  }
                </div>

                <div className="absolute top-6 right-6">
                  <button className="btn btn-soft bg-transparent border-transparent btn-circle btn-error">
                    <SquareXIcon size={30} onClick={() => setIsSearchOpen(false)} />
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </nav>
    </div>
  );
}
