import React, { memo, useCallback, useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Youtube, ArrowUp, Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';

const Footer = memo(({ onNavigate, language = 'ka', translations = {} }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Editable fields
  const [editingField, setEditingField] = useState(null);
  const [brand, setBrand] = useState(translations.footer_brand || 'IKEA');
  const [description, setDescription] = useState(translations.footer_description || 'Creating a better everyday life for the many people by offering well-designed, functional home furnishing solutions.');

  const user = useSelector(state => state.user.user);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setBrand(translations.footer_brand || 'IKEA');
    setDescription(translations.footer_description || 'Creating a better everyday life for the many people by offering well-designed, functional home furnishing solutions.');
  }, [translations]);

  const handleBrandBlur = () => {
    setEditingField(null);
    // defaultInstance.post(`/translations/${language}`, { key: 'footer_brand', value: brand });
  };
  const handleDescriptionBlur = () => {
    setEditingField(null);
    // defaultInstance.post(`/translations/${language}`, { key: 'footer_description', value: description });
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Youtube size={20} />, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-[#0058A3] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          {/* Company Info */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-[#FFDA1A] rounded-lg flex items-center justify-center">
                <span className="text-[#0058A3] font-bold text-lg">IK</span>
              </div>
              <div className="relative flex items-center">
                {editingField === 'brand' ? (
                  <input
                    className="text-2xl font-bold text-white bg-[#0058A3] border border-[#FFDA1A] rounded px-1 py-0.5 w-24 text-center pr-7"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    onBlur={handleBrandBlur}
                    autoFocus
                    style={{ minWidth: 60 }}
                  />
                ) : (
                  <span
                    className="text-2xl font-bold pr-7 cursor-pointer"
                    onDoubleClick={isAdmin ? () => setEditingField('brand') : undefined}
                    style={{ position: 'relative', display: 'inline-block' }}
                  >
                    {brand}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => setEditingField('brand')}
                        className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                        aria-label="Edit brand"
                        tabIndex={-1}
                      >
                        <Pencil size={16} className="text-[#FFDA1A] hover:text-white" />
                      </button>
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="relative mb-6">
              {editingField === 'description' ? (
                <textarea
                  className="text-blue-100 mb-2 leading-relaxed w-full text-center text-black pr-8"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  onBlur={handleDescriptionBlur}
                  autoFocus
                  style={{ minWidth: 120 }}
                />
              ) : (
                <p
                  className="text-blue-100 mb-6 leading-relaxed pr-8 cursor-pointer relative"
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
                      <Pencil size={16} className="text-[#FFDA1A] hover:text-white" />
                    </button>
                  )}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-blue-700 hover:bg-[#FFDA1A] hover:text-[#0058A3] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-blue-100 text-center md:text-left mb-4 md:mb-0">
            <p>&copy; 2024 IKEA. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-blue-700 hover:bg-[#FFDA1A] hover:text-[#0058A3] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;