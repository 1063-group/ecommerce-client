import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/slices/cartSlice";
import { addToFavorites, removeFromFavorites } from "../../../redux/slices/favoritesSlice";
import toast from "react-hot-toast";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiBarChart } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

const ColProductCard = ({ card }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: card.id,
        name: card.title,
        price: card.price,
        image: card.images[0],
      })
    );
    toast.success(`${card.title} savatchaga qo‘shildi 🛒`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(card.id));
      toast.error(`${card.title} favoritlardan o‘chirildi ❌`);
    } else {
      dispatch(
        addToFavorites({
          id: card.id,
          name: card.title,
          price: card.price,
          image: card.images[0],
        })
      );
      toast.success(`${card.title} favoritlarga qo‘shildi ❤️`);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex flex-col bg-base-100 min-w-[220px] rounded-xl">
      {/* Product ustiga bosilganda SingleProduct sahifasiga o'tish */}
      <Link to={`/products/${card.id}`} className="photo rounded-xl bg-base-300 relative">
        <div className="flex flex-col gap-2 items-end absolute z-10 top-2 right-4">
          {/* Like tugmasi */}
          <div className="border-none">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleToggleFavorite();
              }}
              className="btn btn-circle border-none bg-base-100"
            >
              {isFavorite ? (
                <FaHeart className="text-xl text-red-500" />
              ) : (
                <FaRegHeart className="text-xl text-base-content" />
              )}
            </button>
          </div>

          {/* Compare tugmasi */}
          <div>
            <label className="btn btn-circle swap swap-rotate border-none bg-base-100 ">
              <input type="checkbox" />
              <div className="swap-off fill-current text-white text-2xl">
                <BiBarChart />
              </div>
              <div className="swap-on fill-current text-white text-2xl">
                <BiBarChart />
              </div>
            </label>
          </div>
        </div>

        {/* Product rasmi */}
        <img
          src={card?.images[0] || "Нет картинки"}
          alt={card?.title || "Нет Названия"}
          className="rounded-xl w-full"
        />
      </Link>

      {/* Pastki qism */}
      <div className="flex bg-base-100 rounded-xl flex-col gap-[20px] p-2">
        <div className="main flex flex-col gap-3">
          <div className="info flex flex-col gap-1 h-[86px]">
            <p className="text-lg">{card?.category || "Нет Категории"}</p>
            {/* Nomi ham link bo‘lsin */}
            <Link to={`/products/${card.id}`} className="text-lg hover:underline">
              {card?.title || "Нет Названия"}
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="price text-lg font-bold max-w-[130px]">
              {card.price
                ? card.price.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "UZS",
                  })
                : "Нет Цены"}
            </p>
            <p className="bg-warning/60 text-sm rounded max-w-[140px] p-1 font-medium">
              {card?.price
                ? Math.floor(card.price / 12).toLocaleString("ru-RU") +
                  " UZS x12 мес"
                : "Нет Цены"}
            </p>
          </div>
        </div>

        {/* Tugmalar */}
        <div className="buy flex justify-between items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline btn-primary rounded-xl"
          >
            <FiShoppingCart />
          </button>
          <button className="btn btn-outline btn-secondary rounded-xl flex-1">
            В рассрочку
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColProductCard;
