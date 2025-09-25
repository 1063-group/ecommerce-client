// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Boshlang'ich holatni localStorage'dan tekshiramiz
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const initialState = {
  user: user || null,
  token: token || null,
  isAuth: !!token, // agar token bo‘lsa true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;

      // LocalStorage'ga saqlash
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    register: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;

      // LocalStorage tozalash
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
