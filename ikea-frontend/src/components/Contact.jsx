import React, { useState, memo, useCallback } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const Contact = memo(() => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Our Store',
      details: '1234 Furniture Ave, Design District, City 12345',
      link: 'Get Directions'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      link: 'Call Now'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Store Hours',
      details: 'Mon-Sun: 10:00 AM - 9:00 PM',
      link: 'View Details'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="text-[#0058A3]">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need help with your home furnishing project? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-[#0058A3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-white">
                      {info.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                    <p className="text-gray-600 mb-2">{info.details}</p>
                    <button className="text-[#0058A3] hover:text-[#004494] font-medium text-sm transition-colors duration-200">
                      {info.link} →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Map</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;