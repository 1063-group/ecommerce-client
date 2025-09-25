// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage

// Slices
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import favoritesReducer from "./slices/favoritesSlice"; // ⭐ qo‘shildi

// Persist konfiguratsiyasi
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "favorites"], // faqat shu slice’lar saqlansin
};

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  favorites: favoritesReducer, // ⭐ qo‘shildi
});

// Persist qilingan reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store yaratish
export const store = configureStore({
  reducer: persistedReducer,
  // ⚡ Agar kerak bo‘lsa middleware qo‘shish mumkin
});

// Persistor yaratish
export const persistor = persistStore(store);
