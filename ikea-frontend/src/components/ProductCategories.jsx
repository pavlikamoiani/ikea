import React, { memo, useState, useCallback, useEffect } from 'react';
import { Phone, Pencil } from 'lucide-react';
import defaultInstance from '../api/defaultInstance';
import { useSelector } from 'react-redux';

const ProductCategories = memo(({ language = 'ka', translations = {} }) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [editingField, setEditingField] = useState(null);
  const [heading, setHeading] = useState(translations.categories_heading === null ? '' : translations.categories_heading || 'Shop by');
  const [highlight, setHighlight] = useState(translations.categories_highlight === null ? '' : translations.categories_highlight || 'Category');
  const [description, setDescription] = useState(translations.categories_description === null ? '' : translations.categories_description || 'Find everything you need to create your dream home, from furniture to accessories');
  const [phone, setPhone] = useState(translations.phone_number === null ? '' : translations.phone_number || 'Call');
  const [callNowText, setCallNowText] = useState(translations.call_now_text === null ? '' : translations.call_now_text || 'Call Now');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryTitles, setCategoryTitles] = useState({});
  const [categoryImages, setCategoryImages] = useState({});
  const [editingImageId, setEditingImageId] = useState(null);
  const user = useSelector(state => state.user.user);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setHeading(translations.categories_heading === null ? '' : translations.categories_heading || 'Shop by');
    setHighlight(translations.categories_highlight === null ? '' : translations.categories_highlight || 'Category');
    setDescription(translations.categories_description === null ? '' : translations.categories_description || 'Find everything you need to create your dream home, from furniture to accessories');
    setPhone(translations.phone_number === null ? '' : translations.phone_number || 'Call');
    setCallNowText(translations.call_now_text === null ? '' : translations.call_now_text || 'Call Now');
    const titles = {};
    categories.forEach(cat => {
      titles[cat.id] = translations[`category_title_${cat.id}`] === null ? '' : translations[`category_title_${cat.id}`] || cat.title;
    });
    setCategoryTitles(titles);
    const images = {};
    categories.forEach(cat => {
      images[cat.id] = translations[`category_image_${cat.id}`] === null ? '' : translations[`category_image_${cat.id}`] || cat.image;
    });
    setCategoryImages(images);
  }, [translations]);

  const handlePhoneBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'phone_number', value: phone });
  };

  const handleHeadingBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'categories_heading', value: heading });
  };

  const handleHighlightBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'categories_highlight', value: highlight });
  };

  const handleDescriptionBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'categories_description', value: description });
  };

  const handleCallNowTextBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'call_now_text', value: callNowText });
  };

  const handleCategoryTitleBlur = (id) => {
    setEditingCategoryId(null);
    defaultInstance.post(`/translations/${language}`, {
      key: `category_title_${id}`,
      value: categoryTitles[id]
    });
  };

  const handleImageLoad = useCallback((id) => {
    setLoadedImages(prev => new Set(prev).add(id));
  }, []);

  const handleCategoryImageChange = (id, e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('key', `category_image_${id}`);
      formData.append('file', file);
      defaultInstance.post(`/translations/${language}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        setCategoryImages(imgs => ({
          ...imgs,
          [id]: res.data.value
        }));
        setEditingImageId(null);
      });
    }
  };

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
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="relative inline-flex items-center justify-center">
              {editingField === 'heading' ? (
                <input
                  className="text-4xl sm:text-5xl font-bold mb-0 text-black w-full text-center pr-8"
                  value={heading}
                  onChange={e => setHeading(e.target.value)}
                  onBlur={handleHeadingBlur}
                  autoFocus
                  style={{ minWidth: 120 }}
                />
              ) : (
                <span
                  className="text-4xl sm:text-5xl font-bold text-gray-900 pr-8 cursor-pointer"
                  onDoubleClick={isAdmin ? () => setEditingField('heading') : undefined}
                  style={{ position: 'relative' }}
                >
                  {heading}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setEditingField('heading')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit heading"
                      tabIndex={-1}
                    >
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  )}
                </span>
              )}
              {' '}
              {editingField === 'highlight' ? (
                <input
                  className="text-[#0058A3] text-4xl sm:text-5xl font-bold mb-0 w-full text-center pr-8"
                  value={highlight}
                  onChange={e => setHighlight(e.target.value)}
                  onBlur={handleHighlightBlur}
                  autoFocus
                  style={{ minWidth: 120 }}
                />
              ) : (
                <span
                  className="text-[#0058A3] text-4xl sm:text-5xl font-bold pr-8 cursor-pointer"
                  onDoubleClick={isAdmin ? () => setEditingField('highlight') : undefined}
                  style={{ position: 'relative' }}
                >
                  {highlight}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setEditingField('highlight')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit highlight"
                      tabIndex={-1}
                    >
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  )}
                </span>
              )}
            </div>
            <div className="relative inline-flex items-center justify-center w-full">
              {editingField === 'description' ? (
                <textarea
                  className="text-xl text-black max-w-2xl mx-auto w-full mb-2 pr-8"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  onBlur={handleDescriptionBlur}
                  autoFocus
                  style={{ minWidth: 120 }}
                />
              ) : (
                <p
                  className="text-xl text-gray-600 max-w-2xl mx-auto pr-8 cursor-pointer relative"
                  onDoubleClick={isAdmin ? () => setEditingField('description') : undefined}
                  style={{ display: 'inline-block', position: 'relative' }}
                >
                  {description}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setEditingField('description')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit description"
                      tabIndex={-1}
                    >
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>
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
                {editingImageId === category.id ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`category-image-upload-${category.id}`}
                      onChange={e => handleCategoryImageChange(category.id, e)}
                    />
                    <label
                      htmlFor={`category-image-upload-${category.id}`}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer z-20 bg-black/30"
                    >
                      <img
                        src={categoryImages[category.id] || category.image}
                        alt={category.title}
                        className="w-full h-full object-cover opacity-60"
                        style={{ pointerEvents: 'none' }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black/40">Select Image</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setEditingImageId(null)}
                      className="absolute top-2 right-2 bg-white/80 rounded-full p-1 z-30"
                      aria-label="Cancel image edit"
                    >×</button>
                  </>
                ) : (
                  <>
                    <img
                      src={categoryImages[category.id] || category.image}
                      alt={category.title}
                      className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${loadedImages.has(category.id) ? 'opacity-100' : 'opacity-0'
                        }`}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => handleImageLoad(category.id)}
                    />
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={isAdmin ? e => {
                          e.stopPropagation();
                          setEditingImageId(category.id);
                        } : undefined}
                        className="absolute top-2 right-2 bg-white/80 rounded-full p-1 z-30"
                        aria-label="Edit category image"
                        title="Edit category image"
                      >
                        <Pencil size={16} className="text-[#0058A3]" />
                      </button>
                    )}
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <div className="flex items-center">
                  {editingCategoryId === category.id ? (
                    <input
                      className="text-2xl font-bold mb-2 text-black w-full pr-8"
                      value={categoryTitles[category.id] || ''}
                      onChange={e =>
                        setCategoryTitles(titles => ({
                          ...titles,
                          [category.id]: e.target.value
                        }))
                      }
                      onBlur={() => handleCategoryTitleBlur(category.id)}
                      autoFocus
                      style={{ minWidth: 80 }}
                    />
                  ) : (
                    <h3
                      className="text-2xl font-bold mb-2 pr-8 cursor-pointer relative"
                      onDoubleClick={isAdmin ? () => setEditingCategoryId(category.id) : undefined}
                      style={{ position: 'relative', display: 'inline-block' }}
                    >
                      {categoryTitles[category.id] || ''}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => setEditingCategoryId(category.id)}
                          className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                          aria-label="Edit category title"
                        >
                          <Pencil size={16} className="text-gray-400 hover:text-[#FFDA1A]" />
                        </button>
                      )}
                    </h3>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-[#FFDA1A] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  {editingField === `call_now_${category.id}` ? (
                    <input
                      className="text-black font-semibold w-full pr-8"
                      value={callNowText}
                      onChange={e => setCallNowText(e.target.value)}
                      onBlur={handleCallNowTextBlur}
                      autoFocus
                      style={{ minWidth: 80 }}
                    />
                  ) : (
                    <a
                      className="flex items-center gap-2"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Call Now button clicked');
                      }}
                    >
                      <span>{callNowText}</span>
                      <Phone size={20} />
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => setEditingField(`call_now_${category.id}`)}
                          className=""
                          aria-label="Edit call now text"
                        >
                          <Pencil size={16} className="text-gray-400 hover:text-[#FFDA1A]" />
                        </button>
                      )}
                    </a>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-[#0058A3]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ProductCategories.displayName = 'ProductCategories';
export default ProductCategories;