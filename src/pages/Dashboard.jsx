import React, { useState } from "react";

export default function Dashboard() {
  // --- динамические данные ---
  const [navItems] = useState(["Home", "Products", "Orders", "Customers"]);
  const [subNavItems] = useState(["Trending", "New Arrivals", "Best Sellers", "Discounts"]);
  const [infoCards] = useState([
    { title: "Revenue", value: "$24,300", desc: "↗︎ 12% more than last month", change: "+12%", positive: true },
    { title: "Orders", value: "1,245", desc: "↗︎ 8% more than last week", change: "+8%", positive: true },
    { title: "Customers", value: "732", desc: "↘︎ 5% less than yesterday", change: "-5%", positive: false },
  ]);
  const [showcaseItems] = useState([
    { id: 1, title: "Nike Air Max", img: "https://picsum.photos/seed/1/600/300", subtitle: "Premium Collection", price: "$149.99" },
    { id: 2, title: "Adidas Yeezy", img: "https://picsum.photos/seed/2/600/300", subtitle: "Limited Edition", price: "$299.99" },
    { id: 3, title: "Puma RS-X", img: "https://picsum.photos/seed/3/600/300", subtitle: "Sport Series", price: "$89.99" },
  ]);

  const [quickStats] = useState([
    { label: "Total Products", value: "2,847", icon: "📦" },
    { label: "Pending Orders", value: "127", icon: "⏳" },
    { label: "Active Users", value: "1,892", icon: "👤" },
    { label: "Success Rate", value: "98.5%", icon: "✅" }
  ]);

  const [recentActivity] = useState([
    { id: 1, action: "New order received", user: "John Doe", time: "2 min ago", type: "order" },
    { id: 2, action: "Product updated", user: "Admin", time: "5 min ago", type: "update" },
    { id: 3, action: "Customer registered", user: "Jane Smith", time: "12 min ago", type: "user" },
    { id: 4, action: "Payment processed", user: "Mike Johnson", time: "18 min ago", type: "payment" }
  ]);

  // --- state для логики ---
  const [activeNav, setActiveNav] = useState("Home");
  const [activeSubNav, setActiveSubNav] = useState("Trending");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-advance slides
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showcaseItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showcaseItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'order': return '🛒';
      case 'update': return '🔄';
      case 'user': return '👤';
      case 'payment': return '💳';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <div className="relative z-50 bg-white/90 backdrop-blur-xl shadow-xl border-b border-slate-200/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/assets/logo.png" 
                  alt="Logo" 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    // Fallback если лого не загрузится
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hidden">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  E-Commerce Pro
                </h1>
                <p className="text-xs text-slate-500 font-medium">Dashboard v2.0</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group ${
                    activeNav === item
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  {activeNav === item && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse opacity-75"></div>
                  )}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>

            {/* Profile and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 rounded-lg transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9a6 6 0 00-6-6v0a6 6 0 00-6 6v3l-5 5h5m6 0a3 3 0 006 0" />
                  </svg>
                </button>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-3 bg-slate-100/60 rounded-xl p-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium text-sm">AD</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-700">Admin</p>
                  <p className="text-xs text-slate-500">admin@company.com</p>
                </div>
              </div>

              {/* Mobile menu button */}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 rounded-lg transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-800">Menu</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {setActiveNav(item); setSidebarOpen(false);}}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeNav === item
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SubNavbar */}
      <div className="relative z-40 bg-white/70 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-x-auto">
              {subNavItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => setActiveSubNav(item)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                    activeSubNav === item
                      ? "bg-blue-100 text-blue-700 border-2 border-blue-200 shadow-lg"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/60 border-2 border-transparent"
                  }`}
                >
                  {item}
                  {activeSubNav === item && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="hidden md:flex items-center space-x-2 bg-slate-100/60 rounded-xl px-4 py-2 min-w-0 w-64">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none flex-1 min-w-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{stat.icon}</div>
                <div>
                  <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Info Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Revenue Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
            {infoCards.map((card, index) => (
              <div 
                key={card.title} 
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div className={`w-full h-full rounded-full ${
                    index === 0 ? 'bg-green-500' :
                    index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                      index === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      index === 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                      'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      <span className="text-white font-bold text-xl">
                        {index === 0 ? '$' : index === 1 ? '#' : '👥'}
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      card.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {card.change}
                    </div>
                  </div>
                  
                  <h3 className="text-slate-600 font-medium mb-2 text-sm uppercase tracking-wider">{card.title}</h3>
                  <p className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                    {card.value}
                  </p>
                  <p className={`text-sm font-medium flex items-center space-x-1 ${
                    card.desc.includes('↗︎') ? 'text-green-600' : 'text-red-500'
                  }`}>
                    <span>{card.desc.includes('↗︎') ? '↗︎' : '↘︎'}</span>
                    <span>{card.desc.replace(/[↗︎↘︎]/g, '')}</span>
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50/80 transition-all duration-300">
                  <div className="text-lg">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
              View all activities →
            </button>
          </div>
        </div>

        {/* Showcase Carousel */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50">
          <div className="absolute top-6 left-8 z-20">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">Featured Products</h2>
            <p className="text-white/80 text-sm drop-shadow">Discover our latest collection</p>
          </div>
          
          <div className="relative h-96 overflow-hidden">
            {showcaseItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide 
                    ? 'translate-x-0 opacity-100' 
                    : index < currentSlide 
                      ? '-translate-x-full opacity-0' 
                      : 'translate-x-full opacity-0'
                }`}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="max-w-lg">
                    <p className="text-blue-300 text-sm font-medium mb-2">{item.subtitle}</p>
                    <h3 className="text-4xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-2xl font-bold text-yellow-400 mb-4">{item.price}</p>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group shadow-lg"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group shadow-lg"
          >
            <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {showcaseItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}