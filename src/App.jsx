// src/App.jsx
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-600">
            Cartsy
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-6">
            <input
              type="text"
              placeholder="Search for items"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 items-center">
            <Link to="/login" className="text-gray-700">Login</Link>
            <Link to="/register" className="text-gray-700">Register</Link>
            <Link to="/cart" className="relative">
              <span className="material-icons">shopping_cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
