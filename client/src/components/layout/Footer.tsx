import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-gray dark:bg-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-display font-bold gradient-text">UXerra</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/uxerra" aria-label="Twitter" className="text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">
                <i className="ri-twitter-x-line text-lg"></i>
              </a>
              <a href="https://instagram.com/uxerra" aria-label="Instagram" className="text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">
                <i className="ri-instagram-line text-lg"></i>
              </a>
              <a href="https://linkedin.com/company/uxerra" aria-label="LinkedIn" className="text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">
                <i className="ri-linkedin-box-line text-lg"></i>
              </a>
              <a href="https://github.com/UXerra/UXerra" aria-label="GitHub" className="text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">
                <i className="ri-github-line text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300 mb-4">{t('footer.platform')}</h3>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.features')}</Link></li>
              <li><Link href="/#pricing" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.pricing')}</Link></li>
              <li><Link href="/#ai-demo" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.aiDemo')}</Link></li>
              <li><Link href="/marketplace" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.marketplace')}</Link></li>
              <li><Link href="/api" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.api')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300 mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li><Link href="/documentation" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.documentation')}</Link></li>
              <li><Link href="/tutorials" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.tutorials')}</Link></li>
              <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.blog')}</Link></li>
              <li><Link href="/case-studies" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.caseStudies')}</Link></li>
              <li><Link href="/support" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.support')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300 mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.about')}</Link></li>
              <li><Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.careers')}</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.contact')}</Link></li>
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.terms')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} UXerra. {t('footer.allRightsReserved')}
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.privacyPolicy')}</Link>
              <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.termsOfService')}</Link>
              <Link href="/cookies" className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors">{t('footer.cookies')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
