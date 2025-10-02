// src/pages/Rasrochka.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToFavorites } from "../redux/slices/favoritesSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Rasrochka = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "Все товары" },
    { id: "smartphones", name: "Смартфоны, гаджеты, аксессуары" },
    { id: "beauty", name: "Красота и здоровье" },
    { id: "fragrances", name: "Парфюмерия" },
    { id: "automotive", name: "Автотовары" },
    { id: "special", name: "Предложение от Olcha" },
    { id: "fashion", name: "Гардероб" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (page === 0) setLoading(true);
        else setLoadingMore(true);

        const url =
          selectedCategory === "all"
            ? `https://dummyjson.com/products?limit=12&skip=${page * 12}`
            : `https://dummyjson.com/products/category/${selectedCategory}?limit=12&skip=${page * 12}`;

        const res = await fetch(url);
        const data = await res.json();

        if (page === 0) setProducts(data.products || []);
        else setProducts((prev) => [...prev, ...(data.products || [])]);

        setHasMore(!data.products || data.products.length < 12 ? false : true);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, page]);

  const filteredProducts = products
    .filter((p) => {
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return p.price >= min && p.price <= max;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      if (sortBy === "new") return b.id - a.id;
      return 0;
    });

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.title} добавлен в корзину 🛒`);
  };

  const handleAddToFavorites = (product, e) => {
    e.stopPropagation();
    dispatch(addToFavorites(product));
    toast.success(`${product.title} добавлен в избранное ❤️`);
  };

  const handleGoToSingle = (id) => {
    navigate(`/products/${id}`);
  };

  const toggleViewMode = () =>
    setViewMode(viewMode === "grid" ? "list" : "grid");

  return (
    <div className="min-h-screen bg-base-content flex flex-col ">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 bg-base-300 shadow-sm border-r ">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-base-900">Рассрочка</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setPage(0);
                      setProducts([]);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition text-left font-medium ${
                      selectedCategory === cat.id
                        ? "bg-red-600 text-white"
                        : "text-base-900 hover:bg-base-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="font-semibold mb-3 text-base-900">Цена, сум</h4>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="от 0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="number"
                  placeholder="до 0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full text-black bg-white px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              {(minPrice || maxPrice) && (
                <button
                  onClick={() => {
                    setMinPrice("");
                    setMaxPrice("");
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Очистить фильтр
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          {/* Title + Sort + View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">
                Найдено {filteredProducts.length} товаров
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border text-black border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
              >
                <option value="popularity">Популярности</option>
                <option value="low">Сначала дешевые</option>
                <option value="high">Сначала дорогие</option>
                <option value="new">Новинки</option>
              </select>
            </div>
            <button
              onClick={toggleViewMode}
              className={`p-2 rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              title="Переключить вид"
            >
              {viewMode === "grid" ? "Grid" : "List"}
            </button>
          </div>

          {loading && page === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Загрузка...</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Товары не найдены</p>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group cursor-pointer"
                      onClick={() => handleGoToSingle(p.id)}
                    >
                      <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="object-contain h-full w-full p-4 group-hover:scale-110 transition-transform duration-300"
                        />
                        {p.discountPercentage > 10 && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            -{Math.round(p.discountPercentage)}%
                          </div>
                        )}
                      </div>
                      <div className="p-4" onClick={(e) => e.stopPropagation()}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                          {p.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {p.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-xl font-bold text-red-600">
                              {p.price.toLocaleString()} сум
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {Math.ceil(p.price / 6).toLocaleString()} сум × 6 мес
                            </p>
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(p, e)}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition font-medium"
                          >
                            🛒 В корзину
                          </button>
                        </div>
                        <button
                          onClick={(e) => handleAddToFavorites(p, e)}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg transition text-sm font-medium"
                        >
                          ❤️ В избранное
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="space-y-4">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer flex flex-row overflow-hidden"
                      onClick={() => handleGoToSingle(p.id)}
                    >
                      {/* Image */}
                      <div className="relative w-64 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="object-contain h-full w-full p-4"
                        />
                        {p.discountPercentage > 10 && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                            -{Math.round(p.discountPercentage)}%
                          </div>
                        )}
                        <button
                          onClick={(e) => handleAddToFavorites(p, e)}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                        >
                          ❤️
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-6 flex-1 flex flex-col justify-between min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {p.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-red-600">
                              {p.price.toLocaleString()} сум
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {Math.ceil(p.price / 6).toLocaleString()} сум × 6 мес
                            </p>
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(p, e)}
                            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition font-medium"
                          >
                            🛒 В корзину
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {hasMore && !loadingMore && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                  >
                    Показать еще
                  </button>
                </div>
              )}
              {loadingMore && (
                <div className="flex justify-center mt-4 text-gray-600">
                  Загрузка...
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Rasrochka;
