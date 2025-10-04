import React from "react";

const Sidebar = ({ categories, selectedCategory, setSelectedCategory, minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  return (
    <div className="space-y-4 text-gray-800">
      {/* Kategoriyalar */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`block w-full text-left px-2 py-1 rounded font-medium transition ${
              selectedCategory === cat.id
                ? "bg-red-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Price filter */}
      <div className="space-y-2">
        <h2 className="font-semibold">Цена, сум</h2>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="от 0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 w-full rounded text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="number"
            placeholder="до 0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 w-full rounded text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
