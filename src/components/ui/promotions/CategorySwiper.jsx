import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategorySwiper = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const getCategories = async () => {
    try {
      const request = await fetch('https://dummyjson.com/products/categories');
      const response = await request.json();
      console.log("categories", response);
      setCategories(response);
    } catch (e) {
      console.log('server error:', e);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const itemsPerView = 10;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  // Generate placeholder image with category initial
  const generateCategoryImage = (name, index) => {
    const colors = [
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-purple-400 to-purple-600', 
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-red-400 to-red-600',
      'bg-gradient-to-br from-yellow-400 to-yellow-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-indigo-400 to-indigo-600',
      'bg-gradient-to-br from-teal-400 to-teal-600'
    ];
    
    return colors[index % colors.length];
  };

  if (loadingCategories) {
    return (
      <section className="py-6 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="text-lg text-base-content ml-4">Загрузка категорий...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>

          <button 
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center ${
              currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>

          {/* Categories container */}
          <div className="overflow-hidden mx-12">
            {categories.length > 0 ? (
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {categories.map((category, index) => {
                  const gradientClass = generateCategoryImage(category.name, index);

                  return (
                    <div 
                      key={category.slug}
                      className="flex-none"
                      style={{ width: `calc(${100 / itemsPerView}% - 16px)` }}
                    >
                      <div 
                        className="group cursor-pointer flex flex-col items-center"
                        onClick={() => window.open(category.url, '_blank')}
                      >
                        {/* Category circle - exactly like in the image */}
                        <div className="relative mb-3">
                          <div className="w-16 h-16 rounded-full border-2 border-red-400 p-1 group-hover:border-red-500 transition-colors duration-200">
                            <div className={`w-full h-full rounded-full ${gradientClass} flex items-center justify-center shadow-inner`}>
                              <span className="text-white font-bold text-lg">
                                {category.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          
                          {/* Red dot indicator like in original */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                        </div>
                        
                        {/* Category name - exactly like in the image */}
                        <div className="text-center max-w-[80px]">
                          <p className="text-xs text-gray-700 leading-tight font-medium group-hover:text-red-500 transition-colors duration-200">
                            {category.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 flex items-center justify-center">
                <div className="alert alert-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  <span className="text-lg">Категории не найдены.</span>
                </div>
              </div>
            )}
          </div>

          {/* Dots indicator - like in original image */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-6 space-x-1">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentIndex === index ? 'bg-red-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySwiper;