import React, { memo } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = memo(() => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
          alt="Modern Living Room"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Create Your
          <span className="block text-[#FFDA1A]">Perfect Home</span>
        </h1>
        <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover affordable, functional, and beautiful furniture solutions for every room in your home
        </p>
        <div className="flex items-center justify-center">
          <a
            href="tel:+15551234567"
            className="bg-[#FFDA1A] hover:bg-[#FFD000] text-[#0058A3] px-12 py-6 rounded-full font-bold text-2xl flex items-center space-x-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-white shadow-xl"
          >
            <Phone size={32} />
            <span>Call +1 (555) 123-4567</span>
          </a>
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