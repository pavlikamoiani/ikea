import React, { memo, useCallback } from 'react';
import { Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';

const Footer = memo(({ onNavigate }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
              <span className="text-2xl font-bold">IKEA</span>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Creating a better everyday life for the many people by offering well-designed, functional home furnishing solutions.
            </p>
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