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

          {/* Desktop Navigation with Smart Mega Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Create Menu */}
            <div className="relative group">
              <button className={`text-sm font-medium flex items-center hover:text-brand-blue dark:hover:text-brand-blue transition-colors`}>
                <i className="ri-tools-fill mr-1.5"></i>
                {t('header.create')} <i className="ri-arrow-down-s-line ml-1 opacity-70"></i>
              </button>
              <div className="absolute left-0 w-[550px] pt-4 top-full hidden group-hover:block">
                <div className="bg-white dark:bg-brand-dark-gray rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 mb-2">
                    <h3 className="font-semibold text-sm mb-2 text-gray-500 dark:text-gray-400">{t('header.create')}</h3>
                  </div>
                  
                  <Link href="/branding-wizard" className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="h-9 w-9 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-brand-blue mr-2">
                      <i className="ri-magic-line text-lg"></i>
                    </span>
                    <div>
                      <span className="font-medium block">{t('header.createMenu.brandingWizard')}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Complete AI-powered brand identity creator</span>
                    </div>
                  </Link>
                  
                  <Link href="/ai-content-generator" className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="h-9 w-9 rounded-md bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-2">
                      <i className="ri-file-text-line text-lg"></i>
                    </span>
                    <div>
                      <span className="font-medium block">{t('header.createMenu.contentGen')}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Generate website and marketing content</span>
                    </div>
                  </Link>
                  
                  <Link href="/image-generator" className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="h-9 w-9 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-2">
                      <i className="ri-image-line text-lg"></i>
                    </span>
                    <div>
                      <span className="font-medium block">{t('header.createMenu.imageGen')}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Create custom images with AI</span>
                    </div>
                  </Link>
                  
                  <Link href="/social-media-generator" className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="h-9 w-9 rounded-md bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 mr-2">
                      <i className="ri-instagram-line text-lg"></i>
                    </span>
                    <div>
                      <span className="font-medium block">{t('header.createMenu.socialMediaGen')}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Design posts for all social platforms</span>
                    </div>
                  </Link>
                  
                  <Link href="/logo-generator" className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="h-9 w-9 rounded-md bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-2">
                      <i className="ri-pantone-line text-lg"></i>
                    </span>
                    <div>
                      <span className="font-medium block">{t('header.createMenu.logoGen')}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Professional logo design with AI</span>
                    </div>
                  </Link>
                  
                  <Link href="/wireframe-converter" className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="h-9 w-9 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-2">
                      <i className="ri-layout-line text-lg"></i>
                    </span>
                    <div>
                      <span className="font-medium block">{t('header.createMenu.wireframeConverter')}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Convert sketches into working websites</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Explore Menu */}
            <div className="relative group">
              <button className={`text-sm font-medium flex items-center hover:text-brand-blue dark:hover:text-brand-blue transition-colors`}>
                <i className="ri-compass-3-line mr-1.5"></i>
                {t('header.explore')} <i className="ri-arrow-down-s-line ml-1 opacity-70"></i>
              </button>
              <div className="absolute left-0 w-[450px] pt-4 top-full hidden group-hover:block">
                <div className="bg-white dark:bg-brand-dark-gray rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
                  <div className="mb-2">
                    <h3 className="font-semibold text-sm mb-2 text-gray-500 dark:text-gray-400">{t('header.explore')}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/templates" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-layout-4-line mr-2 text-brand-blue"></i>
                      <span>{t('header.exploreMenu.templates')}</span>
                    </Link>
                    
                    <Link href="/icons" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-remixicon-line mr-2 text-green-600 dark:text-green-400"></i>
                      <span>{t('header.exploreMenu.icons')}</span>
                    </Link>
                    
                    <Link href="/animations" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-movie-line mr-2 text-purple-600 dark:text-purple-400"></i>
                      <span>{t('header.exploreMenu.animations')}</span>
                    </Link>
                    
                    <Link href="/freebies" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-gift-line mr-2 text-pink-600 dark:text-pink-400"></i>
                      <span>{t('header.exploreMenu.freebies')}</span>
                    </Link>
                    
                    <Link href="/premium" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-vip-crown-line mr-2 text-yellow-600 dark:text-yellow-400"></i>
                      <span>{t('header.exploreMenu.premium')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hire Expert Menu */}
            <div className="relative group">
              <button className={`text-sm font-medium flex items-center hover:text-brand-blue dark:hover:text-brand-blue transition-colors`}>
                <i className="ri-user-star-line mr-1.5"></i>
                {t('header.hireExpert')} <i className="ri-arrow-down-s-line ml-1 opacity-70"></i>
              </button>
              <div className="absolute left-0 w-[450px] pt-4 top-full hidden group-hover:block">
                <div className="bg-white dark:bg-brand-dark-gray rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
                  <div className="mb-2">
                    <h3 className="font-semibold text-sm mb-2 text-gray-500 dark:text-gray-400">{t('header.hireExpert')}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/custom-design" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-artboard-line mr-2 text-brand-blue"></i>
                      <span>{t('header.hireMenu.customDesign')}</span>
                    </Link>
                    
                    <Link href="/website-development" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-code-box-line mr-2 text-green-600 dark:text-green-400"></i>
                      <span>{t('header.hireMenu.websiteDev')}</span>
                    </Link>
                    
                    <Link href="/brand-identity" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-palette-line mr-2 text-purple-600 dark:text-purple-400"></i>
                      <span>{t('header.hireMenu.brandIdentity')}</span>
                    </Link>
                    
                    <Link href="/submit-brief" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-file-list-3-line mr-2 text-pink-600 dark:text-pink-400"></i>
                      <span>{t('header.hireMenu.submitBrief')}</span>
                    </Link>
                    
                    <Link href="/services-pricing" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-price-tag-3-line mr-2 text-yellow-600 dark:text-yellow-400"></i>
                      <span>{t('header.hireMenu.pricing')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resources Menu */}
            <div className="relative group">
              <button className={`text-sm font-medium flex items-center hover:text-brand-blue dark:hover:text-brand-blue transition-colors`}>
                <i className="ri-book-open-line mr-1.5"></i>
                {t('header.resources')} <i className="ri-arrow-down-s-line ml-1 opacity-70"></i>
              </button>
              <div className="absolute left-0 w-[450px] pt-4 top-full hidden group-hover:block">
                <div className="bg-white dark:bg-brand-dark-gray rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
                  <div className="mb-2">
                    <h3 className="font-semibold text-sm mb-2 text-gray-500 dark:text-gray-400">{t('header.resources')}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/blog" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-article-line mr-2 text-brand-blue"></i>
                      <span>{t('header.resourcesMenu.blog')}</span>
                    </Link>
                    
                    <Link href="/tutorials" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-video-line mr-2 text-green-600 dark:text-green-400"></i>
                      <span>{t('header.resourcesMenu.tutorials')}</span>
                    </Link>
                    
                    <Link href="/case-studies" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-folder-chart-line mr-2 text-purple-600 dark:text-purple-400"></i>
                      <span>{t('header.resourcesMenu.caseStudies')}</span>
                    </Link>
                    
                    <Link href="/help" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-question-line mr-2 text-pink-600 dark:text-pink-400"></i>
                      <span>{t('header.resourcesMenu.help')}</span>
                    </Link>
                    
                    <Link href="/community" className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                      <i className="ri-team-line mr-2 text-yellow-600 dark:text-yellow-400"></i>
                      <span>{t('header.resourcesMenu.community')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          
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
          <Link href="/branding-wizard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="flex items-center">
              <i className="ri-magic-line mr-1"></i>
              {t('brandingWizard.title')}
            </span>
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
