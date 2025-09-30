import React, { memo, useState, useEffect } from 'react';
import { Phone, Pencil } from 'lucide-react';
import defaultInstance from '../api/defaultInstance';
import { useSelector } from 'react-redux';

const Hero = memo(({ language, translations = {} }) => {
  const [editingField, setEditingField] = useState(null);
  const [heading, setHeading] = useState(translations.hero_heading || 'Create Your');
  const [highlight, setHighlight] = useState(translations.hero_highlight || 'Perfect Home');
  const [description, setDescription] = useState(translations.hero_description || 'Discover affordable, functional, and beautiful furniture solutions for every room in your home');
  const [phone, setPhone] = useState(translations.phone_number || 'Call');
  const [editingPhone, setEditingPhone] = useState(false);

  const [bgImageUrl, setBgImageUrl] = useState(translations.hero_bg_url || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg');
  const [editingBgImage, setEditingBgImage] = useState(false);

  const user = useSelector(state => state.user.user);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setHeading(translations.hero_heading || 'Create Your');
    setHighlight(translations.hero_highlight || 'Perfect Home');
    setDescription(translations.hero_description || 'Discover affordable, functional, and beautiful furniture solutions for every room in your home');
    setPhone(translations.phone_number || 'Call');
    setBgImageUrl(translations.hero_bg_url || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg');
  }, [translations]);

  const handleHeadingBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'hero_heading', value: heading });
  };
  const handleHighlightBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'hero_highlight', value: highlight });
  };
  const handleDescriptionBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'hero_description', value: description });
  };

  const handlePhoneBlur = () => {
    setEditingPhone(false);
    defaultInstance.post(`/translations/${language}`, { key: 'phone_number', value: phone });
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setBgImageUrl(ev.target.result);
        setEditingBgImage(false);
        defaultInstance.post(`/translations/${language}`, { key: 'hero_bg_url', value: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 group">
        {editingBgImage ? (
          <>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="hero-bg-upload-input"
              onChange={handleBgImageChange}
            />
            <label htmlFor="hero-bg-upload-input" className="w-full h-full flex items-center justify-center cursor-pointer">
              <img
                src={bgImageUrl}
                alt="Background"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                style={{ opacity: 0.7 }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold bg-black/40">Выберите изображение</span>
            </label>
          </>
        ) : (
          <img
            src={bgImageUrl}
            alt="Modern Living Room"
            className="w-full h-full object-cover cursor-pointer"
            loading="eager"
            decoding="async"
            onClick={() => setEditingBgImage(true)}
            title="Edit background image"
          />
        )}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="relative inline-flex items-center justify-center">
            {editingField === 'heading' ? (
              <input
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-0 leading-tight text-black w-full text-center pr-8"
                value={heading}
                onChange={e => setHeading(e.target.value)}
                onBlur={handleHeadingBlur}
                autoFocus
                style={{ minWidth: 120 }}
              />
            ) : (
              <span
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-0 leading-tight text-white pr-8 cursor-pointer"
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
                    <Pencil size={18} className="text-gray-300 hover:text-[#FFDA1A]" />
                  </button>
                )}
              </span>
            )}
          </div>
          <div className="relative inline-flex items-center justify-center">
            {editingField === 'highlight' ? (
              <input
                className="block text-[#FFDA1A] text-5xl sm:text-6xl lg:text-7xl font-bold mb-0 leading-tight w-full text-center pr-8"
                value={highlight}
                onChange={e => setHighlight(e.target.value)}
                onBlur={handleHighlightBlur}
                autoFocus
                style={{ minWidth: 120 }}
              />
            ) : (
              <span
                className="block text-[#FFDA1A] text-5xl sm:text-6xl lg:text-7xl font-bold mb-0 leading-tight pr-8 cursor-pointer"
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
                    <Pencil size={18} className="text-gray-300 hover:text-[#FFDA1A]" />
                  </button>
                )}
              </span>
            )}
          </div>
          <div className="relative inline-flex items-center justify-center w-full">
            {editingField === 'description' ? (
              <textarea
                className="text-xl sm:text-2xl mb-2 max-w-2xl mx-auto leading-relaxed text-black w-full pr-8"
                value={description}
                onChange={e => setDescription(e.target.value)}
                onBlur={handleDescriptionBlur}
                autoFocus
                style={{ minWidth: 120 }}
              />
            ) : (
              <p
                className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed pr-8 cursor-pointer relative"
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
                    <Pencil size={18} className="text-gray-300 hover:text-[#FFDA1A]" />
                  </button>
                )}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {editingPhone ? (
            <input
              className="text-2xl font-bold border border-[#0058A3] rounded px-4 py-2 w-80 text-center pr-10"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onBlur={handlePhoneBlur}
              autoFocus
              style={{ minWidth: 180, color: '#000' }}
            />
          ) : (
            <a
              href={phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '#'}
              className="bg-[#FFDA1A] hover:bg-[#FFD000] text-[#0058A3] px-12 py-6 rounded-full font-bold text-2xl flex items-center space-x-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-white shadow-xl pr-10 relative"
              style={{ position: 'relative', display: 'inline-flex' }}
              onDoubleClick={isAdmin ? () => setEditingPhone(true) : undefined}
            >
              <Phone size={32} />
              <span>{phone}</span>
              {isAdmin && (
                <button
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    setEditingPhone(true);
                  }}
                  className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                  aria-label="Edit phone"
                  tabIndex={-1}
                >
                  <Pencil size={20} className="text-gray-400 hover:text-[#0058A3]" />
                </button>
              )}
            </a>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;