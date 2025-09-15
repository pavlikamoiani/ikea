import React, { memo, useState, useCallback } from 'react';
import { Phone } from 'lucide-react';

const ProductCategories = memo(() => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = useCallback((id) => {
    setLoadedImages(prev => new Set(prev).add(id));
  }, []);

  const categories = [
    {
      id: 1,
      title: 'Living Room',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: 2,
      title: 'Kitchen',
      image: 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: 3,
      title: 'Bedroom',
      image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: 4,
      title: 'Office',
      image: 'https://images.pexels.com/photos/4050437/pexels-photo-4050437.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: 5,
      title: 'Storage',
      image: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: 6,
      title: 'Bathroom',
      image: 'https://images.pexels.com/photos/2980720/pexels-photo-2980720.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-[#0058A3]">Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find everything you need to create your dream home, from furniture to accessories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${category.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                {!loadedImages.has(category.id) && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">Loading...</div>
                  </div>
                )}
                <img
                  src={category.image}
                  alt={category.title}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${loadedImages.has(category.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(category.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <div className="flex items-center space-x-2 text-[#FFDA1A] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Call Now</span>
                  <Phone size={20} />
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-[#0058A3]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

ProductCategories.displayName = 'ProductCategories';

export default ProductCategories;