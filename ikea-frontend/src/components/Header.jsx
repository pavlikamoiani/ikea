import React, { useState, useEffect, memo, useCallback } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const Header = memo(({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

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
            <span className="text-2xl font-bold text-[#0058A3]">IKEA</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#0058A3] ${activeSection === item.id ? 'text-[#0058A3]' : 'text-gray-700'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+15551234567"
              className="bg-[#FFDA1A] hover:bg-[#FFD000] text-[#0058A3] px-8 py-4 rounded-full font-bold text-lg flex items-center space-x-3 transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-[#0058A3]"
            >
              <Phone size={24} />
              <span>+1 (555) 123-4567</span>
            </a>
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
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 text-lg font-medium transition-colors duration-200 ${activeSection === item.id ? 'text-[#0058A3]' : 'text-gray-700'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:+15551234567"
                className="w-full bg-[#FFDA1A] hover:bg-[#FFD000] text-[#0058A3] px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300 border-2 border-[#0058A3]"
              >
                <Phone size={24} />
                <span>+1 (555) 123-4567</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;