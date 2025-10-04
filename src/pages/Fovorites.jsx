// src/pages/Fovorites.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites, clearFavorites } from "../redux/slices/favoritesSlice";
import { Heart, X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Fovorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites);

  const handleRemove = (id, title) => {
    dispatch(removeFromFavorites(id));
    toast.success(`${title} удалён из избранного ❤️`);
  };

  const handleClearAll = () => {
    dispatch(clearFavorites());
    toast.success(`Все товары удалены из избранного ❤️`);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      {/* ❌ Orqaga tugmasi */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 p-3 rounded-full bg-base-200 hover:bg-base-300 transition"
      >
        <X size={26} />
      </button>

      <h1 className="text-3xl font-bold mb-10 text-center">💖 Мои Избранные</h1>

      {/* Bo‘sh holat */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-base-200 rounded-2xl shadow-lg">
          <Heart size={90} className="text-pink-500 mb-6" />
          <h2 className="text-xl font-semibold">Список избранного пуст</h2>
          <p className="text-sm text-base-content/60 mt-2">
            Добавьте товары в избранное
          </p>
        </div>
      ) : (
        <>
          {/* Mahsulotlar grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
              >
                <img
                  src={item.image || item.thumbnail}
                  alt={item.title}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-base-content/70 mt-1">
                      {item.price.toLocaleString()} so‘m
                    </p>
                  </div>

                  {/* Delete tugmasi */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleRemove(item.id, item.title)}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tozalash tugmasi */}
          <div className="mt-12 flex justify-end">
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              <Trash2 size={20} />
              Очистить всё
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Fovorites;
