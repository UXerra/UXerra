import React from 'react';
import { useTranslation } from 'react-i18next';
import AIDemoSection from '@/components/home/AIDemoSection';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const AIDemo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">{t('aiDemoPage.titleHighlight')}</span> {t('aiDemoPage.titleRest')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('aiDemoPage.description')}
            </p>
          </motion.div>
        </div>
      </section>
      
      <AIDemoSection />
      
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              {t('aiDemoPage.capabilitiesTitle')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <i className="ri-chat-3-line text-brand-blue text-xl"></i>
                </div>
                <h3 className="text-xl font-display font-medium mb-2">{t('aiDemoPage.capabilities.content.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('aiDemoPage.capabilities.content.description')}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <i className="ri-code-box-line text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-display font-medium mb-2">{t('aiDemoPage.capabilities.code.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('aiDemoPage.capabilities.code.description')}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <i className="ri-image-line text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-display font-medium mb-2">{t('aiDemoPage.capabilities.images.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('aiDemoPage.capabilities.images.description')}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                  <i className="ri-translate-2 text-orange-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-display font-medium mb-2">{t('aiDemoPage.capabilities.translation.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('aiDemoPage.capabilities.translation.description')}</p>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/#pricing" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-brand-blue text-white hover:bg-brand-blue/90 transition-colors">
                {t('aiDemoPage.upgradeButton')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AIDemo;
