import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // 🚀 nomi cartItems bo‘ldi
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1; // 🚀 quantity ishlatyapsan
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQty: (state, action) => {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, decreaseQty, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
