import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"; // ✅ faqat shu bo‘lsin
import { PersistGate } from "redux-persist/integration/react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import PrivateRouter from "./guard/PrivateRouter.jsx";
import VerifyGuard from "./guard/VerifyGuard.jsx";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import UserProfile from "./pages/Profile.jsx";
import VerifyAccount from "./pages/verfiyPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TelegramCallback from "./pages/TelegramCallback.jsx";
import FilteredProducts from "./pages/FilteredProducts.jsx";
import SingleProducts from "./pages/SingleProducts.jsx";
import Korzinka from "./pages/Korzinka.jsx";
import Favorites from "./pages/Fovorites.jsx"; // ✅ nomi Fovorites, lekin path /favorites

const router = createBrowserRouter(
  [
    {
      path: "/profile",
      element: (
        <PrivateRouter>
          <VerifyGuard>
            <UserProfile />
          </VerifyGuard>
        </PrivateRouter>
      ),
      children: [
        {
          index: true,
          element: (
            <VerifyGuard>
              <Home />
            </VerifyGuard>
          ),
        },
      ],
      errorElement: <div>Profile page not found</div>,
    },

    {
      path: "/verify-account",
      element: (
        <PrivateRouter>
          <VerifyAccount />
        </PrivateRouter>
      ),
    },

    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/telegram/callback", element: <TelegramCallback /> },

    {
      path: "/",
      element: <App />, // App ichida <Outlet /> bo‘lishi kerak
      children: [
        { index: true, element: <Home /> },
        { path: "categories/:category", element: <FilteredProducts /> },
        { path: "products/:id", element: <SingleProducts /> },

        { path: "korzinka", element: <Korzinka /> },
        { path: "favorites", element: <Favorites /> },
      ],
    },

    {
      path: "*",
      element: (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-500 mb-8">
              The page you're looking for doesn't exist.
            </p>
            <a href="/" className="btn btn-primary">
              Back to Home
            </a>
          </div>
        </div>
      ),
    },
  ],
  { basename: "/" }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="min-h-screen flex items-center justify-center">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        }
        persistor={persistor}
      >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
