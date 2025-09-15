import React, { memo, useState, useCallback } from 'react';
import { Heart, Users, Leaf, Award } from 'lucide-react';

const About = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Caring for People',
      description: 'We believe everyone deserves to live better at home'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Together',
      description: 'We are stronger when we work together as a team'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Renew & Improve',
      description: 'We constantly improve to stay relevant and innovative'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Cost Consciousness',
      description: 'We offer quality products at affordable prices'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#0058A3]">IKEA</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Since 1943, IKEA has been creating a better everyday life for millions of people around the world.
              We offer well-designed, functional, and affordable home furnishing solutions that make good design accessible to everyone.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our vision is to create a better everyday life for the many people by offering a wide range of
              home furnishing products of good design and function, at prices so low that as many people as possible can afford them.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0058A3] mb-2">78+</div>
                <div className="text-sm text-gray-600">Years of Innovation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0058A3] mb-2">460+</div>
                <div className="text-sm text-gray-600">Stores Worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0058A3] mb-2">60+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center h-96">
                  <div className="text-gray-400">Loading...</div>
                </div>
              )}
              <img
                src="https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="IKEA Store Interior"
                className={`w-full h-96 object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                loading="lazy"
                decoding="async"
                onLoad={handleImageLoad}
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-[#FFDA1A] p-6 rounded-xl shadow-xl">
              <div className="text-2xl font-bold text-[#0058A3]">1943</div>
              <div className="text-sm text-[#0058A3] font-semibold">Founded</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20" style={{ display: 'none' }}>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-[#0058A3] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FFDA1A] transition-colors duration-300">
                  <div className="text-white group-hover:text-[#0058A3] transition-colors duration-300">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;