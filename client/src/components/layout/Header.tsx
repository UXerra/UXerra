import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { LanguageContext, Language } from '@/context/LanguageContext';
import { useContext } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [location] = useLocation();
  const { language, changeLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sl', name: 'Slovenščina' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-brand-dark-gray/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-200 ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-display font-bold gradient-text">UXerra</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className={`text-sm font-medium hover:text-brand-blue dark:hover:text-brand-blue transition-colors ${location === '/#features' ? 'text-brand-blue' : ''}`}>
              {t('header.features')}
            </Link>
            <Link href="/#ai-demo" className={`text-sm font-medium hover:text-brand-blue dark:hover:text-brand-blue transition-colors ${location === '/#ai-demo' ? 'text-brand-blue' : ''}`}>
              {t('header.aiDemo')}
            </Link>
            <Link href="/#pricing" className={`text-sm font-medium hover:text-brand-blue dark:hover:text-brand-blue transition-colors ${location === '/#pricing' ? 'text-brand-blue' : ''}`}>
              {t('header.pricing')}
            </Link>
            <Link href="/#testimonials" className={`text-sm font-medium hover:text-brand-blue dark:hover:text-brand-blue transition-colors ${location === '/#testimonials' ? 'text-brand-blue' : ''}`}>
              {t('header.testimonials')}
            </Link>
            <div className="language-dropdown relative">
              <button className="text-sm font-medium flex items-center hover:text-brand-blue dark:hover:text-brand-blue transition-colors bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700">
                {language === 'en' && <span className="fi fi-gb mr-2"></span>}
                {language === 'sl' && <span className="fi fi-si mr-2"></span>}
                {language === 'de' && <span className="fi fi-de mr-2"></span>}
                {language === 'es' && <span className="fi fi-es mr-2"></span>}
                <span>{language.toUpperCase()}</span>
                <i className="ri-arrow-down-s-line ml-1"></i>
              </button>
              <div className="language-menu absolute right-0 mt-2 py-2 w-40 bg-white dark:bg-brand-dark-gray rounded-md shadow-lg border border-gray-100 dark:border-gray-700 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code as Language)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      language === lang.code 
                        ? 'text-brand-blue bg-gray-50 dark:bg-gray-800 font-medium' 
                        : ''
                    }`}
                  >
                    {lang.code === 'en' && <span className="fi fi-gb mr-2"></span>}
                    {lang.code === 'sl' && <span className="fi fi-si mr-2"></span>}
                    {lang.code === 'de' && <span className="fi fi-de mr-2"></span>}
                    {lang.code === 'es' && <span className="fi fi-es mr-2"></span>}
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-brand-blue dark:text-gray-400 dark:hover:text-brand-blue transition-colors"
              aria-label={theme === 'dark' ? t('header.lightMode') : t('header.darkMode')}
            >
              <i className="ri-moon-line dark:hidden"></i>
              <i className="ri-sun-line hidden dark:block"></i>
            </button>
            <Link href="/login" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20 transition-colors">
              {t('header.login')}
            </Link>
            <Link href="/#pricing" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg bg-brand-blue text-white hover:bg-brand-blue/90 transition-colors">
              {t('header.getStarted')}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              type="button" 
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-brand-blue hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors" 
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-brand-dark-gray border-b border-gray-100 dark:border-gray-800">
          <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            {t('header.features')}
          </Link>
          <Link href="/#ai-demo" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            {t('header.aiDemo')}
          </Link>
          <Link href="/#pricing" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            {t('header.pricing')}
          </Link>
          <Link href="/#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            {t('header.testimonials')}
          </Link>
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{t('header.language')}</p>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code as Language);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-sm rounded-md text-center flex items-center justify-center ${
                    language === lang.code 
                      ? 'bg-gray-50 dark:bg-gray-800 text-brand-blue font-medium' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {lang.code === 'en' && <span className="fi fi-gb mr-2"></span>}
                  {lang.code === 'sl' && <span className="fi fi-si mr-2"></span>}
                  {lang.code === 'de' && <span className="fi fi-de mr-2"></span>}
                  {lang.code === 'es' && <span className="fi fi-es mr-2"></span>}
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
