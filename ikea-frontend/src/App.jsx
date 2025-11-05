import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductCategories from './components/ProductCategories.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import defaultInstance from './api/defaultInstance';
import Login from './components/Login.jsx';

const SUPPORTED_LANGS = ['ru', 'am'];

function MainApp() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [language, setLanguage] = useState(SUPPORTED_LANGS.includes(lang) ? lang : 'am');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    if (lang !== language) setLanguage(lang);
    // eslint-disable-next-line
  }, [lang]);

  useEffect(() => {
    if (lang !== language) navigate(`/${language}`, { replace: true });
    // eslint-disable-next-line
  }, [language]);

  useEffect(() => {
    defaultInstance.get(`/translations/${language}`).then(res => {
      const map = {};
      (res.data || []).forEach(item => { map[item.key] = item.value; });
      setTranslations(map);
    });
  }, [language]);

  const navigateToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  return (
    <div className="min-h-screen">
      <Header
        activeSection={activeSection}
        onNavigate={navigateToSection}
        language={language}
        setLanguage={setLanguage}
        translations={translations}
      />

      <main>
        <section id="home">
          <Hero language={language} translations={translations} />
          <ProductCategories language={language} translations={translations} />
        </section>

        <section id="about">
          <About language={language} translations={translations} />
        </section>

        <section id="contact">
          <Contact language={language} translations={translations} />
        </section>
      </main>

      <Footer onNavigate={navigateToSection} language={language} translations={translations} />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/am" replace />} />
          <Route path="/:lang" element={<MainApp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;