// src/pages/Dashboard.jsx
export default function Dashboard() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-10">
          {/* Left side text */}
          <div>
            <p className="text-green-600 font-semibold mb-2">
              Get 30% Off Instantly
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Naturally Fresh Picks
            </h1>
            <p className="text-gray-600 mb-6">
              Every item is crafted to support your natural glow with gentle,
              clean ingredients you can trust.
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
              Shop Now
            </button>
          </div>

          {/* Right side image */}
          <div className="relative">
            <img
              src="https://i.ibb.co/nQwp5jL/ketchup.png"
              alt="Tomato Ketchup"
              className="w-full drop-shadow-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
