import React, { memo, useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Pencil } from 'lucide-react';
import defaultInstance from '../api/defaultInstance';
import { useSelector } from 'react-redux';


const Contact = memo(({ language = 'ka', translations = {} }) => {
  const [editingField, setEditingField] = useState(null);
  const [heading, setHeading] = useState(translations.contact_heading || 'Get in');
  const [highlight, setHighlight] = useState(translations.contact_highlight || 'Touch');
  const [subtitle, setSubtitle] = useState(translations.contact_subtitle || 'Have questions about our products or need help with your home furnishing project? We\'re here to help!');
  const [contactInfo, setContactInfo] = useState([
    { icon: <MapPin className="w-6 h-6" />, title: translations.contact_0_title || 'Visit Our Store', details: translations.contact_0_details || '1234 Furniture Ave, Design District, City 12345', link: translations.contact_0_link || 'Get Directions' },
    { icon: <Phone className="w-6 h-6" />, title: translations.contact_1_title || 'Call Us', details: translations.contact_1_details || '+1 (123) 456-7890', link: translations.contact_1_link || 'Call Now' },
    { icon: <Clock className="w-6 h-6" />, title: translations.contact_2_title || 'Store Hours', details: translations.contact_2_details || 'Mon-Sat: 10am - 9pm', link: translations.contact_2_link || 'View Hours' }
  ]);

  const user = useSelector(state => state.user.user);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setHeading(translations.contact_heading || 'Get in');
    setHighlight(translations.contact_highlight || 'Touch');
    setSubtitle(translations.contact_subtitle || 'Have questions about our products or need help with your home furnishing project? We\'re here to help!');
    setContactInfo([
      { icon: <MapPin className="w-6 h-6" />, title: translations.contact_0_title || 'Visit Our Store', details: translations.contact_0_details || '1234 Furniture Ave, Design District, City 12345', link: translations.contact_0_link || 'Get Directions' },
      { icon: <Phone className="w-6 h-6" />, title: translations.contact_1_title || 'Call Us', details: translations.contact_1_details || '+1 (123) 456-7890', link: translations.contact_1_link || 'Call Now' },
      { icon: <Clock className="w-6 h-6" />, title: translations.contact_2_title || 'Store Hours', details: translations.contact_2_details || 'Mon-Sat: 10am - 9pm', link: translations.contact_2_link || 'View Hours' }
    ]);
  }, [translations]);

  // editingContact: {index, field} | null
  const [editingContact, setEditingContact] = useState(null);

  const handleContactChange = (idx, field, value) => {
    setContactInfo(info =>
      info.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      )
    );
  };

  // Save handlers for each field
  const handleHeadingBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'contact_heading', value: heading });
  };
  const handleHighlightBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'contact_highlight', value: highlight });
  };
  const handleSubtitleBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'contact_subtitle', value: subtitle });
  };
  const handleContactFieldBlur = (index, field) => {
    setEditingContact(null);
    const keys = ['title', 'details', 'link'];
    const key = `contact_${index}_${field}`;
    defaultInstance.post(`/translations/${language}`, { key, value: contactInfo[index][field] });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="mb-4 flex flex-col items-center gap-2">
            <div className="relative inline-flex items-center justify-center">
              {editingField === 'heading' ? (
                <input
                  className="text-4xl sm:text-5xl font-bold text-black text-center pr-8"
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
                  className="text-[#0058A3] text-4xl sm:text-5xl font-bold text-center pr-8"
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
              {editingField === 'subtitle' ? (
                <textarea
                  className="text-xl text-black max-w-2xl mx-auto mb-2 w-full pr-8"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  onBlur={handleSubtitleBlur}
                  autoFocus
                  style={{ minWidth: 120 }}
                />
              ) : (
                <p
                  className="text-xl text-gray-600 max-w-2xl mx-auto pr-8 cursor-pointer relative"
                  onDoubleClick={isAdmin ? () => setEditingField('subtitle') : undefined}
                  style={{ display: 'inline-block', position: 'relative' }}
                >
                  {subtitle}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setEditingField('subtitle')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit subtitle"
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

        <div className="grid lg:grid-cols-2 gap-16">
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
                    <div className="relative mb-1">
                      {editingContact && editingContact.index === index && editingContact.field === 'title' ? (
                        <input
                          className="font-semibold text-gray-900 w-full pr-8"
                          value={info.title}
                          onChange={e => handleContactChange(index, 'title', e.target.value)}
                          onBlur={() => handleContactFieldBlur(index, 'title')}
                          autoFocus
                        />
                      ) : (
                        <h4
                          className="font-semibold text-gray-900 pr-8 cursor-pointer relative"
                          onDoubleClick={isAdmin ? () => setEditingContact({ index, field: 'title' }) : undefined}
                          style={{ display: 'inline-block', position: 'relative' }}
                        >
                          {info.title}
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => setEditingContact({ index, field: 'title' })}
                              className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                              aria-label="Edit title"
                              tabIndex={-1}
                            >
                              <Pencil size={14} className="text-gray-400 hover:text-[#0058A3]" />
                            </button>
                          )}
                        </h4>
                      )}
                    </div>
                    <div className="relative mb-2">
                      {editingContact && editingContact.index === index && editingContact.field === 'details' ? (
                        <input
                          className="text-gray-600 w-full pr-8"
                          value={info.details}
                          onChange={e => handleContactChange(index, 'details', e.target.value)}
                          onBlur={() => handleContactFieldBlur(index, 'details')}
                          autoFocus
                        />
                      ) : (
                        <p
                          className="text-gray-600 pr-8 cursor-pointer relative"
                          onDoubleClick={isAdmin ? () => setEditingContact({ index, field: 'details' }) : undefined}
                          style={{ display: 'inline-block', position: 'relative' }}
                        >
                          {info.details}
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => setEditingContact({ index, field: 'details' })}
                              className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                              aria-label="Edit details"
                              tabIndex={-1}
                            >
                              <Pencil size={14} className="text-gray-400 hover:text-[#0058A3]" />
                            </button>
                          )}
                        </p>
                      )}
                    </div>
                    <div className="relative mb-1">
                      {editingContact && editingContact.index === index && editingContact.field === 'link' ? (
                        <input
                          className="text-[#0058A3] font-medium text-sm w-full pr-8"
                          value={info.link}
                          onChange={e => handleContactChange(index, 'link', e.target.value)}
                          onBlur={() => handleContactFieldBlur(index, 'link')}
                          autoFocus
                        />
                      ) : (
                        <button
                          className="text-[#0058A3] hover:text-[#004494] font-medium text-sm transition-colors duration-200 pr-8 cursor-pointer relative"
                          onDoubleClick={isAdmin ? () => setEditingContact({ index, field: 'link' }) : undefined}
                          style={{ display: 'inline-block', position: 'relative' }}
                          type="button"
                        >
                          {info.link} →
                          {isAdmin && (
                            <span className="absolute top-1/2 -translate-y-1/2 right-0 p-1">
                              <Pencil size={14} className="text-gray-400 hover:text-[#0058A3]" onClick={e => { e.stopPropagation(); setEditingContact({ index, field: 'link' }); }} tabIndex={-1} />
                            </span>
                          )}
                        </button>
                      )}
                    </div>
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