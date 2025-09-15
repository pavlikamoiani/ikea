import React, { useState, memo, useCallback, useEffect } from 'react';
import { Phone, Menu, X, Pencil } from 'lucide-react';
import defaultInstance from '../api/defaultInstance';

const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'ka', label: 'ქართული' },
  { code: 'am', label: 'Հայերեն' }
];

const Header = memo(({ activeSection, onNavigate, language, setLanguage, translations = {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [navItems, setNavItems] = useState([
    { id: 'home', label: translations.header_nav_home || 'Home' },
    { id: 'about', label: translations.header_nav_about || 'About' },
    { id: 'contact', label: translations.header_nav_contact || 'Contact' }
  ]);
  const [phone, setPhone] = useState(translations.phone_number || 'Call');

  useEffect(() => {
    setNavItems([
      { id: 'home', label: translations.header_nav_home || 'Home' },
      { id: 'about', label: translations.header_nav_about || 'About' },
      { id: 'contact', label: translations.header_nav_contact || 'Contact' }
    ]);
    setPhone(translations.phone_number || 'Call');
  }, [translations]);

  const [editingNavIndex, setEditingNavIndex] = useState(null);
  const [editingPhone, setEditingPhone] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleNavLabelChange = (idx, value) => {
    setNavItems(items =>
      items.map((item, i) =>
        i === idx ? { ...item, label: value } : item
      )
    );
  };

  // POST to /api/translations/{lang} on blur
  const handlePhoneBlur = () => {
    setEditingPhone(false);
    defaultInstance.post(`/translations/${language}`, { key: 'phone_number', value: phone });
  };

  const handleNavLabelBlur = (idx) => {
    setEditingNavIndex(null);
    const keys = ['header_nav_home', 'header_nav_about', 'header_nav_contact'];
    defaultInstance.post(`/translations/${language}`, { key: keys[idx], value: navItems[idx].label });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-[#0058A3] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">IK</span>
            </div>
            <span
              className="text-2xl font-bold text-[#0058A3] pr-7 select-none"
              style={{ display: 'inline-block' }}
            >
              IKEA
            </span>
            <select
              className="ml-4 border border-[#0058A3] rounded px-2 py-1 text-[#0058A3] font-semibold bg-white"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <span key={item.id} className="relative flex items-center">
                {editingNavIndex === idx ? (
                  <input
                    className="text-sm font-medium border border-[#0058A3] rounded px-1 py-0.5 w-24 text-center pr-6"
                    value={item.label}
                    onChange={e => handleNavLabelChange(idx, e.target.value)}
                    onBlur={() => handleNavLabelBlur(idx)}
                    autoFocus
                    style={{ minWidth: 40 }}
                  />
                ) : (
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`group flex items-center pr-0 bg-transparent border-none p-0 m-0 text-sm font-medium transition-colors duration-200 cursor-pointer
                      ${activeSection === item.id ? 'text-[#0058A3] font-bold underline underline-offset-4' : 'text-gray-700'}
                    `}
                    onDoubleClick={() => setEditingNavIndex(idx)}
                    style={{ background: 'none' }}
                  >
                    <span>{item.label}</span>
                    <span
                      role="button"
                      tabIndex={-1}
                      className="ml-1 flex items-center justify-center p-1 cursor-pointer"
                      aria-label="Edit nav"
                      onClick={e => {
                        e.stopPropagation();
                        setEditingNavIndex(idx);
                      }}
                      style={{ position: 'relative' }}
                    >
                      <Pencil size={14} className="text-gray-400 group-hover:text-[#0058A3] transition-colors duration-200" />
                    </span>
                  </button>
                )}
              </span>
            ))}
            <span className="relative flex items-center">
              {editingPhone ? (
                <input
                  className="text-lg font-bold border border-[#0058A3] rounded px-2 py-1 w-48 text-center pr-8"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onBlur={handlePhoneBlur}
                  autoFocus
                  style={{ minWidth: 120 }}
                />
              ) : (
                <a
                  href={phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '#'}
                  className="bg-[#FFDA1A] hover:bg-[#FFD000] text-[#0058A3] px-8 py-4 rounded-full font-bold text-lg flex items-center space-x-3 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-[#0058A3] pr-8 relative"
                  style={{ position: 'relative', display: 'inline-flex' }}
                  onDoubleClick={() => setEditingPhone(true)}
                >
                  <Phone size={24} />
                  <span>{phone}</span>
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
                    <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                  </button>
                </a>
              )}
            </span>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item, idx) => (
                <span key={item.id} className="relative flex items-center">
                  {editingNavIndex === idx ? (
                    <input
                      className="block w-full text-left py-2 text-lg font-medium border border-[#0058A3] rounded px-1 pr-6"
                      value={item.label}
                      onChange={e => handleNavLabelChange(idx, e.target.value)}
                      onBlur={() => handleNavLabelBlur(idx)}
                      autoFocus
                      style={{ minWidth: 40 }}
                    />
                  ) : (
                    <button
                      onClick={() => {
                        onNavigate(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full text-left py-2 text-lg font-medium transition-colors duration-200 ${activeSection === item.id ? 'text-[#0058A3]' : 'text-gray-700'} pr-6 cursor-pointer`}
                      onDoubleClick={() => setEditingNavIndex(idx)}
                      style={{ position: 'relative' }}
                    >
                      {item.label}
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          setEditingNavIndex(idx);
                        }}
                        className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                        aria-label="Edit nav"
                        tabIndex={-1}
                      >
                        <Pencil size={14} className="text-gray-400 hover:text-[#0058A3]" />
                      </button>
                    </button>
                  )}
                </span>
              ))}
              <span className="relative flex items-center">
                {editingPhone ? (
                  <input
                    className="block w-full text-left py-2 text-lg font-bold border border-[#0058A3] rounded px-2 pr-8"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onBlur={handlePhoneBlur}
                    autoFocus
                    style={{ minWidth: 120 }}
                  />
                ) : (
                  <a
                    href={phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '#'}
                    className="w-full bg-[#FFDA1A] hover:bg-[#FFD000] text-[#0058A3] px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300 border-2 border-[#0058A3] pr-8 relative"
                    style={{ position: 'relative', display: 'inline-flex' }}
                    onDoubleClick={() => setEditingPhone(true)}
                  >
                    <Phone size={24} />
                    <span>{phone}</span>
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
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  </a>
                )}
              </span>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;