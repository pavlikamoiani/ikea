import React, { memo, useState, useCallback, useEffect } from 'react';
import { Heart, Users, Leaf, Award, Pencil } from 'lucide-react';
import defaultInstance from '../api/defaultInstance';


const About = memo(({ language = 'ka', translations = {} }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Editable state for heading and paragraphs
  const [editingField, setEditingField] = useState(null);
  const [heading, setHeading] = useState(translations.about_heading || 'About');
  const [highlight, setHighlight] = useState(translations.about_highlight || 'IKEA');
  const [paragraph1, setParagraph1] = useState(translations.about_paragraph1 || 'Since 1943, IKEA has been creating a better everyday life for millions of people around the world. We offer well-designed, functional, and affordable home furnishing solutions that make good design accessible to everyone.');
  const [paragraph2, setParagraph2] = useState(translations.about_paragraph2 || 'Our vision is to create a better everyday life for the many people by offering a wide range of home furnishing products of good design and function, at prices so low that as many people as possible can afford them.');

  // Editable stats
  const [editingStat, setEditingStat] = useState(null);
  const [stats, setStats] = useState([
    { value: translations.about_stat_0_value || '78+', label: translations.about_stat_0_label || 'Years of Innovation' },
    { value: translations.about_stat_1_value || '460+', label: translations.about_stat_1_label || 'Stores Worldwide' },
    { value: translations.about_stat_2_value || '60+', label: translations.about_stat_2_label || 'Countries' }
  ]);

  // Editable floating card
  const [editingFloating, setEditingFloating] = useState(null);
  const [floating, setFloating] = useState({
    value: translations.about_floating_value || '1943',
    label: translations.about_floating_label || 'Founded'
  });

  useEffect(() => {
    setHeading(translations.about_heading || '');
    setHighlight(translations.about_highlight || 'IKEA');
    setParagraph1(translations.about_paragraph1 || '');
    setParagraph2(translations.about_paragraph2 || 'Our vision is to create a better everyday life for the many people by offering a wide range of home furnishing products of good design and function, at prices so low that as many people as possible can afford them.');
    setStats([
      { value: translations.about_stat_0_value || '78+', label: translations.about_stat_0_label || 'Years of Innovation' },
      { value: translations.about_stat_1_value || '460+', label: translations.about_stat_1_label || 'Stores Worldwide' },
      { value: translations.about_stat_2_value || '60+', label: translations.about_stat_2_label || 'Countries' }
    ]);
    setFloating({
      value: translations.about_floating_value || '1943',
      label: translations.about_floating_label || 'Founded'
    });
  }, [translations]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleStatChange = (idx, field, value) => {
    setStats(prev =>
      prev.map((stat, i) =>
        i === idx ? { ...stat, [field]: value } : stat
      )
    );
  };

  // Save handlers for each field
  const handleHeadingBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'about_heading', value: heading });
  };
  const handleHighlightBlur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'about_highlight', value: highlight });
  };
  const handleParagraph1Blur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'about_paragraph1', value: paragraph1 });
  };
  const handleParagraph2Blur = () => {
    setEditingField(null);
    defaultInstance.post(`/translations/${language}`, { key: 'about_paragraph2', value: paragraph2 });
  };
  const handleStatBlur = (idx, field) => {
    setEditingStat(null);
    defaultInstance.post(`/translations/${language}`, { key: `about_stat_${idx}_${field}`, value: stats[idx][field] });
  };
  const handleFloatingBlur = (field) => {
    setEditingFloating(null);
    defaultInstance.post(`/translations/${language}`, { key: `about_floating_${field}`, value: floating[field] });
  };

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
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="relative inline-flex items-center justify-center">
                {editingField === 'heading' ? (
                  <input
                    className="text-4xl sm:text-5xl font-bold mb-0 text-black w-full text-center pr-8"
                    value={heading}
                    onChange={e => setHeading(e.target.value)}
                    onBlur={handleHeadingBlur}
                    autoFocus
                    style={{ minWidth: 120 }}
                  />
                ) : (
                  <span
                    className="text-4xl sm:text-5xl font-bold text-gray-900 pr-8 cursor-pointer"
                    onDoubleClick={() => setEditingField('heading')}
                    style={{ position: 'relative' }}
                  >
                    {heading}
                    <button
                      type="button"
                      onClick={() => setEditingField('heading')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit heading"
                      tabIndex={-1}
                    >
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  </span>
                )}
                {' '}
                {editingField === 'highlight' ? (
                  <input
                    className="text-[#0058A3] text-4xl sm:text-5xl font-bold mb-0 w-full text-center pr-8"
                    value={highlight}
                    onChange={e => setHighlight(e.target.value)}
                    onBlur={handleHighlightBlur}
                    autoFocus
                    style={{ minWidth: 120 }}
                  />
                ) : (
                  <span
                    className="text-[#0058A3] text-4xl sm:text-5xl font-bold pr-8 cursor-pointer"
                    onDoubleClick={() => setEditingField('highlight')}
                    style={{ position: 'relative' }}
                  >
                    {highlight}
                    <button
                      type="button"
                      onClick={() => setEditingField('highlight')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit highlight"
                      tabIndex={-1}
                    >
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  </span>
                )}
              </div>
              <div className="relative inline-flex items-center justify-center w-full">
                {editingField === 'paragraph1' ? (
                  <textarea
                    className="text-xl text-black mb-2 w-full pr-8"
                    value={paragraph1}
                    onChange={e => setParagraph1(e.target.value)}
                    onBlur={handleParagraph1Blur}
                    autoFocus
                    style={{ minWidth: 120 }}
                  />
                ) : (
                  <p
                    className="text-xl text-gray-600 mb-2 leading-relaxed pr-8 cursor-pointer relative"
                    onDoubleClick={() => setEditingField('paragraph1')}
                    style={{ display: 'inline-block', position: 'relative' }}
                  >
                    {paragraph1}
                    <button
                      type="button"
                      onClick={() => setEditingField('paragraph1')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit paragraph1"
                      tabIndex={-1}
                    >
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  </p>
                )}
              </div>
              <div className="relative inline-flex items-center justify-center w-full">
                {editingField === 'paragraph2' ? (
                  <textarea
                    className="text-lg text-black mb-2 w-full pr-8"
                    value={paragraph2}
                    onChange={e => setParagraph2(e.target.value)}
                    onBlur={handleParagraph2Blur}
                    autoFocus
                    style={{ minWidth: 120 }}
                  />
                ) : (
                  <p
                    className="text-lg text-gray-600 mb-8 pr-8 cursor-pointer relative"
                    onDoubleClick={() => setEditingField('paragraph2')}
                    style={{ display: 'inline-block', position: 'relative' }}
                  >
                    {paragraph2}
                    <button
                      type="button"
                      onClick={() => setEditingField('paragraph2')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit paragraph2"
                      tabIndex={-1}
                    >
                      <Pencil size={16} className="text-gray-400 hover:text-[#0058A3]" />
                    </button>
                  </p>
                )}
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div className="text-center" key={idx}>
                  <div className="relative mb-2">
                    {editingStat && editingStat.index === idx && editingStat.field === 'value' ? (
                      <input
                        className="text-3xl font-bold text-[#0058A3] w-full text-center pr-8"
                        value={stat.value}
                        onChange={e => handleStatChange(idx, 'value', e.target.value)}
                        onBlur={() => handleStatBlur(idx, 'value')}
                        autoFocus
                        style={{ minWidth: 40 }}
                      />
                    ) : (
                      <span
                        className="text-3xl font-bold text-[#0058A3] pr-8 cursor-pointer relative"
                        onDoubleClick={() => setEditingStat({ index: idx, field: 'value' })}
                        style={{ display: 'inline-block', position: 'relative' }}
                      >
                        {stat.value}
                        <button
                          type="button"
                          onClick={() => setEditingStat({ index: idx, field: 'value' })}
                          className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                          aria-label="Edit stat value"
                          tabIndex={-1}
                        >
                          <Pencil size={14} className="text-gray-400 hover:text-[#0058A3]" />
                        </button>
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    {editingStat && editingStat.index === idx && editingStat.field === 'label' ? (
                      <input
                        className="text-sm text-gray-600 w-full text-center pr-8"
                        value={stat.label}
                        onChange={e => handleStatChange(idx, 'label', e.target.value)}
                        onBlur={() => handleStatBlur(idx, 'label')}
                        autoFocus
                        style={{ minWidth: 40 }}
                      />
                    ) : (
                      <span
                        className="text-sm text-gray-600 pr-8 cursor-pointer relative"
                        onDoubleClick={() => setEditingStat({ index: idx, field: 'label' })}
                        style={{ display: 'inline-block', position: 'relative' }}
                      >
                        {stat.label}
                        <button
                          type="button"
                          onClick={() => setEditingStat({ index: idx, field: 'label' })}
                          className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                          aria-label="Edit stat label"
                          tabIndex={-1}
                        >
                          <Pencil size={12} className="text-gray-400 hover:text-[#0058A3]" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              ))}
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
              <div className="relative mb-1">
                {editingFloating === 'value' ? (
                  <input
                    className="text-2xl font-bold text-[#0058A3] w-full pr-8 bg-[#FFDA1A]"
                    value={floating.value}
                    onChange={e => setFloating(f => ({ ...f, value: e.target.value }))}
                    onBlur={() => handleFloatingBlur('value')}
                    autoFocus
                    style={{ minWidth: 40 }}
                  />
                ) : (
                  <span
                    className="text-2xl font-bold text-[#0058A3] pr-8 cursor-pointer relative"
                    onDoubleClick={() => setEditingFloating('value')}
                    style={{ display: 'inline-block', position: 'relative' }}
                  >
                    {floating.value}
                    <button
                      type="button"
                      onClick={() => setEditingFloating('value')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit floating value"
                      tabIndex={-1}
                    >
                      <Pencil size={14} className="text-[#0058A3] hover:text-black" />
                    </button>
                  </span>
                )}
              </div>
              <div className="relative">
                {editingFloating === 'label' ? (
                  <input
                    className="text-sm text-[#0058A3] font-semibold w-full pr-8 bg-[#FFDA1A]"
                    value={floating.label}
                    onChange={e => setFloating(f => ({ ...f, label: e.target.value }))}
                    onBlur={() => handleFloatingBlur('label')}
                    autoFocus
                    style={{ minWidth: 40 }}
                  />
                ) : (
                  <span
                    className="text-sm text-[#0058A3] font-semibold pr-8 cursor-pointer relative"
                    onDoubleClick={() => setEditingFloating('label')}
                    style={{ display: 'inline-block', position: 'relative' }}
                  >
                    {floating.label}
                    <button
                      type="button"
                      onClick={() => setEditingFloating('label')}
                      className="absolute top-1/2 -translate-y-1/2 right-0 p-1"
                      aria-label="Edit floating label"
                      tabIndex={-1}
                    >
                      <Pencil size={12} className="text-[#0058A3] hover:text-black" />
                    </button>
                  </span>
                )}
              </div>
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