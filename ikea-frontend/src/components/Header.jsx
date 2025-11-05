import React, { useState, memo, useCallback, useEffect } from 'react';
import { Phone, Menu, X, Pencil, Globe, ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import defaultInstance from '../api/defaultInstance';

const LANGUAGES = [
  // { code: 'ka', flag: 'GE', label: 'KA' },
  { code: 'ru', flag: 'RU', label: 'RU' },
  { code: 'am', flag: 'AM', label: 'AM' }
  // Add 'en' if needed: { code: 'en', flag: 'GB', label: 'EN' },
];

const Header = memo(({ activeSection, onNavigate, language, setLanguage, translations = {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [navItems, setNavItems] = useState([
    { id: 'home', label: (translations.header_nav_home === null ? '' : translations.header_nav_home) || 'Home' },
    { id: 'about', label: (translations.header_nav_about === null ? '' : translations.header_nav_about) || 'About' },
    { id: 'contact', label: (translations.header_nav_contact === null ? '' : translations.header_nav_contact) || 'Contact' }
  ]);
  const [phone, setPhone] = useState(translations.phone_number === null ? '' : translations.phone_number || 'Call');

  useEffect(() => {
    setNavItems([
      { id: 'home', label: (translations.header_nav_home === null ? '' : translations.header_nav_home) || 'Home' },
      { id: 'about', label: (translations.header_nav_about === null ? '' : translations.header_nav_about) || 'About' },
      { id: 'contact', label: (translations.header_nav_contact === null ? '' : translations.header_nav_contact) || 'Contact' }
    ]);
    setPhone((translations.phone_number === null ? '' : translations.phone_number) || 'Call');
  }, [translations]);

  const [editingNavIndex, setEditingNavIndex] = useState(null);
  const [editingPhone, setEditingPhone] = useState(false);

  const [editingBrand, setEditingBrand] = useState(false);
  const [brand, setBrand] = useState(translations.header_brand === null ? '' : translations.header_brand || 'IKEA');

  const [logoUrl, setLogoUrl] = useState(translations.header_logo_url === null ? '' : translations.header_logo_url || '');
  const [editingLogo, setEditingLogo] = useState(false);

  const user = useSelector(state => state.user.user);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setBrand(translations.header_brand === null ? '' : translations.header_brand || 'IKEA');
    setLogoUrl(translations.header_logo_url === null ? '' : translations.header_logo_url || '');
  }, [translations]);

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

  const handlePhoneBlur = () => {
    setEditingPhone(false);
    defaultInstance.post(`/translations/${language}`, { key: 'phone_number', value: phone });
  };

  const handleNavLabelBlur = (idx) => {
    setEditingNavIndex(null);
    const keys = ['header_nav_home', 'header_nav_about', 'header_nav_contact'];
    defaultInstance.post(`/translations/${language}`, { key: keys[idx], value: navItems[idx].label });
  };

  const handleBrandBlur = () => {
    setEditingBrand(false);
    defaultInstance.post(`/translations/${language}`, { key: 'header_brand', value: brand });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('key', 'header_logo_url');
      formData.append('file', file);

      defaultInstance.post(`/translations/${language}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        setLogoUrl(res.data.value);
        setEditingLogo(false);
      });
    }
  };

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = React.useRef(null);

  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setLangDropdownOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-[#0058A3] rounded-lg flex items-center justify-center relative">
              {editingLogo ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="logo-upload-input"
                    onChange={handleLogoChange}
                  />
                  <label htmlFor="logo-upload-input" className="w-full h-full flex items-center justify-center cursor-pointer">
                    <span className="text-white font-bold text-xl">
                      {logoUrl ? (
                        <img src={logoUrl} alt="IK" className="w-10 h-10 object-contain" />
                      ) : (
                        ''
                      )}
                    </span>
                  </label>
                </>
              ) : (
                <>
                  <span
                    className="text-white font-bold text-xl cursor-pointer"
                    title="Click to edit logo"
                  >
                    {logoUrl ? (
                      <img src={logoUrl} alt="IK" className="w-10 h-10 object-contain" />
                    ) : (
                      ''
                    )}
                  </span>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setEditingLogo(true)}
                      className="absolute bottom-1 right-1 bg-white/80 rounded-full p-1"
                      aria-label="Edit logo"
                    >
                      <Pencil size={16} className="text-[#0058A3]" />
                    </button>
                  )}
                </>
              )}
            </div>
            {/* Editable brand */}
            <div className="relative">
              {editingBrand ? (
                <input
                  className="text-2xl font-bold text-[#0058A3] pr-7 select-none bg-white border border-[#0058A3] rounded px-1 py-0.5 w-24 text-center"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  onBlur={handleBrandBlur}
                  autoFocus
                  style={{ minWidth: 60 }}
                />
              ) : (
                <span
                  className="text-2xl font-bold text-[#0058A3] pr-7 select-none cursor-pointer"
                  style={{ display: 'inline-block', position: 'relative' }}
                  onDoubleClick={isAdmin ? () => setEditingBrand(true) : undefined}
                >
                  {brand}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setEditingBrand(true)}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit brand"
                      tabIndex={-1}
                    >
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  )}
                </span>
              )}
            </div>
            {/* Language switcher */}
            <div ref={langDropdownRef} className="relative ml-4">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(open => !open)}
                className={`flex items-center rounded-[12px] px-3 py-1.5 transition-all focus:outline-none ${langDropdownOpen ? 'shadow-md' : ''}`}
                style={{
                  minWidth: 60,
                  gap: 2,
                  height: 38,
                  boxShadow: langDropdownOpen ? '0 2px 8px 0 rgba(16,30,54,0.08)' : undefined,
                }}
              >
                <div className="flex items-center gap-2">
                  {(() => {
                    const lang = LANGUAGES.find(l => l.code === language);
                    if (!lang) return null;
                    return (
                      <img
                        src={`https://flagcdn.com/${lang.flag.toLowerCase()}.svg`}
                        alt={lang.flag}
                        height={16}
                        width={22}
                        style={{
                          objectFit: 'cover',
                          borderRadius: 2,
                          border: 'none',
                          boxShadow: 'none',
                          marginRight: 0,
                        }}
                      />
                    );
                  })()}
                  <span className="text-[#000] font-medium" style={{ fontSize: 16, letterSpacing: 1 }}>{language.toUpperCase()}</span>
                </div>
                <ChevronDown
                  size={18}
                  className={` ml-1 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {langDropdownOpen && (
                <div className="absolute left-0 mt-2 w-32 bg-white border border-[#cbd5e1] rounded-[12px] shadow-lg z-50">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center w-full px-3 py-2 gap-2 hover:bg-slate-100 transition-colors rounded-[8px] ${language === lang.code ? 'bg-slate-100 font-semibold' : ''
                        }`}
                      style={{ fontSize: 15 }}
                    >
                      <img
                        src={`https://flagcdn.com/${lang.flag.toLowerCase()}.svg`}
                        alt={lang.flag}
                        height={16}
                        width={22}
                        style={{
                          objectFit: 'cover',
                          borderRadius: 2,
                          border: 'none',
                          boxShadow: 'none',
                          marginRight: 0,
                        }}
                      />
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
                    onDoubleClick={isAdmin ? () => setEditingNavIndex(idx) : undefined}
                    style={{ background: 'none' }}
                  >
                    <span>{item.label}</span>
                    {isAdmin && (
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
                    )}
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
                  onDoubleClick={isAdmin ? () => setEditingPhone(true) : undefined}
                >
                  <Phone size={24} />
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
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  )}
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
                      onDoubleClick={isAdmin ? () => setEditingNavIndex(idx) : undefined}
                      style={{ position: 'relative' }}
                    >
                      {item.label}
                      {isAdmin && (
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
                      )}
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
                    onDoubleClick={isAdmin ? () => setEditingPhone(true) : undefined}
                  >
                    <Phone size={24} />
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
                        <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                      </button>
                    )}
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