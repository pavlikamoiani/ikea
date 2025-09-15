import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductCategories from './components/ProductCategories.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('home');

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
      <Header activeSection={activeSection} onNavigate={navigateToSection} />

      <main>
        <section id="home">
          <Hero />
          <ProductCategories />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer onNavigate={navigateToSection} />
    </div>
  );
}

export default App;