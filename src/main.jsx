import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"; // если есть
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

// const SingleProducts = React.lazy(() => import("./pages/SingleProducts.jsx"));

const router = createBrowserRouter(
  [
    // layout для профиля — пример вложенности
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
          index: true, // /profile  -> рендерит Home внутри UserProfile's Outlet
          element: (
            <VerifyGuard>
              <Home />
            </VerifyGuard>
          ),
        },
        // пример относительного дочернего пути:
        // { path: "settings", element: <ProfileSettings /> }  // -> /profile/settings
      ],
      errorElement: <div>Profile page not found</div>,
    },

    // verify-account (требует авторизации)
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

    // Главный сайт с layout App
    {
      path: "/",
      element: <App />, // App должен содержать <Outlet />
      children: [
        { index: true, element: <Home /> }, // "/"
        { path: "categories/:category", element: <FilteredProducts /> }, // "/categories/.."
        { path: "products/:id", element: <SingleProducts /> }, // "/products/.."
      ],
    },

    // catch-all 404
    {
      path: "*",
      element: (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
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
