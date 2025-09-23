// src/pages/Fovorites.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites, clearFavorites } from "../redux/slices/favoritesSlice";
import { Heart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Fovorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites);

  const handleRemove = (id, name) => {
    dispatch(removeFromFavorites(id));
    toast.success(`${name} удалён из избранного ❤️`);
  };

  const handleClearAll = () => {
    dispatch(clearFavorites());
    toast.success(`Все товары удалены из избранного ❤️`);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-10">
      {/* Кнопка выхода */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 p-3 rounded-full hover:bg-base-200"
      >
        <X size={28} />
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">
         Мои Избранные
      </h1>

      {/* Пустое состояние */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-base-200 rounded-2xl shadow-lg">
          <Heart size={80} className="text-base-content/40 mb-4" />
          <h2 className="text-xl font-semibold">Список избранного пуст</h2>
          <p className="text-sm text-base-content/60 mt-2">
            Добавьте товары в избранное
          </p>
        </div>
      ) : (
        <>
          {/* Список товаров */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-base-100 rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-base-content/60">
                      {item.price.toLocaleString()} сум
                    </p>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-error hover:text-error/80"
                    >
                      <X size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Кнопка очистки */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleClearAll}
              className="px-5 py-2 border rounded-lg hover:bg-base-200"
            >
              Очистить всё
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Fovorites;
