// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ slices ichidan olib kelamiz
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // ikkalasi saqlansin
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
