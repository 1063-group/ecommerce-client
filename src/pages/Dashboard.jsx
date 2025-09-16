// src/pages/ECommerceUzum.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

/**
 * ECommerceUzum.jsx
 * Полный компонент витрины (стиль Uzum-like) с Tailwind + DaisyUI + Swiper
 *
 * Требования:
 * - Tailwind + DaisyUI настроены в проекте
 * - Установлен swiper (npm install swiper)
 *
 * Файл содержит:
 * - InfoBar (промо / уведомления)
 * - Navbar (поиск, логотип, корзина, избранное, профиль)
 * - SubNavbar (горизонтальные категории)
 * - Hero Swiper (автоплей, пагинация, стрелки)
 * - Блоки: Акции, Популярное, Скидки, Новинки (данные из стейта)
 * - Логика корзины/избранного/поиска/фильтров
 */

// ---------- Mock data (в реальном приложении данные будут приходить с API) ----------
const initialProducts = [
  { id: 1, name: "Nike Air Max 270", price: 149.99, originalPrice: 199.99, image: "https://picsum.photos/seed/nike1/600/400", category: "sneakers", rating: 4.8, reviews: 245, inStock: true, tags: ["popular","sale"] },
  { id: 2, name: "Adidas Ultraboost 22", price: 179.99, originalPrice: null, image: "https://picsum.photos/seed/adidas1/600/400", category: "sneakers", rating: 4.9, reviews: 189, inStock: true, tags: ["popular","new"] },
  { id: 3, name: "Puma RS-X", price: 89.99, originalPrice: 129.99, image: "https://picsum.photos/seed/puma1/600/400", category: "sneakers", rating: 4.5, reviews: 98, inStock: true, tags: ["sale"] },
  { id: 4, name: "Jordan 1 Retro High", price: 299.99, originalPrice: null, image: "https://picsum.photos/seed/jordan1/600/400", category: "sneakers", rating: 4.7, reviews: 367, inStock: false, tags: ["popular"] },
  { id: 5, name: "New Balance 990v5", price: 199.99, originalPrice: 249.99, image: "https://picsum.photos/seed/nb1/600/400", category: "sneakers", rating: 4.6, reviews: 156, inStock: true, tags: ["new","sale"] },
  { id: 6, name: "Converse Chuck Taylor", price: 59.99, originalPrice: null, image: "https://picsum.photos/seed/converse1/600/400", category: "casual", rating: 4.3, reviews: 78, inStock: true, tags: ["classic"] },
  { id: 7, name: "Vans Old Skool", price: 64.99, originalPrice: 79.99, image: "https://picsum.photos/seed/vans1/600/400", category: "casual", rating: 4.4, reviews: 203, inStock: true, tags: ["popular"] },
  { id: 8, name: "Reebok Classic", price: 74.99, originalPrice: null, image: "https://picsum.photos/seed/reebok1/600/400", category: "casual", rating: 4.2, reviews: 91, inStock: true, tags: [] },
];

const categories = [
  { id: "all", name: "Все" },
  { id: "sneakers", name: "Кроссовки" },
  { id: "casual", name: "Кэжуал" },
  { id: "sports", name: "Спорт" },
  { id: "accessories", name: "Аксессуары" },
];

const heroSlides = [
  { id: 1, title: "Летняя распродажа", subtitle: "До -50% на коллекцию", cta: "Купить сейчас", image: "https://picsum.photos/seed/hero1/1400/600" },
  { id: 2, title: "Новые поступления", subtitle: "Самые свежие модели", cta: "Посмотреть", image: "https://picsum.photos/seed/hero2/1400/600" },
  { id: 3, title: "Хиты продаж", subtitle: "Лучшие предложения месяца", cta: "Смотреть все", image: "https://picsum.photos/seed/hero3/1400/600" },
];

// ---------- Главный компонент ----------
export default function ECommerceUzum() {
  // state
  const [products] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance"); // relevance, price-asc, price-desc, rating
  const [cart, setCart] = useState([]); // {id, quantity}
  const [wishlist, setWishlist] = useState([]); // product ids
  const [showFilters, setShowFilters] = useState(false);
  const [priceMax, setPriceMax] = useState(500);
  const [activeHero, setActiveHero] = useState(0);

  // Derived lists
  const featured = useMemo(() => heroSlides, []);
  const popular = useMemo(() => products.filter(p => p.tags.includes("popular")), [products]);
  const sales = useMemo(() => products.filter(p => p.tags.includes("sale")), [products]);
  const newItems = useMemo(() => products.filter(p => p.tags.includes("new")), [products]);

  // Filtered & sorted products for grid
  const filteredProducts = useMemo(() => {
    let list = products.slice();

    if (selectedCategory !== "all") {
      list = list.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    list = list.filter(p => p.price <= priceMax);

    switch (sortBy) {
      case "price-asc": list.sort((a,b) => a.price - b.price); break;
      case "price-desc": list.sort((a,b) => b.price - a.price); break;
      case "rating": list.sort((a,b) => b.rating - a.rating); break;
      default: /* relevance/no change */ break;
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy, priceMax]);

  // Cart helpers
  const addToCart = (productId) => {
    setCart(prev => {
      const found = prev.find(i => i.id === productId);
      if (found) return prev.map(i => i.id === productId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.id !== productId));
  };

  const setQuantity = (productId, q) => {
    if (q <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(i => i.id === productId ? { ...i, quantity: q } : i));
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const cartDetails = useMemo(() => {
    return cart.map(ci => {
      const p = products.find(x => x.id === ci.id);
      return { ...p, quantity: ci.quantity };
    });
  }, [cart, products]);

  const cartTotal = useMemo(() => {
    return cartDetails.reduce((sum, it) => sum + it.price * it.quantity, 0).toFixed(2);
  }, [cartDetails]);

  // Hero auto-advance (fallback if swiper not used for autoplay)
  useEffect(() => {
    const t = setInterval(() => {
      setActiveHero(prev => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(t);
  }, [featured.length]);

  // ---------- JSX ----------
  return (
    <div className="min-h-screen bg-base-200">
      {/* InfoBar */}
      <div className="bg-primary text-primary-content text-sm py-2 px-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="badge badge-xs badge-secondary">🔥</span>
          <span>Скидки до 50% — действует до конца недели</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-base-content/80">
          <span>Доставка по всей Узбекистану от 24 часов</span>
        </div>
      </div>

      {/* Navbar */}
      <header className="navbar bg-base-100 shadow-md sticky top-0 z-40">
        <div className="navbar-start px-4">
          <div className="flex items-center gap-3">
            <a className="btn btn-ghost normal-case text-xl font-bold">UZUM-like</a>
            <div className="hidden md:flex items-center gap-2 bg-base-200 px-3 py-2 rounded-lg">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-sm select-ghost w-40"
              >
                {categories.map(cat => <option value={cat.id} key={cat.id}>{cat.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="navbar-center px-4">
          <div className="flex w-full max-w-2xl">
            <input
              type="text"
              className="input input-bordered w-full rounded-r-none"
              placeholder="Поиск товаров, брендов и т.д."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary rounded-l-none" onClick={() => {/* в реале отправить запрос */}}>
              Поиск
            </button>
          </div>
        </div>

        <div className="navbar-end px-4 gap-2">
          {/* Wishlist */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.8 4.6c-1.6-1.6-4.1-1.6-5.7 0L12 7.7 8.9 4.6c-1.6-1.6-4.1-1.6-5.7 0-1.6 1.6-1.6 4.1 0 5.7L12 21l8.9-10.7c1.6-1.6 1.6-4.1 0-5.7z" strokeWidth="1.5" />
                </svg>
                {wishlist.length > 0 && <span className="badge badge-xs badge-primary indicator-item">{wishlist.length}</span>}
              </div>
            </label>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-64 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold">Избранное ({wishlist.length})</span>
                <div className="space-y-2">
                  {wishlist.length === 0 ? (
                    <div className="text-center text-base-content/60 py-4">Пусто</div>
                  ) : wishlist.map(id => {
                    const p = products.find(x => x.id === id);
                    return (
                      <div key={id} className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-base-content/60">${p.price}</div>
                        </div>
                        <button className="btn btn-ghost btn-xs text-error" onClick={() => toggleWishlist(id)}>✕</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeWidth="1.5"></path>
                </svg>
                {cart.length > 0 && <span className="badge badge-xs badge-primary indicator-item">{cart.reduce((s,c) => s + c.quantity,0)}</span>}
              </div>
            </label>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-80 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold">Корзина ({cart.reduce((s,c) => s + c.quantity,0)})</span>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {cartDetails.length === 0 ? (
                    <div className="text-center text-base-content/60 py-4">Корзина пуста</div>
                  ) : cartDetails.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <div className="text-sm">{item.name}</div>
                        <div className="text-xs text-base-content/60">${item.price} × {item.quantity}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="btn btn-xs" onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="px-2">{item.quantity}</span>
                        <button className="btn btn-xs" onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                {cartDetails.length > 0 && (
                  <div className="card-actions">
                    <div className="w-full flex justify-between items-center">
                      <div className="font-bold">Итого: ${cartTotal}</div>
                      <button className="btn btn-primary btn-sm">Оформить</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile (placeholder) */}
          <button className="btn btn-ghost btn-circle">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM21 21a8 8 0 10-18 0" strokeWidth="1.5"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* SubNavbar with categories (scrollable) */}
      <div className="bg-base-100 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-sm ${selectedCategory === cat.id ? "btn-primary" : "btn-ghost"}`}
              >
                {cat.name}
              </button>
            ))}
            <button className="btn btn-sm btn-outline ml-auto" onClick={() => setShowFilters(!showFilters)}>Фильтры</button>
          </div>
        </div>
      </div>

      {/* Hero Swiper */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: categories / promotions */}
          <aside className="hidden lg:block col-span-1">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Категории</h3>
                <div className="grid gap-2 mt-2">
                  {categories.slice(1).map(c => (
                    <button key={c.id} onClick={() => setSelectedCategory(c.id)} className="btn btn-ghost justify-start">
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Акции</h3>
                <div className="space-y-2 mt-2">
                  <div className="bg-gradient-to-r from-accent to-secondary p-3 rounded text-white">
                    <div className="font-bold">Скидки до 50%</div>
                    <div className="text-sm">Только до воскресенья</div>
                  </div>
                  <div className="p-3 rounded border">Купон: UZUM-10</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Center: swiper + highlights */}
          <section className="col-span-1 lg:col-span-3">
            <div className="rounded-lg overflow-hidden shadow">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop
                className="h-64 lg:h-80"
                onSlideChange={(swiper) => setActiveHero(swiper.realIndex)}
              >
                {featured.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10 flex items-center">
                        <div className="px-6 lg:px-12 text-white max-w-xl">
                          <div className="badge badge-secondary mb-3">{slide.subtitle}</div>
                          <h2 className="text-2xl lg:text-4xl font-bold mb-3">{slide.title}</h2>
                          <button className="btn btn-primary">{slide.cta}</button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Quick highlights row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="card bg-base-100 shadow p-4 flex items-center gap-4">
                <div className="text-3xl">🚚</div>
                <div>
                  <div className="font-bold">Доставка 24ч</div>
                  <div className="text-sm text-base-content/60">По Ташкенту</div>
                </div>
              </div>
              <div className="card bg-base-100 shadow p-4 flex items-center gap-4">
                <div className="text-3xl">🔁</div>
                <div>
                  <div className="font-bold">Возврат 30 дней</div>
                  <div className="text-sm text-base-content/60">Удобные условия</div>
                </div>
              </div>
              <div className="card bg-base-100 shadow p-4 flex items-center gap-4">
                <div className="text-3xl">💳</div>
                <div>
                  <div className="font-bold">Оплата любая</div>
                  <div className="text-sm text-base-content/60">Нал/безнал/картой</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Filters panel (collapsible) */}
        {showFilters && (
          <div className="card bg-base-100 shadow mt-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="label"><span className="label-text">Максимальная цена: ${priceMax}</span></label>
                  <input type="range" min="0" max="500" value={priceMax} onChange={(e)=>setPriceMax(Number(e.target.value))} className="range range-primary" />
                </div>
                <div className="w-56">
                  <label className="label"><span className="label-text">Сортировка</span></label>
                  <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="select select-bordered w-full">
                    <option value="relevance">По релевантности</option>
                    <option value="price-asc">Цена: возрастание</option>
                    <option value="price-desc">Цена: убывание</option>
                    <option value="rating">Рейтинг</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="btn btn-outline" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setPriceMax(500); setSortBy("relevance"); setShowFilters(false); }}>Сбросить</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Sections */}
        <section className="mt-6">
          {/* Popular */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Популярное</h3>
            <button className="btn btn-ghost btn-sm">Показать всё</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {popular.length === 0 ? <div className="text-center py-6">Нет товаров</div> :
              popular.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />)}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Скидки недели</h3>
            <button className="btn btn-ghost btn-sm">Показать всё</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sales.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />)}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Все товары</h3>
            <div className="text-sm text-base-content/60">{filteredProducts.length} товаров</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-3xl mb-3">🔍</div>
                <div className="text-lg font-bold">Товары не найдены</div>
                <div className="text-base-content/60">Попробуйте изменить фильтры или поиск</div>
              </div>
            ) : filteredProducts.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />)}
          </div>

          {/* Load more placeholder */}
          <div className="text-center mt-8">
            <button className="btn btn-outline">Загрузить ещё</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer p-10 bg-base-300 text-base-content mt-12">
        <div>
          <span className="footer-title">Сервис</span>
          <a className="link link-hover">Доставка</a>
          <a className="link link-hover">Оплата</a>
          <a className="link link-hover">Возврат</a>
        </div>
        <div>
          <span className="footer-title">Компания</span>
          <a className="link link-hover">О нас</a>
          <a className="link link-hover">Контакты</a>
          <a className="link link-hover">Карьера</a>
        </div>
        <div>
          <span className="footer-title">Помощь</span>
          <a className="link link-hover">FAQ</a>
          <a className="link link-hover">Правила</a>
          <a className="link link-hover">Политика</a>
        </div>
        <div>
          <span className="footer-title">Подписка</span>
          <div className="form-control w-80">
            <label className="label">
              <span className="label-text">Подпишитесь на новости</span>
            </label>
            <div className="relative">
              <input type="text" placeholder="Ваш email" className="input input-bordered w-full pr-16" />
              <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Подписаться</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------- ProductCard component ----------
function ProductCard({ product, onAdd, onToggleWishlist, wishlist = [] }) {
  const inWishlist = wishlist.includes(product.id);
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition">
      <figure className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        {product.originalPrice && <div className="badge badge-error absolute top-3 left-3">-</div>}
        {!product.inStock && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="badge badge-outline">Нет в наличии</span></div>}
        <button onClick={() => onToggleWishlist(product.id)} className={`btn btn-circle btn-sm absolute top-3 right-3 ${inWishlist ? "btn-primary" : "btn-ghost bg-white/80"}`}>
          {inWishlist ? "♥" : "♡"}
        </button>
      </figure>
      <div className="card-body p-4">
        <h4 className="font-medium">{product.name}</h4>
        <div className="flex items-center gap-2">
          <div className="rating rating-sm">
            {[...Array(5)].map((_, i) => (
              <input key={i} type="radio" className={`mask mask-star-2 ${i < Math.round(product.rating) ? 'bg-warning' : 'bg-gray-200'}`} readOnly />
            ))}
          </div>
          <div className="text-xs text-base-content/60">({product.reviews})</div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="text-lg font-bold text-primary">${product.price}</div>
          {product.originalPrice && <div className="text-sm line-through text-base-content/60">${product.originalPrice}</div>}
        </div>
        <div className="card-actions mt-4">
          <button onClick={() => onAdd(product.id)} className="btn btn-primary w-full" disabled={!product.inStock}>
            {product.inStock ? "В корзину" : "Нет в наличии"}
          </button>
        </div>
      </div>
    </div>
  );
}
