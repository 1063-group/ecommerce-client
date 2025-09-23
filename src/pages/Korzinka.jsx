// src/pages/Korzinka.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseQty,
  addToCart,
  clearCart,
} from "../redux/slices/cartSlice";
import { Trash2, ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Korzinka = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Jami narx
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-10">
      {/* ❌ Chiqish tugmasi */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-base-200"
      >
        <X size={28} />
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">
        🛒 Mening Korzinkam
      </h1>

      {/* Bo‘sh holat */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-base-200 rounded-2xl shadow-lg">
          <ShoppingCart size={80} className="text-base-content/40 mb-4" />
          <h2 className="text-xl font-semibold">Korzinka bo‘sh</h2>
          <p className="text-sm text-base-content/60 mt-2">
            Xarid qilish uchun mahsulot qo‘shing
          </p>
        </div>
      ) : (
        <>
          {/* Mahsulotlar ro‘yxati */}
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-base-100 rounded-xl shadow-md p-4"
              >
                {/* Chap tomon */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-base-content/60">
                      {item.price.toLocaleString()} so‘m
                    </p>
                    {/* Miqdor boshqaruvi */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="px-3 py-1 bg-base-200 rounded-lg hover:bg-base-300"
                      >
                        -
                      </button>
                      <span className="px-3 text-lg">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(addToCart(item))}
                        className="px-3 py-1 bg-base-200 rounded-lg hover:bg-base-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* O‘ng tomon */}
                <div className="flex items-center gap-6">
                  <span className="font-bold text-lg">
                    {(item.price * item.quantity).toLocaleString()} so‘m
                  </span>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-error hover:text-error/80"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Jami summa va tugmalar */}
          <div className="mt-10 flex items-center justify-between bg-base-100 p-6 rounded-xl shadow-lg">
            <div>
              <h2 className="text-lg font-semibold">Jami:</h2>
              <p className="text-2xl font-bold">
                {total.toLocaleString()} so‘m
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="px-5 py-2 border rounded-lg hover:bg-base-200"
              >
                Tozalash
              </button>
              <button className="px-6 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/80">
                Buyurtma berish
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Korzinka;
