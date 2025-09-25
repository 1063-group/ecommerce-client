import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategorySwiper = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Generate theme colors dynamically based on API data
  const themes = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'];
  
  const getCategoryTheme = (index) => {
    return themes[index % themes.length];
  };

  const getCategories = async () => {
    try {
      const request = await fetch('https://dummyjson.com/products/category-list');
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

  const itemsPerView = 8;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  if (loadingCategories) {
    return (
      <section className="py-10">
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
    <section className="py-10 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`btn btn-circle btn-sm absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ${
              currentIndex === 0 ? 'btn-disabled' : 'btn-outline btn-primary'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`btn btn-circle btn-sm absolute right-0 top-1/2 transform -translate-y-1/2 z-10 ${
              currentIndex >= maxIndex ? 'btn-disabled' : 'btn-outline btn-primary'
            }`}
          >
            <ChevronRight size={20} />
          </button>

          {/* Categories container */}
          <div className="overflow-hidden mx-12">
            {categories.length > 0 ? (
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {categories.map((category, index) => {
                  const theme = getCategoryTheme(index);
                  const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');

                  return (
                    <div 
                      key={category}
                      className="flex-none px-2"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div className="group cursor-pointer">
                        {/* Category circle with dynamic colors */}
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-${theme}/10 border-2 border-${theme}/20 flex items-center justify-center group-hover:border-${theme} group-hover:bg-${theme}/20 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                          <div className={`text-2xl font-bold text-${theme} group-hover:text-${theme}-focus transition-colors duration-300`}>
                            {categoryName.charAt(0)}
                          </div>
                        </div>
                        
                        {/* Category name */}
                        <div className="text-center">
                          <div className={`inline-block px-3 py-1 rounded-full bg-${theme}/10 group-hover:bg-${theme}/20 transition-all duration-300`}>
                            <p className={`text-xs font-semibold text-${theme} group-hover:text-${theme}-focus transition-colors duration-300 leading-tight`}>
                              {categoryName}
                            </p>
                          </div>
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
                  <span className="text-lg">Категории не найдены</span>
                </div>
              </div>
            )}
          </div>

          {/* Dots indicator with DaisyUI styling */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`btn btn-xs btn-circle ${
                    currentIndex === index ? 'btn-primary' : 'btn-outline btn-primary'
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