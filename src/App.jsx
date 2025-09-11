import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
function App() {
  const [count, setCount] = useState(0)

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

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
